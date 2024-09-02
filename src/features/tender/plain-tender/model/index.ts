import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import {
  createNewTenderApi,
  createNewTenderDraftApi,
  deleteByIdApi,
  fetchTenderByIdApi,
  fetchTenderListApi,
  publishTenderApi,
  updateByIdApi,
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

const updateByIdFx = createEffect(updateByIdApi)

const deleteByIdFx = createEffect(deleteByIdApi)

$currentTender.on(fetchByIdFx.doneData, (_, data) => data).reset(reset)

$list.on(fetchTenderListFx.doneData, (_, data) => data).reset(reset)

const $isLoading = combine(
  createNewTenderFx.pending,
  createNewTenderDraftFx.pending,
  withdrawalFromDraftFx.pending,
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
  fn: (user) => ({ createdById: user?.id }),
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
}
