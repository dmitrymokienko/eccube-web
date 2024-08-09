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
      <ListItemIcon>
        <AttachFileIcon />
      </ListItemIcon>

      <ListItemText primary={fileName} />

      {onDelete ? (
        <ListItemIcon onClick={handleDelete} sx={{ minWidth: '28px', cursor: 'pointer' }}>
          <DeleteOutlineIcon />
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
