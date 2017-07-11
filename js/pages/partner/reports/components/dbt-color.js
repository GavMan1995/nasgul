export default function dbtColor (dbt) {
  if (dbt > 80) {
    return '#ED193F'
  } else if (dbt > 60) {
    return '#f9a000'
  } else if (dbt > 40) {
    return '#FFC709'
  } else if (dbt > 20) {
    return '#81eaac'
  } else if (dbt >= 0) {
    return '#00BB7B'
  } else {
    return '#8A9097'
  }
}
