'use client'

import React, { forwardRef, useId } from 'react'

/* ─── types ──────────────────────────────────────────────────── */

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Visible label — always rendered, even if visually hidden */
  label: string
  /** Hides label visually while keeping it accessible */
  hideLabel?: boolean
  /** Helper text shown below the input */
  helperText?: string
  /** Puts the field into error state; string replaces helperText */
  error?: string
  /** Icon rendered inside the left edge of the input */
  leadingIcon?: React.ReactNode
  /** Icon rendered inside the right edge of the input */
  trailingIcon?: React.ReactNode
  /** Wraps the whole field; for layout / className on the container */
  containerClassName?: string
}

/* ─── component ──────────────────────────────────────────────── */

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      hideLabel    = false,
      helperText,
      error,
      leadingIcon,
      trailingIcon,
      containerClassName,
      className,
      disabled,
      id: externalId,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId()
    const id         = externalId ?? generatedId
    const helperId   = `${id}-helper`
    const hasError   = Boolean(error)
    const helperContent = error ?? helperText

    /* Tailwind classes using only semantic tokens */
    const inputBase =
      'w-full bg-surface-raised text-content-primary text-base ' +
      'placeholder:text-content-tertiary ' +
      'border rounded transition-colors duration-100 ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ' +
      'disabled:bg-surface-muted disabled:text-content-disabled ' +
      'disabled:placeholder:text-content-disabled disabled:cursor-not-allowed'

    const inputState = hasError
      ? 'border-danger focus:border-danger focus-visible:ring-danger focus-visible:ring-offset-surface-base'
      : 'border-border focus:border-accent focus-visible:ring-accent focus-visible:ring-offset-surface-base ' +
        'hover:border-border-strong'

    const paddingLeft  = leadingIcon  ? 'pl-10' : 'pl-3'
    const paddingRight = trailingIcon ? 'pr-10' : 'pr-3'
    const inputHeight  = 'py-2.5'

    return (
      <div className={['flex flex-col gap-1.5', containerClassName].filter(Boolean).join(' ')}>
        {/* label */}
        <label
          htmlFor={id}
          className={[
            'text-sm font-medium text-content-primary',
            hideLabel ? 'sr-only' : '',
            disabled  ? 'text-content-disabled' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </label>

        {/* input wrapper — positions icons */}
        <div className="relative">
          {leadingIcon && (
            <span
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-content-tertiary"
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-describedby={helperContent ? helperId : undefined}
            aria-invalid={hasError || undefined}
            className={[
              inputBase,
              inputState,
              paddingLeft,
              paddingRight,
              inputHeight,
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...rest}
          />

          {trailingIcon && (
            <span
              className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-content-tertiary"
              aria-hidden="true"
            >
              {trailingIcon}
            </span>
          )}
        </div>

        {/* helper / error text */}
        {helperContent && (
          <p
            id={helperId}
            className={[
              'text-sm',
              hasError ? 'text-danger-content' : 'text-content-secondary',
            ].join(' ')}
            role={hasError ? 'alert' : undefined}
          >
            {helperContent}
          </p>
        )}
      </div>
    )
  },
)

TextField.displayName = 'TextField'
