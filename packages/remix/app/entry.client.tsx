import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";

import { initStylesClient } from "~/utils/stylesContext";

initStylesClient();

hydrate(<RemixBrowser />, document);
