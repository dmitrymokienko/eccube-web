import { getDefaultKeyBinding, Editor } from 'draft-js'

export type DraftEditorProps = ConstructorParameters<typeof Editor>[0]

export type SyntheticKeyboardEvent = React.KeyboardEvent<Record<string, unknown>>

export type DraftEditorCommand = ReturnType<typeof getDefaultKeyBinding>

export enum DraftHandleValue {
  HANDLED = 'handled',
  NOT_HANDLED = 'not-handled',
}

export enum DraftInlineStyle {
  BOLD = 'BOLD',
  CODE = 'CODE',
  ITALIC = 'ITALIC',
  STRIKETHROUGH = 'STRIKETHROUGH',
  UNDERLINE = 'UNDERLINE',
}

export enum DraftBlockType {
  HEADER_ONE = 'header-one',
  HEADER_TWO = 'header-two',
  HEADER_THREE = 'header-three',
  HEADER_FOUR = 'header-four',
  HEADER_FIVE = 'header-five',
  HEADER_SIX = 'header-six',
  SECTION = 'section',
  ARTICLE = 'article',
  UNORDERED_LIST_ITEM = 'unordered-list-item',
  ORDERED_LIST_ITEM = 'ordered-list-item',
  BLOCKQUOTE = 'blockquote',
  ATOMIC = 'atomic',
  CODE_BLOCK = 'code-block',
  UNSTYLED = 'unstyled',
  ALIGN_LEFT = 'align-left',
  ALIGN_CENTER = 'align-center',
  ALIGN_RIGHT = 'align-right',
  ALIGN_JUSTIFY = 'align-justify',
}
