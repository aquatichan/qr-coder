import { useEffect, useRef, useState } from 'react'

export default function PreviewPanel({ qr, options, hasContent }) {
  const holder = useRef(null)
  const [tooLong, setTooLong] = useState(false)

  useEffect(() => {
    const el = holder.current
    qr.append(el)
    return () => {
      el.innerHTML = ''
    }
  }, [qr])

  useEffect(() => {
    try {
      qr.update(options)
      setTooLong(false)
    } catch {
      setTooLong(true)
    }
  }, [qr, options])

  const message = tooLong ? 'message too long for one QR code' : (!hasContent ? 'fill in the fields to see your qr code' : '')

  return (
    <div className="preview">
      <div ref={holder} className="qr" role="img" aria-label="qr code preview" style={{ opacity: message ? 0 : 1 }} />
      {message && <p className="preview-message">{message}</p>}
    </div>
  )
}
