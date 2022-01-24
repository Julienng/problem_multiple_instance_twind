import * as React from "react";
import {
  virtualSheet,
  getStyleTagProperties,
  VirtualSheet,
} from "twind/sheets";
import { tw, setup } from "twind";
import { twindConfig } from "../../twind.config";
import { renderToString } from "react-dom/server";

declare global {
  var __sheet: VirtualSheet;
  var __cssByHash: Record<string, string>;
}

const styleContext = React.createContext<string>("");

export function initStyles() {
  // We should only have one instance of the virtual sheet
  if (!global.__sheet) {
    // We'll naively assume that the server is always the same
    // and cache the sheecss by hash here
    global.__cssByHash = {};
    // Create the virtual sheet
    global.__sheet = virtualSheet();

    console.log("current config", twindConfig);
    // Create the twind config
    setup({
      ...twindConfig,
      sheet: global.__sheet,
    });
  }
}

export function initStylesClient() {
  setup(twindConfig);
}

function digestMessage(message: string) {
  const crypto = require("crypto");
  return crypto
    .createHash("sha256")
    .update(message)
    .digest("hex")
    .substring(0, 10);
}

export async function renderWithStyles(children: React.ReactNode) {
  // Reset the virtual sheet before render
  global.__sheet.reset();
  // Render the app
  renderToString(<>{children}</>);
  // Harvest the styles
  let { textContent } = getStyleTagProperties(global.__sheet);
  // Remove whitespace from styles
  textContent = textContent.replace(/\n/g, "");
  // Hash the styles
  const hash = digestMessage(textContent);
  // Store the styles by hash
  global.__cssByHash[hash] = textContent;
  // Feed the hash to the app and render again
  return [
    renderToString(
      <styleContext.Provider value={hash}>{children}</styleContext.Provider>
    ),
    getPathForHash(hash),
  ] as const;
}

export function getStylesByHash(hash: string) {
  return global.__cssByHash[hash];
}

export function useStyles() {
  const hash = React.useContext(styleContext);

  if (!hash) {
    return null;
  }

  return <link rel="stylesheet" href={getPathForHash(hash)} />;
}

function getPathForHash(hash: string) {
  return `/styles?hash=${hash}`;
}
