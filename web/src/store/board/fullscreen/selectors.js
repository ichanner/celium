import {createSelector} from '@reduxjs/toolkit'

const attachments = (state) => state.fullScreenSlice.attachments
const initial_index = (state) => state.fullScreenSlice.initial_index
const download_progress = (state) => state.fullScreenSlice.download_progress

export const selectFullScreenAttachments = createSelector(attachments, (attachments)=>attachments)
export const selectFullScreenIndex = createSelector(initial_index, (index)=>index)
export const selectDownloadProgress = createSelector(download_progress, (download_progress)=>download_progress)