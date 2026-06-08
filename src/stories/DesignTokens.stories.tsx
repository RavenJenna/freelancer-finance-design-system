import type { Meta, StoryObj } from '@storybook/nextjs-vite'

/**
 * Design Token Foundation — v2
 *
 * Browsable reference for every design token.
 * Color swatches read live CSS custom properties so the page
 * automatically reflects light ↔ dark mode switching.
 */

/* ── helpers ──────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1.25rem',
        paddingBottom: '0.5rem',
        borderBottom: '1px solid var(--border-default)',
        color: 'var(--content-primary)',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: '0.6875rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--content-tertiary)',
      marginBottom: '0.75rem',
    }}>
      {children}
    </p>
  )
}

/* ── color swatch ─────────────────────────────────────────────── */

interface SwatchProps {
  varName: string   // e.g. "--accent"
  label:   string
  mono?:   boolean  // show monospace var name
}

function Swatch({ varName, label, mono }: SwatchProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', width: '5.5rem' }}>
      <div style={{
        height: '2.75rem',
        borderRadius: '0.5rem',
        background: `var(${varName})`,
        border: '1px solid rgb(0 0 0 / 0.07)',
        boxShadow: '0 1px 2px rgb(0 0 0 / 0.04)',
      }} />
      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--content-primary)', lineHeight: 1.2 }}>
        {label}
      </span>
      {mono && (
        <span style={{ fontSize: '0.6rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', lineHeight: 1.3 }}>
          {varName}
        </span>
      )}
    </div>
  )
}

function SwatchRow({ swatches }: { swatches: SwatchProps[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
      {swatches.map(s => <Swatch key={s.varName} {...s} />)}
    </div>
  )
}

/* ── color sections ───────────────────────────────────────────── */

function ColorsSection() {
  return (
    <Section title="Color Tokens">
      <Label>Brand — Violet Accent</Label>
      <SwatchRow swatches={[
        { varName: '--accent',        label: 'Accent',        mono: true },
        { varName: '--accent-hover',  label: 'Accent Hover',  mono: true },
        { varName: '--accent-subtle', label: 'Accent Subtle', mono: true },
      ]} />

      <Label>Surfaces</Label>
      <SwatchRow swatches={[
        { varName: '--surface-app',    label: 'App',    mono: true },
        { varName: '--surface-base',   label: 'Base',   mono: true },
        { varName: '--surface-raised', label: 'Raised', mono: true },
        { varName: '--surface-hover',  label: 'Hover',  mono: true },
      ]} />

      <Label>Content</Label>
      <SwatchRow swatches={[
        { varName: '--content-primary',   label: 'Primary',    mono: true },
        { varName: '--content-secondary', label: 'Secondary',  mono: true },
        { varName: '--content-tertiary',  label: 'Tertiary',   mono: true },
        { varName: '--content-disabled',  label: 'Disabled',   mono: true },
        { varName: '--content-on-accent', label: 'On Accent',  mono: true },
      ]} />

      <Label>Borders</Label>
      <SwatchRow swatches={[
        { varName: '--border-default', label: 'Default', mono: true },
        { varName: '--border-strong',  label: 'Strong',  mono: true },
      ]} />

      <Label>Money States</Label>
      <SwatchRow swatches={[
        { varName: '--positive',       label: 'Positive',  mono: true },
        { varName: '--negative',       label: 'Negative',  mono: true },
        { varName: '--negative-hover', label: 'Neg. Hover',mono: true },
        { varName: '--warning',        label: 'Warning',   mono: true },
      ]} />

      <Label>Finance Buckets</Label>
      <SwatchRow swatches={[
        { varName: '--bucket-spendable', label: 'Spendable', mono: true },
        { varName: '--bucket-buffer',    label: 'Buffer',    mono: true },
        { varName: '--bucket-tax',       label: 'Tax',       mono: true },
      ]} />
    </Section>
  )
}

/* ── bucket cards ─────────────────────────────────────────────── */

const buckets = [
  { key: 'spendable', label: 'Spendable', icon: '💸', amount: '$3,240.00', desc: 'Available to spend today' },
  { key: 'buffer',    label: 'Buffer',    icon: '🛡️', amount: '$2,000.00', desc: 'Emergency fund / safety net' },
  { key: 'tax',       label: 'Tax',       icon: '🧾', amount: '$1,480.00', desc: 'Reserved for tax obligations' },
] as const

function BucketCards() {
  return (
    <Section title="Finance Buckets in Context">
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {buckets.map(b => (
          <div key={b.key} style={{
            flex: '1 1 13rem',
            padding: '1.25rem',
            borderRadius: '1rem',
            background: 'var(--surface-raised)',
            border: '1.5px solid var(--border-default)',
            boxShadow: '0 4px 12px rgb(0 0 0 / 0.05)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: `var(--bucket-${b.key})`,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--content-secondary)' }}>
                {b.label}
              </span>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: '"tnum" 1',
              fontSize: '1.75rem',
              fontWeight: 700,
              color: `var(--bucket-${b.key})`,
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}>
              {b.amount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--content-tertiary)' }}>{b.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── money state rows ─────────────────────────────────────────── */

const moneyStates = [
  { key: 'positive', label: 'Client paid Invoice #042',  amount: '+$4,800.00', sub: 'Received · just now',  prefix: '+' },
  { key: 'warning',  label: 'Invoice #039 due soon',     amount:  '$1,200.00', sub: 'Due in 3 days',        prefix: '' },
  { key: 'negative', label: 'Invoice #035 overdue',      amount:  '$950.00',   sub: '12 days overdue',      prefix: '' },
] as const

function MoneyStates() {
  return (
    <Section title="Money State Colors in Context">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', maxWidth: 480 }}>
        {moneyStates.map(s => (
          <div key={s.key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.875rem 1.125rem',
            borderRadius: '0.75rem',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
          }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--content-primary)' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--content-secondary)', marginTop: '0.125rem' }}>{s.sub}</div>
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: '"tnum" 1',
              fontSize: '1rem',
              fontWeight: 600,
              color: `var(--${s.key})`,
            }}>
              {s.prefix}{s.amount}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── type scale ───────────────────────────────────────────────── */

const TYPE_SCALE = [
  { name: '2xs',         size: '0.625rem', sample: 'Terms & conditions fine print',         display: false },
  { name: 'xs',          size: '0.75rem',  sample: 'Labels, metadata, timestamps',           display: false },
  { name: 'sm',          size: '0.875rem', sample: 'Secondary body, captions',              display: false },
  { name: 'base',        size: '1rem',     sample: 'Primary body text and descriptions',    display: false },
  { name: 'lg',          size: '1.125rem', sample: 'Emphasized body, section headings',     display: false },
  { name: 'xl',          size: '1.25rem',  sample: 'Card titles and subheadings',           display: false },
  { name: '2xl',         size: '1.5rem',   sample: 'Screen headings',                       display: false },
  { name: '3xl',         size: '1.875rem', sample: 'Page-level headings',                   display: false },
  { name: '4xl',         size: '2.25rem',  sample: 'Hero headings',                         display: false },
  { name: 'display',     size: '3rem',     sample: '$12,480.00',                            display: true  },
  { name: 'display-xl',  size: '4rem',     sample: '$48,200',                               display: true  },
  { name: 'display-2xl', size: '5rem',     sample: '$128k',                                 display: true  },
]

function TypeSection() {
  return (
    <Section title="Type Scale">
      <p style={{ fontSize: '0.875rem', color: 'var(--content-secondary)', marginBottom: '1.5rem', maxWidth: '55ch' }}>
        Body text uses <strong>Inter</strong> (<code style={codeStyle}>--font-sans</code>).{' '}
        Display sizes use <strong>Space Grotesk</strong> (<code style={codeStyle}>--font-display</code>)
        with <code style={codeStyle}>font-variant-numeric: tabular-nums</code> for aligned balance figures.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {TYPE_SCALE.map(({ name, size, sample, display }) => (
          <div key={name} style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '1.25rem',
            padding: '0.625rem 1rem',
            borderRadius: '0.5rem',
            background: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
          }}>
            <div style={{ minWidth: '7rem', flexShrink: 0 }}>
              <span style={{ fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)' }}>
                text-{name}
              </span>
              <br />
              <span style={{ fontSize: '0.625rem', color: 'var(--content-disabled)' }}>{size}</span>
            </div>
            <span style={{
              fontSize: size,
              lineHeight: display ? 1 : undefined,
              color: 'var(--content-primary)',
              fontFamily: display ? 'var(--font-display)' : undefined,
              fontVariantNumeric: display ? 'tabular-nums' : undefined,
              fontFeatureSettings: display ? '"tnum" 1' : undefined,
              fontWeight: display ? 700 : undefined,
            }}>
              {sample}
            </span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── spacing ──────────────────────────────────────────────────── */

function SpacingSection() {
  const steps = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24]
  return (
    <Section title="Spacing Scale (4px base — --spacing: 0.25rem)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {steps.map(step => {
          const px = step * 4
          const rem = (step * 0.25).toFixed(2).replace(/\.?0+$/, '')
          return (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ width: '2.5rem', fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', textAlign: 'right', flexShrink: 0 }}>
                {step}
              </span>
              <div style={{
                height: '1.125rem',
                width: `${px}px`,
                minWidth: 4,
                background: 'var(--accent)',
                borderRadius: 2,
                opacity: 0.75,
              }} />
              <span style={{ fontSize: '0.625rem', color: 'var(--content-secondary)' }}>
                {rem}rem · {px}px
              </span>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/* ── radii ────────────────────────────────────────────────────── */

const RADII = [
  { name: 'xs',      value: '0.125rem', px: '2px'  },
  { name: 'sm',      value: '0.25rem',  px: '4px'  },
  { name: '(base)',  value: '0.5rem',   px: '8px'  },
  { name: 'md',      value: '0.75rem',  px: '12px' },
  { name: 'lg',      value: '1rem',     px: '16px' },
  { name: 'xl',      value: '1.25rem',  px: '20px' },
  { name: '2xl',     value: '1.5rem',   px: '24px' },
  { name: 'full',    value: '9999px',   px: 'pill' },
]

function RadiusSection() {
  return (
    <Section title="Border Radius">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'flex-end' }}>
        {RADII.map(({ name, value, px }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '3.25rem', height: '3.25rem',
              background: 'var(--accent-subtle)',
              border: '2px solid var(--accent)',
              borderRadius: value,
            }} />
            <span style={{ fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', textAlign: 'center' }}>
              {name}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--content-disabled)', textAlign: 'center' }}>{px}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── shadows ──────────────────────────────────────────────────── */

const SHADOWS: { name: string; value: string; label: string }[] = [
  { name: 'xs',    value: '0 1px 2px 0 rgb(0 0 0/0.04)',                                              label: 'dividers' },
  { name: 'sm',    value: '0 1px 3px 0 rgb(0 0 0/0.08),0 1px 2px -1px rgb(0 0 0/0.04)',              label: 'inputs' },
  { name: '(def)', value: '0 4px 6px -1px rgb(0 0 0/0.07),0 2px 4px -2px rgb(0 0 0/0.04)',           label: 'cards' },
  { name: 'md',    value: '0 8px 16px -4px rgb(0 0 0/0.08),0 4px 6px -4px rgb(0 0 0/0.04)',          label: 'FABs' },
  { name: 'lg',    value: '0 16px 32px -8px rgb(0 0 0/0.10),0 8px 10px -6px rgb(0 0 0/0.04)',        label: 'sheets' },
  { name: 'xl',    value: '0 24px 48px -12px rgb(0 0 0/0.14)',                                        label: 'modals' },
  { name: 'inner', value: 'inset 0 2px 4px 0 rgb(0 0 0/0.05)',                                        label: 'inset' },
]

function ShadowSection() {
  return (
    <Section title="Elevation / Shadows">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end' }}>
        {SHADOWS.map(({ name, value, label }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{
              width: '4.5rem', height: '4.5rem',
              background: 'var(--surface-raised)',
              borderRadius: '0.75rem',
              boxShadow: value,
              border: '1px solid var(--border-default)',
            }} />
            <span style={{ fontSize: '0.6875rem', fontFamily: 'ui-monospace, monospace', color: 'var(--content-tertiary)', textAlign: 'center' }}>
              shadow-{name}
            </span>
            <span style={{ fontSize: '0.625rem', color: 'var(--content-disabled)', textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ── shared inline styles ─────────────────────────────────────── */

const codeStyle: React.CSSProperties = {
  fontFamily: 'ui-monospace, monospace',
  fontSize: '0.8125em',
  background: 'var(--surface-hover)',
  padding: '1px 5px',
  borderRadius: 4,
  color: 'var(--accent)',
}

/* ── root page ────────────────────────────────────────────────── */

function DesignTokensPage() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: 900,
      margin: '0 auto',
      background: 'var(--surface-app)',
      color: 'var(--content-primary)',
      fontFamily: 'var(--font-sans)',
      minHeight: '100vh',
    }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--content-primary)',
          marginBottom: '0.5rem',
        }}>
          Design Token Foundation
        </h1>
        <p style={{ fontSize: '0.9375rem', color: 'var(--content-secondary)', maxWidth: '55ch', lineHeight: 1.6 }}>
          v2 palette — violet accent, Inter + Space Grotesk, semantic money states.
          Toggle OS dark/light mode to see both themes live.
        </p>
      </div>

      <ColorsSection />
      <BucketCards />
      <MoneyStates />
      <TypeSection />
      <SpacingSection />
      <RadiusSection />
      <ShadowSection />
    </div>
  )
}

/* ── story export ─────────────────────────────────────────────── */

const meta = {
  title: 'Design System/Tokens',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete visual reference for all v2 design tokens.',
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
