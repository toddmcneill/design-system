/* eslint-disable react/jsx-handler-names */
import {
  HTMLPropsFor,
  RefForwardingComponent,
  ValueOf,
  useResizeObserver
} from '@pluralsight/ps-design-system-util'
import glamorDefault, * as glamorExports from 'glamor'
import React from 'react'

import CarouselContext from './context'
import {Control} from './control'
import stylesheet from '../css/index'
import useSwipe, {UseSwipeOpts} from './use-swipe'
import * as vars from '../vars/index'
import {calcItemWidth, calcItemsPerPage} from "../js";

const glamor = glamorDefault || glamorExports

const styles = {
  carousel: () =>
    glamor.css(stylesheet['.psds-carousel']),
  pages: () => glamor.css(stylesheet['.psds-carousel__items']),
  stage: () => glamor.css(stylesheet['.psds-carousel__stage']),
  item: (size: typeof vars.sizes) =>
    glamor.compose(
      glamor.css(stylesheet['.psds-carousel__item']),
      glamor.css(stylesheet[`.psds-carousel__item--${size}`])
    )
}

interface CarouselProps extends HTMLPropsFor<'div'> {
  children: React.ReactNode
  controlPrev?: React.ReactNode
  controlNext?: React.ReactNode
  size?: ValueOf<typeof vars.sizes>
  uniqueId?: (prefix: string) => string
}

interface CarouselStatics {
  Control: typeof Control
  Item: typeof Item
  sizes: typeof vars.sizes
}

type CarouselComponent = React.FC<CarouselProps> & CarouselStatics

const Carousel: CarouselComponent = ({
                                       children,
                                       controlPrev,
                                       controlNext,
                                       size,
                                       uniqueId,
                                       ...rest
                                     }) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const {width} = useResizeObserver(ref)

  controlPrev = controlPrev || <Control direction={Control.directions.prev}/>
  controlNext = controlNext || <Control direction={Control.directions.next}/>
  size = size || Carousel.sizes.narrow

  const stageRef = React.createRef()
  const itemsRef = React.createRef()

  const handleItemsKeyUp = (evt: React.KeyboardEvent) => {
    // const stageX = stageRef.current?.getBoundingClientRect().x
    // const itemsX = itemsRef.current?.getBoundingClientRect().x
    // const itemWidth = calcItemWidth(width, size)
    //
    // const items = Array.prototype.slice.call(itemsRef.current?.children)
    //
    // items.forEach(item => {
    //   // TODO: canUseDOM
    //   if (item.contains(document.activeElement)) {
    //     const offsetFromParent = item.getBoundingClientRect().x - stageX
    //
    //     // stageRef.current?.style.left = `${stageX - offsetFromParent}px`
    //     console.log('focused li, off from parent', offsetFromParent)
    //   }
    // })

    // console.log('up', stageX - itemsX)
  }

  // TODO: re-add swiping; then add snapping
  return (
    <CarouselContext.Provider value={{size, width}}>
      <div {...styles.carousel()} {...rest} ref={ref}>
        {controlPrev}
        <div {...styles.stage()} ref={stageRef}>
          <Items onKeyUp={handleItemsKeyUp} ref={itemsRef}>{children}</Items>
        </div>
        {controlNext}
      </div>
    </CarouselContext.Provider>
  )
}
export default Carousel
Carousel.Control = Control
Carousel.sizes = vars.sizes

interface ItemProps extends HTMLPropsFor<'li'> {
}

export const Item: React.FC<ItemProps> = props => {
  const ref = React.createRef<HTMLLIElement>()
  const context = React.useContext(CarouselContext)
  const style = {flexBasis: calcItemWidth(context.size, context.width) + 'px'}
  const handleFocus = (evt: React.FocusEvent) => {
    /*
      setActiveElement(el: DOMElement): void
      isActiveElement(el: DOMElement): boolean
      isItemVisible(el: DOMElement): boolean
      isShiftTabbing(el: DOMElement): boolean
      isTabbing(el: DOMElement): boolean
      styleTrackForListItemStageLeft(el: DOMElement): void
      styleTrackForListItemStageRight(el: DOMElement): void
     */
    // known active element
    // if this is not active element
    //  set active element to this
    // ensure active element is visible
    // if last active element X is > this.X, then shift-tabbing
    //   set track.left such that this.X is equal to stage.X
    // if last active element X is < this.X, then tabbing
    //   set track.left such that this.X is equal to stage.X + (perPage - 1 * itemWidth)
    console.log('item focus self', evt.target)
  }
  return (
    <li onFocus={handleFocus} {...styles.item(context.size)} {...props} style={style}></li>
  )
}
Item.displayName = 'Carousel.Item'
Carousel.Item = Item

interface ItemsProps
  extends HTMLPropsFor<'ul'>,
    Required<Pick<UseSwipeOpts, 'onSwipeLeft' | 'onSwipeRight'>> {
}

interface ItemsComponent extends RefForwardingComponent<ItemsProps, HTMLDivElement, {}> {
}

const Items = React.forwardRef<HTMLUListElement, ItemsProps>((props, forwardedRef) => {
  const {onSwipeLeft, onSwipeRight, ...rest} = props
  // const context = React.useContext(CarouselContext)

  useSwipe(forwardedRef as React.MutableRefObject<HTMLUListElement>, {
    onSwipeLeft: onSwipeLeft,
    onSwipeRight: onSwipeRight
  })

  return <ul ref={forwardedRef} {...styles.pages()} {...rest} />
}) as ItemsComponent
Items.displayName = 'Carousel.Items'
