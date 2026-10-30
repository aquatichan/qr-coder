import { useMemo, useState } from 'react'
import { QRCodeStyling } from '@liquid-js/qr-code-styling'
import { buildPayload, emptyContent } from './engine/payload.js'
import { buildQrOptions } from './engine/qrDesigns.js'
import Galaxy from './components/reactbits/Galaxy.jsx'
import GlowCursor from './components/reactbits/GlowCursor.jsx'
import SectionHolder from './components/SectionHolder.jsx'
import TypeEditor from './components/TypeEditor.jsx'
import ColorEditor from './components/ColorEditor.jsx'
import StylePicker from './components/StylePicker.jsx'
import PreviewPanel from './components/PreviewPanel.jsx'
import ExportPanel from './components/ExportPanel.jsx'

// starting colors (change them with the color pickers)
const startInk = { mode: 'solid', color: '#000000', color2: '#ffffff', angle: 0 }
const startPaper = { mode: 'solid', color: '#ffffff', color2: '#000000', angle: 0 }

export default function App() {

  const [qr] = useState(() => new QRCodeStyling())
  const [type, setType] = useState('url')
  const [content, setContent] = useState(emptyContent)
  const [frame, setFrame] = useState('rounded')
  const [dots, setDots] = useState('rounded')
  const [ink, setInk] = useState(startInk)
  const [paper, setPaper] = useState(startPaper)
  const [size, setSize] = useState(1024)

  function setField(format, key, value) {
    setContent((old) => ({ ...old, [format]: { ...old[format], [key]: value } }))
  }

  const payload = buildPayload(type, content)
  const options = useMemo(
    () => buildQrOptions({ data: payload, frame, dots, ink, paper }),
    [payload, frame, dots, ink, paper],
  )

  return (
    <>
      <Galaxy className="backdrop" clickWarp={false} />
      <GlowCursor className="glow-overlay" />
      <div className="studio">
        <div className="column">
          <h1>QR Coder</h1>
          <SectionHolder title="content">
            <TypeEditor type={type} onTypeChange={setType} content={content} onFieldChange={setField} />
          </SectionHolder>
          <SectionHolder title="ink">
            <ColorEditor name="ink color" paint={ink} onChange={setInk} />
          </SectionHolder>
          <SectionHolder title="background">
            <ColorEditor name="bg color" paint={paper} onChange={setPaper} />
          </SectionHolder>
        </div>

        <main className="stage">
          <PreviewPanel qr={qr} options={options} hasContent={!!payload} />
        </main>

        <div className="column">
          <SectionHolder title="shape">
            <StylePicker frame={frame} onFrameChange={setFrame} dots={dots} onDotsChange={setDots} />
          </SectionHolder>
          <div className="export-slot">
            <SectionHolder title="export">
              <ExportPanel qr={qr} size={size} onSizeChange={setSize} name={`qr-${type}`} disabled={!payload} />
            </SectionHolder>
          </div>
        </div>
      </div>
    </>
  )
}
