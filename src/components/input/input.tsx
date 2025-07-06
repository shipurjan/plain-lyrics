import { InputHTMLAttributes, RefObject } from 'react'
import { variantsInput } from './variants'
import { IVariantProps, makeVariantResolver } from '@/lib/utils/cva'

const variants = makeVariantResolver(variantsInput)

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    IVariantProps<typeof variants> {
  ref?: RefObject<HTMLInputElement>
}

export const Input = ({ ref, className, children, ...props }: InputProps) => (
  <input {...props} ref={ref} className={variants({ className })} {...props}>
    {children}
  </input>
)

Input.displayName = 'Input'
