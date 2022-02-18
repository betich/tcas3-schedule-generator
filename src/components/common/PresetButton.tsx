import { TSubjectId } from "@types"
import classNames from "classnames"
import { useFormikContext } from "formik"
import { FC } from "react"

export const PresetButton: FC<{
  activates: TSubjectId[]
  subjects: TSubjectId[]
}> = ({ activates, subjects, children }) => {
  const formikProps = useFormikContext()

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          formikProps.setFieldValue("subjects", activates)
        }}
        className={classNames(
          activates.length === subjects.length && subjects.every((s) => activates.some((a) => a === s))
            ? "bg-[#7774FF] text-white"
            : "bg-white text-black",
          "mb-2 mr-2 rounded-full px-8 py-2"
        )}
      >
        {children}
      </button>
    </>
  )
}
