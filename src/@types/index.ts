export type TSubjectId =
  | "TGAT"
  | "TPAT1"
  | "TPAT2"
  | "TPAT3"
  | "TPAT4"
  | "TPAT5"
  | "AL_BIO"
  | "AL_PHY"
  | "AL_SCI"
  | "AL_THAI"
  | "AL_SOC"
  | "AL_MATH1"
  | "AL_MATH2"
  | "AL_ENG"
  | "AL_CHEM"
  | "AL_FRENCH"
  | "AL_GERMAN"
  | "AL_JAPANESE"
  | "AL_KOREAN"
  | "AL_CHINESE"
  | "AL_BALIAN"

export type TSubjectObj = {
  date: string
  from: string
  to: string
  text: string
}

export type TUnis =
  | "BUU"
  | "CMU"
  | "CU"
  | "KKU"
  | "KMITL"
  | "KMUTNB"
  | "KMUTT"
  | "KU"
  | "MFU"
  | "MU"
  | "NU"
  | "PSU"
  | "SU"
  | "SWU"
  | "TU"

export interface IScheduleData {
  subjects: TSubjectId[]
  font: "normal" | "large"
  theme: "none" | "balls" | "study" | TUnis
  mode: "light" | "dark" | "uni"
}

export type TGroupedSubjects = Record<string, TSubjectObj[]>
