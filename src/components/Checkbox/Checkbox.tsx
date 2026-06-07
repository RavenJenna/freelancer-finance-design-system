'use client'

import React, { forwardRef, useId } from 'react'

/* ─── types ──────────────────────────────────────────────────── */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id' | 'type'> {
  /** Visible label */
  label: string
  /** Hides label visually while remaining accessible */
  hideLabel?: boolean
  /** Indeterminate state (e.g. "select all" when some children selected) */
  indeterminate?: boolean
  /** Description text beneath the label */
  description?: string
}

/* ─── check mark SVGs ────────────────────────────────────────── */

const CheckMark = () => (
  <svg
    className="h-3 w-3 text-content-on-accent"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2 6.5l3 3 5-6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const IndeterminateMark = () => (
  <svg
    className="h-3 w-3 text-content-on-accent"
    viewBox="0 0 12 12"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M2.5 6h7"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
    />
  </svg>
)

/* ─── component ──────────────────────────────────────────────── */

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    {
      label,
      hideLabel      = false,
      indeterminate  = false,
      description,
      checked,
      defaultChecked,
      disabled,
      onChange,
      className,
      id: externalId,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId()
    const id    = externalId ?? generatedId
    const descId = description ? `${id}-desc` : undefined

    // Sync the indeterminate DOM property (React doesn't support it as an attr)
    const setRef = (el: HTMLInputElement | null) => {
      if (el) el.indeterminate = indeterminate
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    const isActive = checked ?? (indeterminate ? true : undefined)

    // Box: border/bg transitions through unchecked → checked → indeterminate
    const boxBase =
      'relative flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border-2 ' +
      'transition-colors duration-150 ' +
      'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ' +
      'peer-focus-visible:ring-accent peer-focus-visible:ring-offset-surface-base'

    const boxState = isActive
      ? 'bg-accent border-accent'
      : 'bg-surface-raised border-border peer-hover:border-border-strong'

    const boxDisabled = disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer'

    return (
      <label
        htmlFor={id}
        className={[
          'inline-flex items-start gap-2.5 cursor-pointer select-none',
          disabled ? 'cursor-not-allowed opacity-60' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Hidden real checkbox — drives peer selectors */}
        <input
          ref={setRef}
          id={id}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-describedby={descId}
          className="peer sr-only"
          {...rest}
        />

        {/* Visual box */}
        <span
          className={[boxBase, boxState, boxDisabled].join(' ')}
          aria-hidden="true"
        >
          {indeterminate ? (
            <IndeterminateMark />
          ) : isActive ? (
            <CheckMark />
          ) : null}
        </span>

        {/* Label + description */}
        <span className="flex flex-col gap-0.5 pt-px">
          <span
            className={[
              'text-sm font-medium text-content-primary leading-tight',
              hideLabel ? 'sr-only' : '',
              disabled ? 'text-content-disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {label}
          </span>
          {description && (
            <span
              id={descId}
              className={[
                'text-xs text-content-secondary leading-snug',
                disabled ? 'text-content-disabled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {description}
            </span>
          )}
        </span>
      </label>
    )
  },
)

Checkbox.displayName = 'Checkbox'
