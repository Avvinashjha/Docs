import React from "react";

import {
  DEFAULT_BUTTON_SIZE,
  DEFAULT_BUTTON_VARIANT,
} from "./button.constants";


import { cn } from "./button.utils";

import "./button.scss";
import type { ButtonProps } from "./button.types";

export const Button = <
  T extends React.ElementType = "button"
>({
  as,
  variant = DEFAULT_BUTTON_VARIANT,
  size = DEFAULT_BUTTON_SIZE,

  loading = false,

  rounded = false,
  fullWidth = false,

  leftIcon,
  rightIcon,

  className,
  children,

  ...restProps
}: ButtonProps<T>) => {
  const Component = as || "button";

  const classes = cn(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,

    rounded && "btn-rounded",

    fullWidth && "btn-full-width",

    className
  );

  const leftSection = loading ? (
    <span
      className="btn-spinner"
      aria-hidden="true"
    />
  ) : (
    leftIcon
  );

  return (
    <Component
      className={classes}
      data-loading={loading}
      aria-busy={loading}
      {...restProps}
    >
      {leftSection && (
        <span className="btn__left">
          {leftSection}
        </span>
      )}

      {children && (
        <span className="btn__content">
          {children}
        </span>
      )}

      {rightIcon && !loading && (
        <span className="btn__right">
          {rightIcon}
        </span>
      )}
    </Component>
  );
};