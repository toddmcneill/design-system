import { DateParts } from '../react'
import { MonthDateParts } from '../react/calendar'

const num = n => parseInt(n, 10)

export const arrayOf = (num: string): undefined[] =>
  Array.apply(null, Array(parseInt(num, 10) || 0))

export const getDaysInMonth = ({ mm, yyyy }: MonthDateParts): string => {
  const lastDayInPreviousMonth = 0
  return new Date(parseInt(yyyy, 10), parseInt(mm, 10), lastDayInPreviousMonth)
    .getDate()
    .toString()
}

// TODO: verify these are ok without the fallback obj in param
export const forceValidDay = (date?: DateParts): string => {
  if (!date) return ''

  const maxDays = parseInt(getDaysInMonth(date), 10)
  const day = parseInt(date.dd, 10)
  return isNaN(day)
    ? ''
    : day > maxDays
    ? maxDays.toString()
    : day < 1
    ? '1'
    : day.toString()
}

// TODO: verify these are ok without the fallback obj in param
export const forceValidMonth = (date?: Pick<DateParts, 'mm'>): string => {
  if (!date) return ''

  const month = num(date.mm)
  return isNaN(month)
    ? ''
    : month > 12
    ? '12'
    : month < 1
    ? '1'
    : month.toString()
}

// TODO: verify these are ok without the fallback obj in param
export const forceValidYear = (date?: Pick<DateParts, 'yyyy'>): string => {
  if (!date) return ''

  const year = num(date.yyyy)
  return isNaN(year) ? '' : new Date(year, 1, 1).getFullYear().toString()
}

export const getFirstDayOfWeekForMonth = ({
  mm,
  yyyy
}: MonthDateParts): string =>
  new Date(num(yyyy), num(mm) - 1, 1).getDay().toString()

// TODO: return full type with dd ? or just pick?
export const getPrevMonthYear = ({ mm, yyyy }): MonthDateParts => {
  const month = num(mm)
  const year = num(yyyy)
  return {
    mm: month - 1 < 1 ? '12' : (month - 1).toString(),
    yyyy: month - 1 < 1 ? (year - 1).toString() : year.toString()
  }
}

// TODO: return full type with dd ? or just pick?
export const getNextMonthYear = ({ mm, yyyy }): MonthDateParts => {
  const month = num(mm)
  const year = num(yyyy)
  return {
    mm: month + 1 > 12 ? '1' : (month + 1).toString(),
    yyyy: month + 1 > 12 ? (year + 1).toString() : year.toString()
  }
}

export const getMonthName = (mm: string): string =>
  [
    null,
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][num(mm)]

export const parseDate = (value?: string): DateParts => {
  const [mm, dd, yyyy] = (value || '').split('/')
  return mm && dd && yyyy
    ? {
        dd: forceValidDay({ dd, mm, yyyy }),
        mm: forceValidMonth({ mm }),
        yyyy: forceValidYear({ yyyy })
      }
    : { dd: '', mm: '', yyyy: '' }
}

export const formatDate = (date?: DateParts) => {
  if (!date) return

  const { mm, dd, yyyy } = date
  return mm && dd && yyyy ? mm + '/' + dd + '/' + yyyy : null
}

export function combineFns(...fns) {
  return (...args) => fns.filter(isFunction).forEach(fn => fn(...args))
}

export function isFunction(fn) {
  return typeof fn === 'function'
}

export function isNil(val) {
  // NOTE: i know this isn't strict equality, it's by design to also get NaN
  return val == null
}

export function shallowEqual(a, b) {
  if (a === b) return true
  if (isNil(a) || isNil(b)) return false

  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)

  if (bKeys.length !== aKeys.length) return false

  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i]

    if (a[key] !== b[key]) return false
  }

  return true
}
