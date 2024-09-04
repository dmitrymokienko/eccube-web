import { combine, createEffect, createEvent, createStore } from 'effector'
import persist from 'effector-localstorage'
import { AccountType, IUser } from '../types'
import { createOrganizationApi, deleteUserApi, getUserInfoApi, updateUserApi } from '../api'
import { Nullable } from '@/shared/types/utilities'

const $info = createStore<Nullable<Partial<IUser>>>(null)
const setInfo = createEvent<Nullable<Partial<IUser>>>()

const fetchInfoFx = createEffect(getUserInfoApi)
const updateFx = createEffect(updateUserApi)
const deleteFx = createEffect(deleteUserApi)

const createOrganizationFx = createEffect(createOrganizationApi)
const updateOrganizationFx = createEffect(updateUserApi)

const setAccountType = createEvent<AccountType>()
const $accountType = createStore<AccountType>(AccountType.SUPPLIER)
persist({ store: $accountType, key: 'accountType' })

$info.on(setInfo, (_, v) => v).on(fetchInfoFx.doneData, (_, v) => v)
$accountType.on(setAccountType, (_, v) => v)

const $isLoading = combine(
  fetchInfoFx.pending,
  updateFx.pending,
  deleteFx.pending,
  createOrganizationFx.pending,
  updateOrganizationFx.pending,
  (fetch, update, delete_, create, updateOrg) => fetch || update || delete_ || create || updateOrg
)

// TODO: add snackbar notifications
// sample({
//   clock: updateFx.doneData,
//   target: showNotificationFx({
//     uiMessage: 'Your profile has been update',
//     type: 'success',
//   }),
// })

export const currentUser = {
  $info,
  setInfo,

  setAccountType,
  $accountType,

  fetchInfoFx,
  updateFx,
  deleteFx,

  createOrganizationFx,
  updateOrganizationFx,

  $isLoading,
}
