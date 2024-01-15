import Button from '@mui/material/Button'

import EccubeLogo from '../../shared/assets/icons/eccube-logo-white.svg?react'
import { t } from 'i18next'
import ReactJson from 'react-json-view'

import { useCallback, useState } from 'react'

export const Logo = () => {
  return (
    <div style={{ width: 200, height: 200, paddingTop: 20, borderRadius: '50%' }}>
      <EccubeLogo />
    </div>
  )
}

const defaultPayment = {
  profileId: 'pfl_WU9mjR6SEG',
  amount: {
    value: '1027.99',
    currency: 'EUR',
  },
  billingAddress: {
    organizationName: 'Mollie B.V.',
    streetAndNumber: 'Keizersgracht 126',
    city: 'Amsterdam',
    region: 'Noord-Holland',
    postalCode: '1234AB',
    country: 'NL',
    title: 'Dhr.',
    givenName: 'Piet',
    familyName: 'Mondriaan',
    email: 'piet@mondriaan.com',
    phone: '+31309202070',
  },
  shippingAddress: {
    organizationName: 'Mollie B.V.',
    streetAndNumber: 'Prinsengracht 126',
    streetAdditional: '4th floor',
    city: 'Haarlem',
    region: 'Noord-Holland',
    postalCode: '5678AB',
    country: 'NL',
    title: 'Mr.',
    givenName: 'Chuck',
    familyName: 'Norris',
    email: 'norris@chucknorrisfacts.net',
  },
  metadata: {
    order_id: '1338',
    description: 'Lego cars',
  },
  locale: 'nl_NL',
  orderNumber: '1338',
  redirectUrl: 'https://bidding.eccube.de/redirect_order',
  webhookUrl: 'https://bidding.eccube.de/webhooks',
  method: 'klarnapaylater',
  lines: [
    {
      type: 'physical',
      sku: '5702016116977',
      name: 'LEGO 42083 Bugatti Chiron',
      productUrl: 'https://shop.lego.com/nl-NL/Bugatti-Chiron-42083',
      imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image//LEGO/42083_alt1?$main$',
      quantity: 2,
      vatRate: '21.00',
      unitPrice: {
        currency: 'EUR',
        value: '399.00',
      },
      totalAmount: {
        currency: 'EUR',
        value: '698.00',
      },
      discountAmount: {
        currency: 'EUR',
        value: '100.00',
      },
      vatAmount: {
        currency: 'EUR',
        value: '121.14',
      },
    },
    {
      type: 'physical',
      sku: '5702015594028',
      name: 'LEGO 42056 Porsche 911 GT3 RS',
      productUrl: 'https://shop.lego.com/nl-NL/Porsche-911-GT3-RS-42056',
      imageUrl: 'https://sh-s7-live-s.legocdn.com/is/image/LEGO/42056?$PDPDefault$',
      quantity: 1,
      vatRate: '21.00',
      unitPrice: {
        currency: 'EUR',
        value: '329.99',
      },
      totalAmount: {
        currency: 'EUR',
        value: '329.99',
      },
      vatAmount: {
        currency: 'EUR',
        value: '57.27',
      },
    },
  ],
}

type PaymentType = typeof defaultPayment

export function PaymentsPage() {
  const [payment, setPayment] = useState<typeof defaultPayment>(defaultPayment)

  const makePayment = useCallback((p: PaymentType) => {
    console.log('makePayment', p)
  }, [])

  return (
    <div style={{ background: '#ddd', minHeight: '100vh' }}>
      <Logo />
      <Button
        variant="contained"
        type="submit"
        sx={{ maxWidth: 200, margin: '24px auto', display: 'block' }}
        onClick={() => makePayment(payment)}
      >
        {t('button.makePayment')}
      </Button>
      <ReactJson
        src={payment}
        style={{
          maxHeight: '76vh',
          overflow: 'auto',
          border: '2px solid gray',
          fontSize: 10,
        }}
        onEdit={(e: { updated_src: typeof defaultPayment }) => setPayment(e.updated_src)}
      />
    </div>
  )
}
