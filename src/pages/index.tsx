import { Schedule } from "@components/schedule"
import { IScheduleData, TSubjectId } from "@types"
import type { NextPage } from "next"
import { useState, Fragment, useEffect, useRef } from "react"
import { MyAccordion } from "@components/common/Accordion"
import { Field, Form, Formik, FormikValues, useFormik, useFormikContext } from "formik"
import { useWindowDimensions } from "@utils/useWindowDimensions"
import { LG, MD, SM, XL } from "@utils/breakpoints"
import { Checkbox } from "@components/common/Checkbox"
import { GatPatSubjectIds, MedSubjectIds, SubjectNames } from "@utils/subjects"
import { SaveIcon } from "@heroicons/react/outline"
import { Ellipsis } from "@components/common/Ellipsis"
import { useLocalStorage } from "@utils/useLocalStorage"
import { Radio } from "@components/common/Radio"
import { AltPresetButton, PresetButton } from "@components/common/PresetButton"
import { fullUniName, unis } from "@utils/unis"
const InApp = require("detect-inapp")

const scheduleWidth = (width: number) => {
  if (width > XL) {
    return (width * 3) / 4 - 400
  } else if (width > LG) {
    return 650
  } else if (width > MD) {
    return 475
  } else {
    return 350
  }
}

const Home: NextPage = () => {
  const { width } = useWindowDimensions()
  const [waiting, setWaiting] = useState(false)
  const [subjects, setSubject] = useLocalStorage<TSubjectId[]>("subjects", [
    "GEN69",
    "GEN49",
    "GEN09",
    "GEN19",
    "GEN39",
    "GEN29",
    "GEN59",
    "MED1",
    "MED2",
    "MED3",
  ])
  // const [theme, setTheme] = useLocalStorage<"none" | "balls" | "study">("theme", "study")
  // const [font, setFont] = useLocalStorage<"normal" | "large">("font", "large")
  // const [mode, setMode] = useLocalStorage<"light" | "dark">("mode", "light")

  const intitalFormValues: IScheduleData = {
    subjects: subjects,
    theme: "study",
    font: "large",
    mode: "light",
  }

  // const intitalFormValues: IScheduleData = {
  //   subjects: subjects,
  //   theme: theme,
  //   font: font,
  //   mode: mode,
  // }

  const onSubmit = async (values: FormikValues) => {
    if (waiting) return

    // window.localStorage.setItem("subjects", JSON.stringify(values.subjects))
    // setSubject(values.subjects)
    // setTheme(values.theme)
    // setFont(values.font)
    // setMode(values.mode)

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
      // @ts-ignore
      window.gtag("event", "generate_schedule", {
        event_category: "generate_schedule",
        event_label: `subjects: ${values.subjects.join(", ")}`,
        subjects: values.subjects.join(", "),
        theme: values.theme,
        mode: values.mode,
        font: values.font,
      })
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
  }

  return (
    <Formik initialValues={intitalFormValues} onSubmit={onSubmit}>
      {function useRender({ values, setFieldValue }) {
        useEffect(() => {
          setFieldValue("subjects", subjects)
        }, [subjects])

        useEffect(() => {
          if (values.mode === "uni" && !unis.includes(values.theme)) {
            setFieldValue("theme", "CU")
          } else if (values.mode !== "uni" && unis.includes(values.theme)) {
            setFieldValue("theme", "study")
          }
        }, [values.mode])

        return (
          <Form>
            <main className="relative flex min-h-screen flex-col bg-[#15151C] font-display text-white md:flex-row">
              <header className="order-last flex flex-col px-12 pt-[300px] pb-16 md:order-first md:h-screen md:w-[550px] md:overflow-y-auto md:pt-12">
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
                  <MyAccordion header="การตกแต่ง" id="Custom">
                    <fieldset className="relative mb-4 flex flex-col text-sm" role="group" aria-labelledby="mode">
                      <>
                        <legend className="mb-6" id="mode">
                          สีกระดาษ
                        </legend>
                        <Radio id="light" name="mode" value="light" />
                        <label htmlFor="light">Light Mode</label>
                        <Radio id="dark" name="mode" value="dark" />
                        <label htmlFor="dark">Dark Mode</label>
                        <Radio id="uni" name="mode" value="uni" />
                        <label htmlFor="uni">
                          ยันต์สอบติด (Cr.{" "}
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://www.facebook.com/TCASterApp/posts/2801627623473431"
                            className="underline hover:no-underline"
                          >
                            TCASter
                          </a>
                          )
                        </label>
                      </>
                    </fieldset>
                    <fieldset className="relative flex flex-col text-sm" role="group" aria-labelledby="theme">
                      <>
                        <legend className="mb-6" id="theme">
                          Background
                        </legend>
                        {values.mode !== "uni" && (
                          <>
                            <Radio id="none" name="theme" value="none" />
                            <label htmlFor="none">ไม่มี Background</label>
                            <Radio id="bubbles" name="theme" value="balls" />
                            <label htmlFor="bubbles">Bubbles 🧼</label>
                            <Radio id="study" name="theme" value="study" />
                            <label htmlFor="study">School & Study 📚</label>
                          </>
                        )}
                        {values.mode === "uni" && (
                          <>
                            {Object.entries(fullUniName).map(([uniId, uniName]) => {
                              return (
                                <Fragment key={uniId}>
                                  <Radio id={uniId} name="theme" value={uniId} />
                                  <label htmlFor={uniId}>{uniName}</label>
                                </Fragment>
                              )
                            })}
                          </>
                        )}
                      </>
                    </fieldset>
                    <fieldset className="relative mb-4 flex flex-col text-sm" role="group" aria-labelledby="font">
                      <>
                        <legend className="mb-6" id="font">
                          ขนาด Font
                        </legend>
                        <Radio id="normal" name="font" value="normal" />
                        <label htmlFor="normal">ปกติ (สำหรับตั้งเป็นวอลเปเปอร์ของ iPad)</label>
                        <Radio id="large" name="font" value="large" />
                        <label htmlFor="large">ใหญ่</label>
                      </>
                    </fieldset>
                  </MyAccordion>

                  {/* <MyAccordion header="Presets" id="presets" defaultExpanded>
                    <fieldset
                      className="relative flex flex-wrap text-sm md:flex-row"
                      role="group"
                      aria-labelledby="presets"
                    >
                      <PresetButton
                        subjects={values.subjects}
                        activates={[
                          "GEN69",
                          "GEN49",
                          "GEN09",
                          "GEN19",
                          "GEN39",
                          "GEN29",
                          "GEN59",
                          "MED1",
                          "MED2",
                          "MED3",
                        ]}
                      >
                        แพทย์
                      </PresetButton>
                      <PresetButton subjects={values.subjects} activates={["GAT", "PAT1", "PAT3"]}>
                        วิศวะฯ
                      </PresetButton>
                    </fieldset>
                  </MyAccordion> */}

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
                      <AltPresetButton
                        subjects={values.subjects}
                        activates={[
                          "GEN69",
                          "GEN49",
                          "GEN09",
                          "GEN19",
                          "GEN39",
                          "GEN29",
                          "GEN59",
                          "MED1",
                          "MED2",
                          "MED3",
                        ]}
                      >
                        เลือกวิชาแพทย์ทั้งหมด
                      </AltPresetButton>
                      {MedSubjectIds.map((subject) => {
                        return (
                          <Fragment key={subject}>
                            <Checkbox
                              // disabled={checkDisabled(subject, values.subjects)}
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
                  className="fixed right-4 top-4 z-50 flex space-x-2 rounded-full bg-[#4f4ce6] px-6 py-2 transition-transform hover:scale-105"
                >
                  <SaveIcon className="h-5 w-5" />
                  <span>{waiting ? <Ellipsis className="w-5" /> : "บันทึกรูป"}</span>
                </button>
                <a
                  href="https://github.com/betich/tcas3-schedule-generator"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    // @ts-ignore
                    window.gtag("event", "github_click", {
                      event_category: "github_click",
                      event_label: "github_click",
                      subjects: values.subjects.join(", "),
                      theme: values.theme,
                      mode: values.mode,
                      font: values.font,
                    })
                  }}
                  className="absolute left-8 top-6 z-[99] flex items-center space-x-2 text-sm text-gray-400 underline hover:no-underline md:left-[unset] md:top-[unset] md:right-8 md:bottom-4"
                >
                  <span>View on GitHub</span>
                  <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                    ></path>
                  </svg>
                </a>
              </section>
            </main>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Home
