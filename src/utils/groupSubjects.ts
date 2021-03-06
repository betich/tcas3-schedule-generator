import { TSubjectId, TSubjectObj } from "@types"
import { dateSort } from "./sortTime"
import { SubjectMap } from "./subjects"

/*
{
	[date]: [
		{title: "eee"}
	]
]
*/

export const groupSubjects = (subjects: TSubjectId[]) => {
  const mappedSubjects: Record<string, TSubjectObj[]> = subjects
    .map((s) => SubjectMap[s])
    .sort(dateSort)
    .reduce((prev: any, curr) => {
      const newObj = { ...prev }

      if (prev.hasOwnProperty(curr.date)) {
        newObj[curr.date].push(curr)
      } else {
        newObj[curr.date] = [curr]
      }

      return newObj
    }, {})

  return mappedSubjects
}
