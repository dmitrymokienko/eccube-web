// @ts-expect-error - React is required for the ref to work
import React, { MouseEvent, Ref, forwardRef } from 'react'
import { CardWrapper } from './styles'
import { ICommonCardProps } from './types'

function CardRef<T>(props: ICommonCardProps<T>, ref?: Ref<HTMLElement>) {
  const {
    item,
    onClick,
    children,
    selected,
    disabled,
    outlined,
    component = 'div',
    sx = {},
  } = props

  const handleSelect = (e: MouseEvent<HTMLElement>) => {
    if (!disabled && onClick) onClick(e, item)
  }

  return (
    <CardWrapper
      ref={ref}
      onClick={handleSelect}
      component={component}
      selected={selected}
      disabled={disabled}
      outlined={outlined}
      sx={sx}
    >
      {children}
    </CardWrapper>
  )
}

export const Card = forwardRef(CardRef) as <T>(
  props: ICommonCardProps<T> & { ref?: Ref<HTMLElement> }
) => JSX.Element
