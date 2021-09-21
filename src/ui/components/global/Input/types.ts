import { InputHTMLAttributes } from "react"

type Props = {
  label?: string
  labelFor?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'url' | 'number'
  value?: number
  fullWidth?: boolean
  onChange?: (value:string) => void | undefined
  disabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default Props
