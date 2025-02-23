import Field from '@pluralsight/ps-design-system-field'
import { HomeIcon, CalendarIcon } from '@pluralsight/ps-design-system-icon'
import TextInput from '@pluralsight/ps-design-system-textinput'
import { ValueOf } from '@pluralsight/ps-design-system-util'
import { storiesOf } from '@storybook/react'
import React from 'react'
import { DateObj, useDayzed } from 'dayzed'

import {
  Calendar,
  CalendarDates,
  DatePicker,
  useIsInRange,
  onRangeDateSelected,
  onMultiDateSelected,
  useDateSelectChange,
  useRangeSelectChange
} from '../index'
import { slides } from '../../vars/index'

storiesOf('SingleDate', module)
  .add('calendar: date is selected', () => {
    const [selected, setSelected] = React.useState<Date | undefined>(
      new Date('05/13/2020')
    )
    const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
      setSelected(dateObj.date)
    }
    const { getDateProps, ...dayzedData } = useDayzed({
      date: selected || new Date('05/30/2020'),
      selected,
      onDateSelected
    })
    return (
      <Calendar {...dayzedData}>
        <CalendarDates getDateProps={getDateProps}>
          {renderProps => {
            return <button {...renderProps} />
          }}
        </CalendarDates>
      </Calendar>
    )
  })
  .add('calendar: date is previous month', () => {
    const [selected, setSelected] = React.useState<Date | undefined>(
      new Date('05/13/2020')
    )
    const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
      setSelected(dateObj.date)
    }
    const { getDateProps, ...dayzedData } = useDayzed({
      date: new Date('04/10/2020'),
      selected,
      onDateSelected
    })
    return (
      <Calendar {...dayzedData}>
        <CalendarDates getDateProps={getDateProps}>
          {renderProps => {
            return <button {...renderProps} />
          }}
        </CalendarDates>
      </Calendar>
    )
  })
  .add('calendar: with button', () => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
      setSelected(dateObj.date)
    }
    const { getDateProps, ...dayzedData } = useDayzed({
      date: selected || new Date('05/30/2020'),
      selected,
      onDateSelected
    })

    const handleClick = () => {
      setSelected(new Date('05/13/2020'))
    }
    return (
      <>
        <button onClick={handleClick}>5/13/2020</button>
        <Calendar {...dayzedData}>
          <CalendarDates getDateProps={getDateProps}>
            {renderProps => {
              return <button {...renderProps} />
            }}
          </CalendarDates>
        </Calendar>
      </>
    )
  })
  .add('calendar: input with dropdown', () => {
    const [selected, setSelected] = React.useState<Date | undefined>()
    const [open, setOpen] = React.useState<boolean>(false)
    const onDateSelected = (dateObj: DateObj, evt: React.SyntheticEvent) => {
      setSelected(dateObj.date)
      setOpen(false)
    }
    const { getDateProps, ...dayzedData } = useDayzed({
      date: selected || new Date('05/30/2020'),
      selected,
      onDateSelected
    })
    const handleIconClick: React.MouseEventHandler<HTMLDivElement> = evt => {
      setOpen(!open)
    }
    const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
    const [value, onChange] = useDateSelectChange({
      selected,
      setSlide,
      setSelected
    })
    return (
      <div style={{ display: 'inline-block', position: 'relative' }}>
        <TextInput
          onChange={onChange}
          value={value}
          placeholder="mm/dd/yyyy"
          icon={
            <CalendarIcon
              onClick={handleIconClick}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <br />
        {open && (
          <Calendar
            {...dayzedData}
            style={{ position: 'absolute', marginTop: 4 }}
            slide={slide}
            tabIndex={0}
          >
            <CalendarDates getDateProps={getDateProps}>
              {renderProps => {
                return <button {...renderProps} />
              }}
            </CalendarDates>
          </Calendar>
        )}
      </div>
    )
  })

const stableUniqueId = (prefix: string) => prefix + 'unique-id'

storiesOf('DatePicker', module)
  .add('disabled', () => (
    <DatePicker disabled label="Disabled" _uniqueId={stableUniqueId} />
  ))
  .add('errore', () => (
    <DatePicker error label="Errored" _uniqueId={stableUniqueId} />
  ))
  .add('string label', () => (
    <DatePicker label="String label" _uniqueId={stableUniqueId} />
  ))
  .add('field.label', () => (
    <DatePicker
      label={<Field.Label>Field.Label label</Field.Label>}
      _uniqueId={stableUniqueId}
    />
  ))
  .add('prefix', () => (
    <DatePicker
      prefix={<HomeIcon />}
      label="Prefix"
      _uniqueId={stableUniqueId}
    />
  ))
  .add('renderContainer', () => (
    <DatePicker
      label="renderContainer"
      renderContainer={React.forwardRef((props, ref) => (
        <div ref={ref} {...props} style={{ outline: '2px dashed orange' }} />
      ))}
      _uniqueId={stableUniqueId}
    />
  ))
  .add('renderTag', () => (
    <DatePicker
      prefix={<HomeIcon />}
      label="renderTag"
      renderTag={props => (
        <div {...props} style={{ outline: '2px dashed orange' }} />
      )}
      _uniqueId={stableUniqueId}
    />
  ))
  .add('small size', () => (
    <DatePicker label="Small size" size="small" _uniqueId={stableUniqueId} />
  ))
  .add('subLabel string', () => (
    <DatePicker subLabel="String subLabel" _uniqueId={stableUniqueId} />
  ))
  .add('field.subLabel', () => (
    <DatePicker
      subLabel={<Field.SubLabel>Field.SubLabel subLabel</Field.SubLabel>}
      _uniqueId={stableUniqueId}
    />
  ))
  .add('suffix', () => (
    <DatePicker
      suffix={<HomeIcon />}
      label="Suffix"
      _uniqueId={stableUniqueId}
    />
  ))

storiesOf('RangeDate', module)
  .add('Calendar', () => {
    const [selected, setSelected] = React.useState<Date[] | undefined>()
    const { getDateProps, ...dayzedData } = useDayzed({
      selected,
      onDateSelected: onRangeDateSelected({ selected, setSelected }),
      date: new Date('05/30/2020')
    })
    const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)
    return (
      <Calendar {...dayzedData} onMouseLeave={onMouseLeave}>
        <CalendarDates getDateProps={getDateProps}>
          {(renderProps, dateObj) => {
            return (
              <button
                {...renderProps}
                {...isInRange(dateObj.date)}
                onMouseEnter={() => onMouseEnter(dateObj.date)}
              />
            )
          }}
        </CalendarDates>
      </Calendar>
    )
  })
  .add('Calendar: with button', () => {
    const [selected, setSelected] = React.useState<Date[]>([])
    const { getDateProps, ...dayzedData } = useDayzed({
      selected,
      onDateSelected: onRangeDateSelected({ selected, setSelected }),
      date: new Date('05/30/2020')
    })
    const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)

    const handleClick = () => {
      setSelected([new Date('05/13/2020'), new Date('05/30/2020')])
    }
    return (
      <>
        <button onClick={handleClick}>5/13/2020 - 05/30/2020</button>
        <Calendar {...dayzedData} onMouseLeave={onMouseLeave}>
          <CalendarDates getDateProps={getDateProps}>
            {(renderProps, dateObj) => {
              const { selectable } = dateObj
              return (
                <button
                  {...renderProps}
                  {...isInRange(dateObj.date)}
                  onMouseEnter={() => onMouseEnter(dateObj.date)}
                />
              )
            }}
          </CalendarDates>
        </Calendar>
      </>
    )
  })
  .add('calendar: with input', () => {
    const [selected, setSelected] = React.useState<Date[] | undefined>()
    const { getDateProps, ...dayzedData } = useDayzed({
      selected,
      onDateSelected: onRangeDateSelected({ selected, setSelected }),
      date: new Date('05/30/2020')
    })
    const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)
    const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
    const [startValue, onStartChange] = useRangeSelectChange({
      start: true,
      selected,
      setSlide,
      setSelected
    })
    const [endValue, onEndChange] = useRangeSelectChange({
      start: false,
      selected,
      setSlide,
      setSelected
    })
    return (
      <div>
        <TextInput onChange={onStartChange} value={startValue} />
        <TextInput onChange={onEndChange} value={endValue} />
        <Calendar {...dayzedData} onMouseLeave={onMouseLeave} slide={slide}>
          <CalendarDates getDateProps={getDateProps}>
            {(renderProps, dateObj) => {
              return (
                <button
                  {...renderProps}
                  {...isInRange(dateObj.date)}
                  onMouseEnter={() => onMouseEnter(dateObj.date)}
                />
              )
            }}
          </CalendarDates>
        </Calendar>
      </div>
    )
  })
  .add('calendar: with input (display two months)', () => {
    const [selected, setSelected] = React.useState<Date[] | undefined>()
    const { getDateProps, ...dayzedData } = useDayzed({
      monthsToDisplay: 2,
      selected,
      onDateSelected: onRangeDateSelected({ selected, setSelected }),
      date: new Date('05/30/2020')
    })
    const { onMouseLeave, onMouseEnter, isInRange } = useIsInRange(selected)
    const [slide, setSlide] = React.useState<ValueOf<typeof slides>>()
    const [startValue, onStartChange] = useRangeSelectChange({
      start: true,
      selected,
      setSlide,
      setSelected
    })
    const [endValue, onEndChange] = useRangeSelectChange({
      start: false,
      selected,
      setSlide,
      setSelected
    })
    return (
      <>
        <TextInput onChange={onStartChange} value={startValue} />
        <TextInput onChange={onEndChange} value={endValue} />
        <Calendar {...dayzedData} onMouseLeave={onMouseLeave} slide={slide}>
          <CalendarDates getDateProps={getDateProps}>
            {(renderProps, dateObj) => {
              return (
                <button
                  {...renderProps}
                  {...isInRange(dateObj.date)}
                  onMouseEnter={() => onMouseEnter(dateObj.date)}
                />
              )
            }}
          </CalendarDates>
        </Calendar>
      </>
    )
  })

storiesOf('MultiDate', module).add('Calendar', () => {
  const initialDate = new Date(2021, 0, 1)
  const initialDate2 = new Date(2021, 0, 5)
  const [selected, setSelected] = React.useState<Date[]>([
    initialDate,
    initialDate2
  ])
  const { getDateProps, ...dayzedData } = useDayzed({
    selected,
    onDateSelected: onMultiDateSelected({ selected, setSelected }),
    date: initialDate
  })
  return (
    <Calendar {...dayzedData}>
      <CalendarDates getDateProps={getDateProps}>
        {renderProps => {
          return <button {...renderProps} />
        }}
      </CalendarDates>
    </Calendar>
  )
})
