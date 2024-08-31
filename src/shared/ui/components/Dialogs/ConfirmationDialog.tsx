import { Z_INDEX } from '@/shared/libs/constants/style'
import NiceModal, { NiceModalHocProps, useModal } from '@ebay/nice-modal-react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export interface IConfirmationDialogProps extends NiceModalHocProps {
  title: string | JSX.Element
  content: string | JSX.Element
  confirmText?: string
  onConfirm?: () => void
  cancelText?: string
  onCancel?: () => void
}

export const ConfirmationDialog: FC<IConfirmationDialogProps> = NiceModal.create(
  ({ title, content, onConfirm, onCancel, confirmText, cancelText }) => {
    const { t } = useTranslation()

    const dialog = useModal()

    const handleConfirm = () => {
      onConfirm?.()
      dialog.remove()
    }

    const handleCancel = () => {
      onCancel?.()
      dialog.remove()
    }

    return (
      <Dialog
        open={dialog.visible}
        onClose={onCancel}
        PaperProps={{ sx: { zIndex: Z_INDEX.Dialog } }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined">
            {confirmText || t('button.continue')}
          </Button>
          <Button onClick={handleConfirm} variant="contained">
            {cancelText || t('button.cancel')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)
