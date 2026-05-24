import { TOOLTIP_OFFSET } from "./tooltip.constants";
import type { TooltipPlacement } from "./tooltip.types";

interface PositionPrams {
    triggerRect: DOMRect;
    tooltipRect: DOMRect;
    placement: TooltipPlacement;
}

export const calculateTooltipPosition = ({
    triggerRect,
    tooltipRect,
    placement
}: PositionPrams)=>{
    switch(placement){
        case "top":
            return {
                top: triggerRect.top - tooltipRect.height - TOOLTIP_OFFSET,
                left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
            };
        case "bottom":
            return {
                top: triggerRect.bottom + TOOLTIP_OFFSET,
                left: triggerRect.left + triggerRect.width / 2 - tooltipRect.width/2
            };
        case "left":
            return {
                top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
                left: triggerRect.left - tooltipRect.width - TOOLTIP_OFFSET
            };
        case "right":
            return {
                top: triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2,
                left: triggerRect.right + TOOLTIP_OFFSET,
            }
        default:
            return {
                top: 0,
                left: 0
            }
    }
}

/**
 * Tooltip positioning is geometry computation
 * 
 * you are building a mini layout engine.
 * 
 * Underataniding DOM 
 */

import React from "react";

export const mergeRefs = <T>(
    ...refs: Array<
        React.Ref<T> | undefined
    >
) => {
    return (value: T) => {
        refs.forEach((ref) => {
            if (!ref) {
                return;
            }

            if (typeof ref === "function") {
                ref(value);
            } else {
                (
                    ref as React.MutableRefObject<T>
                ).current = value;
            }
        });
    };
};