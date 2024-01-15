import { createEffect, createEvent, createStore, sample } from 'effector'
import { IOnboardingCompanyData, IOnboardingUserData } from '../types'
import { Nullable } from '../../../shared/types'
import { currentUser } from '../../currentUser/model'
import { updateUserApi } from '../../currentUser/api'

const reset = createEvent()

const sendDataFx = createEffect(async () => {
  const data = {
    ...$user.getState()!,
    ...$company.getState()!,
  }
  const res = await updateUserApi(data)
  return res
})

const $user = createStore<Nullable<IOnboardingUserData>>(null)
const setUserInfo = createEvent<Nullable<IOnboardingUserData>>()

const $company = createStore<Nullable<IOnboardingCompanyData>>(null)
const setCompanyInfo = createEvent<Nullable<IOnboardingCompanyData>>()

$user.on(setUserInfo, (_, payload) => payload).on(reset, () => null)
$company.on(setCompanyInfo, (_, payload) => payload).on(reset, () => null)

const $isLoading = sendDataFx.pending

sample({
  clock: sendDataFx.doneData,
  fn: (data) => data,
  target: currentUser.setInfo,
})

// sample({
//   clock: sendDataFx.doneData,
//   target: reset,
// })

export const onboarding = {
  $user,
  $company,
  setUserInfo,
  setCompanyInfo,
  sendDataFx,
  $isLoading,
}
