import React from 'react'

import * as vars from '../vars/index'

interface CarouselContextValue {
  size: typeof vars.sizes
  width: number
}
const context = React.createContext<CarouselContextValue>({
  size: vars.sizes.narrow
})

export default context
