import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Standard checkbox with indeterminate state. Box uses `--accent` when checked ' +
          'and `--border` when unchecked. Focus ring via `--accent` token.',
      },
    },
  },
  argTypes: {
    disabled:      { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    hideLabel:     { control: 'boolean' },
  },
  args: {
    label: 'Remember my preferences',
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/* ─── states ──────────────────────────────────────────────────── */

export const Default: Story = {
  args: { defaultChecked: false },
  play: async ({ canvas }) => {
    const cb = canvas.getByRole('checkbox', { name: /remember/i })
    await expect(cb).toBeVisible()
    await expect(cb).not.toBeChecked()
  },
}

export const Checked: Story = {
  args: { defaultChecked: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeChecked()
  },
}

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Select all invoices' },
  play: async ({ canvas }) => {
    const cb = canvas.getByRole('checkbox', { name: /select all/i })
    await expect(cb).toHaveAttribute('aria-checked', 'mixed')
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: false },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox')).toBeDisabled()
  },
}

export const DisabledChecked: Story = {
  name: 'Disabled + Checked',
  args: { disabled: true, defaultChecked: true },
}

/* ─── with description ────────────────────────────────────────── */

export const WithDescription: Story = {
  name: 'With Description',
  args: {
    label: 'Include tax line items',
    description: 'Add a separate line on the invoice showing estimated taxes.',
    defaultChecked: false,
  },
}

/* ─── click interaction ───────────────────────────────────────── */

export const ClickToggle: Story = {
  name: 'Toggles on click',
  args: { label: 'Mark as paid', defaultChecked: false, onChange: fn() },
  play: async ({ canvas, args }) => {
    const cb = canvas.getByRole('checkbox', { name: /mark as paid/i })
    await expect(cb).not.toBeChecked()
    await userEvent.click(cb)
    await expect(cb).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledOnce()
  },
}

/* ─── select-all pattern ──────────────────────────────────────── */

function SelectAllDemo() {
  const items = ['Invoice #041', 'Invoice #042', 'Invoice #043', 'Invoice #044']
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const allChecked  = selected.size === items.length
  const someChecked = selected.size > 0 && !allChecked

  const toggleAll = () => {
    setSelected(allChecked ? new Set() : new Set(items))
  }
  const toggleOne = (item: string) => {
    const next = new Set(selected)
    next.has(item) ? next.delete(item) : next.add(item)
    setSelected(next)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 320 }}>
      <Checkbox
        label="Select all"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
        description={`${selected.size} of ${items.length} selected`}
      />
      <div style={{
        borderTop: '1px solid var(--border-muted)',
        paddingTop: '0.75rem',
        display: 'flex', flexDirection: 'column', gap: '0.625rem',
      }}>
        {items.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selected.has(item)}
            onChange={() => toggleOne(item)}
          />
        ))}
      </div>
    </div>
  )
}

export const SelectAll: Story = {
  name: 'Select-All Pattern',
  render: () => <SelectAllDemo />,
}

/* ─── invoice filter list ─────────────────────────────────────── */

export const FilterList: Story = {
  name: 'Filter Checkboxes',
  render: () => (
    <div style={{
      padding: '1.25rem',
      borderRadius: '0.75rem',
      border: '1px solid var(--border-default)',
      maxWidth: 280,
      display: 'flex', flexDirection: 'column', gap: '0.875rem',
    }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--content-tertiary)', marginBottom: 4 }}>
        Filter by status
      </p>
      <Checkbox label="Paid"         description="12 invoices" defaultChecked />
      <Checkbox label="Pending"      description="4 invoices"  defaultChecked />
      <Checkbox label="Overdue"      description="2 invoices"  defaultChecked={false} />
      <Checkbox label="Draft"        description="3 invoices"  defaultChecked={false} />
    </div>
  ),
}

/* ─── all states ──────────────────────────────────────────────── */

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Unchecked"              defaultChecked={false} />
      <Checkbox label="Checked"                defaultChecked={true} />
      <Checkbox label="Indeterminate"          indeterminate />
      <Checkbox label="Disabled unchecked"     disabled defaultChecked={false} />
      <Checkbox label="Disabled checked"       disabled defaultChecked={true} />
      <Checkbox label="With description"       defaultChecked={false}
        description="Additional context about this option." />
    </div>
  ),
}
