import { prepareRHFTenderToTenderDtoMapper } from '@/features/tender/plain-tender/api/mapper'
import { tenderModel } from '@/features/tender/plain-tender/model'
import { PlainTenderProcessForm } from '@/features/tender/plain-tender/model/interfaces'
import { PlainTenderForm } from '@/features/tender/plain-tender/ui/PlainTenderForm'
import { ConfirmationDialog } from '@/shared/ui/components/Dialogs/ConfirmationDialog'
import NiceModal from '@ebay/nice-modal-react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export function PlainTenderCreationPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [uploadedFiles, setFiles] = useState<File[]>([])

  const form = useFormContext<PlainTenderProcessForm>()

  const { getValues, handleSubmit } = form

  const onSubmit = async (data: PlainTenderProcessForm) => {
    NiceModal.show(ConfirmationDialog, {
      title: t('modal.tender.confirm-publish-tender.title'),
      content: t('modal.tender.confirm-publish-tender.content'),
      onConfirm: async () => {
        const payload = prepareRHFTenderToTenderDtoMapper({ ...data, uploadedFiles })
        try {
          const res = await tenderModel.createNewTenderFx(payload)
          navigate(`/tender/create/plain/${res.id}/success`)
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
      const res = await tenderModel.createNewTenderDraftFx(payload)
      navigate(`/tender/create/plain/${res.id}/draft`)
    } catch (e) {
      console.error(e)
    }
  }

  const onInvalid = (e: FieldErrors) => {
    console.error(e)
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h3">{t('tender.label.new-tender')}</Typography>

      <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <PlainTenderForm uploadedFiles={uploadedFiles} setFiles={setFiles} />

        {/* TODO: add confirm dialogs */}
        <Stack spacing={2} sx={{ py: 4 }}>
          <Button type="submit">{t('button.create')}</Button>

          <Button type="button" variant="outlined" onClick={onSaveDraft}>
            {t('button.save-as-draft')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
