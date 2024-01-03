import { PropsWithChildren } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'

export interface IBreakpointProps {
  mobile?: boolean
  tablet?: boolean
  desktop?: boolean
}

export function Breakpoint(props: PropsWithChildren<IBreakpointProps>) {
  const { mobile, tablet, desktop, children } = props
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))

  const map = {
    mobile: mobile && isMobile,
    tablet: tablet && isTablet,
    desktop: desktop && isDesktop,
  }

  if (Object.values(map).some(Boolean)) return <>{children}</>
  return null
}
