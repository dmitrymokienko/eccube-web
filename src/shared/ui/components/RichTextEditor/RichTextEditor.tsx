import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js'
import 'draft-js/dist/Draft.css'
import './styles.css'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { MouseEvent, useRef, useState } from 'react'
import {
  DraftBlockType,
  DraftInlineStyle,
  SyntheticKeyboardEvent,
  DraftHandleValue,
  DraftEditorCommand,
  DraftEditorProps,
} from './types'
import IconButton from '@mui/material/IconButton'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'

export interface RichTextEditorProps extends Partial<DraftEditorProps> {
  Actions?: JSX.Element
  showRichBar?: boolean
}

export const RichTextEditor = (props: RichTextEditorProps) => {
  const [state, setState] = useState(EditorState.createEmpty())

  const {
    showRichBar = true,
    readOnly = false,
    Actions = null,
    editorState = state,
    onChange = setState,
    ...rest
  } = props

  const editorRef = useRef<Editor>(null)

  // const currentStyle = editorState.getCurrentInlineStyle()

  // const selection = editorState.getSelection()

  // const blockType = editorState
  //   .getCurrentContent()
  //   .getBlockForKey(selection.getStartKey())
  //   .getType()

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return DraftHandleValue.HANDLED
    }
    return DraftHandleValue.NOT_HANDLED
  }

  const onBoldClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    toggleInlineStyle(DraftInlineStyle.BOLD)
  }

  const onItalicClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    toggleInlineStyle(DraftInlineStyle.ITALIC)
  }

  const onUnderlineClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    toggleInlineStyle(DraftInlineStyle.UNDERLINE)
  }

  const onStrikeThroughClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    toggleInlineStyle(DraftInlineStyle.STRIKETHROUGH)
  }

  const onBulletListClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    toggleBlockType(DraftBlockType.UNORDERED_LIST_ITEM)
  }

  const onOrderedListClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    toggleBlockType(DraftBlockType.ORDERED_LIST_ITEM)
  }

  const mapKeyToEditorCommand = (e: SyntheticKeyboardEvent): DraftEditorCommand | null => {
    if (e.key === 'Tab') {
      const newEditorState = RichUtils.onTab(e, editorState, 4)
      if (newEditorState !== editorState) {
        onChange(newEditorState)
      }
      return null
    }
    return getDefaultKeyBinding(e)
  }

  function toggleBlockType(blockType: DraftBlockType) {
    onChange(RichUtils.toggleBlockType(editorState, blockType))
    setTimeout(() => editorRef?.current?.focus(), 100)
  }

  function toggleInlineStyle(inlineStyle: DraftInlineStyle) {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    setTimeout(() => editorRef?.current?.focus(), 100)
  }

  return (
    <Stack
      spacing={0}
      sx={{
        px: 3,
        backgroundColor: 'white',
        borderRadius: '4px',
      }}
    >
      {showRichBar && (
        <>
          <Stack spacing={1} direction="row" sx={{ py: 1 }}>
            <Stack spacing={0} direction="row">
              <IconButton
                // color={currentStyle.has(DraftInlineStyle.BOLD) ? 'brand' : 'secondary'}
                onClick={onBoldClick}
                disabled={readOnly}
              >
                <FormatBoldIcon />
              </IconButton>

              <IconButton
                // color={currentStyle.has(DraftInlineStyle.ITALIC) ? 'brand' : 'secondary'}
                onClick={onItalicClick}
                disabled={readOnly}
              >
                <FormatItalicIcon />
              </IconButton>

              <IconButton
                // color={currentStyle.has(DraftInlineStyle.UNDERLINE) ? 'brand' : 'secondary'}
                onClick={onUnderlineClick}
                disabled={readOnly}
              >
                <FormatUnderlinedIcon />
              </IconButton>

              <IconButton
                // color={currentStyle.has(DraftInlineStyle.STRIKETHROUGH) ? 'brand' : 'secondary'}
                onClick={onStrikeThroughClick}
                disabled={readOnly}
              >
                <StrikethroughSIcon />
              </IconButton>

              <IconButton
                // color={DraftBlockType.UNORDERED_LIST_ITEM === blockType ? 'brand' : 'secondary'}
                onClick={onBulletListClick}
                disabled={readOnly}
                sx={{ mr: 1 }}
              >
                <FormatListBulletedIcon />
              </IconButton>

              <IconButton
                // color={DraftBlockType.ORDERED_LIST_ITEM === blockType ? 'brand' : 'secondary'}
                onClick={onOrderedListClick}
                disabled={readOnly}
              >
                <FormatListNumberedIcon />
              </IconButton>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {Actions}
          </Stack>

          <Divider />
        </>
      )}

      <Box sx={{ py: 1.5 }}>
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={onChange}
          placeholder={readOnly ? 'Item description' : 'Add item description'}
          ref={editorRef}
          spellCheck={true}
          readOnly={readOnly}
          {...rest}
        />
      </Box>
    </Stack>
  )
}
