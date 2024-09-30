import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import EccubeLogo from '@/shared/assets/icons/eccube-logo-white.svg?react'

const BANNER_WIDTH = 320

export function LogoBannerOffset() {
  const isCompact = useMediaQuery<Theme>((theme) => theme.breakpoints.down(1280))

  if (isCompact) return null
  return (
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
  )
}
