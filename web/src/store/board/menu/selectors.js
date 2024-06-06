import {createSelector} from '@reduxjs/toolkit'

const buttons = (state) => state.menuSlice.buttons
const is_open = (state) => state.menuSlice.is_open

export const selectIsOpen = createSelector(is_open, (is_open)=>is_open)
export const selectButtons = createSelector(buttons, (buttons)=>buttons)