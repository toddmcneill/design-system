import { Story } from '@storybook/react/types-6-0'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import * as textAreaStories from '../__stories__/text-area-field.story'
import * as textInputStories from '../__stories__/text-input-field.story'

describe('Field stories a11y', () => {
  describe('TextAreaField', () => {
    const { Basic } = textAreaStories
    const cases = generateCasesFromStories(textAreaStories)

    describe.each(cases)('%s story', (_name, Story) => {
      it('should pass an basic axe a11y audit', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
      })
    })

    describe('Basic story', () => {
      it('should focus input when label clicked', () => {
        render(<Basic {...Basic.args} />)
        const label = screen.getByLabelText('Text area label area')
        const input = screen.getByRole('textbox')

        userEvent.click(label)

        expect(input).toHaveFocus()
      })
    })
  })

  describe('TextInputField', () => {
    const { Basic } = textInputStories
    const cases = generateCasesFromStories(textInputStories)

    describe.each(cases)('%s story', (_name, Story) => {
      it('should pass an basic axe a11y audit', async () => {
        const { container } = render(<Story {...Story.args} />)
        const results = await axe(container)

        expect(results).toHaveNoViolations()
      })
    })

    describe('Basic story', () => {
      it('should focus input when label clicked', () => {
        render(<Basic {...Basic.args} />)
        const label = screen.getByLabelText('Text input label area')
        const input = screen.getByRole('textbox')

        userEvent.click(label)

        expect(input).toHaveFocus()
      })

      it('should support a search type', () => {
        render(<Basic {...Basic.args} type="search" />)
        const input = screen.getByRole('searchbox')

        expect(input).toBeInTheDocument()
      })
    })
  })
})

function generateCasesFromStories(
  obj: Record<string, unknown>
): [string, Story][] {
  const keys = Object.keys(obj)

  return keys.reduce<any>((acc, key) => {
    if (key === 'default') return acc
    return [...acc, [key, obj[key]]]
  }, [])
}
