import Button, { ButtonProps } from '@mui/material/Button'
import WestIcon from '@mui/icons-material/West'

export function PrevPageButton(props: ButtonProps) {
  const { onClick, children = 'Go back' } = props
  return (
    <Button fullWidth={false} variant="text" startIcon={<WestIcon />} onClick={onClick}>
      {children}
    </Button>
  )
}
