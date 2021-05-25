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
  const [activeIndex, setActiveIndex] = React.useState<number>(0)
  const [trackStyle, setTrackStyle] = React.useState<object>({left: 0})

  controlPrev = controlPrev || <Control direction={Control.directions.prev}/>
  controlNext = controlNext || <Control direction={Control.directions.next}/>
  size = size || Carousel.sizes.narrow

  const trackRef = React.createRef<HTMLUListElement>()
  const perPage = calcItemsPerPage(size, width)
  const itemWidth = calcItemWidth(size, width)
  const numItems = React.Children.count(children)
  const currentTrackOffset = getTrackOffset(trackStyle)
  const leftMostVisibleIndex = calculateLeftMostVisibleIndex(itemWidth, currentTrackOffset)

  // TODO: handle left right arrows, page one item width at a time, don't change activeIndex
  // TODO: test this with 3+ pages, from the middle of a range. Might need to adjust to move the track perPage * itemWidth from current trackOffset instead of calc by index
  // TODO: fix, page of 3, doesn't get to last page
  const next = () => {
    setTrackStyle(getTrackStyleFor(perPage, itemWidth, numItems, leftMostVisibleIndex + perPage))
  }

  const prev = () => {
    setTrackStyle(getTrackStyleFor(perPage, itemWidth, numItems, leftMostVisibleIndex - perPage))
  }

  const isPrevVisible = leftMostVisibleIndex > 0
  const isNextVisible = leftMostVisibleIndex < numItems - perPage
  console.log({leftMostVisibleIndex, currentTrackOffset, activeIndex, itemWidth})

  const context = {
    next,
    prev,
    isNextVisible,
    isPrevVisible,
    itemWidth: calcItemWidth(size, width)
  }

  const handleItemFocus = (index: number) => (_evt: React.FocusEvent) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
      setTrackStyle(getTrackStyleFor(perPage, itemWidth, numItems, index))
    }
  }

  // TODO: re-add swiping; then add snapping
  return (
    <CarouselContext.Provider value={context}>
      <div {...styles.carousel()} {...rest} ref={ref}>
        {controlPrev}
        <div {...styles.stage()}>
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
  const context = React.useContext(CarouselContext)
  const style = {flexBasis: context.itemWidth + 'px'}
  return (
    <li {...styles.item()} {...props} style={style}></li>
  )
}
Item.displayName = 'Carousel.Item'
Carousel.Item = Item

function getTrackOffset(style: React.CSSProperties) {
  return parseInt(style.left, 10)
}

// TODO: might have an off-by-1 error; on the first off-screen item focus
function calculateTrackOffsetFor(perPage: number, itemWidth: number, numItems: number, index: number) {
  const isFirstPage = index < perPage
  let left = 0
  if (!isFirstPage) {
    const lastPageStartIndex = numItems - perPage
    const isLastPage = index >= lastPageStartIndex
    console.log({isLastPage, index, lastPageStartIndex})
    if (isLastPage) {
      // TODO: gutter constants
      left = (-1 * lastPageStartIndex * (itemWidth + 16))
    } else {
      left = (-1 * index * (itemWidth + 16))
    }
  }
  return left
}

// TODO: add tests for cases
function calculateLeftMostVisibleIndex(itemWidth: number, trackOffset: number) {
  return trackOffset / (-1 * (itemWidth + 16))
}


function getTrackStyleFor(perPage: number, itemWidth: number, numItems: number, index: number) {
  return {left: calculateTrackOffsetFor(perPage, itemWidth, numItems, index) + 'px'}
}

interface ItemsProps
  extends HTMLPropsFor<'ul'>,
    Required<Pick<UseSwipeOpts, 'onSwipeLeft' | 'onSwipeRight'>> {
}

interface ItemsComponent extends RefForwardingComponent<ItemsProps, HTMLDivElement, {}> {
}

const Track = React.forwardRef<HTMLUListElement, ItemsProps>((props, forwardedRef) => {
  const {onSwipeLeft, onSwipeRight, ...rest} = props

  useSwipe(forwardedRef as React.MutableRefObject<HTMLUListElement>, {
    onSwipeLeft: onSwipeLeft,
    onSwipeRight: onSwipeRight
  })

  return <ul {...rest} ref={forwardedRef} {...styles.track()} />
}) as ItemsComponent
Track.displayName = 'Carousel.Track'

