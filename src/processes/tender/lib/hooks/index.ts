import { EditorState } from 'draft-js'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export function useTenderSchema() {
  const { t } = useTranslation()

  return z.object({
    title: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(120, { message: t('validation.maxLength', { max: 120 }) }),

    shortDescription: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(300, { message: t('validation.maxLength', { max: 300 }) }),

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

    startPeriod: z.date().refine((value) => value !== null, { message: t('validation.required') }),

    endPeriod: z.date().refine((value) => value !== null, { message: t('validation.required') }),

    street: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(200, { message: t('validation.maxLength', { max: 200 }) }),

    addressSuffix: z
      .string()
      .max(200, { message: t('validation.maxLength', { max: 200 }) })
      .optional(),

    postalCode: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(5, { message: t('validation.maxLength', { max: 5 }) }),

    city: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(200, { message: t('validation.maxLength', { max: 200 }) }),

    country: z
      .string()
      .min(1, { message: t('validation.required') })
      .max(200, { message: t('validation.maxLength', { max: 200 }) }),

    publishment: z.array(z.string()).min(1, { message: t('validation.required') }),

    invitedSuppliers: z.array(z.string()).optional(),

    paymentTerm: z.string().optional(),

    price: z
      .object({
        amount: z
          .number()
          .refine((value) => value !== undefined, { message: t('validation.required') }),
        currency: z
          .string()
          .refine((value) => value !== undefined, { message: t('validation.required') }),
      })
      .optional(),

    jobTypes: z.array(z.string()).optional(),
  })
}
