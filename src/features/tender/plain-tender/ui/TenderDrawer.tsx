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

import { ITender } from '@/entities/tender/model/interfaces'
import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { prepareRTEForRHF } from '@/shared/ui/components/RichTextEditor/utils'
import EccubeLogo from '@/shared/assets/icons/eccube-logo-white.svg?react'
import { SIDEBAR_LAYOUT_NAV_HEIGHT } from '@/shared/ui/layouts/SidebarLayout/lib/constants'
import { formatDate } from '@/shared/libs/utils/datetime'

interface TenderDrawerProps {
  open: boolean
  onClose: () => void
  tenderData?: ITender
}

export function TenderDrawer(props: TenderDrawerProps) {
  const { open, onClose, tenderData } = props

  const isCompact = useMediaQuery<Theme>((theme) => theme.breakpoints.down(1280))

  // TODO Implement onEdit functions
  const onEdit = () => {
    console.log('Edit Tender')
  }

  // TODO Implement onDelete functions
  const onDelete = () => {
    console.log('Delete Tender')
  }

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: '100%', maxWidth: isCompact ? '800px' : '1200px' },
      }}
    >
      {/* decor */}
      {/* TODO: position fixed */}
      <Stack direction="row" spacing={0}>
        {isCompact ? (
          <span />
        ) : (
          <Box
            sx={{
              width: '400px',
              height: '100vh',
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

        {/* data */}

        <Box sx={{ width: '100%', px: 4 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            height={SIDEBAR_LAYOUT_NAV_HEIGHT}
          >
            <Typography variant="h5">Tender Details</Typography>

            <Stack direction="row" spacing={1}>
              <IconButton onClick={onClose} color="default">
                <KeyboardBackspaceIcon />
              </IconButton>

              <IconButton onClick={onEdit} color="primary">
                <EditIcon />
              </IconButton>

              <IconButton onClick={onDelete} color="error">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Divider />

          {!!tenderData && (
            <List sx={{ '& > li': { px: 0 } }}>
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

              <ListItem>
                <ListItemText primary="Start Date" secondary={formatDate(tenderData.startPeriod)} />
              </ListItem>

              <ListItem>
                <ListItemText primary="End Date" secondary={formatDate(tenderData.endPeriod)} />
              </ListItem>

              {/* <ListItem>
            <ListItemText primary="Address" secondary={tenderData.address} />
          </ListItem> */}

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
      </Stack>
    </Drawer>
  )
}
