import {createSelector} from '@reduxjs/toolkit'

const attachments = (state) => state.creatorSlice.attachments
const body = (state) => state.creatorSlice.body
const title = (state) => state.creatorSlice.title
const topic_name = (state) => state.creatorSlice.topic_name
const upload_progress = (state) => state.creatorSlice.upload_progress

export const selectAttachments = createSelector(attachments, (attachments)=>attachments)
export const selectBody = createSelector(body, (body)=>body)
export const selectUploadProgress = createSelector(upload_progress, (upload_progress)=>upload_progress)
export const selectTopic = createSelector(topic_name, (topic_name)=>topic_name)
export const selectTitle = createSelector(title, (title)=>title)

