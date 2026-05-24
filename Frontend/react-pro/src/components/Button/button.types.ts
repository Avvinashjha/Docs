/**
 * Keep Contracts Isolated
 */
import React from "react";

export type ButtonVariant = | "filled" | "outlined" | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export type ButtonBaseProps =  {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    rounded?: boolean;
    fullWidth?: boolean;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    
    children?: React.ReactNode;
}

export type ButtonProps<T extends React.ElementType> = ButtonBaseProps & {
 as?: T;
} & Omit<
    React.ComponentPropsWithoutRef<T>,
    keyof ButtonBaseProps | "as">;
/**
 * Why Interface
 * - extendable
 * - Declaration merging support
 * - Cleaner inheritance semantic
 */

/**
 * Why Extend Native Button Props?
 * This gives:
 * - onClick
 * - arial label
 * - disabled
 * - tab index
 * - form props
 * 
 * Automatically
 * 
 * Huge scalability benefits
 */