import React from "react";
import { apply, tw } from "twind";

const base = apply`form-input shadow-sm block w-full text-base sm:text-sm rounded-md focus:outline-none`;

const colors = {
  none: apply`focus:ring-gray-500 focus:border-gray-500 border-gray-300`,
  primary: apply`focus:ring-blue-500 focus:border-blue-500 border-blue-300`,
  secondary: apply`focus:ring-gray-500 focus:border-gray-500 border-gray-300`,
  success: apply`focus:ring-green-500 focus:border-green-500 border-green-300`,
  warning: apply`focus:ring-yellow-500 focus:border-yellow-500 border-yellow-300`,
  danger: apply`focus:ring-red-500 focus:border-red-500 border-red-300`,
  info: apply`focus:ring-purple-500 focus:border-purple-500 border-purple-300`,
} as const;

export type InputProps = React.ComponentProps<"input"> & {
  // inputSize?: keyof typeof sizes;
  intent?: keyof typeof colors;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ intent = "none", className, ...props }, ref) {
    return (
      <input
        ref={ref}
        data-intent={intent}
        data-component="Input"
        className={tw(base, colors[intent], className)}
        {...props}
      />
    );
  }
);
