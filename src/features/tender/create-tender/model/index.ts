import { createNewTenderApi } from '@/entities/tender/api'
import { combine, createEffect } from 'effector'

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
