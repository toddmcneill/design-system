import React from 'react'

import * as vars from '../vars/index'

interface CarouselContextValue {
  next: () => void
  prev: () => void
  activeIndex: number
  itemElements: HTMLLIElement[]
  previousActiveIndex: number
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  setPreviousActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  setTrackStyle: React.Dispatch<React.SetStateAction<object>>,
  size: typeof vars.sizes
  stageRef: React.MutableRef<HTMLDivElement>
  trackRef: React.MutableRef<HTMLUListElement>
  trackStyle: object
  width: number
}
const context = React.createContext<CarouselContextValue>({
  next: () => {},
  prev: () => {},
  size: vars.sizes.narrow
})

export default context
