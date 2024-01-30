import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { SxProps } from '@mui/material/styles'

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
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.1)',
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        ...(sx || {}),
      }}
    >
      <CircularProgress />
    </Box>
  )
}
