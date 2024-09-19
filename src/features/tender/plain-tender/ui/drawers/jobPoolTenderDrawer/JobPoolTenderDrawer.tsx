import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { useTranslation } from 'react-i18next'
import Drawer from '@mui/material/Drawer' // SwipeableDrawer
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'

import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { prepareRTEForRHF } from '@/shared/ui/components/RichTextEditor/utils'
import EccubeLogo from '@/shared/assets/icons/eccube-logo-white.svg?react'
import { SIDEBAR_LAYOUT_NAV_HEIGHT } from '@/shared/ui/layouts/SidebarLayout/lib/constants'
import { formatDate } from '@/shared/libs/utils/datetime'
import { mapCountryCodeToName } from '@/shared/libs/mappers/countries'
import { Locale } from '@/entities/locale/types'
import { Z_INDEX } from '@/shared/libs/constants/style'
import { tenderModel } from '../../../model'
import { Nullable } from '@/shared/types/utilities'
import Button from '@mui/material/Button'
import NiceModal from '@ebay/nice-modal-react'
import { ConfirmationDialog } from '@/shared/ui/components/Dialogs/ConfirmationDialog'
import { transformCentsToAmount } from '@/shared/libs/utils/currencies'
import { PricePer, PriceType } from '@/entities/currencies/constants'

const DRAWER_WIDTH = 800
const BANNER_WIDTH = 320

interface TenderDrawerProps {
  id: Nullable<string>
  open: boolean
  onClose: () => void
}

export function JobPoolTenderDrawer(props: TenderDrawerProps) {
  const { id, open, onClose } = props

  const { t } = useTranslation()

  const isCompact = useMediaQuery<Theme>((theme) => theme.breakpoints.down(1280))

  const [addressOpen, setAddressOpen] = useState(false)

  const tenderData = useUnit(tenderModel.$currentTender)

  useEffect(() => {
    if (!id) return
    tenderModel.fetchByIdFx(id)
  }, [id])

  const handleClose = () => {
    setAddressOpen(false)
    onClose()
  }

  const handleAddressClick = () => {
    setAddressOpen((prev) => !prev)
  }

  // TODO: implement participate
  const onParticipate = () => {
    NiceModal.show(ConfirmationDialog, {
      title: t('modal.tender.confirm-participate.title'),
      content: t('modal.tender.confirm-participate.content'),
      onConfirm: async () => {
        // await tenderModel.participateFx(id)
        onClose()
      },
    })
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: isCompact ? `${DRAWER_WIDTH}px` : `calc(${DRAWER_WIDTH}px + ${BANNER_WIDTH}px)`,
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          px: 4,
          pb: 4,
          position: 'relative',
          paddingLeft: isCompact ? '32px' : `${BANNER_WIDTH + 32}px`,
        }}
      >
        {/* decor */}
        {!isCompact && (
          <Box
            sx={(theme) => ({
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${BANNER_WIDTH}px`,
              backgroundColor: theme.palette.custom.const.black,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            })}
          >
            <EccubeLogo />
          </Box>
        )}

        {/* nav */}
        <Box
          component="nav"
          sx={(theme) => ({
            position: 'sticky',
            top: 0,
            height: SIDEBAR_LAYOUT_NAV_HEIGHT,
            zIndex: Z_INDEX.SlightlySoaring,
            backgroundColor: theme.palette.background.paper,
          })}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              height: SIDEBAR_LAYOUT_NAV_HEIGHT,
            }}
          >
            <Typography variant="h5">
              {t('tender-drawer.header-title')}
              {/* <Typography component="span" variant="h5" color="grey[300]">
                {tenderData?.status && ` / ${tenderData.status}`}
              </Typography> */}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Tooltip title={t('button.goBack')}>
                <span>
                  <IconButton onClick={handleClose} color="default">
                    <KeyboardBackspaceIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Button
                variant="contained"
                color="primary"
                onClick={onParticipate}
                disabled={!tenderData}
              >
                {t('tender-drawer.participate-button')}
              </Button>
            </Stack>
          </Stack>

          <Divider />
        </Box>

        {/* info list */}
        {!!tenderData && (
          <List sx={{ '& > li': { px: 0 } }}>
            <ListItem>
              <ListItemText
                primary={t('tender-drawer.title')}
                secondary={tenderData?.title || '—'}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={t('tender-drawer.short-description')}
                secondary={tenderData?.shortDescription || '—'}
              />
            </ListItem>

            <ListItem>
              <ListItemText
                primary={t('tender-drawer.price')}
                secondary={`€${transformCentsToAmount(tenderData?.amount) || ' — '} ${tenderData?.pricePer || PricePer.EUR} (${tenderData?.priceType || PriceType.GROSS})`}
              />
            </ListItem>

            {!!tenderData.workDescription && (
              <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body1">{t('tender-drawer.work-description')}</Typography>
                <Box sx={{ mt: 1, width: '100%' }}>
                  <RichTextEditor
                    readOnly
                    showRichBar={false}
                    editorState={prepareRTEForRHF(tenderData.workDescription)}
                  />
                </Box>
              </ListItem>
            )}

            <Box
              sx={{
                display: 'grid',
                alignItems: 'center',
                gridTemplateColumns: '1fr 1fr',
                gap: '24px',
                '& > li': { px: 0 },
              }}
            >
              <ListItem>
                <ListItemText
                  primary={t('tender-drawer.start-date')}
                  secondary={formatDate(tenderData.startPeriod) || '—'}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary={t('tender-drawer.end-date')}
                  secondary={formatDate(tenderData.endPeriod) || '—'}
                />
              </ListItem>
            </Box>

            {tenderData.paymentTerm && (
              <ListItem>
                <ListItemText
                  primary={t('tender-drawer.payment-term')}
                  secondary={t('field.create-tender.n_days', { n: tenderData.paymentTerm })}
                />
              </ListItem>
            )}

            <ListItemButton
              onClick={handleAddressClick}
              sx={(theme) => ({
                backgroundColor: theme.palette.grey[300],
                borderRadius: '4px',
                mt: 2,
              })}
            >
              <ListItemText primary={t('address.address')} />
              {addressOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={addressOpen} timeout="auto" unmountOnExit>
              <List
                disablePadding
                sx={(theme) => ({
                  backgroundColor: theme.palette.grey[100],
                })}
              >
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.street')}
                    secondary={tenderData?.address?.street || '—'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.city')}
                    secondary={tenderData?.address?.city || '—'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.address-suffix')}
                    secondary={tenderData?.address?.suffix || '—'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.postal-code')}
                    secondary={tenderData?.address?.postalCode || '—'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.country')}
                    secondary={mapCountryCodeToName(tenderData?.address?.country as Locale)}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* <ListItem>
            <ListItemText primary="Uploaded Attachments" />
            <List>
              {tenderData?.uploadedFiles?.map((attachment, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <AttachFileIcon />
                  </ListItemIcon>
                  <ListItemText secondary={attachment} />
                </ListItem>
              ))}
            </List>
          </ListItem> */}
          </List>
        )}
      </Box>
    </Drawer>
  )
}
