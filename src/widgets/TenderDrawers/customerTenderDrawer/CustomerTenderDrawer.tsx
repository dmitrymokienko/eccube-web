import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import NiceModal from '@ebay/nice-modal-react'
import Drawer from '@mui/material/Drawer' // SwipeableDrawer
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import Collapse from '@mui/material/Collapse'
import ListItemButton from '@mui/material/ListItemButton'

import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { prepareRTEForRHF } from '@/shared/ui/components/RichTextEditor/utils'
import { formatDate } from '@/shared/libs/utils/datetime'
import { mapCountryCodeToName } from '@/shared/libs/mappers/countries'
import { Locale } from '@/entities/locale/types'
import { ConfirmationDialog } from '@/shared/ui/components/Dialogs/ConfirmationDialog'
import { Nullable } from '@/shared/types/utilities'
import { transformCentsToAmount } from '@/shared/libs/utils/currencies'
import { UploadedFilesList } from '@/features/uploadFiles/ui/components/UploadedFilesList'
import { LogoBannerOffset } from '../components/LogoBannerOffset'
import { TenderNavBar } from '../components/TenderNavBar'
import { tenderModel } from '@/features/tender/plain-tender/model'

const DRAWER_WIDTH = 800
const BANNER_WIDTH = 320

interface TenderDrawerProps {
  id: Nullable<string>
  open: boolean
  onClose: () => void
}

export function CustomerTenderDrawer(props: Readonly<TenderDrawerProps>) {
  const { id, open, onClose } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const isCompact = useMediaQuery<Theme>((theme) => theme.breakpoints.down(1280))

  const [addressOpen, setAddressOpen] = useState(false)
  const [invitedSuppliersOpen, setInvitedSuppliersOpen] = useState(false)

  const tenderData = useUnit(tenderModel.$currentTender)

  useEffect(() => {
    if (!id) return
    tenderModel.fetchByIdFx(id)
  }, [id])

  const onEdit = () => {
    if (!tenderData) throw new Error('No tender found')
    onClose()
    navigate(`/tender/edit/plain/${tenderData.id}`)
  }

  const onDelete = async () => {
    if (!tenderData) throw new Error('No tender found')
    NiceModal.show(ConfirmationDialog, {
      title: t('modal.tender.delete-tender.title'),
      content: t('modal.tender.delete-tender.content'),
      onConfirm: async () => {
        try {
          await tenderModel.deleteByIdFx(tenderData.id)
          onClose()
        } catch (error) {
          console.error('Failed to delete tender', error)
        }
      },
    })
  }

  const handleClose = () => {
    setAddressOpen(false)
    setInvitedSuppliersOpen(false)
    onClose()
  }

  const handleAddressClick = () => {
    setAddressOpen((prev) => !prev)
  }

  const handleInvitedSuppliersClick = () => {
    setInvitedSuppliersOpen((prev) => !prev)
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
        <LogoBannerOffset />

        {/* nav */}
        <TenderNavBar>
          <Typography variant="h5">
            {t('tender-drawer.header-title')}
            {/* <Typography component="span" variant="h5" color="grey[300]">
                {tenderData?.status && ` / ${tenderData.status}`}
              </Typography> */}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1}>
            <Tooltip title={t('button.goBack')}>
              <span>
                <IconButton onClick={handleClose} color="default">
                  <KeyboardBackspaceIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title={t('tender-drawer.edit-details')}>
              <span>
                <IconButton onClick={onEdit} color="primary" disabled={!tenderData}>
                  <EditIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title={t('tender-drawer.delete-tender')}>
              <span>
                <IconButton onClick={onDelete} color="error" disabled={!tenderData}>
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </TenderNavBar>

        {/* info list */}
        {!!tenderData && (
          <List sx={{ '& > li': { px: 0 } }}>
            <ListItem>
              <ListItemText
                primary={t('tender-drawer.status')}
                secondary={tenderData?.status || '—'}
              />
            </ListItem>

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

            {tenderData?.amount && (
              <ListItem>
                <ListItemText
                  primary={t('tender-drawer.price')}
                  secondary={`${transformCentsToAmount(tenderData?.amount)} ${tenderData?.pricePer} (${tenderData?.priceType})`}
                />
              </ListItem>
            )}

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

            {!!tenderData?.uploadedFiles?.length && (
              <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body1">{t('tender-drawer.uploaded-files')}</Typography>
                <Box sx={{ mt: 1, width: '100%' }}>
                  <UploadedFilesList files={tenderData.uploadedFiles} />
                </Box>
              </ListItem>
            )}

            {tenderData.paymentTerm && (
              <ListItem>
                <ListItemText
                  primary={t('tender-drawer.payment-term')}
                  secondary={t('field.create-tender.n_days', { n: tenderData.paymentTerm })}
                />
              </ListItem>
            )}

            {tenderData.publishment?.length > 0 && (
              <ListItem>
                <ListItemText
                  primary={t('tender-drawer.publishment')}
                  secondary={tenderData.publishment.join('; ')}
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

            {tenderData?.invitedSuppliers?.length > 0 && (
              <>
                <ListItemButton
                  onClick={handleInvitedSuppliersClick}
                  sx={(theme) => ({
                    backgroundColor: theme.palette.grey[300],
                    borderRadius: '4px',
                    mt: 2,
                  })}
                >
                  <ListItemText primary={t('tender-drawer.invited-suppliers')} />
                  {invitedSuppliersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={invitedSuppliersOpen} timeout="auto" unmountOnExit>
                  <List
                    sx={(theme) => ({
                      backgroundColor: theme.palette.grey[100],
                    })}
                  >
                    {tenderData.invitedSuppliers.map((email) => (
                      <ListItem key={email}>
                        <ListItemText secondary={email} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </List>
        )}
      </Box>
    </Drawer>
  )
}
