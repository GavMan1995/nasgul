export default function errorsArray (errors) {
  if (!errors) return []

  if (Array.isArray(errors)) return errors

  return [errors]
}
