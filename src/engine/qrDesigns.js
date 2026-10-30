// @liquid-js/qr-code-styling visual options for the QR code, like dot shape and gradient conditionals

export const FRAMES = [
  { id: 'square', label: 'square' },
  { id: 'rounded', label: 'rounded' },
  { id: 'circle', label: 'circle' },
]

export const DOT_STYLES = [
  { id: 'square', eyes: ['square', 'square'] },
  { id: 'rounded', eyes: ['extra-rounded', 'extra-rounded'] },
  { id: 'dot', eyes: ['dot', 'dot'] },
  { id: 'extra-rounded', label: 'x-rounded', eyes: ['extra-rounded', 'dot'] },
  { id: 'classy', eyes: ['classy', 'classy'] },
  { id: 'classy-rounded', label: 'classy soft', eyes: ['classy', 'dot'] },
  { id: 'diamond', eyes: ['extra-rounded', 'diamond'] },
  { id: 'heart', eyes: ['extra-rounded', 'heart'] },
  { id: 'hexagon', eyes: ['extra-rounded', 'hexagon'] },
  { id: 'small-square', label: 'small sq', eyes: ['square', 'square'] },
  { id: 'wave', eyes: ['extra-rounded', 'dot'] },
  { id: 'blobs', eyes: ['extra-rounded', 'dot'] },
  { id: 'soft', eyes: ['extra-rounded', 'extra-rounded'] },
  { id: 'weave', eyes: ['square', 'square'] },
  { id: 'circuit', eyes: ['extra-rounded', 'dot'] },
  { id: 'vertical-line', label: 'v-lines', eyes: ['extra-rounded', 'dot'] },
  { id: 'horizontal-line', label: 'h-lines', eyes: ['extra-rounded', 'dot'] },
]

function toGradient(paint) {
  if (paint.mode !== 'linear') return undefined
  return {
    type: 'linear',
    colorStops: [
      { offset: 0, color: paint.color },
      { offset: 1, color: paint.color2 },
    ],
  }
}

function aimGradient(gradient, angle, size) {
  if (!gradient) return
  const rad = (angle * Math.PI) / 180
  const dx = Math.cos(rad)
  const dy = Math.sin(rad)
  const half = ((Math.abs(dx) + Math.abs(dy)) * size) / 2
  const mid = size / 2
  gradient.setAttribute('x1', mid - dx * half)
  gradient.setAttribute('y1', mid - dy * half)
  gradient.setAttribute('x2', mid + dx * half)
  gradient.setAttribute('y2', mid + dy * half)
}

function closeSeams(svg) {
  const clip = svg.querySelector('#mask-dot-color')
  const inkRect = svg.querySelector('rect[clip-path="url(#mask-dot-color)"]')
  if (!clip || !inkRect) return
  const group = svg.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'g')
  const fill = inkRect.getAttribute('fill')
  group.setAttribute('fill', fill)
  group.setAttribute('stroke', fill)
  group.setAttribute('stroke-width', 0.5)
  while (clip.firstChild) group.appendChild(clip.firstChild)
  clip.remove()
  inkRect.replaceWith(group)
}

function makePlugin(ink, paper) {
  return {
    postProcess(svg, options, colors) {
      aimGradient(colors.dots?.gradient, ink.angle, options.size)
      aimGradient(colors.background?.gradient, paper.angle, options.size)
      closeSeams(svg)
    },
  }
}

export function buildQrOptions({ data, frame, dots, ink, paper }) {
  const style = DOT_STYLES.find((s) => s.id === dots) || DOT_STYLES[0]
  return {
    data,
    shape: frame === 'circle' ? 'circle' : 'square',
    qrOptions: { errorCorrectionLevel: 'Q' },
    dotsOptions: { type: dots, color: ink.color, gradient: toGradient(ink), size: 10 },
    cornersSquareOptions: { type: style.eyes[0] },
    cornersDotOptions: { type: style.eyes[1] },
    backgroundOptions: {
      color: paper.color,
      gradient: toGradient(paper),
      round: frame === 'circle' ? 1 : frame === 'rounded' ? 0.2 : 0,
      margin: frame === 'circle' ? 1 : 3
    },
    plugins: [makePlugin(ink, paper)]
  }
}
