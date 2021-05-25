import React from 'react'

import * as vars from '../vars/index'

interface CarouselContextValue {
  next: () => void
  prev: () => void
  isPrevVisible: boolean
  isNextVisible: boolean
  itemWidth: number
}
const context = React.createContext<CarouselContextValue>({
  next: () => {},
  prev: () => {},
})

export default context
