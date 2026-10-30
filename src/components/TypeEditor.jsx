import { TYPES } from '../engine/payload.js'
import { Choice, TextField } from './Controls.jsx'
import Icon from './Icons.jsx'

const SECURITY = [
  { id: 'WPA', label: 'wpa' },
  { id: 'WEP', label: 'wep' },
  { id: 'nopass', label: 'open' },
]

// Pick what the QR code holds, then fill in its fields
export default function TypeEditor({ type, onTypeChange, content, onFieldChange }) {
  const fields = content[type]
  const set = (key) => (value) => onFieldChange(type, key, value)

  return (
    <div className="stack">
      <Choice
        label="content type"
        value={type}
        onChange={onTypeChange}
        options={TYPES.map((t) => ({ ...t, icon: <Icon name={t.id} /> }))}
      />

      {type === 'url' && (
        <TextField label="link" value={fields.url} onChange={set('url')} type="url" inputMode="url"
          placeholder="https://" autoCapitalize="off" spellCheck="false" />
      )}

      {type === 'wifi' && (
        <>
          <TextField label="wi-fi name" value={fields.ssid} onChange={set('ssid')} autoCapitalize="off" spellCheck="false" />
          <Choice label="security" value={fields.security} onChange={set('security')} options={SECURITY} />
          {fields.security !== 'nopass' && (
            <TextField label="password" value={fields.password} onChange={set('password')} autoCapitalize="off" spellCheck="false" />
          )}
          <label className="check">
            <input type="checkbox" checked={fields.hidden} onChange={(e) => set('hidden')(e.target.checked)} />
            hidden network
          </label>
        </>
      )}

      {type === 'vcard' && (
        <div className="two-columns">
          <TextField label="first name" value={fields.first} onChange={set('first')} autoComplete="given-name" />
          <TextField label="last name" value={fields.last} onChange={set('last')} autoComplete="family-name" />
          <TextField label="phone" value={fields.phone} onChange={set('phone')} type="tel" autoComplete="tel" />
          <TextField label="email" value={fields.email} onChange={set('email')} type="email" autoComplete="email" />
          <TextField label="company" value={fields.org} onChange={set('org')} />
          <TextField label="job title" value={fields.title} onChange={set('title')} />
          <TextField label="website" value={fields.website} onChange={set('website')} type="url" />
          <TextField label="address" value={fields.address} onChange={set('address')} />
        </div>
      )}
    </div>
  )
}
