export default function experianScoreColor (score) {
  const { value = 0 } = score

  if (value > 76) {
    return '#00BB7B'
  } else if (value > 51) {
    return '#78dd6f'
  } else if (value > 26) {
    return '#FFC709'
  } else if (value > 11) {
    return '#f9a000'
  } else if (value > 0) {
    return '#ED193F'
  } else {
    return '#8A9097'
  }
}
