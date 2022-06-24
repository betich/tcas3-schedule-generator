import { TSubjectObj } from "@types"

export function dateSort(a: TSubjectObj, b: TSubjectObj) {
  const [_d1, _m1, _y1] = a.date.split("/")
  const [_d2, _m2, _y2] = b.date.split("/")

  const [_hr1, _min1] = a.from.split(".")
  const [_hr2, _min2] = b.from.split(".")

  const compareDate1 = new Date(+_y1, +_m1 - 1, +_d1, 0, +_hr1, +_min1, 0)
  const compareDate2 = new Date(+_y2, +_m2 - 1, +_d2, 0, +_hr2, +_min2, 0)

  return +compareDate1 - +compareDate2
}
