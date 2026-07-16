import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Search, Mail, Eye, AlertCircle } from 'lucide-react'
import { TextField } from './TextField'

/* ─── meta ────────────────────────────────────────────────────── */

const meta = {
  title: 'Primitives/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Labelled text input with helper text, error state, and optional icon slots. ' +
          'Focus ring uses `--accent` token; error state uses `--danger` token.',
      },
    },
  },
  argTypes: {
    label:       { control: 'text' },
    placeholder: { control: 'text' },
    helperText:  { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
    hideLabel:   { control: 'boolean' },
  },
  args: {
    label: 'Invoice note',
    placeholder: 'Add a note…',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

/* ─── default ─────────────────────────────────────────────────── */

export const Default: Story = {
  args: {},
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: /invoice note/i })
    await expect(input).toBeVisible()
    await expect(input).not.toBeDisabled()
    await expect(input).toHaveAttribute('placeholder', 'Add a note…')
  },
}

/* ─── with helper text ────────────────────────────────────────── */

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    label: 'Client name',
    placeholder: 'e.g. Acme Corp',
    helperText: 'This will appear on the invoice header.',
  },
}

/* ─── error state ─────────────────────────────────────────────── */

export const ErrorState: Story = {
  name: 'Error State',
  args: {
    label: 'Invoice amount',
    placeholder: '0.00',
    error: 'Amount must be greater than zero.',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox', { name: /invoice amount/i })
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await expect(canvas.getByRole('alert')).toHaveTextContent('Amount must be greater than zero.')
  },
}

/* ─── disabled ────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: {
    label: 'Invoice number',
    value: 'INV-0042',
    disabled: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: /invoice number/i })).toBeDisabled()
  },
}

/* ─── with leading icon ───────────────────────────────────────── */

export const LeadingIcon: Story = {
  name: 'With Leading Icon',
  args: {
    label: 'Search clients',
    placeholder: 'Search…',
    leadingIcon: <Search size={16} />,
  },
}

/* ─── with trailing icon ──────────────────────────────────────── */

export const TrailingIcon: Story = {
  name: 'With Trailing Icon',
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    helperText: 'Minimum 8 characters.',
    trailingIcon: <Eye size={16} />,
  },
}

/* ─── email variant ───────────────────────────────────────────── */

export const EmailField: Story = {
  name: 'Email — Icon + Helper',
  args: {
    label: 'Email address',
    type: 'email',
    placeholder: 'you@example.com',
    leadingIcon: <Mail size={16} />,
    helperText: 'Invoice receipts will be sent here.',
  },
}

/* ─── error with icon ─────────────────────────────────────────── */

export const ErrorWithIcon: Story = {
  name: 'Error State + Icon',
  args: {
    label: 'Email address',
    type: 'email',
    value: 'not-an-email',
    leadingIcon: <Mail size={16} />,
    trailingIcon: <AlertCircle size={16} />,
    error: 'Enter a valid email address.',
  },
}

/* ─── hidden label ────────────────────────────────────────────── */

export const HiddenLabel: Story = {
  name: 'Hidden Label (accessible)',
  args: {
    label: 'Quick search',
    placeholder: 'Quick search…',
    hideLabel: true,
    leadingIcon: <Search size={16} />,
  },
}

/* ─── all states overview ─────────────────────────────────────── */

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 400 }}>
      <TextField label="Default"    placeholder="Default state" />
      <TextField label="With helper" placeholder="Has helper text" helperText="Some helpful hint below." />
      <TextField label="Error"      placeholder="Error state" error="This field is required." />
      <TextField label="Disabled"   value="Read-only value" disabled />
      <TextField label="With icon"  placeholder="Search…" leadingIcon={<Search size={16} />} />
    </div>
  ),
}
