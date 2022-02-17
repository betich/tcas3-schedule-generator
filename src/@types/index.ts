export type TSubjectId =
  | "GAT"
  | "PAT1"
  | "PAT2"
  | "PAT3"
  | "PAT4"
  | "PAT5"
  | "PAT6"
  | "PAT7"
  | "GEN69"
  | "GEN49"
  | "GEN99"
  | "GEN09"
  | "GEN19"
  | "GEN39"
  | "GEN89"
  | "GEN29"
  | "GEN59"
  | "MED1"
  | "MED2"
  | "MED3"

export type TSubjectObj = {
  date: string
  from: string
  to: string
  text: string
}

export type TGroupedSubjects = Record<string, TSubjectObj[]>
