import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import {
  createNewTenderApi,
  createNewTenderDraftApi,
  deleteByIdApi,
  fetchTenderListApi,
  updateByIdApi,
} from '../api'
import { ITender } from '@/entities/tender/model/interfaces'
import { currentUser } from '@/entities/currentUser/model'

const reset = createEvent()

const createNewTenderFx = createEffect(createNewTenderApi)
const createNewTenderDraftFx = createEffect(createNewTenderDraftApi)

const $list = createStore<ITender[]>([])
const fetchTenderListFx = createEffect(fetchTenderListApi)

// TODO: implement
const withdrawalFromDraftFx = createEffect(async (id: string) => {
  console.log(id)
})

const updateByIdFx = createEffect(updateByIdApi)

const deleteByIdFx = createEffect(deleteByIdApi)

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

  createNewTenderFx,
  createNewTenderDraftFx,
  withdrawalFromDraftFx,

  updateByIdFx,
  deleteByIdFx,

  $list,
  fetchTenderListFx,
}
