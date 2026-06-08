'use client'

import React, {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react'

/* ─── types ──────────────────────────────────────────────────── */

export interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'onChange' | 'type'
  > {
  /** Visible label */
  label: string
  /** Hides label visually (still accessible) */
  hideLabel?: boolean
  /** Controlled numeric value in minor units or decimal string */
  value?: number | string
  /** Default numeric value */
  defaultValue?: number | string
  /** Called with the raw numeric value on every change */
  onChange?: (value: number | undefined) => void
  /** ISO 4217 currency code — determines symbol and locale formatting */
  currency?: string
  /** BCP 47 locale for number formatting */
  locale?: string
  /** Helper text shown below */
  helperText?: string
  /** Error message — replaces helperText */
  error?: string
  /** Minimum allowed value (not enforced mid-typing, only on blur) */
  min?: number
  /** Maximum allowed value (not enforced mid-typing, only on blur) */
  max?: number
  containerClassName?: string
}

/* ─── formatting helpers ─────────────────────────────────────── */

function getCurrencySymbol(currency: string, locale: string): string {
  try {
    const parts = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).formatToParts(0)
    return parts.find((p) => p.type === 'currency')?.value ?? currency
  } catch {
    return currency
  }
}

/**
 * Formats a numeric value as a display string with thousands separators
 * but no currency symbol (that's handled separately).
 */
function formatDisplay(value: number, locale: string, currency: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: 'narrowSymbol',
    })
      .formatToParts(value)
      .filter((p) => p.type !== 'currency' && p.type !== 'literal')
      .map((p) => p.value)
      .join('')
      .trim()
  } catch {
    return value.toFixed(2)
  }
}

/**
 * Strips formatting characters from a display string to yield a parseable
 * decimal string. Handles both period and comma decimal separators.
 */
function parseDisplayValue(raw: string, locale: string): number | undefined {
  if (!raw || raw === '') return undefined

  // Detect which character is the decimal separator in this locale
  const decimalSep = new Intl.NumberFormat(locale)
    .formatToParts(1.1)
    .find((p) => p.type === 'decimal')?.value ?? '.'

  const thousandsSep = decimalSep === '.' ? ',' : '.'

  // Remove thousands separators, then normalise decimal separator to '.'
  const normalised = raw
    .replace(new RegExp(`\\${thousandsSep}`, 'g'), '')
    .replace(new RegExp(`\\${decimalSep}`), '.')
    .replace(/[^\d.-]/g, '')

  const n = parseFloat(normalised)
  return isNaN(n) ? undefined : n
}

/* ─── component ──────────────────────────────────────────────── */

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput(
    {
      label,
      hideLabel     = false,
      value: controlledValue,
      defaultValue,
      onChange,
      currency      = 'USD',
      locale        = 'en-US',
      helperText,
      error,
      min,
      max,
      containerClassName,
      className,
      disabled,
      onFocus,
      onBlur,
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

    // ── internal state ───────────────────────────────────────────
    //
    // We manage two separate string representations:
    //  - `rawInput`   what's currently in the <input> (unformatted while focused)
    //  - `formatted`  the display string when blurred
    //
    const getInitial = (): number | undefined => {
      const v = controlledValue ?? defaultValue
      if (v === undefined || v === '') return undefined
      const n = typeof v === 'number' ? v : parseFloat(String(v))
      return isNaN(n) ? undefined : n
    }

    const [internalNumeric, setInternalNumeric] = useState<number | undefined>(
      getInitial,
    )
    const [isFocused, setIsFocused] = useState(false)
    const [rawInput, setRawInput]   = useState<string>('')
    const internalRef = useRef<HTMLInputElement>(null)

    // Merge external + internal ref
    const setRef = (el: HTMLInputElement | null) => {
      ;(internalRef as React.MutableRefObject<HTMLInputElement | null>).current = el
      if (typeof ref === 'function') ref(el)
      else if (ref) ref.current = el
    }

    const numericValue =
      controlledValue !== undefined
        ? typeof controlledValue === 'number'
          ? controlledValue
          : parseFloat(String(controlledValue))
        : internalNumeric

    const symbol      = getCurrencySymbol(currency, locale)
    const displayStr  =
      numericValue !== undefined && !isNaN(numericValue)
        ? formatDisplay(numericValue, locale, currency)
        : ''

    // ── event handlers ───────────────────────────────────────────

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true)
        // When focused, show raw decimal (no formatting) so user can edit
        setRawInput(
          numericValue !== undefined && !isNaN(numericValue)
            ? String(numericValue)
            : '',
        )
        onFocus?.(e)
        // Select all on focus for quick replacement
        requestAnimationFrame(() => {
          internalRef.current?.select()
        })
      },
      [numericValue, onFocus],
    )

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value
        // Allow typing digits, decimal point, minus
        const sanitised = raw.replace(/[^\d.,\-]/g, '')
        setRawInput(sanitised)

        const parsed = parseDisplayValue(sanitised, locale)
        if (controlledValue === undefined) {
          setInternalNumeric(parsed)
        }
        onChange?.(parsed)
      },
      [locale, controlledValue, onChange],
    )

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false)

        // Re-parse whatever was typed
        const parsed = parseDisplayValue(rawInput, locale)

        // Clamp to min/max on blur
        let clamped = parsed
        if (clamped !== undefined) {
          if (min !== undefined && clamped < min) clamped = min
          if (max !== undefined && clamped > max) clamped = max
        }

        if (controlledValue === undefined) {
          setInternalNumeric(clamped)
        }
        if (clamped !== parsed) {
          onChange?.(clamped)
        }

        onBlur?.(e)
      },
      [rawInput, locale, min, max, controlledValue, onChange, onBlur],
    )

    // ── styles ───────────────────────────────────────────────────

    const wrapperBase =
      'relative flex items-center ' +
      'bg-surface-raised border rounded transition-colors duration-100 ' +
      'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-offset-1 '

    const wrapperState = hasError
      ? 'border-danger has-[:focus-visible]:ring-danger has-[:focus-visible]:ring-offset-surface-base'
      : 'border-border hover:border-border-strong ' +
        'has-[:focus-visible]:border-accent has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-surface-base'

    const wrapperDisabled = disabled
      ? 'bg-surface-muted border-border-muted cursor-not-allowed'
      : ''

    const inputClasses = [
      'font-numeric',                     // tabular-nums + numeric font stack
      'w-full bg-transparent text-right', // right-align for financial figures
      'text-content-primary text-base',
      'placeholder:text-content-tertiary',
      'py-2.5 pr-3',
      'focus:outline-none',               // focus ring handled by wrapper
      'disabled:text-content-disabled disabled:cursor-not-allowed',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    const symbolClasses = [
      'font-numeric shrink-0 pl-3 pr-1.5 text-base select-none',
      hasError ? 'text-danger-content' : 'text-content-secondary',
      isFocused && !hasError ? 'text-accent-content' : '',
      disabled ? 'text-content-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div
        className={[
          'flex flex-col gap-1.5',
          containerClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* label */}
        <label
          htmlFor={id}
          className={[
            'text-sm font-medium',
            hasError ? 'text-danger-content' : 'text-content-primary',
            disabled ? 'text-content-disabled' : '',
            hideLabel ? 'sr-only' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </label>

        {/* wrapper — receives focus ring via :has() */}
        <div
          className={[wrapperBase, wrapperState, wrapperDisabled]
            .filter(Boolean)
            .join(' ')}
          // Make the wrapper focusable-ring container
          role="group"
          aria-labelledby={undefined}
        >
          {/* currency symbol */}
          <span className={symbolClasses} aria-hidden="true">
            {symbol}
          </span>

          {/* actual input */}
          <input
            ref={setRef}
            id={id}
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            disabled={disabled}
            aria-label={label}
            aria-describedby={helperContent ? helperId : undefined}
            aria-invalid={hasError || undefined}
            value={isFocused ? rawInput : displayStr}
            placeholder={isFocused ? '0.00' : '0.00'}
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClasses}
            {...rest}
          />
        </div>

        {/* helper / error */}
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

CurrencyInput.displayName = 'CurrencyInput'
