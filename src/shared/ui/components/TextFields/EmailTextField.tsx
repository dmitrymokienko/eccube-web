import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import { omit } from '@/shared/libs/utils/utilities'
import { z } from 'zod'

const emailSchema = z.string().email({ message: 'Invalid email address' })

export type IEmailTextFieldProps = Partial<TextFieldProps> & {
  emails?: string[]
  onAddEmail?: (emails: string[]) => void
}

export function EmailTextField(props: IEmailTextFieldProps) {
  const { onAddEmail } = props

  const [emails, setEmails] = useState<string[]>(props.emails || [])
  const [inputText, setInputText] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleAddEmail = () => {
    try {
      emailSchema.parse(inputText)
      setEmails([...emails, inputText])
      onAddEmail?.([...emails, inputText])
      setInputText('')
      setError('')
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message)
      }
    }
  }

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails(emails.filter((email) => email !== emailToDelete))
  }

  return (
    <Stack spacing={1}>
      <TextField
        label="Enter email"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        error={!!error}
        helperText={error}
        slotProps={{
          input: {
            startAdornment: (
              <IconButton onClick={handleAddEmail}>
                <AddIcon />
              </IconButton>
            ),
          },
        }}
        {...omit(['emails', 'error', 'helperText', 'value', 'onChange'], props)}
      />

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {emails.map((email) => (
          <Chip
            key={email}
            label={email}
            onDelete={() => handleDeleteEmail(email)}
            deleteIcon={<DeleteOutlineIcon />}
            sx={{ '&&': { margin: '4px' } }}
          />
        ))}
      </Stack>
    </Stack>
  )
}
