import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { SxProps } from '@mui/material/styles'
import { Z_INDEX } from '@/shared/libs/constants/style'

export interface ILoaderProps {
  visible: boolean
  sx?: SxProps
}

export function Loader(props: ILoaderProps) {
  const { visible, sx = {} } = props

  if (!visible) return null
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: Z_INDEX.Loader,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...(sx || {}),
      }}
    >
      <CircularProgress />
    </Box>
  )
}
