import Theme, { useTheme } from '@pluralsight/ps-design-system-theme'
import { CaretDownIcon } from '@pluralsight/ps-design-system-icon'
import {
  ValueOf,
  combineFns,
  omit,
  HTMLPropsFor,
  RefFor
} from '@pluralsight/ps-design-system-util'
import { StyleAttribute, compose, css } from 'glamor'
import React, {
  ReactElement,
  ReactNode,
  cloneElement,
  forwardRef,
  useState
} from 'react'

import stylesheet from '../css'

import { useHideLabels } from './context'
import { List, CollapsibleList } from './list'

type StyleFn = (
  themeName?: ValueOf<keyof typeof Theme.names>,
  props?: Record<string, unknown>
) => StyleAttribute

const styles: { [key: string]: StyleFn } = {
  item: themeName => {
    const label = 'verticaltabs__item'

    return compose(
      css({ label }),
      css(stylesheet[`.psds-${label}`]),
      css(stylesheet[`.psds-${label}.psds-theme--${themeName}`])
    )
  },

  itemIcon: () => css(stylesheet['.psds-verticaltabs__item__icon']),
  itemIconActive: () =>
    css(stylesheet['.psds-verticaltabs__item__icon--active']),

  itemTier: (themeName, props: { type: string }) => {
    const label = `verticaltabs__${props.type}`

    return compose(
      css({ label }),
      css(stylesheet[`.psds-${label}`]),
      css(stylesheet[`.psds-${label}.psds-theme--${themeName}`])
    )
  },

  tier1Header: () => {
    const label = `verticaltabs__tier1__header`

    return compose(css({ label }), css(stylesheet[`.psds-${label}`]))
  },
  tier1HeaderInner: () => {
    const label = `verticaltabs__tier1__header__inner`

    return compose(css({ label }), css(stylesheet[`.psds-${label}`]))
  },

  tier2Header: () => {
    const label = `verticaltabs__tier2__header`

    return compose(css({ label }), css(stylesheet[`.psds-${label}`]))
  },

  tierHeaderLabel: (_themeName, props: { hideLabels: boolean }) => {
    const label = `verticaltabs__header__label`

    return compose(
      css({ label }),
      css(stylesheet[`.psds-${label}`]),
      props.hideLabels && css(stylesheet[`.psds-${label}--hide-labels`])
    )
  },
  tierHeaderLabelIcon: (_themeName, props: { collapsed: boolean }) => {
    const label = `verticaltabs__header__label__icon`

    return compose(
      css({ label }),
      css(stylesheet[`.psds-${label}`]),
      props.collapsed && css(stylesheet[`.psds-${label}--collapsed`])
    )
  }
}

interface ItemProps extends HTMLPropsFor<'li'> {
  active?: ReactNode
  collapsed?: boolean
  collapsible?: boolean
  header?: ReactElement
  itemType?: string
}

interface ItemHeaderBaseProps {
  active?: boolean
  collapsed?: boolean
  collapsible?: boolean
  icon?: ReactElement
}
interface AnchorHeaderProps extends ItemHeaderBaseProps, HTMLPropsFor<'a'> {
  onclick?: undefined
  href?: string
}
interface ButtonHeaderProps
  extends ItemHeaderBaseProps,
    HTMLPropsFor<'button'> {
  onclick?: React.MouseEventHandler
  href?: undefined
}
interface SpanHeaderProps extends ItemHeaderBaseProps, HTMLPropsFor<'span'> {
  onclick?: undefined
  href?: undefined
}

type ItemHeaderProps = AnchorHeaderProps | ButtonHeaderProps | SpanHeaderProps

const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    active,
    collapsed: initialCollapsed = false,
    collapsible = false,
    children,
    header,
    onClick,
    itemType: type,
    ...rest
  } = props

  const [collapsed, setCollapsed] = useState<boolean>(initialCollapsed)
  const themeName = useTheme()

  const handleHeaderClick = combineFns<[React.MouseEvent<HTMLLIElement>]>(
    () => {
      setCollapsed(!collapsed)
    },
    onClick
  )
  const ListComp = collapsible ? CollapsibleList : List

  return (
    <li ref={ref} {...rest}>
      <div
        {...styles.item(themeName)}
        {...styles.itemTier(themeName, { type })}
        {...(active && { 'data-active': true })}
      >
        {cloneElement(header, {
          active,
          collapsed,
          collapsible,
          ...(collapsible && { onClick: handleHeaderClick })
        })}
      </div>

      {children && <ListComp collapsed={collapsed}>{children}</ListComp>}
    </li>
  )
})

Item.displayName = 'VerticalTabs.Item'

interface Tier1Props extends Omit<React.ComponentProps<typeof Item>, 'header'> {
  header: ReactElement<typeof Tier1Header>
}
const Tier1: React.FC<Tier1Props> & { Header: typeof Tier1Header } = props => (
  <Item {...props} itemType="tier1" />
)

const Tier1Header = forwardRef<any, ItemHeaderProps>((props, ref) => {
  const { active, collapsed, collapsible, children, icon, ...rest } = props
  const hideLabels = useHideLabels()
  const Tag: React.FC = wrapperProps =>
    rest.href ? (
      <a {...wrapperProps} ref={ref as RefFor<'a'>} />
    ) : rest.onClick ? (
      <button {...wrapperProps} ref={ref as RefFor<'button'>} />
    ) : (
      <span {...wrapperProps} ref={ref as RefFor<'span'>} />
    )
  return (
    <Tag {...styles.tier1Header()} {...rest}>
      {icon &&
        cloneElement(icon, {
          size: CaretDownIcon.sizes.medium,
          ...styles.itemIcon(),
          ...(active ? { 'data-active': true } : {})
        })}

      <span {...styles.tierHeaderLabel(null, { hideLabels })}>{children}</span>

      {collapsible && (
        <CaretDownIcon
          size={CaretDownIcon.sizes.small}
          {...styles.tierHeaderLabelIcon(null, { collapsed })}
        />
      )}
    </Tag>
  )
})

Tier1.Header = Tier1Header

Tier1.displayName = 'VerticalTabs.Tier1'
Tier1.Header.displayName = 'VerticalTabs.Tier1.Header'

interface Tier2Props extends Omit<React.ComponentProps<typeof Item>, 'header'> {
  header: ReactElement<typeof Tier1Header>
}

const Tier2: React.FC<Tier2Props> & {
  Header: typeof Tier2Header
} = props => {
  return <Item {...props} itemType="tier2" />
}

const Tier2Header = forwardRef<any, ItemHeaderProps>((props, ref) => {
  const hideLabels = useHideLabels()

  // NOTE: some props are given during clone that are not used as should not be
  //       passed to the underlying dom node
  const rest = omit(props as any, ['active', 'collapsed', 'collapsible'])
  const Tag: React.FC = wrapperProps =>
    rest.href ? (
      <a {...wrapperProps} ref={ref as RefFor<'a'>} />
    ) : rest.onClick ? (
      <button {...wrapperProps} ref={ref as RefFor<'button'>} />
    ) : (
      <span {...wrapperProps} ref={ref as RefFor<'span'>} />
    )

  return (
    <Tag {...styles.tier2Header} {...rest}>
      <span {...styles.tierHeaderLabel(null, { hideLabels })}>
        {props.children}
      </span>
    </Tag>
  )
})

Tier2.Header = Tier2Header

Tier2.displayName = 'VerticalTabs.Tier2'
Tier2.Header.displayName = 'VerticalTabs.Tier2.Header'

export default Item
export { Tier1, Tier2 }
