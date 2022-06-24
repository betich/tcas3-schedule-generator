import { IScheduleData, TSubjectId } from "@types"
import { Field, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"

const LanguageSubjects: TSubjectId[] = ["AL_FRENCH", "AL_GERMAN", "AL_JAPANESE", "AL_KOREAN", "AL_CHINESE", "AL_BALIAN"]

const checkDisabled = (currSubject: TSubjectId, selectedSubjects: TSubjectId[]) => {
  if (LanguageSubjects.includes(currSubject) && !selectedSubjects.includes(currSubject)) {
    return LanguageSubjects.some((e) => selectedSubjects.includes(e))
  }

  return false
}

export const Checkbox: FC<{ name: string; value: any; id?: string }> = ({ name, value, id }) => {
  const formikProps = useFormikContext<IScheduleData>()
  const currSubjects = formikProps.values.subjects

  return (
    <>
      <Field
        className="checkbox"
        disabled={checkDisabled(value, currSubjects)}
        id={id}
        type="checkbox"
        name={name}
        value={value}
      />
    </>
  )
}
