import Button from '@mui/material/Button'
import ReactJson, { InteractionProps } from 'react-json-view'
import { useCallback, useState } from 'react'
import { SidebarLayout } from '@/shared/ui/layouts/SidebarLayout/SidebarLayout'
import { OnboardingInformer } from '@/features/onboarding/ui/OnboardingInformer'
import { useTranslation } from 'react-i18next'
import { mollie } from '@/entities/mollie/model'
import Box from '@mui/material/Box'

const defaultPayment = {
  amount: {
    value: '390.00',
    currency: 'EUR',
  },
  shippingAddress: {
    organizationName: 'Mollie B.V.',
    streetAndNumber: 'Prinsengracht 126',
    streetAdditional: '4th floor',
    city: 'Haarlem',
    region: 'Noord-Holland',
    postalCode: '5678AB',
    country: 'NL',
    // title: 'Mr.',
    givenName: 'Chuck',
    familyName: 'Norris',
    email: 'norris@chucknorrisfacts.net',
  },
  // metadata: {
  //   order_id: '1338',
  //   description: 'Lego cars',
  // },
  // locale: 'nl_NL',
  // orderNumber: '1338',
  // redirectUrl: 'https://bidding.eccube.de/redirect_order',
  // webhookUrl: 'https://bidding.eccube.de/webhooks',
  method: 'banktransfer',
  lines: [
    {
      type: 'digital',
      // sku: '5702016116977',
      name: 'Office cleaning',
      // productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
      // imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
      quantity: 10,
      vatRate: '21.00',
      unitPrice: {
        currency: 'EUR',
        value: '39.00',
      },
      totalAmount: {
        currency: 'EUR',
        value: '390.00',
      },
      discountAmount: {
        currency: 'EUR',
        value: '0.00',
      },
      vatAmount: {
        currency: 'EUR',
        value: '67.69', // €390.00 × (21.00% / 121.00%)
      },
    },
  ],
}

type PaymentType = InteractionProps['updated_src']

export function PaymentsPage() {
  const { t } = useTranslation()

  const [order, setOrder] = useState<PaymentType>(defaultPayment)

  const makePayment = useCallback(async (p: PaymentType) => {
    const res = await mollie.payments.createOrderFx(p)
    console.log('res', res)
  }, [])

  return (
    <SidebarLayout Nav={<OnboardingInformer />}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} py={3}>
        <Button
          fullWidth={false}
          variant="contained"
          type="submit"
          onClick={() => makePayment(order)}
        >
          {t('button.createOrder')}
        </Button>
      </Box>

      <ReactJson
        src={order}
        style={{
          maxHeight: '76vh',
          overflow: 'auto',
          border: '2px solid gray',
          fontSize: 12,
        }}
        onEdit={(e: InteractionProps) => setOrder(e.updated_src)}
      />
    </SidebarLayout>
  )
}
