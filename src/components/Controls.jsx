export function TextField({ label, value, onChange, ...rest }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} {...rest} />
    </label>
  )
}

export function Range({ label, value, onChange, min = 0, max = 100, step = 1, unit = '' }) {
  return (
    <label className="field">
      <span className="range-label">
        {label}
        <b>{value}{unit}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  )
}

export function ColorField({ label, value, onChange }) {
  return (
    <label className="color-field">
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
      <span>{label}</span>
      <code>{value}</code>
    </label>
  )
}

export function Choice({ label, options, value, onChange, className = '' }) {
  return (
    <div className={`choice ${className}`} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={value === option.id}
          className={value === option.id ? 'on' : ''}
          onClick={() => onChange(option.id)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  )
}
