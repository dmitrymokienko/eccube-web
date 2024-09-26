import { prepareRHFTenderToTenderDtoMapper } from '@/features/tender/plain-tender/api/mapper'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { PlainTenderProcessForm } from '@/features/tender/plain-tender/model/interfaces'
import { PlainTenderForm } from '@/features/tender/plain-tender/ui/PlainTenderForm'
import { ConfirmationDialog } from '@/shared/ui/components/Dialogs/ConfirmationDialog'
import NiceModal from '@ebay/nice-modal-react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

export function PlainTenderEditionPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { id } = useParams() as { id: string }

  const tender = useUnit(tenderModel.$currentTender)

  const [uploadedFiles, setFiles] = useState<File[]>(
    // @ts-expect-error TODO: fix this
    (tender?.uploadedFiles || []).map((v) => ({ ...v, name: v.filename }))
  )

  const form = useFormContext<PlainTenderProcessForm>()
  const { getValues, handleSubmit } = form

  const onSubmit = async (data: PlainTenderProcessForm) => {
    NiceModal.show(ConfirmationDialog, {
      title: t('modal.tender.confirm-publish-tender.title'),
      content: t('modal.tender.confirm-publish-tender.content'),
      onConfirm: async () => {
        const payload = prepareRHFTenderToTenderDtoMapper({ ...data, uploadedFiles })
        try {
          await tenderModel.updateByIdFx({ ...payload, id: id })
          await tenderModel.withdrawalFromDraftFx(id)
          navigate(`/tender/edit/plain/${id}/success`)
        } catch (e) {
          console.error(e)
        }
      },
    })
  }

  const onSaveDraft = async () => {
    const data = getValues()
    const payload = prepareRHFTenderToTenderDtoMapper({ ...data, uploadedFiles })
    try {
      await tenderModel.updateByIdFx({ ...payload, id })
      navigate(`/tender/edit/plain/${id}/draft`)
    } catch (e) {
      console.error(e)
    }
  }

  const onInvalid = (e: FieldErrors) => {
    console.error(e)
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{t('tender.label.edit-tender')}</Typography>

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <PlainTenderForm uploadedFiles={uploadedFiles} setFiles={setFiles} />

        <Stack spacing={2} sx={{ py: 4 }}>
          <Button type="submit">{t('button.publish')}</Button>

          <Button type="button" variant="outlined" onClick={onSaveDraft}>
            {t('button.update')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
