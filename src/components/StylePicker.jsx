import { useEffect, useState } from 'react'
import { QRCodeStyling } from '@liquid-js/qr-code-styling'
import { DOT_STYLES, FRAMES } from '../engine/qrDesigns.js'
import { Choice } from './Controls.jsx'

async function makeThumbnail(style) {
  const qr = new QRCodeStyling({
    data: 'qr coder',
    dotsOptions: { type: style.id, color: '#ffffff', size: 10 },
    cornersSquareOptions: { type: style.eyes[0] },
    cornersDotOptions: { type: style.eyes[1] },
    backgroundOptions: false,
  })
  const svg = await qr.serialize()
  const full = Number(svg.match(/viewBox="0 0 (\d+)/)[1])
  const start = full / 2 - 45
  const zoomed = svg.replace(/viewBox="[^"]*"/, `viewBox="${start} ${start} 90 90"`)
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(zoomed)
}

export default function StylePicker({ frame, onFrameChange, dots, onDotsChange }) {
  const [thumbnails, setThumbnails] = useState({})

  useEffect(() => {
    let cancelled = false
    Promise.all(DOT_STYLES.map(async (s) => [s.id, await makeThumbnail(s)])).then((pairs) => {
      if (!cancelled) setThumbnails(Object.fromEntries(pairs))
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="stack">
      <Choice label="outline" value={frame} onChange={onFrameChange} options={FRAMES} />

      <div className="tiles" role="radiogroup" aria-label="module style">
        {DOT_STYLES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={dots === s.id}
            className={`tile ${dots === s.id ? 'on' : ''}`}
            onClick={() => onDotsChange(s.id)}
          >
            {thumbnails[s.id] ? <img src={thumbnails[s.id]} alt="" /> : <span className="tile-empty" />}
            <span>{s.label || s.id}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
