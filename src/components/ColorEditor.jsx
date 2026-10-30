import { Choice, ColorField, Range } from './Controls.jsx'

const MODES = [
  { id: 'solid', label: 'solid' },
  { id: 'linear', label: 'linear gradient' },
]

export default function ColorEditor({ name, paint, onChange }) {
  const set = (key) => (value) => onChange({ ...paint, [key]: value })

  return (
    <div className="stack">
      <Choice label={`${name} type`} value={paint.mode} onChange={set('mode')} options={MODES} />

      <ColorField label={paint.mode === 'solid' ? name : 'from'} value={paint.color} onChange={set('color')} />

      {paint.mode === 'linear' && (
        <>
          <ColorField label="to" value={paint.color2} onChange={set('color2')} />
          <Range label="angle" value={paint.angle} min={0} max={359} unit="°" onChange={set('angle')} />
        </>
      )}
    </div>
  )
}
