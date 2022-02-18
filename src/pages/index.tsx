import { Schedule } from "@components/schedule"
import { IScheduleData, TSubjectId } from "@types"
import type { NextPage } from "next"
import { useState, Fragment, useEffect } from "react"
import { MyAccordion } from "@components/common/Accordion"
import { Field, Form, Formik } from "formik"
import { useWindowDimensions } from "@utils/useWindowDimensions"
import { LG, MD, SM } from "@utils/breakpoints"
import { Checkbox } from "@components/common/Checkbox"
import { GatPatSubjectIds, MedSubjectIds, SubjectNames } from "@utils/subjects"
import { SaveIcon } from "@heroicons/react/outline"
import { Ellipsis } from "@components/common/Ellipsis"
import { useLocalStorage } from "@utils/useLocalStorage"
import { Radio } from "@components/common/Radio"
const InApp = require("detect-inapp")

const scheduleWidth = (width: number) => {
  if (width > LG) {
    return 650
  } else if (width > MD) {
    return 475
  } else {
    return 350
  }
}

const checkDisabled = (subject: TSubjectId, currSubjects: TSubjectId[]) => {
  // 49 & 99 => true
  // 99 & 49 => true
  if (["GEN49", "GEN99"].includes(subject)) {
    const unselected = "GEN49" === subject ? "GEN99" : "GEN49"
    return currSubjects.includes(unselected)
  } else if (["GEN39", "GEN89"].includes(subject)) {
    const unselected = "GEN39" === subject ? "GEN89" : "GEN39"
    return currSubjects.includes(unselected)
  }
}

const Home: NextPage = () => {
  const { width } = useWindowDimensions()
  const [waiting, setWaiting] = useState(false)
  const [subjects, setSubject] = useLocalStorage<TSubjectId[]>("subjects", ["GAT", "PAT1", "PAT3"])
  const [theme, setTheme] = useLocalStorage<"none" | "balls" | "study">("theme", "study")
  const [font, setFont] = useLocalStorage<"normal" | "large">("font", "large")
  const [mode, setMode] = useLocalStorage<"light" | "dark">("mode", "light")

  const intitalFormValues: IScheduleData = {
    subjects: subjects,
    theme: theme,
    font: font,
    mode: mode,
  }

  return (
    <Formik
      initialValues={intitalFormValues}
      onSubmit={async (values) => {
        if (waiting) return

        // window.localStorage.setItem("subjects", JSON.stringify(values.subjects))
        setSubject(values.subjects)
        setTheme(values.theme)
        setFont(values.font)
        setMode(values.mode)

        let r = (Math.random() + 1).toString(36).substring(10)

        const imgUrl = `/api/capture?&r=${r}&data=${encodeURI(JSON.stringify(values))}`

        setWaiting(true)

        const res = await fetch(imgUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })

        if (res.ok) {
          const inapp = new InApp(navigator.userAgent || navigator.vendor)
          if (inapp.browser === "line" || inapp.browser === "messenger" || inapp.browser === "facebook") {
            const a = document.createElement("a")
            a.href = imgUrl
            a.download = `tcas-schedule.jpg`
            document.body.appendChild(a)
            a.click()
            a.remove()
          } else {
            const a = document.createElement("a")
            a.href = window.URL.createObjectURL(await res.blob())
            a.download = `tcas-schedule.jpg`
            document.body.appendChild(a)
            a.click()
            a.remove()
          }
        }

        setWaiting(false)
      }}
    >
      {({ values }) => (
        <Form>
          <main className="relative flex min-h-screen flex-col bg-[#15151C] font-display text-white md:flex-row">
            <header className="order-last flex flex-col px-12 pt-[300px] pb-12 md:order-first md:h-screen md:w-[550px] md:overflow-y-auto md:pt-12">
              <h1 className="text-xl leading-relaxed">
                ระบบสร้างตารางสอบ
                <br />
                TCAS รอบ 3{" "}
                <a
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/hashtag/dek65"
                >
                  #DEK65
                </a>
              </h1>
              <p className="mt-6 mb-4 text-xs font-light">* ข้อมูล ณ วันที่ 14 กุมภาพันธ์ 2565</p>
              <div className="mt-4 flex flex-col space-y-4">
                <MyAccordion header="GAT / PAT" id="GATPAT" defaultExpanded>
                  <fieldset className="relative flex flex-col text-sm" role="group" aria-labelledby="GATPAT">
                    {GatPatSubjectIds.map((subject) => {
                      return (
                        <Fragment key={subject}>
                          <Checkbox id={subject} name="subjects" value={subject} />
                          <label htmlFor={subject}>{SubjectNames[subject]}</label>
                        </Fragment>
                      )
                    })}
                  </fieldset>
                </MyAccordion>

                <MyAccordion header="วิชาสามัญ / กสพท." id="MED" defaultExpanded>
                  <fieldset className="relative flex flex-col text-sm" role="group" aria-labelledby="MED">
                    {MedSubjectIds.map((subject) => {
                      return (
                        <Fragment key={subject}>
                          <Checkbox
                            disabled={checkDisabled(subject, values.subjects)}
                            id={subject}
                            name="subjects"
                            value={subject}
                          />
                          <label htmlFor={subject}>{SubjectNames[subject]}</label>
                        </Fragment>
                      )
                    })}
                  </fieldset>
                </MyAccordion>

                <MyAccordion header="การตกแต่ง" id="Custom" defaultExpanded>
                  <fieldset className="relative mb-4 flex flex-col text-sm" role="group" aria-labelledby="theme">
                    <>
                      <legend className="mb-6" id="theme">
                        Background
                      </legend>
                      <Radio id="none" name="theme" value="none" />
                      <label htmlFor="none">ไม่มี Background</label>
                      <Radio id="balls" name="theme" value="balls" />
                      <label htmlFor="balls">Balls </label>
                      <Radio id="study" name="theme" value="study" />
                      <label htmlFor="study">School & Study</label>
                    </>
                  </fieldset>
                  <fieldset className="relative mb-4 flex flex-col text-sm" role="group" aria-labelledby="font">
                    <>
                      <legend className="mb-6" id="font">
                        ขนาด Font
                      </legend>
                      <Radio id="normal" name="font" value="normal" />
                      <label htmlFor="normal">ปกติ (สามารถตั้งเป็น portrait mode ได้ใน iPad)</label>
                      <Radio id="large" name="font" value="large" />
                      <label htmlFor="large">ใหญ่</label>
                    </>
                  </fieldset>
                  <fieldset className="relative mb-4 flex flex-col text-sm" role="group" aria-labelledby="mode">
                    <>
                      <legend className="mb-6" id="mode">
                        สีกระดาษ
                      </legend>
                      <Radio id="light" name="mode" value="light" />
                      <label htmlFor="light">Light Mode</label>
                      <Radio id="dark" name="mode" value="dark" />
                      <label htmlFor="dark">Dark Mode</label>
                    </>
                  </fieldset>
                </MyAccordion>
              </div>
            </header>
            <section className="fixed order-first flex w-full items-center justify-center bg-gray-100 py-4 shadow-sm md:relative md:order-last md:py-0">
              <Schedule
                className="rounded-md border border-gray-100 shadow-md transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-lg"
                width={scheduleWidth(width)}
                data={{
                  subjects: values.subjects,
                  theme: values.theme,
                  font: values.font,
                  mode: values.mode,
                }}
              />
              <button
                type="submit"
                className="fixed right-4 top-4 z-50 flex space-x-2 rounded-full bg-[#7774ff] px-6 py-2 transition-transform hover:scale-105"
              >
                <SaveIcon className="h-5 w-5" />
                <span>{waiting ? <Ellipsis className="w-5" /> : "บันทึกรูป"}</span>
              </button>
            </section>
          </main>
        </Form>
      )}
    </Formik>
  )
}

export default Home
