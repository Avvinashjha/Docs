import React from 'react';

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
    content: React.ReactNode;
    placement?: TooltipPlacement;
    children: React.ReactElement;
    disabled?: boolean;
    className?: string;
}

/**
 * Why ReactElement instead of ReactNode?
 * 
 * We need cloneElement(children)
 * 
 * Only valid React elements can ne cloned
 * 
 * Example: <Button/> <div/>
 * 
 * Not: "hello", 123
 */

/**
 * 
 * Why single child?
 * 
 * Tooltip expects, one anchor element, this simplifies
 * - refs
 * measurement
 * interaction
 */

