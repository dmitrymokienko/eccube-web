import { EditorState } from 'draft-js'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useTenderSchema() {
  const { t } = useTranslation()

  return z.object({
    title: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(120, { message: t('validation.maxLength', { n: 120 }) }),

    shortDescription: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(300, { message: t('validation.maxLength', { n: 300 }) }),

    workDescription: z
      .any()
      .refine((value) => value instanceof EditorState, {
        message: t('validation.required'),
      })
      .refine(
        (value) => {
          const emptyEditorState = EditorState.createEmpty()
          if (!value) {
            return false
          }
          return value.getCurrentContent().hasText() && value !== emptyEditorState
        },
        {
          message: t('validation.required'),
        }
      ),

    startPeriod: z.date({
      required_error: t('validation.required'),
      invalid_type_error: t('validation.date'),
    }),

    endPeriod: z.date({
      required_error: t('validation.required'),
      invalid_type_error: t('validation.date'),
    }),

    street: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(200, { message: t('validation.maxLength', { n: 200 }) }),

    addressSuffix: z.string().max(200, { message: t('validation.maxLength', { n: 200 }) }),

    postalCode: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(4, { message: t('validation.maxLength', { n: 4 }) }),

    city: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(200, { message: t('validation.maxLength', { n: 200 }) }),

    // country: z
    //   .string()
    //   .min(1, { message: t('validation.required') })
    //   .max(200, { message: t('validation.maxLength', { n: 200 }) }),

    publishment: z.array(z.string()).min(1, { message: t('validation.required') }),

    invitedSuppliers: z.array(z.string()).optional(),

    paymentTerm: z.string().optional(),

    amount: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(10, { message: t('validation.maxLength', { n: 10 }) })
      .optional(),

    currency: z
      .string()
      .refine((value) => value !== undefined, { message: t('validation.required') }),

    pricePer: z
      .string()
      .refine((value) => value !== undefined, { message: t('validation.required') }),

    priceType: z
      .string()
      .refine((value) => value !== undefined, { message: t('validation.required') }),

    jobTypes: z.array(z.string()).optional(),
  })
}
