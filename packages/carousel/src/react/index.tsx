/* eslint-disable react/jsx-handler-names */
import {
  HTMLPropsFor,
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
  const [stageOffset, setStageOffset] = React.useState<number>(0)

  controlPrev = controlPrev || <Control direction={Control.directions.prev}/>
  controlNext = controlNext || <Control direction={Control.directions.next}/>
  size = size || Carousel.sizes.narrow

  const stageRef = React.createRef<HTMLDivElement>()
  const perPage = calcItemsPerPage(size, width)
  const itemWidth = calcItemWidth(size, width)
  const numItems = React.Children.count(children)
  const leftMostVisibleIndex = calculateLeftMostVisibleIndex(itemWidth, stageOffset)
  console.log({ leftMostVisibleIndex, stageOffset, activeIndex })

  // TODO: handle left right arrows, page one item width at a time, don't change activeIndex
  // TODO: test this with 3+ pages, from the middle of a range. Might need to adjust to move the track perPage * itemWidth from current trackOffset instead of calc by index
  // TODO: fix, page of 3, doesn't get to last page
  const next = () => {
    const offset = calcStageOffsetForPageAt(perPage, itemWidth, numItems, leftMostVisibleIndex + perPage)
    setStageOffset(offset)
    stageRef.current.scrollLeft = offset
  }

  const prev = () => {
    const offset = calcStageOffsetForPageAt(perPage, itemWidth, numItems, leftMostVisibleIndex - perPage)
    setStageOffset(offset)
    stageRef.current.scrollLeft = offset
  }

  const isPrevVisible = leftMostVisibleIndex > 0
  const isNextVisible = leftMostVisibleIndex < numItems - perPage

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
    }

    // TODO: put in iff?
    if (index >= leftMostVisibleIndex + perPage) {
      const offset = calcStageOffsetForward(perPage, itemWidth, index)
      setStageOffset(offset)
      stageRef.current.scrollLeft = offset
    } else if (index < leftMostVisibleIndex) {
      const offset = calcStageOffsetBackward(itemWidth, index)
      setStageOffset(offset)
      stageRef.current.scrollLeft = offset
    }
  }

  // TODO: re-add swiping; then add snapping
  // TODO: rm stage id
  return (
    <CarouselContext.Provider value={context}>
      <div {...styles.carousel()} {...rest} ref={ref}>
        {controlPrev}
        <div {...styles.stage()} ref={stageRef}>
          <Track>{React.Children.map(children, (child, index) =>
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

type Direction = 'forward' | 'backward'

function calcStageOffsetBackward(itemWidth: number, index: number) {
  return index * (itemWidth + 16)
}

function calcStageOffsetForward(perPage: number, itemWidth: number, index: number) {
  return (index - perPage + 1) * (itemWidth + 16)
}

function calcStageOffsetForPageAt(perPage: number, itemWidth: number, numItems: number, index: number) {
  const isFirstPage = index < perPage
  let left = 0
  if (!isFirstPage) {
    const lastPageStartIndex = numItems - perPage
    const isLastPage = index >= lastPageStartIndex
    if (isLastPage) {
      // TODO: gutter constants
      left = lastPageStartIndex * (itemWidth + 16)
    } else {
      left = index * (itemWidth + 16)
    }
  }
  return left
}

// TODO: add tests for cases
function calculateLeftMostVisibleIndex(itemWidth: number, stageOffset: number) {
  return Math.ceil(stageOffset / (itemWidth + 16))
}

interface TrackProps
  extends HTMLPropsFor<'ul'>,
    Required<Pick<UseSwipeOpts, 'onSwipeLeft' | 'onSwipeRight'>> {
}
const Track: React.FC<TrackProps> = props => {
  const ref = React.createRef<HTMLUListElement>()
  const {onSwipeLeft, onSwipeRight, ...rest} = props

  useSwipe(ref as React.MutableRefObject<HTMLUListElement>, {
    onSwipeLeft: onSwipeLeft,
    onSwipeRight: onSwipeRight
  })

  // TODO: rm id
  return <ul {...rest} ref={ref} {...styles.track()} />
}
Track.displayName = 'Carousel.Track'

