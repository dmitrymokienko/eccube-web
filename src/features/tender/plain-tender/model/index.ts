import { combine, createEffect } from 'effector'
import { createNewTenderApi, createNewTenderDraftApi, fetchTenderListApi } from '../api'

const createNewTenderFx = createEffect(createNewTenderApi)

const createNewTenderDraftFx = createEffect(createNewTenderDraftApi)

const fetchTenderListFx = createEffect(fetchTenderListApi)

// TODO: implement withdrawalFromDraftFx
const withdrawalFromDraftFx = createEffect(async (id: string) => {
  console.log(id)
})

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
  fetchTenderListFx,
}
