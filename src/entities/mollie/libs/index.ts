import { startMollieOAuth2Api } from '../api'

export async function startMollieAuthProcess() {
  try {
    const data = await startMollieOAuth2Api()()
    const { authorizationUri } = data || {}
    if (!authorizationUri) {
      throw new Error('No authorizationUri')
    }
    window.location.assign(authorizationUri)
  } catch (e) {
    console.log(e)
  }
}
