import Menu from '@mui/material/Menu'
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem'
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import Box from '@mui/material/Box'
import {
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  Ref,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import ListItemIcon from '@mui/material/ListItemIcon'
import { Nullable } from '@/shared/types/utilities'

export interface NestedMenuItemProps extends MenuItemProps {
  parentMenuOpen: boolean
  label: ReactNode
  rightAnchored?: boolean
  ContainerProps?: {
    ref?: Ref<HTMLAnchorElement>
    onMouseEnter?: MouseEventHandler
    onMouseLeave?: MouseEventHandler
    onFocus?: FocusEventHandler
    onBlur?: FocusEventHandler
  }
}

export const NestedMenuItem = forwardRef<HTMLElement, NestedMenuItemProps>((props, ref) => {
  const {
    parentMenuOpen,
    label,
    children,
    tabIndex: tabIndexProp,
    ContainerProps: ContainerPropsProp = {},
    rightAnchored = true,
    ...MenuItemProps
  } = props

  const { ref: containerRefProp, ...ContainerProps } = ContainerPropsProp

  const menuItemRef = useRef<Nullable<HTMLAnchorElement>>(null)
  useImperativeHandle(ref, () => {
    return menuItemRef?.current as HTMLAnchorElement
  })

  const containerRef = useRef<Nullable<HTMLAnchorElement>>(null)
  useImperativeHandle(containerRefProp, () => {
    return containerRef.current as HTMLAnchorElement
  })

  const menuContainerRef = useRef<HTMLAnchorElement>(null)

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  const handleMouseEnter: MouseEventHandler = (event) => {
    setIsSubMenuOpen(true)
    if (ContainerProps?.onMouseEnter) {
      ContainerProps.onMouseEnter(event)
    }
  }

  const handleMouseLeave: MouseEventHandler = (event) => {
    setIsSubMenuOpen(false)
    if (ContainerProps?.onMouseLeave) {
      ContainerProps.onMouseLeave(event)
    }
  }

  const isSubmenuFocused = () => {
    const active = containerRef.current?.ownerDocument?.activeElement
    for (const child of menuContainerRef.current?.children ?? []) {
      if (child === active) return true
    }
    return false
  }

  const handleFocus: FocusEventHandler = (event) => {
    if (event.target === containerRef.current) {
      setIsSubMenuOpen(true)
    }
    if (ContainerProps?.onFocus) {
      ContainerProps.onFocus(event)
    }
  }

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Escape') return
    if (isSubmenuFocused()) {
      e.stopPropagation()
    }
    const active = containerRef.current?.ownerDocument?.activeElement
    if (e.key === 'ArrowLeft' && isSubmenuFocused()) {
      containerRef.current?.focus()
    }
    if (e.key === 'ArrowRight' && e.target === containerRef.current && e.target === active) {
      const firstChild = menuContainerRef.current?.children[0] as HTMLElement
      firstChild?.focus()
    }
  }

  const open = isSubMenuOpen && parentMenuOpen

  const tabIndex = props.disabled ? undefined : tabIndexProp !== undefined ? tabIndexProp : -1

  return (
    <Box
      {...ContainerProps}
      ref={containerRef}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <MenuItem ref={menuItemRef as Ref<HTMLLIElement>} {...MenuItemProps}>
        {rightAnchored ? (
          <Box>
            {label}
            <Box sx={{ flexGrow: 1 }} />
            <ListItemIcon>
              <ArrowRightIcon fontSize="small" />
            </ListItemIcon>
          </Box>
        ) : (
          <>
            <ListItemIcon>
              <ArrowLeftIcon fontSize="small" />
            </ListItemIcon>
            {label}
          </>
        )}
      </MenuItem>

      <Menu
        open={!!open}
        autoFocus={false}
        disableAutoFocus
        disableEnforceFocus
        hideBackdrop
        anchorEl={menuItemRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: rightAnchored ? 'right' : 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: rightAnchored ? 'left' : 'right',
        }}
        onClose={() => {
          setIsSubMenuOpen(false)
        }}
        sx={{ pointerEvents: 'none' }}
      >
        <Box ref={menuContainerRef} sx={{ pointerEvents: 'auto' }}>
          {children}
        </Box>
      </Menu>
    </Box>
  )
})
