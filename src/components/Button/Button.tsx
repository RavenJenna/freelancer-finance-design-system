'use client'

import React, { forwardRef } from 'react'
import { LoaderCircle } from 'lucide-react'

/* ─── types ──────────────────────────────────────────────────── */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize    = 'sm' | 'md' | 'lg'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  ButtonVariant
  size?:     ButtonSize
  loading?:  boolean
  /** Renders an icon to the left of the label */
  iconLeft?: React.ReactNode
  /** Renders an icon to the right of the label */
  iconRight?: React.ReactNode
  /** Renders just an icon with accessible label — hides children visually */
  iconOnly?: boolean
}

/* ─── style maps — only semantic tokens ──────────────────────── */

const variantBase: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-content-on-accent border border-transparent ' +
    'hover:bg-accent-hover active:bg-accent-hover ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',

  secondary:
    'bg-surface-raised text-content-primary border border-border ' +
    'hover:bg-surface-hover hover:border-border-strong ' +
    'active:bg-surface-hover ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',

  ghost:
    'bg-transparent text-content-primary border border-transparent ' +
    'hover:bg-surface-hover ' +
    'active:bg-surface-hover ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',

  danger:
    'bg-negative text-content-on-accent border border-transparent ' +
    'hover:bg-negative-hover active:bg-negative-hover ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
}

// All sizes share the same corner radius token (--radius-md = 0.75rem = 12px).
// To change button radius globally, update --radius-md in globals.css.
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8  px-3   text-sm  gap-1.5 rounded-md',
  md: 'h-10 px-4   text-base gap-2  rounded-md',
  lg: 'h-12 px-5   text-lg  gap-2.5 rounded-md',
}

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8  w-8  rounded-md',
  md: 'h-10 w-10 rounded-md',
  lg: 'h-12 w-12 rounded-md',
}

const spinnerSize: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

/* ─── spinner ────────────────────────────────────────────────── */

function Spinner({ size, variant }: { size: number; variant: ButtonVariant }) {
  const color =
    variant === 'primary' || variant === 'danger'
      ? 'text-content-on-accent'
      : 'text-content-secondary'
  return (
    <LoaderCircle
      className={`animate-spin ${color}`}
      size={size}
      aria-hidden="true"
    />
  )
}

/* ─── component ──────────────────────────────────────────────── */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant  = 'primary',
      size     = 'md',
      loading  = false,
      iconLeft,
      iconRight,
      iconOnly = false,
      children,
      className,
      disabled,
      type = 'button',
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading

    const base =
      'relative inline-flex items-center justify-center font-medium ' +
      'transition-colors duration-100 select-none whitespace-nowrap ' +
      // focus-visible ring uses accent token so it always contrasts
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
      'focus-visible:ring-accent focus-visible:ring-offset-surface-base'

    const sizeClass = iconOnly
      ? iconSizeClasses[size]
      : sizeClasses[size]

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={loading}
        className={[base, variantBase[variant], sizeClass, className]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {/* loading spinner overlays content — wrapper is aria-hidden; SVG is too */}
        {loading && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <Spinner size={spinnerSize[size]} variant={variant} />
          </span>
        )}

        {/* content — opacity-0 during loading: visually hidden but stays in the
            accessibility tree so the button always has an accessible name.
            `invisible` (visibility:hidden) must NOT be used here — it removes
            the element (and its text) from the a11y tree, breaking button-name. */}
        <span
          className={[
            'inline-flex items-center gap-inherit',
            loading ? 'opacity-0' : '',
            iconOnly ? 'sr-only' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ gap: 'inherit' }}
        >
          {iconLeft && (
            <span className="shrink-0" aria-hidden="true">
              {iconLeft}
            </span>
          )}
          {children}
          {iconRight && (
            <span className="shrink-0" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </span>

        {/* icon-only renders the icon visibly, children as sr-only */}
        {iconOnly && (
          <span className="shrink-0" aria-hidden="true">
            {iconLeft ?? iconRight}
          </span>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'
