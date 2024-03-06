import { defaultApiClient } from '@/core/api/apiClient'
import { snackbar } from '@/entities/snackbar/model'
import { createEffect, createStore, sample } from 'effector'

// ORDERS
const createOrderFx = createEffect(async (data: unknown) => {
  const res = await defaultApiClient.post<unknown, unknown>(`/mollie/order/create`, data)
  return res
})
const $order = createStore<unknown>(null)
$order.on(createOrderFx.doneData, (_, v) => v)

// snackbars
sample({
  clock: createOrderFx.doneData,
  target: snackbar.showFx({
    message: 'Order created',
    options: {
      variant: 'success',
    },
  }),
})
sample({
  clock: createOrderFx.fail,
  target: snackbar.showFx({
    message: 'Order creation failed',
    options: {
      variant: 'error',
    },
  }),
})

export const payments = {
  createOrderFx,
  $order,
}
