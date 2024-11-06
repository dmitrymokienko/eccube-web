import { ITender } from '@/entities/tender/model/interfaces'
import { deleteTenderByIdApi } from '@/features/tender/plain-tender/api'
import { Nullable } from '@/shared/types/utilities'
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query'

export function useDrawerTenderQuery({
  id,
  queryKey,
  onDelete,
}: {
  id: Nullable<string>
  queryKey: QueryKey
  onDelete: () => void
}) {
  const queryClient = useQueryClient()

  const deleteTender = useMutation({
    mutationKey: queryKey,
    mutationFn: async (tenderId: string) => deleteTenderByIdApi(tenderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
      onDelete()
    },
    onError: (error) => {
      console.error('Failed to delete tender', error)
    },
  })

  // TODO: implement
  // const participate = useMutation({

  const list = queryClient.getQueryState<ITender[]>(queryKey)?.data ?? []
  const tenderData = list.find((tender) => tender.id === id)

  return {
    tenderData,
    deleteTender,
  }
}
