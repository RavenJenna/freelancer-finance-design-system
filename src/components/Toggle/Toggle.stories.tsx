import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { useState } from 'react'
import { Toggle } from './Toggle'

const meta = {
  title: 'Primitives/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Switch control implemented as a styled checkbox with `role="switch"`. ' +
          'Track colour transitions from `--border-default` (off) to `--accent` (on).',
      },
    },
  },
  argTypes: {
    size:          { control: 'select', options: ['sm', 'md'] },
    labelPosition: { control: 'select', options: ['right', 'left'] },
    disabled:      { control: 'boolean' },
    hideLabel:     { control: 'boolean' },
  },
  args: {
    label: 'Enable notifications',
    onChange: fn(),
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/* ─── states ──────────────────────────────────────────────────── */

export const Default: Story = {
  args: { defaultChecked: false },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('switch', { name: /enable notifications/i })
    await expect(toggle).toBeVisible()
    await expect(toggle).not.toBeChecked()
  },
}

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole('switch', { name: /enable notifications/i })
    await expect(toggle).toBeChecked()
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: false },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('switch')).toBeDisabled()
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: { disabled: true, defaultChecked: true },
}

/* ─── sizes ───────────────────────────────────────────────────── */

export const Small: Story = {
  args: { size: 'sm', label: 'Compact toggle', defaultChecked: false },
}

export const AllSizes: Story = {
  name: 'Both Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Toggle size="sm" label="Small (32×18)" defaultChecked />
      <Toggle size="md" label="Medium (44×24)" defaultChecked />
    </div>
  ),
}

/* ─── with description ────────────────────────────────────────── */

export const WithDescription: Story = {
  name: 'With Description',
  args: {
    label: 'Tax reminders',
    description: 'Send me a reminder 2 weeks before quarterly estimated taxes are due.',
    defaultChecked: true,
  },
}

/* ─── label positions ─────────────────────────────────────────── */

export const LabelLeft: Story = {
  name: 'Label on Left',
  args: {
    label: 'Auto-categorise',
    labelPosition: 'left',
    defaultChecked: true,
  },
}

/* ─── click interaction ───────────────────────────────────────── */

export const ClickToggle: Story = {
  name: 'Toggles on click',
  args: { label: 'Auto-save', defaultChecked: false, onChange: fn() },
  play: async ({ canvas, args }) => {
    const toggle = canvas.getByRole('switch', { name: /auto-save/i })
    await expect(toggle).not.toBeChecked()
    await userEvent.click(toggle)
    await expect(toggle).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledOnce()
  },
}

/* ─── controlled demo ─────────────────────────────────────────── */

function ControlledDemo() {
  const [on, setOn] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toggle
        label="Dark mode"
        description="Switch between light and dark theme."
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)' }}>
        State: <strong>{on ? 'On' : 'Off'}</strong>
      </p>
    </div>
  )
}

export const Controlled: Story = {
  name: 'Controlled',
  render: () => <ControlledDemo />,
}

/* ─── settings list ───────────────────────────────────────────── */

export const SettingsList: Story = {
  name: 'Settings List',
  render: () => (
    <div style={{
      display: 'flex', flexDirection: 'column',
      maxWidth: 400, borderRadius: 12,
      border: '1px solid var(--border-default)',
      overflow: 'hidden',
    }}>
      {[
        { label: 'Invoice reminders',   desc: 'Email when invoice is 3 days overdue.',   on: true },
        { label: 'Payment receipts',    desc: 'Email when a client marks invoice paid.',  on: true },
        { label: 'Tax estimates',       desc: 'Quarterly estimated tax due reminders.',   on: false },
        { label: 'Weekly summary',      desc: 'Summary of income and expenses each week.',on: false },
      ].map((item, i) => (
        <div key={item.label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 1.25rem',
          borderTop: i > 0 ? '1px solid var(--border-muted)' : undefined,
        }}>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--content-primary)' }}>{item.label}</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--content-secondary)', marginTop: 2 }}>{item.desc}</p>
          </div>
          <Toggle label={item.label} hideLabel defaultChecked={item.on} size="md" labelPosition="left" />
        </div>
      ))}
    </div>
  ),
}
