import { defineConfig } from 'cva'
import { extendTailwindMerge } from 'tailwind-merge'

export const twMerge = extendTailwindMerge({})

export const { cva: makeVariantResolver, cx: cn } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
})

export const makeVariants = <V>(
  config: Parameters<
    typeof makeVariantResolver<
      "cva's generic parameters are restricted to internal use only.",
      V
    >
  >[0],
) => config

export { type VariantProps as IVariantProps } from 'cva'
