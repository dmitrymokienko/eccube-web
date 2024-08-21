import { combine, createEffect } from 'effector'
import { createNewTenderApi, createNewTenderDraftApi } from '../api'

const createNewTenderFx = createEffect(createNewTenderApi)

const createNewTenderDraftFx = createEffect(createNewTenderDraftApi)

const withdrawalFromDraftFx = createEffect(async (id: string) => {
  console.log(id)
  // noop
})

const $isLoading = combine(
  createNewTenderFx.pending,
  createNewTenderDraftFx.pending,
  withdrawalFromDraftFx.pending,
  (...args: boolean[]) => args.some(Boolean)
)

export const tenderCreation = {
  $isLoading,
  createNewTenderFx,
  createNewTenderDraftFx,
  withdrawalFromDraftFx,
}
