import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CreatePlainTenderProcessForm } from '../../types'
import { TenderPublishment } from '@/entities/tender/types'

const PUBLISHMENT_FIELDS = [
  {
    type: TenderPublishment.ECCUBE,
    label: 'common.eccube',
  },
  {
    type: TenderPublishment.TEAM,
    label: 'common.team',
  },
  {
    type: TenderPublishment.INVITATION,
    label: 'common.invitation',
  },
]

type PublishmentItemType = (typeof PUBLISHMENT_FIELDS)[number]

export function TenderPublishmentField() {
  const { t } = useTranslation()

  const form = useFormContext<CreatePlainTenderProcessForm>()
  const {
    watch,
    getValues,
    setValue,
    formState: { isSubmitted },
  } = form

  const onChange = (checked: boolean, pType: TenderPublishment) => {
    const value = getValues('publishment') || []
    setValue('publishment', checked ? [...value, pType] : value.filter((v) => v !== pType))
  }

  return (
    <FormControl required error={isSubmitted && !getValues('publishment')} component="fieldset">
      <FormLabel component="legend" sx={{ pb: 1 }}>
        {t('field.create-tender.publishment')}
      </FormLabel>

      <FormGroup row>
        {PUBLISHMENT_FIELDS.map((item: PublishmentItemType) => (
          <FormControlLabel
            key={item.type}
            control={
              <Checkbox
                size="small"
                checked={(watch('publishment') || []).includes(item.type)}
                onChange={(_e, checked) => onChange(checked, item.type)}
              />
            }
            label={t(item.label)}
            labelPlacement="top"
          />
        ))}
      </FormGroup>
    </FormControl>
  )
}
