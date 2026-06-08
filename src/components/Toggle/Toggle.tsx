'use client'

import React, { forwardRef, useId } from 'react'

/* ─── types ──────────────────────────────────────────────────── */

export type ToggleSize = 'sm' | 'md'

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Visible label — always rendered or sr-only */
  label: string
  /** Hides label visually while remaining accessible */
  hideLabel?: boolean
  /** sm = 32×18, md = 44×24 */
  size?: ToggleSize
  /** Description text shown beneath the label */
  description?: string
  /** Label position relative to the toggle track */
  labelPosition?: 'right' | 'left'
}

/* ─── size tokens ────────────────────────────────────────────── */

const trackSize: Record<ToggleSize, { track: string; thumb: string; thumbOn: string }> = {
  sm: {
    track: 'h-[18px] w-8',
    thumb: 'h-3 w-3 top-[3px] left-[3px]',
    thumbOn: 'translate-x-[14px]',
  },
  md: {
    track: 'h-6 w-11',
    thumb: 'h-4 w-4 top-[4px] left-[4px]',
    thumbOn: 'translate-x-[20px]',
  },
}

/* ─── component ──────────────────────────────────────────────── */

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  function Toggle(
    {
      label,
      hideLabel      = false,
      size           = 'md',
      description,
      labelPosition  = 'right',
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
    const id = externalId ?? generatedId
    const descId = description ? `${id}-desc` : undefined

    const { track, thumb, thumbOn } = trackSize[size]

    // Track: off = surface-muted / border, on = accent
    const trackBase =
      'relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent ' +
      'transition-colors duration-200 cursor-pointer ' +
      'peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ' +
      'peer-focus-visible:ring-accent peer-focus-visible:ring-offset-surface-base ' +
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-50'

    const trackChecked =
      'peer-checked:bg-accent peer-not-checked:bg-border-default'

    // Thumb
    const thumbBase =
      'absolute rounded-full bg-surface-base shadow-sm ' +
      'transition-transform duration-200 ease-in-out pointer-events-none ' +
      'peer-checked:' + thumbOn

    return (
      <label
        htmlFor={id}
        className={[
          'inline-flex items-start gap-3 cursor-pointer select-none',
          labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
          disabled ? 'cursor-not-allowed opacity-60' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Hidden checkbox — drives all state via peer selectors */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={onChange}
          aria-describedby={descId}
          className="peer sr-only"
          {...rest}
        />

        {/* Visual track + thumb */}
        <span className={[track, trackBase, trackChecked].join(' ')}>
          <span className={[thumb, thumbBase].join(' ')} aria-hidden="true" />
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

Toggle.displayName = 'Toggle'
