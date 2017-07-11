export default function danbScoreColor (score) {
  const { value = 0 } = score

  if (value > 79) {
    return '#00BB7B'
  } else if (value > 65) {
    return '#81eaac'
  } else if (value > 54) {
    return '#FFC709'
  } else if (value > 43) {
    return '#f9a000'
  } else if (value > 4) {
    return '#ED193F'
  } else {
    return '#8A9097'
  }
}
