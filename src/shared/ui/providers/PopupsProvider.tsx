import NiceModal from '@ebay/nice-modal-react'
import { SnackbarProvider } from 'notistack'
import { ReactNode } from 'react'

export function PopupsProvider(props: { children: ReactNode }) {
  const { children } = props

  return (
    <>
      {/* Modals, dialogs, confirmations, drawers */}
      <NiceModal.Provider>{children}</NiceModal.Provider>

      {/* Notifications/Snackbars  */}
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      />
    </>
  )
}
