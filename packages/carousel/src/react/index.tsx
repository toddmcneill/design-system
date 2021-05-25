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
  track: () => glamor.css(stylesheet['.psds-carousel__track']),
  stage: () => glamor.css(stylesheet['.psds-carousel__stage']),
  item: () =>
    glamor.css(stylesheet['.psds-carousel__item']),
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
  const [previousActiveIndex, setPreviousActiveIndex] = React.useState<number>(-1)
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const [trackStyle, setTrackStyle] = React.useState<object>({left: 0})

  controlPrev = controlPrev || <Control direction={Control.directions.prev}/>
  controlNext = controlNext || <Control direction={Control.directions.next}/>
  size = size || Carousel.sizes.narrow

  const stageRef = React.createRef<HTMLDivElement>()
  const trackRef = React.createRef<HTMLUListElement>()

  const context = {
    activeIndex,
    previousActiveIndex,
    setActiveIndex,
    setPreviousActiveIndex,
    setTrackStyle,
    size,
    stageRef,
    trackRef,
    trackStyle,
    width
  }

  const perPage = calcItemsPerPage(size, width)
  const itemWidth = calcItemWidth(size, width)
  const numItems = React.Children.count(children)
  const handleItemFocus = (index: number) => (_evt: React.FocusEvent) => {
    if (index !== activeIndex) {
      setPreviousActiveIndex(activeIndex)
      setActiveIndex(index)
      setTrackStyle(getTrackStyleFor(perPage, itemWidth, numItems, index))
    }
  }

  // TODO: re-add swiping; then add snapping
  return (
    <CarouselContext.Provider value={context}>
      <div {...styles.carousel()} {...rest} ref={ref}>
        {controlPrev}
        <div {...styles.stage()} ref={stageRef}>
          <Track style={trackStyle} ref={trackRef}>{React.Children.map(children, (child, index) =>
            React.cloneElement(child, {index, onFocus: handleItemFocus(index)})
          )}</Track>
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
  index: number
}

export const Item: React.FC<ItemProps> = props => {
  const ref = React.createRef<HTMLLIElement>()
  const context = React.useContext(CarouselContext)
  // TODO: itemWidth in context
  const style = {flexBasis: calcItemWidth(context.size, context.width) + 'px'}
  return (
    <li {...styles.item()} {...props} style={style}></li>
  )
}
Item.displayName = 'Carousel.Item'
Carousel.Item = Item

// TODO: perPage in context
function getTrackStyleFor(perPage: number, itemWidth: number, numItems: number, index: number) {
  const isFirstPage = index < perPage
  let style = {left: 0}
  if (!isFirstPage) {
    const lastPageStartIndex = numItems - perPage
    const isLastPage = index >= lastPageStartIndex
    if (isLastPage) {
      style = {left: (-1 * lastPageStartIndex * (itemWidth + 16)) + 'px'}
    } else {
      style = {left: (-1 * index * (itemWidth + 16)) + 'px'}
    }
  }
  return style
}

// function itemIsOffscreen(context: CarouselContext, index: number) {
//   // console.log('testing offscreen', context.stageRef)
//   if (!context.stageRef.current) return false
//
//   const stageElement = context.stageRef.current
//   const itemElements =
//     context.trackRef.current?.children ?
//     Array.prototype.slice.call(context.trackRef.current.children)
//     : []
//
//   const stageRect = stageElement.getBoundingClientRect()
//   const itemRect = itemElements[index].getBoundingClientRect()
//   const isOffscreenLeft = stageRect.x > itemRect.x
//   const isOffscreenRight = stageRect.x + stageRect.width < itemRect.x
//   console.log({ stageX: stageRect.x, itemX: itemRect.x, stageWidth: stageRect.width, isOffscreenLeft, isOffscreenRight })
//   return isOffscreenLeft || isOffscreenRight
// }

interface ItemsProps
  extends HTMLPropsFor<'ul'>,
    Required<Pick<UseSwipeOpts, 'onSwipeLeft' | 'onSwipeRight'>> {
}

interface ItemsComponent extends RefForwardingComponent<ItemsProps, HTMLDivElement, {}> {
}

const Track = React.forwardRef<HTMLUListElement, ItemsProps>((props, forwardedRef) => {
  const {onSwipeLeft, onSwipeRight, ...rest} = props
  const context = React.useContext(CarouselContext)

  useSwipe(forwardedRef as React.MutableRefObject<HTMLUListElement>, {
    onSwipeLeft: onSwipeLeft,
    onSwipeRight: onSwipeRight
  })

  return <ul {...rest} ref={forwardedRef} {...styles.track()} />
}) as ItemsComponent
Track.displayName = 'Carousel.Track'
