import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { useState } from 'react'
import { CurrencyInput } from './CurrencyInput'

/* ─── meta ────────────────────────────────────────────────────── */

const meta = {
  title: 'Primitives/CurrencyInput',
  component: CurrencyInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Specialised money-entry field. Right-aligns value, uses `.font-numeric` for ' +
          'tabular figures, formats with `Intl.NumberFormat` on blur, and exposes a ' +
          'currency symbol prefix. Supports any ISO 4217 currency + BCP 47 locale.',
      },
    },
  },
  argTypes: {
    currency:  { control: 'select', options: ['USD', 'EUR', 'GBP', 'JPY', 'CAD'] },
    locale:    { control: 'select', options: ['en-US', 'en-GB', 'de-DE', 'fr-FR', 'ja-JP'] },
    disabled:  { control: 'boolean' },
    hideLabel: { control: 'boolean' },
  },
  args: {
    label:    'Invoice amount',
    currency: 'USD',
    locale:   'en-US',
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 380, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CurrencyInput>

export default meta
type Story = StoryObj<typeof meta>

/* ─── empty / default ─────────────────────────────────────────── */

export const Empty: Story = {
  args: { label: 'Invoice amount' },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: /invoice amount/i })
    await expect(input).toBeVisible()
    await expect(input).not.toBeDisabled()
  },
}

/* ─── with value ──────────────────────────────────────────────── */

export const WithValue: Story = {
  name: 'With Value',
  args: {
    label: 'Project fee',
    value: 4800,
    helperText: 'Net 30 payment terms',
  },
}

export const LargeBalance: Story = {
  name: 'Large Balance',
  args: {
    label: 'Annual revenue',
    value: 128500.5,
    helperText: 'Year-to-date earnings',
  },
}

/* ─── error state ─────────────────────────────────────────────── */

export const ErrorState: Story = {
  name: 'Error State',
  args: {
    label: 'Retainer fee',
    value: 0,
    error: 'Amount must be greater than $0.00',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: /retainer fee/i })
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByRole('alert')).toHaveTextContent('Amount must be greater than $0.00')
  },
}

/* ─── disabled ────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    label: 'Locked amount',
    value: 1200,
    disabled: true,
    helperText: 'This invoice has been sent and cannot be changed.',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: /locked amount/i })).toBeDisabled()
  },
}

/* ─── type interaction ────────────────────────────────────────── */

export const Typing: Story = {
  name: 'Typing interaction',
  args: {
    label: 'Enter amount',
    onChange: fn(),
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole('textbox', { name: /enter amount/i })
    await userEvent.click(input)
    await userEvent.type(input, '1234.50')
    // Tab away to trigger blur formatting
    await userEvent.tab()
    // After blur, the formatted value should be visible
    await expect(input).toHaveValue('1,234.50')
    await expect(args.onChange).toHaveBeenCalledWith(1234.5)
  },
}

/* ─── clear on focus ──────────────────────────────────────────── */

export const FocusBehavior: Story = {
  name: 'Focus clears formatting',
  args: {
    label: 'Tax reserve',
    value: 3200,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: /tax reserve/i })
    // Blurred — shows formatted value
    await expect(input).toHaveValue('3,200.00')
    // Focus — shows raw number for editing
    await userEvent.click(input)
    await expect(input).toHaveValue('3200')
  },
}

/* ─── currencies ──────────────────────────────────────────────── */

export const Euros: Story = {
  args: {
    label: 'Project fee (EUR)',
    value: 4500,
    currency: 'EUR',
    locale: 'de-DE',
    helperText: 'VAT not included',
  },
}

export const BritishPounds: Story = {
  name: 'British Pounds',
  args: {
    label: 'Contractor day rate',
    value: 650,
    currency: 'GBP',
    locale: 'en-GB',
  },
}

/* ─── min / max clamping ──────────────────────────────────────── */

export const WithMinMax: Story = {
  name: 'Min/Max Clamping',
  args: {
    label: 'Late fee',
    value: 50,
    min: 0,
    max: 500,
    helperText: 'Between $0 and $500.',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: /late fee/i })
    await userEvent.click(input)
    await userEvent.clear(input)
    await userEvent.type(input, '9999')
    await userEvent.tab()
    // Should be clamped to max on blur
    await expect(input).toHaveValue('500.00')
  },
}

/* ─── controlled demo ─────────────────────────────────────────── */

function ControlledDemo() {
  const [amount, setAmount] = useState<number | undefined>(2400)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 380 }}>
      <CurrencyInput
        label="Monthly retainer"
        value={amount}
        onChange={setAmount}
        helperText={amount !== undefined ? `That's $${amount.toFixed(2)} per month` : undefined}
      />
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
        Raw value: <code>{amount ?? 'undefined'}</code>
      </p>
    </div>
  )
}

export const Controlled: Story = {
  name: 'Controlled',
  render: () => <ControlledDemo />,
}

/* ─── all states overview ─────────────────────────────────────── */

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 380 }}>
      <CurrencyInput label="Default"        />
      <CurrencyInput label="With value"     value={4800}  helperText="Net 30 days" />
      <CurrencyInput label="Large balance"  value={128500.5} />
      <CurrencyInput label="Error"          value={0}     error="Must be greater than $0" />
      <CurrencyInput label="Disabled"       value={1200}  disabled />
    </div>
  ),
}
