import { Field } from "formik"
import { FC } from "react"

export const Checkbox: FC<{ name: string; disabled?: boolean; value: any; id?: string }> = ({
  name,
  value,
  disabled,
  id,
}) => {
  return (
    <>
      <Field className="checkbox" disabled={disabled} id={id} type="checkbox" name={name} value={value} />
    </>
  )
}
