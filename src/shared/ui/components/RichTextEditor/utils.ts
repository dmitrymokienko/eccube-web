import { convertFromRaw, convertToRaw, EditorState, RawDraftContentState } from 'draft-js'

export function prepareRichTextEditorDataForRHF(value?: RawDraftContentState) {
  return value ? EditorState.createWithContent(convertFromRaw(value)) : EditorState.createEmpty()
}

export function prepareRichTextEditorDataForSubmit(
  value: EditorState
): RawDraftContentState | undefined {
  const content = value?.getCurrentContent()
  return content ? convertToRaw(content) : undefined
}
