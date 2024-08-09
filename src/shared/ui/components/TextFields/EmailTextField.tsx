import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import { omit } from '@/shared/libs/utils/utilities'

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
    if (validateEmail(inputText)) {
      setEmails([...emails, inputText])
      onAddEmail?.([...emails, inputText])
      setInputText('')
      setError('')
    } else {
      setError('Invalid email address')
    }
  }

  const handleDeleteEmail = (emailToDelete: string) => {
    setEmails(emails.filter((email) => email !== emailToDelete))
  }

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  return (
    <Stack spacing={1}>
      <TextField
        label="Enter email"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        error={!!error}
        helperText={error}
        InputProps={{
          startAdornment: (
            <IconButton onClick={handleAddEmail}>
              <AddIcon />
            </IconButton>
          ),
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
