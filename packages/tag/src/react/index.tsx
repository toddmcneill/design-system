import Halo from '@pluralsight/ps-design-system-halo'
import { sizes as iconSizes } from '@pluralsight/ps-design-system-icon'
import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import {
  HTMLPropsFor,
  RefFor,
  ValueOf
} from '@pluralsight/ps-design-system-util'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import stylesheet from '../css/index'
import * as vars from '../vars/index'

const glamor = glamorDefault || glamorExports

const styles = {
  tag: ({
    themeName,
    clickable,
    icon,
    isPressed,
    size
  }: {
    themeName: ValueOf<typeof themeNames>
    clickable: boolean
    icon: boolean
    isPressed: boolean
    size: ValueOf<typeof vars.sizes>
  }) => {
    const label = 'psds-tag'

    return glamor.compose(
      glamor.css(stylesheet[`.${label}`]),
      glamor.css(stylesheet[`.${label}.psds-theme--${themeName}`]),
      clickable && glamor.css(stylesheet[`.${label}--clickable`]),
      clickable &&
        glamor.css(stylesheet[`.${label}--clickable.psds-theme--${themeName}`]),
      glamor.css(stylesheet[`.${label}--size-${size}`]),
      icon && glamor.css(stylesheet[`.${label}--icon`]),
      isPressed && glamor.css(stylesheet[`.${label}--isPressed`]),
      isPressed &&
        clickable &&
        glamor.css(stylesheet[`.${label}--isPressed.${label}--clickable`])
    )
  },
  label: (themeName: ValueOf<typeof themeNames>, icon: boolean) => {
    const label = 'psds-tag__label'

    return glamor.compose(
      glamor.css(stylesheet[`.${label}`]),
      glamor.css(stylesheet[`.${label}.psds-theme--${themeName}`]),
      icon && stylesheet[`.${label}--icon`]
    )
  }
}

export interface BaseTagProps {
  error?: boolean
  icon?: React.ReactElement
  isPressed?: boolean
  size?: ValueOf<typeof vars.sizes>
}

interface AnchorProps extends BaseTagProps, HTMLPropsFor<'a'> {
  href: string
}
interface DivProps extends BaseTagProps, HTMLPropsFor<'div'> {
  href?: undefined
}

type TagElement = HTMLAnchorElement | HTMLDivElement
type TagProps = AnchorProps | DivProps
type TagComponent = React.ForwardRefExoticComponent<unknown> & {
  (props: AnchorProps, ref?: RefFor<'a'>): JSX.Element
  (props: DivProps, ref?: RefFor<'div'>): JSX.Element
}

export interface TagStatics {
  sizes: typeof vars.sizes
}

const Tag = React.forwardRef<TagElement, TagProps>((props, ref) => {
  const {
    children,
    error = false,
    icon,
    isPressed = false,
    href,
    size = vars.sizes.medium,
    ...rest
  } = props

  const isAnchor = 'href' in props
  const themeName = useTheme()

  const Wrapper: React.FC = wrapperProps =>
    isAnchor ? (
      <a
        href={href}
        ref={ref as RefFor<'a'>}
        {...(rest as HTMLPropsFor<'a'>)}
        {...wrapperProps}
      />
    ) : (
      <div
        ref={ref as RefFor<'div'>}
        {...(rest as HTMLPropsFor<'div'>)}
        {...wrapperProps}
      />
    )

  return (
    <Halo error={error} shape={Halo.shapes.pill} inline>
      <Wrapper
        {...(isPressed && !isAnchor && { 'aria-pressed': true })}
        {...(Boolean(props.onClick) && { role: 'button', tabIndex: 0 })}
        {...styles.tag({
          themeName,
          clickable: Boolean(props.onClick || href),
          icon: Boolean(icon),
          isPressed,
          size
        })}
      >
        <Label icon={Boolean(icon)}>{children}</Label>
        {renderIcon(icon, size)}
      </Wrapper>
    </Halo>
  )
}) as TagComponent & TagStatics

Tag.displayName = 'Tag'
Tag.sizes = vars.sizes

interface LabelProps extends HTMLPropsFor<'span'> {
  icon: boolean
}
const Label: React.FC<LabelProps> = ({ icon, ...props }) => {
  const themeName = useTheme()

  return <span {...styles.label(themeName, icon)} {...props} />
}

const renderIcon = (
  icon?: React.ReactElement,
  size?: ValueOf<typeof sizes>
) => {
  if (!icon) return null

  const style = {
    cursor: icon.props.onClick ? 'pointer' : 'default'
  }
  const onClick = (evt: React.MouseEvent) => {
    evt.stopPropagation()
    if (icon.props.onClick) icon.props.onClick(evt)
  }

  return React.cloneElement(icon, {
    style,
    onClick,
    size: size === vars.sizes.small ? iconSizes.small : iconSizes.medium
  })
}

export const sizes = vars.sizes
export default Tag
