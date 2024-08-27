import { combine, createEffect, createEvent, createStore } from 'effector'
import { createNewTenderApi, createNewTenderDraftApi, fetchTenderListApi } from '../api'
import { ITender } from '@/entities/tender/model/interfaces'

const reset = createEvent()

const createNewTenderFx = createEffect(createNewTenderApi)
const createNewTenderDraftFx = createEffect(createNewTenderDraftApi)

const $list = createStore<ITender[]>([])
const fetchTenderListFx = createEffect(fetchTenderListApi)

// TODO: implement withdrawalFromDraftFx
const withdrawalFromDraftFx = createEffect(async (id: string) => {
  console.log(id)
})

$list.on(fetchTenderListFx.doneData, (_, data) => data).reset(reset)

const $isLoading = combine(
  createNewTenderFx.pending,
  createNewTenderDraftFx.pending,
  withdrawalFromDraftFx.pending,
  fetchTenderListFx.pending,
  (...args: boolean[]) => args.some(Boolean)
)

export const tender = {
  $isLoading,

  createNewTenderFx,
  createNewTenderDraftFx,
  withdrawalFromDraftFx,

  $list,
  fetchTenderListFx,
}
