import { useState } from 'react'
import { exportQr } from '../engine/exportFile.js'
import { Range } from './Controls.jsx'
import Icon from './Icons.jsx'

const FORMATS = ['png', 'svg', 'jpg']

export default function ExportPanel({ qr, size, onSizeChange, name, disabled }) {
  const [message, setMessage] = useState('')

  async function save(format) {
    try {
      await exportQr(qr, format, size, name)
      setMessage(`saved ${name}.${format}`)
    } catch (error) {
      console.error(error)
      setMessage(`could not save ${format}`)
    }
  }

  return (
    <div className="stack">
      <Range label="size" value={size} min={256} max={4096} step={64} unit="px" onChange={onSizeChange} />
      <div className="export-buttons">
        {FORMATS.map((format) => (
          <button key={format} type="button" disabled={disabled} onClick={() => save(format)}>
            <Icon name={format} />
            {format}
          </button>
        ))}
      </div>
    </div>
  )
}
