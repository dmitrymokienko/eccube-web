import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { IKybCompanyData, IKybData } from '../types'
import { Nullable } from '../../../shared/types'
import { currentUser } from '../../currentUser/model'
import { createOrganizationApi, updateUserApi } from '../../currentUser/api'
import { createMollieProfileApi } from '../../mollie/api'

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
$company.on(setCompanyInfo, (_, payload) => payload).on(reset, () => null)

const createOrganizationFx = createEffect(async () => {
  const data = $company.getState()!
  return await createOrganizationApi(data)
})

const createMollieProfileFx = createEffect(async () => {
  return await createMollieProfileApi()()
})

const $isLoading = combine(
  updateUserFx.pending,
  createOrganizationFx.pending,
  createMollieProfileFx.pending,
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
}
