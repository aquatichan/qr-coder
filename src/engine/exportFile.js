import { browserUtils } from '@liquid-js/qr-code-styling' // for drawToCanvas

function saveBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

async function drawCanvas(qr, size, under) {
  const { canvas, canvasDrawingPromise } = browserUtils.drawToCanvas(qr, { width: size, height: size, margin: 0 })
  await canvasDrawingPromise
  if (!under) return canvas

  const flat = document.createElement('canvas')
  flat.width = size
  flat.height = size
  const ctx = flat.getContext('2d')
  ctx.fillStyle = under
  ctx.fillRect(0, 0, size, size)
  ctx.drawImage(canvas, 0, 0)
  return flat
}

const toBlob = (canvas, type, quality) => new Promise((resolve) => canvas.toBlob(resolve, type, quality))

export async function exportQr(qr, format, size, name) {
  if (format === 'svg') {
    const svg = await qr.serialize()
    saveBlob(new Blob([svg], { type: 'image/svg+xml' }), `${name}.svg`)
  } else if (format === 'png') { {/* The transparent format */}
    saveBlob(await toBlob(await drawCanvas(qr, size), 'image/png'), `${name}.png`)
  } else if (format === 'jpg') { {/* The non-transparent format */}
    saveBlob(await toBlob(await drawCanvas(qr, size, '#ffffff'), 'image/jpeg', 1), `${name}.jpg`)
  }
}
