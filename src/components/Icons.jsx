import { Link, Wifi, UserRoundPlus, Image, VectorPolygon } from 'lucide-react'

const shapes = {
    url: <Link />,
    wifi: <Wifi />,
    vcard: <UserRoundPlus />,
    png: <Image />,
    svg: <VectorPolygon />,
    jpg: <Image />
}

export default function Icon({ name }) {
  return (
    <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name]}
    </svg>
  )
}
