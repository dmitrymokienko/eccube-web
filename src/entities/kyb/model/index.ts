import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { IKybCompanyData, IKybData } from '../types'
import { Nullable } from '../../../shared/types/utilities'
import { currentUser } from '../../currentUser/model'
import { createOrganizationApi, updateUserApi } from '../../currentUser/api'
import {
  checkMollieOnBoardingStatusApi,
  createMollieProfileApi,
  fetchMollieOAuth2AccessTokenApi,
  sendKybPassedApi,
} from '../../mollie/api'
import { IMollieOnboardingStatus } from '@/entities/mollie/types'

const reset = createEvent()

const updateUserFx = createEffect(async () => {
  const data = $user.getState()!
  return await updateUserApi(data)
})

const $user = createStore<Nullable<IKybData>>(null)
const setUserInfo = createEvent<Nullable<IKybData>>()

const $company = createStore<Nullable<IKybCompanyData>>(null)
const setCompanyInfo = createEvent<Nullable<IKybCompanyData>>()

$user.on(setUserInfo, (_, payload) => payload).on(reset, () => null)
$company
  .on(setCompanyInfo, (state, payload) => ({ ...(state as IKybCompanyData), ...payload }))
  .on(reset, () => null)

const $mollieOnboardingStatus = createStore<Nullable<IMollieOnboardingStatus>>(null)

const fetchMollieTokenFx = createEffect(async (code: string) => {
  return await fetchMollieOAuth2AccessTokenApi()(code!)
})

const createOrganizationFx = createEffect(async () => {
  const data = $company.getState()!
  return await createOrganizationApi(data)
})

const createMollieProfileFx = createEffect(async () => {
  return await createMollieProfileApi()()
})

const sendKybPassedFx = createEffect(async () => {
  return await sendKybPassedApi()()
})

const checkMollieOnBoardingStatusFx = createEffect(async () => {
  return await checkMollieOnBoardingStatusApi()()
})

$mollieOnboardingStatus
  .on(reset, () => null)
  .on(checkMollieOnBoardingStatusFx.doneData, (_, payload) => payload)

const $isLoading = combine(
  updateUserFx.pending,
  createOrganizationFx.pending,
  createMollieProfileFx.pending,
  fetchMollieTokenFx.pending,
  (...args: boolean[]) => args.some(Boolean)
)

sample({
  clock: updateUserFx.doneData,
  fn: (data) => data,
  target: currentUser.setInfo,
})

// sample({
//   clock: sendDataFx.doneData,
//   target: reset,
// })

export const kyb = {
  $user,
  $company,
  setUserInfo,
  setCompanyInfo,
  updateUserFx,
  $isLoading,
  createOrganizationFx,
  createMollieProfileFx,
  fetchMollieTokenFx,
  sendKybPassedFx,
  $mollieOnboardingStatus,
  checkMollieOnBoardingStatusFx,
}
