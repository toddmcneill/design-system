import {sizes} from '../vars/index'
import * as vars from "../vars";

const cardCountsPerWidth = {
  // TODO: make narrow values reasonable
  narrow: [
    {min: 1401, max: 9999, count: 6},
    {min: 1201, max: 1400, count: 5},
    {min: 901, max: 1200, count: 4},
    {min: 701, max: 900, count: 3},
    {min: 401, max: 700, count: 2},
    {min: 0, max: 400, count: 1},
  ],
  wide: [
    {min: 1401, max: 9999, count: 6},
    {min: 1201, max: 1400, count: 5},
    {min: 901, max: 1200, count: 4},
    {min: 701, max: 900, count: 3},
    {min: 401, max: 700, count: 2},
    {min: 0, max: 400, count: 1},
  ],
}

export function calcItemsPerPage(
  itemSize: typeof sizes,
  containerWidth: number
): number {
  const level = cardCountsPerWidth[itemSize].find(level => {
    return containerWidth >= level.min && containerWidth <= level.max
  })
  return level.count
}

export function calcItemWidth(itemSize: typeof vars.sizes, containerWidth: number) {
  const perPage = calcItemsPerPage(itemSize, containerWidth)
  const numMid = perPage - 2 > 0 ? perPage - 2 : 0
  const numEnd = perPage > 1 ? perPage - numMid : 0
  const itemWidth = (containerWidth / perPage) - ((numMid * 16 + numEnd * 8) / perPage)
  console.log('calc item width', {perPage, numMid, numEnd, containerWidth, itemWidth})
  return itemWidth
}

export const isLeftArrow = (evt: React.KeyboardEvent) => evt.keyCode === 37

export const isRightArrow = (evt: React.KeyboardEvent) => evt.keyCode === 39
