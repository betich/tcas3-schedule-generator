import { Field } from "formik"
import { FC } from "react"

export const Radio: FC<{ name: string; disabled?: boolean; value: any; id?: string }> = ({
  name,
  value,
  disabled,
  id,
}) => {
  return (
    <>
      <Field className="radio" disabled={disabled} id={id} type="radio" name={name} value={value} />
    </>
  )
}
