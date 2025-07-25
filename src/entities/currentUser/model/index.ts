import { combine, createEffect, createEvent, createStore } from 'effector'
import persist from 'effector-localstorage'
import { ProfileType, IUser } from '../types'
import { createOrganizationApi, deleteUserApi, getUserInfoApi, updateUserApi } from '../api'
import { Nullable } from '@/shared/types/utilities'

const $info = createStore<Nullable<Partial<IUser>>>(null)
const setInfo = createEvent<Nullable<Partial<IUser>>>()

const fetchInfoFx = createEffect(getUserInfoApi)
const updateFx = createEffect(updateUserApi)
const deleteFx = createEffect(deleteUserApi)

const createOrganizationFx = createEffect(createOrganizationApi)
const updateOrganizationFx = createEffect(updateUserApi)

const setProfileType = createEvent<ProfileType>()
const $profileType = createStore<ProfileType>(ProfileType.SUPPLIER)
persist({ store: $profileType, key: 'profileType' })

$info.on(setInfo, (_, v) => v).on(fetchInfoFx.doneData, (_, v) => v)
$profileType.on(setProfileType, (_, v) => v)

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

  setProfileType,
  $profileType,

  fetchInfoFx,
  updateFx,
  deleteFx,

  createOrganizationFx,
  updateOrganizationFx,

  $isLoading,
}
