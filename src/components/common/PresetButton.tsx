import { IScheduleData, TSubjectId } from "@types"
import classNames from "classnames"
import { useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"

export const PresetButton: FC<{
  activates: TSubjectId[]
  subjects: TSubjectId[]
}> = ({ activates, children }) => {
  const formikProps = useFormikContext<IScheduleData>()
  const subjects = formikProps.values.subjects
  const [highlighted, setHighlight] = useState(false)

  useEffect(() => {
    setHighlight(activates.length === subjects.length && subjects.every((s) => activates.some((a) => a === s)))
  }, [subjects, activates])

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          formikProps.setFieldValue("subjects", activates)
        }}
        className={classNames(
          highlighted ? "bg-[#7774FF] text-white" : "bg-white text-black",
          "mb-2 mr-2 rounded-full px-8 py-2"
        )}
      >
        {children}
      </button>
    </>
  )
}

export const AltPresetButton: FC<{
  activates: TSubjectId[]
  subjects: TSubjectId[]
}> = ({ activates, children }) => {
  const formikProps = useFormikContext<IScheduleData>()
  const subjects = formikProps.values.subjects
  const [highlighted, setHighlight] = useState(false)

  useEffect(() => {
    setHighlight(activates.length === subjects.length && subjects.every((s) => activates.some((a) => a === s)))
  }, [subjects, activates])

  return (
    <div
      className="mb-6"
      id="selectall"
      onClick={(e) => {
        e.preventDefault()
        if (!highlighted) {
          formikProps.setFieldValue("subjects", activates)
        } else {
          formikProps.setFieldValue("subjects", [])
        }
      }}
    >
      <input type="checkbox" checked={highlighted} className={classNames("checkbox mb-4 mr-2")}></input>
      <label htmlFor="selectall">{children}</label>
    </div>
  )
}
