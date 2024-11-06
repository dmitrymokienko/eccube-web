import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import {
  createNewTenderApi,
  createNewTenderDraftApi,
  deleteTenderByIdApi,
  deleteUploadedFilesApi,
  fetchTenderByIdApi,
  fetchTenderListApi,
  publishTenderApi,
  updateTenderByIdApi,
} from '../api'
import { ITender } from '@/entities/tender/model/interfaces'
import { currentUser } from '@/entities/currentUser/model'
import { Nullable } from '@/shared/types/utilities'

const reset = createEvent()

const createNewTenderFx = createEffect(createNewTenderApi)
const createNewTenderDraftFx = createEffect(createNewTenderDraftApi)

const fetchByIdFx = createEffect(fetchTenderByIdApi)
const $currentTender = createStore<Nullable<ITender>>(null)

const $list = createStore<ITender[]>([])
const fetchTenderListFx = createEffect(fetchTenderListApi)

const withdrawalFromDraftFx = createEffect(publishTenderApi)

const updateByIdFx = createEffect(updateTenderByIdApi)

const deleteByIdFx = createEffect(deleteTenderByIdApi)

const $uploadFilesToDelete = createStore<string[]>([]) // urls of files to delete
const setUploadFilesToDelete = createEvent<string[] | string>()
const deleteUploadedFilesFx = createEffect(async () => {
  const tenderId = $currentTender.getState()?.id
  const urls = $uploadFilesToDelete.getState()
  if (!tenderId || urls.length === 0) return
  await deleteUploadedFilesApi(urls, tenderId!)
})

$currentTender.on(fetchByIdFx.doneData, (_, data) => data).reset(reset)

$list.on(fetchTenderListFx.doneData, (_, data) => data).reset(reset)

$uploadFilesToDelete
  .on(deleteUploadedFilesFx.doneData, () => [])
  .on(setUploadFilesToDelete, (state, payload) => {
    if (typeof payload === 'string') return [...state, payload]
    return [...state, ...payload]
  })
  .reset(reset)

const $isLoading = combine(
  createNewTenderFx.pending,
  createNewTenderDraftFx.pending,
  withdrawalFromDraftFx.pending,
  fetchByIdFx.pending,
  fetchTenderListFx.pending,
  updateByIdFx.pending,
  deleteByIdFx.pending,
  (...args: boolean[]) => args.some(Boolean)
)

sample({
  clock: [
    createNewTenderFx.doneData,
    createNewTenderDraftFx.doneData,
    withdrawalFromDraftFx.doneData,
    updateByIdFx.doneData,
    deleteByIdFx.doneData,
  ],
  source: currentUser.$info,
  fn: (user) => ({ onlyAuthorTendersById: user?.id }),
  target: fetchTenderListFx,
})

export const tenderModel = {
  $isLoading,

  reset,

  createNewTenderFx,
  createNewTenderDraftFx,
  withdrawalFromDraftFx,

  updateByIdFx,
  deleteByIdFx,

  $currentTender,
  fetchByIdFx,

  $list,
  fetchTenderListFx,

  $uploadFilesToDelete,
  setUploadFilesToDelete,
  deleteUploadedFilesFx,
}
