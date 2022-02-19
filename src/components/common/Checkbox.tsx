import { IScheduleData, TSubjectId } from "@types"
import { Field, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"

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

  return false
}

export const Checkbox: FC<{ name: string; value: any; id?: string }> = ({ name, value, id }) => {
  const formikProps = useFormikContext<IScheduleData>()
  const currSubjects = formikProps.values.subjects
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    setDisabled(checkDisabled(value, currSubjects))
  }, [value, currSubjects])

  return (
    <>
      <Field className="checkbox" disabled={disabled} id={id} type="checkbox" name={name} value={value} />
    </>
  )
}
