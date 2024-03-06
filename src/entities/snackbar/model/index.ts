import { createEffect } from 'effector'
import { enqueueSnackbar, SnackbarMessage, OptionsObject } from 'notistack'

const showFx = (v: {
  message: SnackbarMessage
  options?: OptionsObject<'default' | 'error' | 'success' | 'warning' | 'info'> | undefined
}) =>
  createEffect(() => {
    const { message, options } = v
    enqueueSnackbar(message, options)
  })

export const snackbar = {
  showFx,
}
