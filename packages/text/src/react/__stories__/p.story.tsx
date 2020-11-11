import * as core from '@pluralsight/ps-design-system-core'
import { storiesOf } from '@storybook/react'
import * as glamor from 'glamor'
import React from 'react'

import P from '../p'

const style = { color: core.colorsPink.base }
const className = glamor
  .css({ color: `${core.colorsBlue.base} !important` })
  .toString()

const PaddingDecorator = (storyFn: () => React.ReactNode) => (
  <div style={{ padding: core.layout.spacingXLarge }}>{storyFn()}</div>
)

const stories = storiesOf('P', module).addDecorator(PaddingDecorator)

Object.keys(P.sizes).forEach(size =>
  stories.add(`size: ${size}`, () => (
    <P size={size as keyof typeof P.sizes}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam
      pharetra arcu in commodo. Cras faucibus ex id ligula aliquam, eget porta
      tortor efficitur. Duis eget ultrices ligula. Pellentesque laoreet massa
      interdum, venenatis sem pretium, efficitur enim. Vestibulum id nisi a
      massa tincidunt malesuada vitae non risus. Sed eget convallis libero. Nam
      ac libero luctus, euismod lectus eget, cursus nibh.
    </P>
  ))
)
stories.add('style override', () => (
  <P style={style}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam
    pharetra arcu in commodo. Cras faucibus ex id ligula aliquam, eget porta
    tortor efficitur. Duis eget ultrices ligula. Pellentesque laoreet massa
    interdum, venenatis sem pretium, efficitur enim. Vestibulum id nisi a massa
    tincidunt malesuada vitae non risus. Sed eget convallis libero. Nam ac
    libero luctus, euismod lectus eget, cursus nibh.
  </P>
))

stories.add('className override', () => (
  <P className={className}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam
    pharetra arcu in commodo. Cras faucibus ex id ligula aliquam, eget porta
    tortor efficitur. Duis eget ultrices ligula. Pellentesque laoreet massa
    interdum, venenatis sem pretium, efficitur enim. Vestibulum id nisi a massa
    tincidunt malesuada vitae non risus. Sed eget convallis libero. Nam ac
    libero luctus, euismod lectus eget, cursus nibh.
  </P>
))
