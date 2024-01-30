import Box from '@mui/material/Box'
import {
  ISeparateLayoutProps,
  SEPARATE_LAYOUT_COMPACT_BREAKPOINT,
  SEPARATE_LAYOUT_SIDEBAR_WIDTH,
  SeparateLayout,
} from '../../SeparateLayout'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import EccubeBg from '../../../../assets/images/eccube_bg.jpeg'
import { SidebarRandomContent, getRandomInt } from './lib/utils'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Theme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export interface ISignUpLayoutProps extends ISeparateLayoutProps {}

export function SignUpLayout(props: ISignUpLayoutProps) {
  const { children, ...rest } = props

  const { t } = useTranslation()
  const navigate = useNavigate()

  const isCompactView = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down(SEPARATE_LAYOUT_COMPACT_BREAKPOINT)
  )

  const random = getRandomInt()
  const sidebar = SidebarRandomContent[random]

  return (
    <SeparateLayout
      {...rest}
      Header={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: isCompactView ? '8px' : '24px',
            height: '100%',
            width: '100%',
          }}
        >
          {t('signup.have-account')}

          <Button
            variant="outlined"
            type="submit"
            fullWidth={false}
            size="small"
            onClick={() => {
              navigate('/login')
            }}
          >
            {t('button.login')}
          </Button>
          {/* <LangSwitcher /> */}
        </Box>
      }
      Sidebar={
        <Box pt={6}>
          <Typography variant="h5" component="h1" color="custom.const.white">
            {t(sidebar?.title ?? '')}
          </Typography>
          <Typography variant="body1" color="custom.const.white" mt={5}>
            {t(sidebar?.description ?? '')}
          </Typography>
        </Box>
      }
      SideBarProps={{
        sx: {
          backgroundImage: `url(${EccubeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${SEPARATE_LAYOUT_SIDEBAR_WIDTH}px`,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        },
      }}
    >
      {children}
    </SeparateLayout>
  )
}
