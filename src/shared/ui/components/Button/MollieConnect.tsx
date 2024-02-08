import Button from '@mui/material/Button'
import { startMollieOAuth2Api } from '../../../../entities/mollie/api'

export function MollieConnect() {
  const onClick = async () => {
    try {
      const data = await startMollieOAuth2Api()()
      const { authorizationUri } = data || {}
      window.location.assign(authorizationUri)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <Button fullWidth={false} variant="contained" onClick={onClick}>
      Mollie Connect
    </Button>
  )
}
