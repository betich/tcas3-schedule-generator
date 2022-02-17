export function dateSortFunc(a: string, b: string) {
  const [_m1, _d1] = a.split("/")
  const [_m2, _d2] = b.split("/")

  const [m1, m2, d1, d2] = [+_m1, +_m2, +_d1, +_d2]

  if (m1 !== m2) {
    return m1 - m2
  } else {
    return d1 - d2
  }
}

export function sortDates(dates: string[]) {
  return dates.sort(dateSortFunc)
}

export function timeSortFunc(a: string, b: string) {
  const [_m1, _s1] = a.split(".")
  const [_m2, _s2] = b.split(".")

  const [m1, m2, s1, s2] = [+_m1, +_m2, +_s1, +_s2]

  const totalSeconds1 = m1 * 60 + s1
  const totalSeconds2 = m2 * 60 + s2

  return totalSeconds1 - totalSeconds2
}

export function sortTimes(times: string[]) {
  return times.sort(timeSortFunc)
}
