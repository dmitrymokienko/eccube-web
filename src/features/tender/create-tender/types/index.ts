import { prepareCreateTenderDtoMapper } from '../utils/mappers'
import { ITender } from '@/entities/tender/types'

export type CreatePlainTenderProcessForm = Omit<ITender, 'id'>

export type CreateTenderDto = ReturnType<typeof prepareCreateTenderDtoMapper>

export type TenderDto = ITender
