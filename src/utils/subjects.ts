import { TSubjectId, TSubjectObj } from "@types"

export const MedSubjects: TSubjectId[] = [
  "TPAT1",
  "AL_PHY",
  "AL_CHEM",
  "AL_BIO",
  "AL_MATH1",
  "AL_ENG",
  "AL_THAI",
  "AL_SOC",
]

export const GatPatSubjectIds: TSubjectId[] = ["TGAT", "TPAT1", "TPAT2", "TPAT3", "TPAT4", "TPAT5"]
export const ALevelSubjectIDs: TSubjectId[] = [
  "AL_BIO",
  "AL_PHY",
  "AL_SCI",
  "AL_THAI",
  "AL_SOC",
  "AL_MATH1",
  "AL_MATH2",
  "AL_ENG",
  "AL_CHEM",
  "AL_FRENCH",
  "AL_GERMAN",
  "AL_JAPANESE",
  "AL_KOREAN",
  "AL_CHINESE",
  "AL_BALIAN",
]

export const SubjectNames: Record<TSubjectId, string> = {
  TGAT: "TGAT ความถนัดทั่วไป",
  TPAT1: "TPAT 1 วิชาเฉพาะ กสพท.",
  TPAT2: "TPAT 2 ความถนัดทางศิลปกรรมศาสตร์",
  TPAT3: "TPAT 3 ความถนัดทางวิทยาศาสตร์ เทคโนโลยี วิศวกรรมศาสตร์",
  TPAT4: "TPAT 4 ความถนัดทางสถาปัตยกรรมศาสตร์",
  TPAT5: "TPAT 5 ความถนัดทางครุศาสตร์-ศึกษาศาสตร์",
  AL_BIO: "66 ชีววิทยา",
  AL_PHY: "64 ฟิสิกส์",
  AL_THAI: "81 ภาษาไทย",
  AL_SOC: "70 สังคมศึกษา",
  AL_MATH1: "61 คณิตศาสตร์ประยุกต์ 1 (พื้ันฐาน + เพิ่มเติม)",
  AL_ENG: "82 ภาษาอังกฤษ",
  AL_CHEM: "65 เคมี",
  AL_MATH2: "62 คณิตศาสตร์ประยุกต์ 2 (พื้นฐาน)",
  AL_SCI: "63 วิทยาศาสตร์ประยุกต์",
  AL_FRENCH: "83 ภาษาฝรั่งเศส",
  AL_GERMAN: "84 ภาษาเยอรมัน",
  AL_JAPANESE: "85 ภาษาญี่ปุ่น",
  AL_KOREAN: "86 ภาษาเกาหลี",
  AL_CHINESE: "87 ภาษาจีน",
  AL_BALIAN: "88 ภาษาบาลี",
}

export const SubjectMap: Record<TSubjectId, TSubjectObj> = {
  /* TGAT/TPAT */
  TGAT: { date: "10/12/2022", from: "09.00", to: "12.00", text: SubjectNames["TGAT"] },
  TPAT3: { date: "10/12/2022", from: "13.00", to: "16.00", text: SubjectNames["TPAT3"] },
  TPAT5: { date: "11/12/2022", from: "09.00", to: "12.00", text: SubjectNames["TPAT5"] },
  TPAT2: { date: "11/12/2022", from: "13.00", to: "16.00", text: SubjectNames["TPAT2"] },
  TPAT4: { date: "12/12/2022", from: "09.00", to: "12.00", text: SubjectNames["TPAT4"] },
  TPAT1: { date: "17/12/2022", from: "08.30", to: "12.30", text: SubjectNames["TPAT1"] },
  /* A Level */
  AL_BIO: { date: "18/03/2023", from: "08.30", to: "10.00", text: SubjectNames["AL_BIO"] },
  AL_PHY: { date: "18/03/2023", from: "11.00", to: "12.30", text: SubjectNames["AL_PHY"] },
  AL_THAI: { date: "18/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_THAI"] },
  AL_SOC: { date: "18/03/2023", from: "15.30", to: "17.00", text: SubjectNames["AL_SOC"] },
  /* - 2nd day */
  AL_MATH1: { date: "19/03/2023", from: "08.30", to: "10.00", text: SubjectNames["AL_MATH1"] },
  AL_ENG: { date: "19/03/2023", from: "11.00", to: "12.30", text: SubjectNames["AL_ENG"] },
  AL_CHEM: { date: "19/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_CHEM"] },
  /* - 3rd day */
  AL_MATH2: { date: "20/03/2023", from: "08.30", to: "10.00", text: SubjectNames["AL_MATH2"] },
  AL_SCI: { date: "20/03/2023", from: "11.00", to: "12.30", text: SubjectNames["AL_SCI"] },
  /* Same */
  AL_FRENCH: { date: "20/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_FRENCH"] },
  AL_GERMAN: { date: "20/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_GERMAN"] },
  AL_JAPANESE: { date: "20/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_JAPANESE"] },
  AL_KOREAN: { date: "20/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_KOREAN"] },
  AL_CHINESE: { date: "20/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_CHINESE"] },
  AL_BALIAN: { date: "20/03/2023", from: "13.30", to: "15.00", text: SubjectNames["AL_BALIAN"] },
}
