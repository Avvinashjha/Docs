import { useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import "./tooltip.scss";
import { DEFAULT_TOOLTIP_PLACEMENT } from './tooltip.constants';
import type { TooltipProps } from './tooltip.types';
import { calculateTooltipPosition } from './tooltip.utils';

export const Tooltip = ({
    content,
    placement = DEFAULT_TOOLTIP_PLACEMENT,

    children,
    disabled = false,
    className
}: TooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const [position, setPosition] = useState({
        top: 0,
        left: 0
    });

    const triggerRef = useRef<HTMLSpanElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const tooltipId = useId();

    useLayoutEffect(() => {
        if (!isOpen) {
            return;
        }

        const triggerElement = triggerRef.current;

        const tooltipElement = tooltipRef.current;

        if (!triggerElement || !tooltipElement) {
            return;
        }

        const triggerRect = triggerElement.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();

        const nextPosition = calculateTooltipPosition({ triggerRect, tooltipRect, placement });

        setPosition(nextPosition);
    }, [isOpen, placement]);

    const handleOpen = () => {
        if (disabled) {
            return;
        }
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                onFocus={handleOpen}
                onBlur={handleClose}
                aria-describedby={isOpen ? tooltipId : undefined}
                style={{ display: 'inline-block' }}
            >
                {children}
            </span>
            {isOpen &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        id={tooltipId}
                        role='tooltip'
                        className={
                            `
                            tooltip
                            tooltip--visible
                            ${className || ""}
                            `
                        }
                        style={{
                            top: position.top,
                            left: position.left
                        }}
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    )
}
