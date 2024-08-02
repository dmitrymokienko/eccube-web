import { combine, createEffect } from 'effector'
import { createNewTenderApi } from '../api'

const createNewTenderFx = createEffect(createNewTenderApi)

const withdrawalFromDraftFx = createEffect(async (id: string) => {
  console.log(id)
  // noop
})

const $isLoading = combine(
  createNewTenderFx.pending,
  withdrawalFromDraftFx.pending,
  (...args: boolean[]) => args.some(Boolean)
)

export const tenderCreation = {
  $isLoading,
  createNewTenderFx,
  withdrawalFromDraftFx,
}
