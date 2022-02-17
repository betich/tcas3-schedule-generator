import { Schedule } from "@components/schedule"
import { TSubjectId } from "@types"
import type { NextPage } from "next"
import { useState, Fragment } from "react"
import { MyAccordion } from "@components/common/Accordion"
import { Field, Form, Formik } from "formik"
import { useWindowDimensions } from "@utils/useWindowDimensions"
import { LG, MD, SM } from "@utils/breakpoints"
import { Checkbox } from "@components/common/Checkbox"
import { GatPatSubjectIds, MedSubjectIds, SubjectNames } from "@utils/subjects"
import { SaveIcon } from "@heroicons/react/outline"
import { Ellipsis } from "@components/common/Ellipsis"
const InApp = require("detect-inapp")

const scheduleWidth = (width: number) => {
  if (width > LG) {
    return 650
  } else if (width > MD) {
    return 450
  } else {
    return 550
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

interface IInitialFormValues {
  subjects: TSubjectId[]
}

const intitalFormValues: IInitialFormValues = {
  subjects: ["GAT", "PAT1", "PAT3"],
}

const Home: NextPage = () => {
  const { width } = useWindowDimensions()
  const [waiting, setWaiting] = useState(false)

  return (
    <Formik
      initialValues={intitalFormValues}
      onSubmit={async (values) => {
        if (waiting) return

        // window.localStorage.setItem("room", room)

        const imgUrl = `/api/capture?data=${JSON.stringify(values.subjects)}`

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
        <main className="relative flex min-h-screen flex-col bg-[#15151C] font-display text-white md:flex-row">
          <header className="order-last flex flex-col p-12 md:order-first md:h-screen md:w-[550px] md:overflow-y-auto">
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
              <Form>
                <MyAccordion header="GAT / PAT" id="GATPAT" defaultExpanded>
                  <fieldset className="relative flex flex-col space-y-2" role="group" aria-labelledby="GATPAT">
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
                  <fieldset className="relative flex flex-col space-y-2" role="group" aria-labelledby="MED">
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

                <button
                  type="submit"
                  className="absolute right-4 top-4 flex space-x-2 rounded-full bg-[#7774ff] px-6 py-2 transition-transform hover:scale-105"
                >
                  <SaveIcon className="h-5 w-5" />
                  <span>{waiting ? <Ellipsis className="w-5" /> : "บันทึกรูป"}</span>
                </button>
              </Form>
            </div>
          </header>
          <div className="order-first flex w-full items-center justify-center bg-gray-100 shadow-sm md:order-last">
            <Schedule
              className="rounded-md border border-gray-100 shadow-md transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-lg"
              width={scheduleWidth(width)}
              data={{
                subjects: values.subjects,
              }}
            />
          </div>
        </main>
      )}
    </Formik>
  )
}

export default Home
