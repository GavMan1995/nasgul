import { format } from 'fecha'

export default function safeDateString (value) {
  try {
    return format(new Date(value), 'M/D/YYYY')
  } catch (e) {
    return 'N/A'
  }
}
