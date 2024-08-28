import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  Stack,
  SwipeableDrawer,
} from '@mui/material'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  //   AttachFile as AttachFileIcon,
} from '@mui/icons-material'
import { ITender } from '@/entities/tender/model/interfaces'
import { RichTextEditor } from '@/shared/ui/components/RichTextEditor'
import { prepareRTEForRHF } from '@/shared/ui/components/RichTextEditor/utils'

interface TenderDrawerProps {
  open: boolean
  onClose: () => void
  tenderData?: ITender
}

export function TenderDrawer(props: TenderDrawerProps) {
  const { open, onClose, tenderData } = props

  // TODO Implement onEdit functions
  const onEdit = () => {
    console.log('Edit Tender')
  }

  // TODO Implement onDelete functions
  const onDelete = () => {
    console.log('Delete Tender')
  }

  if (!tenderData) return null
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      PaperProps={{
        sx: { width: '100%', maxWidth: '800px', p: 3 },
      }}
    >
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Tender Details</Typography>

          <Stack direction="row" spacing={1}>
            <IconButton onClick={onEdit} color="primary">
              <EditIcon />
            </IconButton>

            <IconButton onClick={onDelete} color="secondary">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Divider />

        <List>
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
                  <RichTextEditor
                    readOnly
                    showRichBar={false}
                    editorState={prepareRTEForRHF(tenderData.workDescription)}
                  />
                }
              />
            </ListItem>
          )}

          <ListItem>
            <ListItemText primary="Start Date" secondary={tenderData.startDate} />
          </ListItem>

          <ListItem>
            <ListItemText primary="End Date" secondary={tenderData.endDate} />
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
      </Box>
    </SwipeableDrawer>
  )
}
