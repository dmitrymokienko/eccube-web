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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

import { ITender } from '@/entities/tender/model/interfaces'
import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { prepareRTEForRHF } from '@/shared/ui/components/RichTextEditor/utils'
import EccubeLogo from '@/shared/assets/icons/eccube-logo-white.svg?react'
import { SIDEBAR_LAYOUT_NAV_HEIGHT } from '@/shared/ui/layouts/SidebarLayout/lib/constants'
import { formatDate } from '@/shared/libs/utils/datetime'
import Collapse from '@mui/material/Collapse'
import { useState } from 'react'
import { t } from 'i18next'
import ListItemButton from '@mui/material/ListItemButton'
import { mapCountryCodeToName } from '@/shared/libs/mappers/countries'
import { Locale } from '@/entities/locale/types'
import { Z_INDEX } from '@/shared/libs/constants/style'
import Tooltip from '@mui/material/Tooltip'

const BANNER_WIDTH = 320

interface TenderDrawerProps {
  open: boolean
  onClose: () => void
  tenderData?: ITender
}

export function TenderDrawer(props: TenderDrawerProps) {
  const { open, onClose, tenderData } = props

  const isCompact = useMediaQuery<Theme>((theme) => theme.breakpoints.down(1280))

  const [addressOpen, setAddressOpen] = useState(false)

  // TODO Implement onEdit functions
  const onEdit = () => {
    console.log('Edit Tender')
  }

  // TODO Implement onDelete functions
  const onDelete = () => {
    console.log('Delete Tender')
  }

  const handleClose = () => {
    setAddressOpen(false)
    onClose()
  }

  const handleAddressClick = () => {
    setAddressOpen((prev) => !prev)
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: '100%', maxWidth: isCompact ? '800px' : `calc(800px + ${BANNER_WIDTH}px)` },
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
            sx={{
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${BANNER_WIDTH}px`,
              backgroundColor: '#1c1c1c', // TODO: to custom palette
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
            }}
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
              {t('Tender Details')}
              {/* <Typography component="span" variant="h5" color="grey[300]">
                {tenderData?.status && ` / ${tenderData.status}`}
              </Typography> */}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Close">
                <IconButton onClick={handleClose} color="default">
                  <KeyboardBackspaceIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit details">
                <IconButton onClick={onEdit} color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton onClick={onDelete} color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Divider />
        </Box>

        {/* info */}
        {!!tenderData && (
          <List sx={{ '& > li': { px: 0 } }}>
            <ListItem>
              <ListItemText primary="Status" secondary={tenderData?.status || '-'} />
            </ListItem>

            <ListItem>
              <ListItemText primary="Title" secondary={tenderData?.title || '-'} />
            </ListItem>

            <ListItem>
              <ListItemText
                primary="Short Description"
                secondary={tenderData?.shortDescription || '-'}
              />
            </ListItem>

            {!!tenderData.workDescription && (
              <ListItem>
                <ListItemText
                  primary="Work Description"
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <RichTextEditor
                        readOnly
                        showRichBar={false}
                        editorState={prepareRTEForRHF(tenderData.workDescription)}
                      />
                    </Box>
                  }
                />
              </ListItem>
            )}

            {tenderData.startPeriod && (
              <ListItem>
                <ListItemText primary="Start Date" secondary={formatDate(tenderData.startPeriod)} />
              </ListItem>
            )}

            {tenderData.endPeriod && (
              <ListItem>
                <ListItemText primary="End Date" secondary={formatDate(tenderData.endPeriod)} />
              </ListItem>
            )}

            <ListItemButton
              onClick={handleAddressClick}
              sx={(theme) => ({ backgroundColor: theme.palette.grey[300], borderRadius: '4px' })}
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
                    secondary={tenderData?.addressStreet || '-'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.city')}
                    secondary={tenderData?.addressCity || '-'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.address-suffix')}
                    secondary={tenderData?.addressSuffix || '-'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.postal-code')}
                    secondary={tenderData?.addressPostalCode || '-'}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary={t('address.country')}
                    secondary={mapCountryCodeToName(tenderData?.addressCountry as Locale)}
                  />
                </ListItem>
              </List>
            </Collapse>

            {tenderData?.invitedSuppliers?.length > 0 && (
              <ListItem>
                <ListItemText primary="Invited Suppliers" />
                <List>
                  {tenderData?.invitedSuppliers?.map((supplier, index) => (
                    <ListItem key={index}>
                      <ListItemText secondary={supplier} />
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            )}

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
