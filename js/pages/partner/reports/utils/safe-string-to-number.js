export default function safeStringToNumber (str) {
  const num = Number(str)
  if (isNaN(num)) return 0

  return num
}
