import { InputHTMLAttributes } from "react"

type Props = {
  label?: string
  labelFor?: string
  value?: string | ReadonlyArray<string> | number
  onChange?: (status:boolean) => void
  isChecked?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default Props
