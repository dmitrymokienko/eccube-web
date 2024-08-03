import { Components, Theme } from '@mui/material/styles'

export const components: Components<Omit<Theme, 'components'>> = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      fullWidth: true,
    },
    styleOverrides: {
      root: () => ({
        fontSize: '1rem',
      }),
    },
    variants: [
      {
        props: { variant: 'contained' },
        style: ({ theme }) => ({
          padding: '6px 24px',
          backgroundColor: theme.palette.custom.blue[0],
          // TODO: add new boxShadows
          '&:hover': {
            backgroundColor: theme.palette.custom.blue[1],
          },
          '&:active': {
            backgroundColor: theme.palette.custom.blue[2],
          },
          '&:disabled': {
            color: theme.palette.custom.const.white,
            // backgroundColor: theme.palette.grey[100],
            boxShadow: 'none',
            cursor: 'not-allowed',
          },
        }),
      },
      {
        props: { variant: 'outlined' },
        style: ({ theme }) => ({
          padding: '6px 22px', // '12px 24px',
          color: theme.palette.custom.blue[0],
          backgroundColor: theme.palette.custom.const.white,
          border: `2px solid ${theme.palette.custom.blue[0]}`,
          '&:hover': {
            border: `2px solid ${theme.palette.custom.blue[1]}`,
          },
          '&:active': {
            border: `2px solid ${theme.palette.custom.blue[2]}`,
          },
          '&:disabled': {
            color: theme.palette.grey[400],
            // backgroundColor: theme.palette.white.const,
            border: `2px solid ${theme.palette.grey[400]}`,
            cursor: 'not-allowed',
          },
        }),
      },
      {
        props: { variant: 'text' },
        style: ({ theme }) => ({
          padding: '4px',
          color: theme.palette.custom.blue[0],
          '&:hover': {
            color: theme.palette.custom.blue[1],
            backgroundColor: 'transparent',
          },
          '&:active': {
            color: theme.palette.custom.blue[2],
          },
          '&:disabled': {
            color: theme.palette.grey[400],
            cursor: 'not-allowed',
          },
        }),
      },
    ],
  },

  MuiCheckbox: {
    defaultProps: {
      color: 'primary',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.grey[400],
        '&.Mui-checked': {
          color: theme.palette.custom.blue[0],
        },
      }),
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
      helperText: ' ',
      autoComplete: 'off',
      placeholder: 'Please enter text...',
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        marginTop: '8px', // special marginTop for outline inputs

        // wrapper under input/textarea tag
        '& .MuiInputBase-root': {
          backgroundColor: theme.palette.custom.const.white,
        },
        // input/textarea tag
        '& .MuiInputBase-input': {
          fontWeight: 400,
          lineHeight: '24px',
          height: '24px', // lineHeight is not enough for MUI
        },
        // focused
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '2px',
          borderColor: theme.palette.custom.blue[0],
        },
        // label
        '& .MuiInputLabel-shrink.Mui-focused': {
          fontWeight: 400,
          color: theme.palette.custom.blue[0],
        },

        // error
        // '& .MuiFormHelperText-root.Mui-error': {
        //   color: '#f75456',
        // },
        // '& .MuiInputLabel-shrink.Mui-error': {
        //   color: '#f75456',
        // },
        // '& .Mui-error': {
        //   '& .MuiInputLabel-shrink.Mui-focused': {
        //     fontWeight: 400,
        //     color: '#f75456',
        //   },
        //   '& .MuiOutlinedInput-notchedOutline': {
        //     borderWidth: '2px',
        //     borderColor: '#f75456',
        //   },
        // },
      }),
    },
  },

  MuiSelect: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
      autoComplete: 'off',
      placeholder: 'Please select...',
      size: 'small',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        // wrapper under input/textarea tag
        '& .MuiSelect-outlined': {
          paddingTop: '8px',
          paddingBottom: '8px',
          backgroundColor: theme.palette.custom.const.white,
        },
        '&.MuiOutlinedInput-root': {
          fontWeight: 400,
          lineHeight: '28px',
        },
        // focused
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '2px',
          borderColor: theme.palette.custom.blue[0],
        },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.MuiInputLabel-root.Mui-focused': {
          color: theme.palette.custom.blue[0],
        },
      }),
    },
  },

  MuiLink: {
    defaultProps: {
      underline: 'none',
      color: 'primary',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.custom.blue[0],
        '&:hover': {
          color: theme.palette.custom.blue[1],
        },
        '&:active': {
          color: theme.palette.custom.blue[2],
        },
      }),
    },
  },

  MuiRadio: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.custom.blue[0],
        '&.Mui-checked': {
          color: theme.palette.custom.blue[0],
        },
      }),
    },
  },
}
