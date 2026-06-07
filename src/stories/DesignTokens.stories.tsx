import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * Design Token Foundation
 *
 * This page is the single browsable reference for all design tokens.
 * Values are read directly from CSS custom properties so this page
 * stays in sync with `globals.css` automatically.
 */

/* ── helpers ──────────────────────────────────────────────── */

function cssVar(name: string): string {
  if (typeof document === 'undefined') return ''
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim()
}

/* ── building-block components ────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '1rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--border-default)',
        color: 'var(--content-primary)',
      }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Subsection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--content-tertiary)',
        marginBottom: '0.75rem',
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

/* ── color swatch ─────────────────────────────────────────── */

interface SwatchProps {
  cssVarName: string   // e.g. "--surface-base"
  label: string
  textLight?: boolean
}

function Swatch({ cssVarName, label, textLight }: SwatchProps) {
  const bg = `var(${cssVarName})`
  const textColor = textLight ? '#fff' : '#0f172a'
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '0.375rem', width: '5.5rem' }}>
      <div style={{
        width: '100%',
        height: '3rem',
        borderRadius: '0.5rem',
        background: bg,
        border: '1px solid rgb(0 0 0 / 0.08)',
        boxShadow: '0 1px 2px rgb(0 0 0 / 0.04)',
      }} />
      <span style={{ fontSize: '0.6875rem', color: 'var(--content-secondary)', lineHeight: 1.3 }}>
        {label}
      </span>
      <span style={{
        fontSize: '0.6rem',
        fontFamily: 'ui-monospace, monospace',
        color: 'var(--content-tertiary)',
        lineHeight: 1.2,
        wordBreak: 'break-all',
      }}>
        {cssVarName}
      </span>
    </div>
  )
}

function SwatchRow({ swatches }: { swatches: SwatchProps[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {swatches.map((s) => <Swatch key={s.cssVarName} {...s} />)}
    </div>
  )
}

/* ── color section ────────────────────────────────────────── */

function ColorsSection() {
  return (
    <Section title="Color Tokens">
      <Subsection label="Surfaces">
        <SwatchRow swatches={[
          { cssVarName: '--surface-base',    label: 'Base' },
          { cssVarName: '--surface-raised',  label: 'Raised' },
          { cssVarName: '--surface-overlay', label: 'Overlay' },
          { cssVarName: '--surface-muted',   label: 'Muted' },
        ]} />
      </Subsection>

      <Subsection label="Content">
        <SwatchRow swatches={[
          { cssVarName: '--content-primary',   label: 'Primary' },
          { cssVarName: '--content-secondary', label: 'Secondary' },
          { cssVarName: '--content-tertiary',  label: 'Tertiary' },
          { cssVarName: '--content-disabled',  label: 'Disabled' },
          { cssVarName: '--content-inverse',   label: 'Inverse', textLight: true },
        ]} />
      </Subsection>

      <Subsection label="Accent">
        <SwatchRow swatches={[
          { cssVarName: '--accent-default',  label: 'Default',  textLight: true },
          { cssVarName: '--accent-subtle',   label: 'Subtle' },
          { cssVarName: '--accent-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--accent-content',  label: 'Content' },
        ]} />
      </Subsection>

      <Subsection label="Borders">
        <SwatchRow swatches={[
          { cssVarName: '--border-muted',   label: 'Muted' },
          { cssVarName: '--border-default', label: 'Default' },
          { cssVarName: '--border-strong',  label: 'Strong' },
        ]} />
      </Subsection>

      <Subsection label="Success — income, on-time">
        <SwatchRow swatches={[
          { cssVarName: '--success-subtle',   label: 'Subtle' },
          { cssVarName: '--success-default',  label: 'Default',  textLight: true },
          { cssVarName: '--success-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--success-content',  label: 'Content' },
        ]} />
      </Subsection>

      <Subsection label="Warning — pending, low balance">
        <SwatchRow swatches={[
          { cssVarName: '--warning-subtle',   label: 'Subtle' },
          { cssVarName: '--warning-default',  label: 'Default',  textLight: true },
          { cssVarName: '--warning-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--warning-content',  label: 'Content' },
        ]} />
      </Subsection>

      <Subsection label="Danger — overdue, overspent">
        <SwatchRow swatches={[
          { cssVarName: '--danger-subtle',   label: 'Subtle' },
          { cssVarName: '--danger-default',  label: 'Default',  textLight: true },
          { cssVarName: '--danger-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--danger-content',  label: 'Content' },
        ]} />
      </Subsection>

      <Subsection label="Bucket — Spendable (money to spend now)">
        <SwatchRow swatches={[
          { cssVarName: '--spendable-subtle',   label: 'Subtle' },
          { cssVarName: '--spendable-default',  label: 'Default',  textLight: true },
          { cssVarName: '--spendable-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--spendable-content',  label: 'Content' },
        ]} />
      </Subsection>

      <Subsection label="Bucket — Tax (reserved for taxes)">
        <SwatchRow swatches={[
          { cssVarName: '--tax-subtle',   label: 'Subtle' },
          { cssVarName: '--tax-default',  label: 'Default',  textLight: true },
          { cssVarName: '--tax-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--tax-content',  label: 'Content' },
        ]} />
      </Subsection>

      <Subsection label="Bucket — Buffer (emergency fund)">
        <SwatchRow swatches={[
          { cssVarName: '--buffer-subtle',   label: 'Subtle' },
          { cssVarName: '--buffer-default',  label: 'Default',  textLight: true },
          { cssVarName: '--buffer-emphasis', label: 'Emphasis', textLight: true },
          { cssVarName: '--buffer-content',  label: 'Content' },
        ]} />
      </Subsection>
    </Section>
  )
}

/* ── type scale ───────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: '2xs',        size: '0.625rem', sample: 'Terms & conditions fine print' },
  { name: 'xs',         size: '0.75rem',  sample: 'Labels and metadata' },
  { name: 'sm',         size: '0.875rem', sample: 'Secondary body text, captions' },
  { name: 'base',       size: '1rem',     sample: 'Primary body text and descriptions' },
  { name: 'lg',         size: '1.125rem', sample: 'Emphasized body, section headings' },
  { name: 'xl',         size: '1.25rem',  sample: 'Card titles and subheadings' },
  { name: '2xl',        size: '1.5rem',   sample: 'Screen headings' },
  { name: '3xl',        size: '1.875rem', sample: 'Page titles' },
  { name: '4xl',        size: '2.25rem',  sample: 'Hero headings' },
  { name: 'display',    size: '3rem',     sample: 'Balance amounts', numeric: true },
  { name: 'display-xl', size: '4rem',     sample: '$12,480.00',      numeric: true },
  { name: 'display-2xl',size: '5rem',     sample: '$48,200',         numeric: true },
]

function TypeSection() {
  return (
    <Section title="Type Scale">
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)', marginBottom: '1.5rem' }}>
        Display sizes use <code style={{ background: 'var(--surface-muted)', padding: '1px 4px', borderRadius: 4 }}>font-numeric</code>{' '}
        with <code style={{ background: 'var(--surface-muted)', padding: '1px 4px', borderRadius: 4 }}>font-variant-numeric: tabular-nums</code>{' '}
        for aligned balance figures.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {TYPE_SCALE.map(({ name, size, sample, numeric }) => (
          <div key={name} style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1.5rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-muted)',
          }}>
            <div style={{ minWidth: '7rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)' }}>
                text-{name}
              </span>
              <br />
              <span style={{ fontSize: '0.6875rem', color: 'var(--content-disabled)' }}>{size}</span>
            </div>
            <span style={{
              fontSize: size,
              lineHeight: 1.2,
              color: 'var(--content-primary)',
              fontFamily: numeric ? 'var(--font-numeric)' : undefined,
              fontVariantNumeric: numeric ? 'tabular-nums' : undefined,
              fontFeatureSettings: numeric ? '"tnum" 1' : undefined,
            }}>
              {sample}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── spacing ──────────────────────────────────────────────── */

const SPACING_STEPS = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]

function SpacingSection() {
  return (
    <Section title="Spacing Scale (4px base)">
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)', marginBottom: '1.5rem' }}>
        Tailwind v4 uses a single <code style={{ background: 'var(--surface-muted)', padding: '1px 4px', borderRadius: 4 }}>--spacing: 0.25rem</code> base
        unit multiplied by the scale number (e.g. <code style={{ background: 'var(--surface-muted)', padding: '1px 4px', borderRadius: 4 }}>p-4 = 1rem = 16px</code>).
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {SPACING_STEPS.map((step) => {
          const px = step * 4
          const rem = (step * 0.25).toFixed(2).replace(/\.?0+$/, '')
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '3rem', fontSize: '0.75rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', textAlign: 'right' }}>
                {step}
              </span>
              <div style={{
                height: '1.25rem',
                width: `${px}px`,
                minWidth: '4px',
                background: 'var(--accent-default)',
                borderRadius: '2px',
                opacity: 0.8,
              }} />
              <span style={{ fontSize: '0.6875rem', color: 'var(--content-secondary)' }}>
                {rem}rem / {px}px
              </span>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/* ── border radius ────────────────────────────────────────── */

const RADII = [
  { name: 'none',  value: '0',       label: 'none — 0px' },
  { name: 'xs',    value: '0.125rem',label: 'xs — 2px' },
  { name: 'sm',    value: '0.25rem', label: 'sm — 4px' },
  { name: '(default)', value: '0.5rem', label: '— 8px' },
  { name: 'md',    value: '0.75rem', label: 'md — 12px' },
  { name: 'lg',    value: '1rem',    label: 'lg — 16px' },
  { name: 'xl',    value: '1.25rem', label: 'xl — 20px' },
  { name: '2xl',   value: '1.5rem',  label: '2xl — 24px' },
  { name: 'full',  value: '9999px',  label: 'full — pill' },
]

function RadiusSection() {
  return (
    <Section title="Border Radius">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-end' }}>
        {RADII.map(({ name, value, label }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '3.5rem',
              height: '3.5rem',
              background: 'var(--accent-subtle)',
              border: '2px solid var(--accent-default)',
              borderRadius: value,
            }} />
            <span style={{ fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', textAlign: 'center' }}>
              {name}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--content-disabled)', textAlign: 'center' }}>
              {label.split(' — ')[1]}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── shadows ──────────────────────────────────────────────── */

const SHADOWS = [
  { name: 'xs',    value: '0 1px 2px 0 rgb(0 0 0 / 0.04)',                                               label: 'xs — subtle dividers' },
  { name: 'sm',    value: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.04)',            label: 'sm — input fields' },
  { name: '(default)', value: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.04)',     label: '— cards' },
  { name: 'md',    value: '0 8px 16px -4px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.04)',         label: 'md — floating buttons' },
  { name: 'lg',    value: '0 16px 32px -8px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.04)',        label: 'lg — bottom sheets' },
  { name: 'xl',    value: '0 24px 48px -12px rgb(0 0 0 / 0.14)',                                          label: 'xl — modals' },
  { name: 'inner', value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',                                          label: 'inner — inset inputs' },
]

function ShadowSection() {
  return (
    <Section title="Elevation / Shadows">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-end' }}>
        {SHADOWS.map(({ name, value, label }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '5rem',
              height: '5rem',
              background: 'var(--surface-overlay)',
              borderRadius: '0.75rem',
              boxShadow: value,
              border: '1px solid var(--border-muted)',
            }} />
            <span style={{ fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', textAlign: 'center' }}>
              shadow-{name}
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--content-disabled)', textAlign: 'center', maxWidth: '6rem' }}>
              {label.split(' — ')[1]}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── bucket showcase ──────────────────────────────────────── */

function BucketShowcase() {
  return (
    <Section title="Finance Bucket System">
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)', marginBottom: '1.5rem' }}>
        Three semantic color buckets for the core freelancer finance allocation model.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {([
          { key: 'spendable', label: 'Spendable', icon: '💸', desc: 'Money available to spend today', amount: '$3,240.00' },
          { key: 'tax',       label: 'Tax',       icon: '🧾', desc: 'Reserved for tax obligations',  amount: '$1,480.00' },
          { key: 'buffer',    label: 'Buffer',    icon: '🛡️', desc: 'Emergency fund / safety net',   amount: '$2,000.00' },
        ] as const).map(({ key, label, icon, desc, amount }) => (
          <div key={key} style={{
            flex: '1 1 12rem',
            padding: '1.25rem',
            borderRadius: '1rem',
            background: `var(--${key}-subtle)`,
            border: `1.5px solid var(--${key}-default)`,
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: `var(--${key}-content)`, marginBottom: '0.25rem' }}>
              {label}
            </div>
            <div style={{
              fontSize: '1.875rem',
              fontFamily: 'var(--font-numeric)',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 700,
              color: `var(--${key}-default)`,
              marginBottom: '0.25rem',
            }}>
              {amount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--content-secondary)' }}>{desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── money state showcase ─────────────────────────────────── */

function MoneyStateShowcase() {
  return (
    <Section title="Money State Colors in Context">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {([
          { key: 'success', label: 'Client paid invoice #042', amount: '+$4,800.00', sub: 'Received · Just now' },
          { key: 'warning', label: 'Invoice #039 due soon',    amount:  '$1,200.00', sub: 'Due in 3 days' },
          { key: 'danger',  label: 'Invoice #035 overdue',     amount:  '$950.00',   sub: '12 days overdue' },
        ] as const).map(({ key, label, amount, sub }) => (
          <div key={key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            borderRadius: '0.75rem',
            background: `var(--${key}-subtle)`,
            border: `1px solid var(--${key}-default)`,
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: `var(--${key}-content)` }}>{label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--content-secondary)', marginTop: '0.125rem' }}>{sub}</div>
            </div>
            <div style={{
              fontSize: '1.125rem',
              fontFamily: 'var(--font-numeric)',
              fontVariantNumeric: 'tabular-nums',
              fontWeight: 600,
              color: `var(--${key}-default)`,
            }}>
              {amount}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── root component ───────────────────────────────────────── */

function DesignTokensPage() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '900px',
      margin: '0 auto',
      background: 'var(--surface-base)',
      color: 'var(--content-primary)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--content-primary)' }}>
          Design Token Foundation
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--content-secondary)', maxWidth: '55ch' }}>
          All visual primitives for the Freelancer Finance design system.
          Tokens are CSS custom properties consumed via Tailwind v4 <code style={{ background: 'var(--surface-muted)', padding: '1px 4px', borderRadius: 4 }}>@theme inline</code> —
          toggle your OS dark/light mode to see both themes.
        </p>
      </div>

      <ColorsSection />
      <BucketShowcase />
      <MoneyStateShowcase />
      <TypeSection />
      <SpacingSection />
      <RadiusSection />
      <ShadowSection />
    </div>
  )
}

/* ── story export ─────────────────────────────────────────── */

const meta = {
  title: 'Design System/Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete visual reference for all design tokens in the Freelancer Finance system.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AllTokens: Story = {
  name: 'All Tokens',
  render: () => <DesignTokensPage />,
}
