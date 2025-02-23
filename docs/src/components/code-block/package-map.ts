import ActionMenu from '@pluralsight/ps-design-system-actionmenu'
import AppFrame from '@pluralsight/ps-design-system-appframe'
import Avatar from '@pluralsight/ps-design-system-avatar'
import Carousel from '@pluralsight/ps-design-system-carousel'
import Card from '@pluralsight/ps-design-system-card'
import * as core from '@pluralsight/ps-design-system-core'
import Badge from '@pluralsight/ps-design-system-badge'
import Banner from '@pluralsight/ps-design-system-banner'
import Breadcrumb from '@pluralsight/ps-design-system-breadcrumb'
import Button from '@pluralsight/ps-design-system-button'
import Checkbox from '@pluralsight/ps-design-system-checkbox'
import CircularProgress from '@pluralsight/ps-design-system-circularprogress'
import DataWell from '@pluralsight/ps-design-system-datawell'
import * as DatePicker from '@pluralsight/ps-design-system-datepicker'
import Dialog from '@pluralsight/ps-design-system-dialog'
import Drawer, { useDrawerContext } from '@pluralsight/ps-design-system-drawer'
import Dropdown, {
  useDropdown,
  DropdownContext
} from '@pluralsight/ps-design-system-dropdown'
import EmptyState from '@pluralsight/ps-design-system-emptystate'
import ErrorPage, * as ErrorPages from '@pluralsight/ps-design-system-errors'
import FeatureFlags, {
  useFeatureFlags
} from '@pluralsight/ps-design-system-featureflags'
import Field from '@pluralsight/ps-design-system-field'
import Form from '@pluralsight/ps-design-system-form'
import Icon, * as Icons from '@pluralsight/ps-design-system-icon'
import * as Layout from '@pluralsight/ps-design-system-layout'
import LinearProgress from '@pluralsight/ps-design-system-linearprogress'
import Link from '@pluralsight/ps-design-system-link'
import Menu from '@pluralsight/ps-design-system-menu'
import MultiSelect from '@pluralsight/ps-design-system-multiselect'
import NavBar from '@pluralsight/ps-design-system-navbar'
import NavBrand from '@pluralsight/ps-design-system-navbrand'
import NavCookieBanner from '@pluralsight/ps-design-system-navcookiebanner'
import NavItem from '@pluralsight/ps-design-system-navitem'
import NavUser from '@pluralsight/ps-design-system-navuser'
import Note from '@pluralsight/ps-design-system-note'
import * as Position from '@pluralsight/ps-design-system-position'
import Radio from '@pluralsight/ps-design-system-radio'
import Row from '@pluralsight/ps-design-system-row'
import ScreenReaderOnly from '@pluralsight/ps-design-system-screenreaderonly'
import Scrollable from '@pluralsight/ps-design-system-scrollable'
import SearchInput from '@pluralsight/ps-design-system-searchinput'
import StarRating from '@pluralsight/ps-design-system-starrating'
import Steps from '@pluralsight/ps-design-system-steps'
import Switch from '@pluralsight/ps-design-system-switch'
import Tab from '@pluralsight/ps-design-system-tab'
import Table, { StickyContainer } from '@pluralsight/ps-design-system-table'
import Tag from '@pluralsight/ps-design-system-tag'
import TagsInput from '@pluralsight/ps-design-system-tagsinput'
import * as Text from '@pluralsight/ps-design-system-text'
import TextArea from '@pluralsight/ps-design-system-textarea'
import TextInput from '@pluralsight/ps-design-system-textinput'
import Theme, { useTheme } from '@pluralsight/ps-design-system-theme'
import Tooltip from '@pluralsight/ps-design-system-tooltip'
import Typeahead from '@pluralsight/ps-design-system-typeahead'
import VerticalTabs from '@pluralsight/ps-design-system-verticaltabs'
import ViewToggle from '@pluralsight/ps-design-system-viewtoggle'
import * as util from '@pluralsight/ps-design-system-util'

import { useDayzed } from 'dayzed'
import { format } from 'date-fns'

import * as downshift from 'downshift'
import * as glamor from 'glamor'
import React from 'react'
import * as reactBeautifulDnd from 'react-beautiful-dnd'
import * as reactTable from 'react-table'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'

import { omit } from '../util'
import pkg from '../../../package.json'

const deps = { ...pkg.dependencies, ...pkg.devDependencies } as const

type PackageMap = { [key in keyof typeof deps]?: unknown }

export const PACKAGE_MAP: PackageMap = {
  '@pluralsight/ps-design-system-actionmenu': { ActionMenu },
  '@pluralsight/ps-design-system-appframe': { AppFrame },
  '@pluralsight/ps-design-system-avatar': { Avatar },
  '@pluralsight/ps-design-system-badge': { Badge },
  '@pluralsight/ps-design-system-banner': { Banner },
  '@pluralsight/ps-design-system-breadcrumb': { Breadcrumb },
  '@pluralsight/ps-design-system-button': { Button },
  '@pluralsight/ps-design-system-card': { Card },
  '@pluralsight/ps-design-system-carousel': { Carousel },
  '@pluralsight/ps-design-system-checkbox': { Checkbox },
  '@pluralsight/ps-design-system-circularprogress': { CircularProgress },
  '@pluralsight/ps-design-system-core': { ...core },
  '@pluralsight/ps-design-system-datawell': { DataWell },
  '@pluralsight/ps-design-system-datepicker': {
    ...omit(DatePicker, ['default'])
  },
  '@pluralsight/ps-design-system-dialog': { Dialog },
  '@pluralsight/ps-design-system-drawer': { Drawer, useDrawerContext },
  '@pluralsight/ps-design-system-dropdown': {
    Dropdown,
    useDropdown,
    DropdownContext
  },
  '@pluralsight/ps-design-system-emptystate': { EmptyState },
  '@pluralsight/ps-design-system-errors': {
    ErrorPage,
    ...omit(ErrorPages, ['default'])
  },
  '@pluralsight/ps-design-system-featureflags': {
    FeatureFlags,
    useFeatureFlags
  },
  '@pluralsight/ps-design-system-field': { Field },
  '@pluralsight/ps-design-system-form': { Form },
  '@pluralsight/ps-design-system-icon': { Icon, ...omit(Icons, ['default']) },
  '@pluralsight/ps-design-system-layout': { ...omit(Layout, ['default']) },
  '@pluralsight/ps-design-system-linearprogress': { LinearProgress },
  '@pluralsight/ps-design-system-link': { Link },
  '@pluralsight/ps-design-system-menu': { Menu },
  '@pluralsight/ps-design-system-multiselect': { MultiSelect },
  '@pluralsight/ps-design-system-navbar': { NavBar },
  '@pluralsight/ps-design-system-navbrand': { NavBrand },
  '@pluralsight/ps-design-system-navcookiebanner': { NavCookieBanner },
  '@pluralsight/ps-design-system-navitem': { NavItem },
  '@pluralsight/ps-design-system-navuser': { NavUser },
  '@pluralsight/ps-design-system-note': { Note },
  '@pluralsight/ps-design-system-position': { ...omit(Position, ['default']) },
  '@pluralsight/ps-design-system-radio': { Radio },
  '@pluralsight/ps-design-system-row': { Row },
  '@pluralsight/ps-design-system-screenreaderonly': { ScreenReaderOnly },
  '@pluralsight/ps-design-system-scrollable': { Scrollable },
  '@pluralsight/ps-design-system-searchinput': { SearchInput },
  '@pluralsight/ps-design-system-starrating': { StarRating },
  '@pluralsight/ps-design-system-steps': { Steps },
  '@pluralsight/ps-design-system-switch': { Switch },
  '@pluralsight/ps-design-system-tab': { Tab },
  '@pluralsight/ps-design-system-table': { Table, StickyContainer },
  '@pluralsight/ps-design-system-tag': { Tag },
  '@pluralsight/ps-design-system-tagsinput': { TagsInput },
  '@pluralsight/ps-design-system-text': { ...omit(Text, ['default']) },
  '@pluralsight/ps-design-system-textarea': { TextArea },
  '@pluralsight/ps-design-system-textinput': { TextInput },
  '@pluralsight/ps-design-system-theme': { Theme, useTheme },
  '@pluralsight/ps-design-system-tooltip': { Tooltip },
  '@pluralsight/ps-design-system-typeahead': { Typeahead },
  '@pluralsight/ps-design-system-util': { ...util },
  '@pluralsight/ps-design-system-verticaltabs': { VerticalTabs },
  '@pluralsight/ps-design-system-viewtoggle': { ViewToggle },

  dayzed: { useDayzed },
  'date-fns': { format },
  downshift: { ...omit(downshift, ['default']) },
  glamor: { ...glamor },
  react: { React, ...React },
  'react-beautiful-dnd': { ...reactBeautifulDnd },
  'react-router-dom': { Router, withRouter },
  'react-table': { ...reactTable }
}

export function mapPackageNameToScopes(pkgName: string) {
  return PACKAGE_MAP[pkgName]
}
