import * as React from 'react'
import {
  canUseDOM,
  cloneElementWithRef,
  createUniversalPortal
} from '@pluralsight/ps-design-system-util'

import * as positionFns from '../js'
import useOnWindowResize from './use-on-window-resize'
import useOnWindowScroll from './use-on-window-scroll'

export const Above = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.above} ref={ref} {...props} />
})
Above.displayName = 'Above'

export const AboveLeft = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.aboveLeft} ref={ref} {...props} />
})
AboveLeft.displayName = 'AboveLeft'

export const AboveRight = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.aboveRight} ref={ref} {...props} />
})
AboveRight.displayName = 'AboveRight'

export const Below = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.below} ref={ref} {...props} />
})
Below.displayName = 'Below'

export const BelowLeft = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.belowLeft} ref={ref} {...props} />
})
BelowLeft.displayName = 'BelowLeft'

export const BelowRight = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.belowRight} ref={ref} {...props} />
})
BelowRight.displayName = 'BelowRight'

export const RightOf = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.rightOf} ref={ref} {...props} />
})
RightOf.displayName = 'RightOf'

export const LeftOf = React.forwardRef<
  HTMLElement,
  Omit<PositionProps, 'position'>
>((props, ref) => {
  return <Position position={positionFns.leftOf} ref={ref} {...props} />
})
LeftOf.displayName = 'LeftOf'

interface PositionProps extends React.HTMLAttributes<HTMLElement> {
  inNode?: HTMLElement
  position: positionFns.PositionFunction
  show?: React.ReactElement & { ref: React.RefObject<HTMLElement> }
  target?: React.RefObject<HTMLElement>
  when?: boolean
}
const Position = React.forwardRef<HTMLElement, PositionProps>(
  (props, forwardedRef) => {
    const { target, position: positionFn } = props
    const inNode = props.inNode || (canUseDOM() ? document.body : null)
    const when = typeof props.when === 'boolean' ? props.when : true

    const [shownOnce, setShownOnce] = React.useState(false)
    const [style, setStyle] = React.useState({ position: 'absolute' })

    const ref = React.useRef()
    React.useImperativeHandle(forwardedRef, () => ref.current)

    const child = React.Children.only(props.children)
    const innerRef = React.useRef()
    const showRef = props.show.ref || innerRef
    const showEl = React.cloneElement(props.show, {
      ref: showRef,
      style: { ...(props.show.props as any).style, ...style }
    })

    const updateStyle = React.useCallback(() => {
      const targetNode =
        target instanceof HTMLElement
          ? target
          : target !== undefined
          ? target.current
          : ref.current
      if (!showRef.current || !targetNode) return

      const nextStyle = positionFn(targetNode).styleFor(showRef.current)
      setStyle(nextStyle)
      setShownOnce(true)
    }, [positionFn, target, showRef.current])

    useOnWindowResize(evt => updateStyle())
    useOnWindowScroll(evt => {
      const isInner = !showRef.current || showRef.current.contains(evt.target)
      if (isInner) return

      updateStyle()
    })
    React.useEffect(() => {
      if (!when) return
      const timerId = delayUntilNextTick(() => updateStyle())

      return () => clearTimeout(timerId)
    }, [updateStyle, when])

    return (
      <>
        {target
          ? child
          : cloneElementWithRef<React.HTMLAttributes<HTMLElement>, HTMLElement>(
              child as any,
              ref,
              {}
            )}

        {createUniversalPortal(
          <div style={{ visibility: shownOnce ? 'visible' : 'hidden' }}>
            {when && showEl}
          </div>,
          inNode
        )}
      </>
    )
  }
)

function delayUntilNextTick(fn) {
  // eslint-disable-next-line
  return setTimeout(fn, 1)
}
