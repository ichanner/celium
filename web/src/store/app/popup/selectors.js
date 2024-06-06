import {createSelector} from '@reduxjs/toolkit'

const type = (state) => state.popupSlice.type;
const is_open = (state) => state.popupSlice.is_open;
const label = (state) => state.popupSlice.label;
const inputs = (state) => state.popupSlice.inputs;
const prompt = (state) => state.popupSlice.prompt;
const component = (state) => state.popupSlice.component;


export const selectType = createSelector(type, (type) => type);
export const selectIsOpen = createSelector(is_open, (is_open) => is_open);
export const selectLabel = createSelector(label, (label) => label);
export const selectPrompt = createSelector(prompt, (prompt) => prompt);
export const selectInputs = createSelector(inputs, (inputs) => inputs);
export const selectComponent = createSelector(component, (component) => component);
