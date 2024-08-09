import AttachFileIcon from '@mui/icons-material/AttachFile'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Theme } from '@mui/material/styles'
import { MouseEventHandler } from 'react'

export interface IUploadedFileProps {
  fileName: string
  downloadLink?: string
  onDelete?: (fileName: string) => void
}

const getListItemStyles = (theme: Theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  border: `2px solid ${theme.palette.divider}`,
  padding: '4px 14px',
})

export function UploadedFile(props: IUploadedFileProps) {
  const { fileName, onDelete, downloadLink } = props

  const handleDelete: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onDelete) {
      onDelete(fileName)
    }
  }

  const Content = (
    <>
      <ListItemIcon sx={{ minWidth: '42px' }}>
        <AttachFileIcon />
      </ListItemIcon>

      <ListItemText primary={fileName} primaryTypographyProps={{ noWrap: true }} />

      {onDelete ? (
        <ListItemIcon onClick={handleDelete} sx={{ minWidth: '28px', cursor: 'pointer' }}>
          <DeleteOutlineIcon sx={(theme) => ({ color: theme.palette.error.main })} />
        </ListItemIcon>
      ) : null}
    </>
  )

  if (downloadLink) {
    return (
      <ListItemButton
        download
        component="a"
        href={downloadLink}
        target="_blank"
        sx={(theme) => getListItemStyles(theme)}
      >
        {Content}
      </ListItemButton>
    )
  }

  return <ListItem sx={(theme) => getListItemStyles(theme)}>{Content}</ListItem>
}
