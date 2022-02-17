import { TSubjectId, TSubjectObj } from "@types"
import { dateSortFunc, timeSortFunc } from "./sortTime"
import { SubjectMap } from "./subjects"

/*
{
	[date]: [
		eifjei
	]
]
*/

// group subjects by date
export const groupSubjects = (subjects: TSubjectId[]) => {
  const mappedSubjects: Record<string, TSubjectObj[]> = subjects
    .map((s) => SubjectMap[s])
    .sort((a, b) => {
      return dateSortFunc(a.date, b.date)
    })
    .reduce((prev: any, curr) => {
      const newObj = { ...prev }

      if (prev.hasOwnProperty(curr.date)) {
        newObj[curr.date].push(curr)
      } else {
        newObj[curr.date] = [curr]
      }

      return newObj
    }, {})

  Object.keys(mappedSubjects).forEach((e) => {
    mappedSubjects[e] = mappedSubjects[e].sort((a, b) => {
      return timeSortFunc(a.from, b.from)
    })
  })

  return mappedSubjects
}
