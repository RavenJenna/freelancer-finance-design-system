import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { Button } from './Button'

/* ─── icons (inline SVG so no extra dep) ─────────────────────── */
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

/* ─── meta ────────────────────────────────────────────────────── */

const meta = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Core interactive element. Four variants, three sizes, loading and disabled states. ' +
          'Focus ring uses `--accent` token for consistent contrast across themes.',
      },
    },
  },
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    loading:  { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/* ─── primary variant ─────────────────────────────────────────── */

export const Primary: Story = {
  args: { variant: 'primary', children: 'Add invoice' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /add invoice/i })
    await expect(btn).toBeVisible()
    await expect(btn).not.toBeDisabled()
  },
}

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'View details' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Cancel' },
}

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete invoice' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /delete invoice/i })
    await expect(btn).toBeVisible()
    await expect(btn).not.toBeDisabled()
  },
}

/* ─── sizes ───────────────────────────────────────────────────── */

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
    </div>
  ),
}

/* ─── states ──────────────────────────────────────────────────── */

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /disabled/i })
    await expect(btn).toBeDisabled()
    await expect(btn).toHaveAttribute('aria-disabled', 'true')
  },
}

export const Loading: Story = {
  args: { loading: true, children: 'Saving…' },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /saving/i })
    await expect(btn).toHaveAttribute('aria-busy', 'true')
    await expect(btn).toBeDisabled()
  },
}

export const LoadingSecondary: Story = {
  name: 'Loading — Secondary',
  args: { loading: true, variant: 'secondary', children: 'Loading' },
}

/* ─── icons ───────────────────────────────────────────────────── */

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  args: { iconLeft: <PlusIcon />, children: 'New invoice' },
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  args: { iconRight: <ArrowIcon />, children: 'Continue' },
}

export const IconOnly: Story = {
  name: 'Icon-Only',
  args: {
    iconLeft: <TrashIcon />,
    iconOnly: true,
    variant: 'danger',
    size: 'md',
    children: 'Delete',
    'aria-label': 'Delete',
  },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /delete/i })
    await expect(btn).toBeVisible()
  },
}

/* ─── all variants side-by-side ───────────────────────────────── */

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '0.75rem', alignItems: 'center' }}>
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((v) => (
        <Button key={v} variant={v} size="md">
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </Button>
      ))}
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((v) => (
        <Button key={v + '-dis'} variant={v} size="md" disabled>
          Disabled
        </Button>
      ))}
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((v) => (
        <Button key={v + '-load'} variant={v} size="md" loading>
          Loading
        </Button>
      ))}
    </div>
  ),
}
