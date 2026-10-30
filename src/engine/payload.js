export const TYPES = [
  { id: 'url', label: 'url' },
  { id: 'wifi', label: 'wi-fi' },
  { id: 'vcard', label: 'vcard' },
]

export const emptyContent = {
  url: { url: '' },
  wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
  vcard: { first: '', last: '', org: '', title: '', phone: '', email: '', website: '', address: '' },
}

// Wi-Fi codes need \ ; , : and " escaped with a backslash
function escapeWifi(text) {
  return text.replace(/([\\;,:"])/g, '\\$1')
}

// vCard text needs \ , ; and new lines escaped
function escapeVcard(text) {
  return text.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\r?\n/g, '\\n')
}

function urlPayload({ url }) {
  const text = url.trim()
  if (!text) return ''
  return /^[a-z][a-z0-9+.-]*:/i.test(text) ? text : `https://${text}`
}

function wifiPayload({ ssid, password, security, hidden }) {
  if (!ssid) return ''
  let text = `WIFI:T:${security};S:${escapeWifi(ssid)};`
  if (security !== 'nopass') text += `P:${escapeWifi(password)};`
  if (hidden) text += 'H:true;'
  return text + ';'
}

function vcardPayload(c) {
  const name = [c.first, c.last].filter(Boolean).join(' ')
  if (!name && !c.org && !c.phone && !c.email) return ''

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escapeVcard(c.last)};${escapeVcard(c.first)};;;`,
    `FN:${escapeVcard(name || c.org)}`,
  ]
  if (c.org) lines.push(`ORG:${escapeVcard(c.org)}`)
  if (c.title) lines.push(`TITLE:${escapeVcard(c.title)}`)
  if (c.phone) lines.push(`TEL;TYPE=CELL:${c.phone.trim()}`)
  if (c.email) lines.push(`EMAIL:${c.email.trim()}`)
  if (c.website) lines.push(`URL:${c.website.trim()}`)
  if (c.address) lines.push(`ADR:;;${escapeVcard(c.address)};;;;`)
  lines.push('END:VCARD')
  return lines.join('\r\n')
}

export function buildPayload(type, content) {
  if (type === 'url') return urlPayload(content.url)
  if (type === 'wifi') return wifiPayload(content.wifi)
  if (type === 'vcard') return vcardPayload(content.vcard)
  return ''
}
