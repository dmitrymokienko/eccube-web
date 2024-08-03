import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CreatePlainTenderProcessForm, TenderPublishment } from '../../types'

// TODO: refactor (const + map array( renderItem ))
// TODO: i18n
export function TenderPublishmentField() {
  const { t } = useTranslation()

  const form = useFormContext<CreatePlainTenderProcessForm>()

  const { watch, getValues, setValue, formState } = form

  const onChange = (checked: boolean, pType: TenderPublishment) => {
    const value = getValues('publishment') || []
    setValue('publishment', checked ? [...value, pType] : value.filter((v) => v !== pType))
  }

  return (
    <Box sx={{ pt: 2 }}>
      <FormControl required error={!!formState.errors?.publishment} component="fieldset">
        <FormLabel component="legend"> {t('field.create-tender.publishment')}</FormLabel>

        <FormGroup row sx={{ justifyContent: 'space-between' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={(watch('publishment') || []).includes(TenderPublishment.ECCUBE)}
                onChange={(e, checked) => onChange(checked, TenderPublishment.ECCUBE)}
              />
            }
            label={t('common.eccube')}
            labelPlacement="top"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={(watch('publishment') || []).includes(TenderPublishment.TEAM)}
                onChange={(e, checked) => onChange(checked, TenderPublishment.TEAM)}
              />
            }
            label={t('common.team')}
            labelPlacement="top"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={(watch('publishment') || []).includes(TenderPublishment.INVITATION)}
                onChange={(e, checked) => onChange(checked, TenderPublishment.INVITATION)}
              />
            }
            label={t('common.invitation')}
            labelPlacement="top"
          />
        </FormGroup>
      </FormControl>
    </Box>
  )
}
