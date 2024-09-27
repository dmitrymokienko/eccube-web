import Box from '@mui/material/Box'
import { alpha, styled, Theme } from '@mui/material/styles'
import { ICommonCardProps } from './types'

export const CardWrapper = styled(Box, {
  shouldForwardProp: (propName: string) => propName !== 'selected' && propName !== 'outlined',
})<Omit<ICommonCardProps, 'children'>>(({ theme, selected, outlined, disabled, onClick }) => ({
  ...getDefaultStyles(theme),
  ...(outlined ? getOutlinedStyles(theme) : {}),
  ...(onClick ? { cursor: 'pointer' } : {}),
  ...(selected ? getSelectedStyles(theme, outlined) : {}),
  ...(disabled ? getInactiveStyles() : {}),
}))

function getDefaultStyles(theme: Theme) {
  return {
    width: '100%',
    cursor: 'pointer',
    borderRadius: '12px',
    padding: '20px',
    border: `none`,
    background: theme.palette.background.paper,
    boxShadow: `0px 8px 16px 0px rgba(106, 117, 130, 0.15), 0px 0px 4px 0px rgba(0, 0, 0, 0.10)`,
    listStyleType: 'none',
    '&:hover': {
      boxShadow: `0px 12px 24px 0px rgba(106, 117, 130, 0.20), 0px 0px 4px 0px rgba(0, 0, 0, 0.10)`,
    },
  }
}

function getSelectedStyles(theme: Theme, outlined = false) {
  return {
    cursor: 'pointer',
    borderRadius: '12px',
    padding: '18px',
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: outlined ? 'none' : `0px 4px 12px 0px ${alpha(theme.palette.primary.main, 0.25)}`,
    '&:hover': {
      boxShadow: outlined ? 'none' : `0px 4px 16px 0px ${alpha(theme.palette.primary.main, 0.5)}`,
    },
  }
}

function getInactiveStyles() {
  return {
    cursor: 'not-allowed',
    borderRadius: '12px',
    padding: '20px',
    border: `none`,
    background: `rgba(244, 245, 246, 0.50)`,
    boxShadow: `none`,
    '&:hover': {
      boxShadow: `none`,
    },
  }
}

function getOutlinedStyles(theme: Theme) {
  return {
    cursor: 'default',
    borderRadius: '12px',
    padding: '19px',
    border: `1px solid ${theme.palette.grey[200]}`,
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none',
    },
  }
}
