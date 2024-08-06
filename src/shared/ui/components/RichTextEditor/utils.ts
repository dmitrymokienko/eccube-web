import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js'

export function prepareRTEForRHF(value?: RawDraftContentState) {
  return value ? EditorState.createWithContent(convertFromRaw(value)) : EditorState.createEmpty()
}

export function prepareRTEForSubmit(value: EditorState): RawDraftContentState | undefined {
  const content = value?.getCurrentContent()
  return content ? convertToRaw(content) : undefined
}
