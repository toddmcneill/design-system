import Halo from '@pluralsight/ps-design-system-halo'
import {
  useTheme,
  names as themeNames
} from '@pluralsight/ps-design-system-theme'
import {
  ValueOf,
  isFunction,
  RefForwardingComponent,
  HTMLPropsFor,
  RefFor
} from '@pluralsight/ps-design-system-util'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import stylesheet from '../css/index'
import * as vars from '../vars/index'

const glamor = glamorDefault || glamorExports

const styles = {
  switch: (disabled: boolean, labelAlign: ValueOf<typeof vars.labelAligns>) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-switch']),
      glamor.css(stylesheet[`.psds-switch--labelAlign-${labelAlign}`]),
      disabled && glamor.css(stylesheet['.psds-switch--disabled'])
    ),

  track: (props: {
    themeName: ValueOf<typeof themeNames>
    checked: boolean
    color: ValueOf<typeof vars.colors>
    size: ValueOf<typeof vars.sizes>
  }) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-switch__track']),
      glamor.css(
        stylesheet[`.psds-switch__track.psds-theme--${props.themeName}`]
      ),
      props.checked &&
        glamor.css(
          stylesheet[
            `.psds-switch__track--checked.psds-switch__track--color-${props.color}`
          ]
        ),
      glamor.css(
        stylesheet[`.psds-switch__track.psds-switch__track--size-${props.size}`]
      )
    ),

  thumb: (checked: boolean, size: ValueOf<typeof vars.sizes>) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-switch__thumb']),
      glamor.css(stylesheet[`.psds-switch__thumb--size-${size}`]),
      checked &&
        glamor.css(
          stylesheet[
            `.psds-switch__thumb--checked.psds-switch__thumb--size-${size}`
          ]
        )
    ),

  label: (props: {
    themeName: ValueOf<typeof themeNames>
    labelAlign: ValueOf<typeof vars.labelAligns>
    size: ValueOf<typeof vars.sizes>
  }) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-switch__label']),
      glamor.css(stylesheet[`.psds-switch__label--size-${props.size}`]),
      glamor.css(
        stylesheet[
          `.psds-switch__label--size-${props.size}.psds-switch__label--labelAlign-${props.labelAlign}`
        ]
      ),
      glamor.css(
        stylesheet[`.psds-switch__label.psds-theme--${props.themeName}`]
      )
    ),

  checkbox: () => glamor.css(stylesheet['.psds-switch__checkbox'])
}

interface SwitchStatics {
  colors: typeof vars.colors
  sizes: typeof vars.sizes
  labelAligns: typeof vars.labelAligns
}

interface SwitchProps extends Omit<HTMLPropsFor<'label'>, 'onClick'> {
  checked?: boolean
  color?: ValueOf<typeof vars.colors>
  disabled?: boolean
  error?: boolean
  labelAlign?: ValueOf<typeof vars.labelAligns>
  onBlur?: React.FocusEventHandler
  onClick?: (checked: boolean) => void
  onFocus?: React.FocusEventHandler
  size?: ValueOf<typeof vars.sizes>
  tabIndex?: number
}

interface SwitchComponent
  extends RefForwardingComponent<
    SwitchProps,
    HTMLInputElement | HTMLLabelElement,
    SwitchStatics
  > {}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      color = vars.colors.orange,
      disabled = false,
      error = false,
      labelAlign = vars.labelAligns.right,
      size = vars.sizes.large,
      tabIndex = 0,
      onClick,
      onBlur,
      onFocus,
      children,
      style,
      className,
      ...rest
    },
    forwardedRef
  ) => {
    const ref = React.useRef<HTMLInputElement>()
    React.useImperativeHandle(
      forwardedRef,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      () => ref.current as HTMLInputElement
    )

    const themeName = useTheme()
    const [isFocused, setIsFocused] = React.useState(false)

    const handleBlur = (evt: React.FocusEvent) => {
      setIsFocused(false)
      onBlur && onBlur(evt)
    }

    function handleClick(evt: React.MouseEvent) {
      if (disabled || !isFunction(onClick)) return
      evt.preventDefault()
      onClick && onClick(!checked)
    }

    const handleFocus = (evt: React.FocusEvent) => {
      setIsFocused(true)
      onFocus && onFocus(evt)
    }

    return (
      <label
        className={className}
        style={style}
        aria-checked={checked}
        role="checkbox"
        {...styles.switch(disabled, labelAlign)}
        {...(disabled && { tabIndex: -1 })}
        onClick={handleClick}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...rest}
      >
        <Halo error={error} shape={Halo.shapes.pill} inline visible={isFocused}>
          <div {...styles.track({ themeName, checked, color, size })}>
            <div {...styles.thumb(checked, size)} />
          </div>
        </Halo>

        <input
          checked={checked}
          readOnly
          ref={ref as RefFor<'input'>}
          tabIndex={-1}
          type="checkbox"
          {...styles.checkbox()}
        />

        {children && (
          <span {...styles.label({ themeName, labelAlign, size })}>
            {children}
          </span>
        )}
      </label>
    )
  }
) as SwitchComponent

Switch.displayName = 'Switch'

Switch.colors = vars.colors
Switch.sizes = vars.sizes
Switch.labelAligns = vars.labelAligns

export const colors = vars.colors
export const sizes = vars.sizes
export const labelAligns = vars.labelAligns

export default Switch
