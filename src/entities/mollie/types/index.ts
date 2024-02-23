// https://docs.mollie.com/reference/v2/profiles-api/create-profile

export interface CreateMollieProfileDto {
  name: string
  website: string
  email: string
  phone: string
  description?: string
  countriesOfActivity?: string[]
  businessCategory?: string
  mode?: 'live' | 'test'
}

export interface UpdateMollieProfileDto extends Partial<CreateMollieProfileDto> {}

export interface IMollieProfileResponse {
  resource: 'profile'
  id: string
  mode: 'live' | 'test'
  name: string
  website: string
  email: string
  phone: string
  businessCategory: string // TODO: update type - enum
  categoryCode: number
  status: string
  createdAt: string // '2018-03-20T09:28:37+00:00';
  _links: {
    self: {
      href: string // 'https://api.mollie.com/v2/profiles/pfl_v9hTwCvYqw';
      type: 'application/hal+json'
    }
    dashboard: {
      href: string // 'https://www.mollie.com/dashboard/org_123456789/settings/profiles/pfl_v9hTwCvYqw';
      type: 'text/html'
    }
    chargebacks: {
      href: string // 'https://api.mollie.com/v2/chargebacks?profileId=pfl_v9hTwCvYqw';
      type: 'application/hal+json'
    }
    methods: {
      href: string //  'https://api.mollie.com/v2/methods?profileId=pfl_v9hTwCvYqw';
      type: 'application/hal+json'
    }
    payments: {
      href: string // 'https://api.mollie.com/v2/payments?profileId=pfl_v9hTwCvYqw';
      type: 'application/hal+json'
    }
    refunds: {
      href: string // 'https://api.mollie.com/v2/refunds?profileId=pfl_v9hTwCvYqw';
      type: 'application/hal+json'
    }
    checkoutPreviewUrl: {
      href: string //  'https://www.mollie.com/payscreen/preview/pfl_v9hTwCvYqw';
      type: 'text/html'
    }
    documentation: {
      href: string //  'https://docs.mollie.com/reference/v2/profiles-api/create-profile';
      type: 'text/html'
    }
  }
}

export enum MollieOnboardingStatus {
  needsData = 'needs-data',
  inReview = 'in-review',
  completed = 'completed',
}

export interface IMollieOnboardingStatus {
  canReceivePayments: boolean
  canReceiveSettlements: boolean
  name: string // company name
  resource: 'onboarding'
  signedUpAt: string // '2024-02-05T07:21:42+00:00'
  status: MollieOnboardingStatus
  _links: Record<string, { href: string; type: string }>
}
