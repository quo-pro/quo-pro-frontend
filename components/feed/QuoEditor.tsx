'use client';

import { withProps } from '@udecode/cn';
import { createPlugins, Plate, RenderAfterEditable, PlateLeaf } from '@udecode/plate-common';
import { createParagraphPlugin, ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { createHeadingPlugin, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6 } from '@udecode/plate-heading';
import { createBlockquotePlugin, ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote';
import { createCodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX } from '@udecode/plate-code-block';
import { createHorizontalRulePlugin, ELEMENT_HR } from '@udecode/plate-horizontal-rule';
import { createLinkPlugin, ELEMENT_LINK } from '@udecode/plate-link';
import { createImagePlugin, ELEMENT_IMAGE, createMediaEmbedPlugin, ELEMENT_MEDIA_EMBED } from '@udecode/plate-media';
import { createExcalidrawPlugin, ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import { createTogglePlugin } from '@udecode/plate-toggle';
import { createColumnPlugin, ELEMENT_COLUMN } from '@udecode/plate-layout';
import { createCaptionPlugin } from '@udecode/plate-caption';
import { createMentionPlugin, ELEMENT_MENTION, ELEMENT_MENTION_INPUT } from '@udecode/plate-mention';
import { createTablePlugin, ELEMENT_TABLE, ELEMENT_TR, ELEMENT_TD, ELEMENT_TH } from '@udecode/plate-table';
import { createTodoListPlugin, ELEMENT_TODO_LI } from '@udecode/plate-list';
import { createBoldPlugin, MARK_BOLD, createItalicPlugin, MARK_ITALIC, createUnderlinePlugin, MARK_UNDERLINE, createStrikethroughPlugin, MARK_STRIKETHROUGH, createCodePlugin, MARK_CODE, createSubscriptPlugin, MARK_SUBSCRIPT, createSuperscriptPlugin, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { createFontColorPlugin, createFontBackgroundColorPlugin, createFontSizePlugin } from '@udecode/plate-font';
import { createHighlightPlugin, MARK_HIGHLIGHT } from '@udecode/plate-highlight';
import { createKbdPlugin, MARK_KBD } from '@udecode/plate-kbd';
import { createAlignPlugin } from '@udecode/plate-alignment';
import { createIndentPlugin } from '@udecode/plate-indent';
import { createIndentListPlugin } from '@udecode/plate-indent-list';
import { createLineHeightPlugin } from '@udecode/plate-line-height';
import { createAutoformatPlugin } from '@udecode/plate-autoformat';
import { createBlockSelectionPlugin } from '@udecode/plate-selection';
import { createComboboxPlugin } from '@udecode/plate-combobox';
import { createDndPlugin } from '@udecode/plate-dnd';
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break';
import { createNodeIdPlugin } from '@udecode/plate-node-id';
import { createResetNodePlugin } from '@udecode/plate-reset-node';
import { createDeletePlugin } from '@udecode/plate-select';
import { createTabbablePlugin } from '@udecode/plate-tabbable';
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BlockquoteElement } from '@/components/plate-ui/blockquote-element';
import { CodeBlockElement } from '@/components/plate-ui/code-block-element';
import { CodeLineElement } from '@/components/plate-ui/code-line-element';
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf';
import { ExcalidrawElement } from '@/components/plate-ui/excalidraw-element';
import { HrElement } from '@/components/plate-ui/hr-element';
import { ImageElement } from '@/components/plate-ui/image-element';
import { LinkElement } from '@/components/plate-ui/link-element';
import { LinkFloatingToolbar } from '@/components/plate-ui/link-floating-toolbar';
import { ColumnElement } from '@/components/plate-ui/column-element';
import { HeadingElement } from '@/components/plate-ui/heading-element';
import { MediaEmbedElement } from '@/components/plate-ui/media-embed-element';
import { MentionElement } from '@/components/plate-ui/mention-element';
import { MentionInputElement } from '@/components/plate-ui/mention-input-element';
import { ParagraphElement } from '@/components/plate-ui/paragraph-element';
import { TableElement } from '@/components/plate-ui/table-element';
import { TableRowElement } from '@/components/plate-ui/table-row-element';
import { TableCellElement, TableCellHeaderElement } from '@/components/plate-ui/table-cell-element';
import { TodoListElement } from '@/components/plate-ui/todo-list-element';
import { CodeLeaf } from '@/components/plate-ui/code-leaf';
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf';
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf';
import { Editor } from '@/components/plate-ui/editor';
import { withPlaceholders } from '@/components/plate-ui/placeholder';
import { withDraggables } from '@/components/plate-ui/with-draggables';
import { Button } from '@components/ui/button';
import { useState } from 'react';
import { DialogClose, DialogFooter, DialogHeader } from '@components/ui/dialog';
import { useTranslations } from 'next-intl';
import { SVG } from '@components/svgs/SVG';
import { POST_VISIBILITY_TYPE } from '@quo-pro/commons';
import { FixedToolbar } from '@components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@components/plate-ui/fixed-toolbar-buttons';

const plugins = createPlugins(
    [
        createParagraphPlugin(),
        createHeadingPlugin(),
        createBlockquotePlugin(),
        createCodeBlockPlugin(),
        createHorizontalRulePlugin(),
        createLinkPlugin({
            renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
        }),
        createImagePlugin(),
        createExcalidrawPlugin(),
        createTogglePlugin(),
        createColumnPlugin(),
        createMediaEmbedPlugin(),
        createCaptionPlugin({
            options: {
                pluginKeys: [
                    // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
                ]
            },
        }),
        createMentionPlugin(),
        createTablePlugin(),
        createTodoListPlugin(),
        createBoldPlugin(),
        createItalicPlugin(),
        createUnderlinePlugin(),
        createStrikethroughPlugin(),
        createCodePlugin(),
        createSubscriptPlugin(),
        createSuperscriptPlugin(),
        createFontColorPlugin(),
        createFontBackgroundColorPlugin(),
        createFontSizePlugin(),
        createHighlightPlugin(),
        createKbdPlugin(),
        createAlignPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createIndentPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createIndentListPlugin({
            inject: {
                props: {
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK
                    ],
                },
            },
        }),
        createLineHeightPlugin({
            inject: {
                props: {
                    defaultNodeValue: 1.5,
                    validNodeValues: [1, 1.2, 1.5, 2, 3],
                    validTypes: [
                        ELEMENT_PARAGRAPH,
                        // ELEMENT_H1, ELEMENT_H2, ELEMENT_H3
                    ],
                },
            },
        }),
        createAutoformatPlugin({
            options: {
                rules: [
                    // Usage: https://platejs.org/docs/autoformat
                ],
                enableUndoOnDelete: true,
            },
        }),
        createBlockSelectionPlugin({
            options: {
                sizes: {
                    top: 0,
                    bottom: 0,
                },
            },
        }),
        createComboboxPlugin(),
        createDndPlugin({
            options: { enableScroller: true },
        }),
        createExitBreakPlugin({
            options: {
                rules: [
                    {
                        hotkey: 'mod+enter',
                    },
                    {
                        hotkey: 'mod+shift+enter',
                        before: true,
                    },
                    {
                        hotkey: 'enter',
                        query: {
                            start: true,
                            end: true,
                            // allow: KEYS_HEADING,
                        },
                        relative: true,
                        level: 1,
                    },
                ],
            },
        }),
        createNodeIdPlugin(),
        createResetNodePlugin({
            options: {
                rules: [
                    // Usage: https://platejs.org/docs/reset-node
                ],
            },
        }),
        createDeletePlugin(),
        createSoftBreakPlugin({
            options: {
                rules: [
                    { hotkey: 'shift+enter' },
                    {
                        hotkey: 'enter',
                        query: {
                            allow: [
                                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
                            ],
                        },
                    },
                ],
            },
        }),
        createTabbablePlugin(),
        createTrailingBlockPlugin({
            options: { type: ELEMENT_PARAGRAPH },
        }),
    ],
    {
        components: withDraggables({
            [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
            [ELEMENT_CODE_BLOCK]: CodeBlockElement,
            [ELEMENT_CODE_LINE]: CodeLineElement,
            [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
            [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
            [ELEMENT_HR]: HrElement,
            [ELEMENT_IMAGE]: ImageElement,
            [ELEMENT_LINK]: LinkElement,
            [ELEMENT_COLUMN]: ColumnElement,
            [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
            [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
            [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
            [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
            [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
            [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
            [ELEMENT_MEDIA_EMBED]: MediaEmbedElement,
            [ELEMENT_MENTION]: MentionElement,
            [ELEMENT_MENTION_INPUT]: MentionInputElement,
            [ELEMENT_PARAGRAPH]: ParagraphElement,
            [ELEMENT_TABLE]: TableElement,
            [ELEMENT_TR]: TableRowElement,
            [ELEMENT_TD]: TableCellElement,
            [ELEMENT_TH]: TableCellHeaderElement,
            [ELEMENT_TODO_LI]: TodoListElement,
            [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
            [MARK_CODE]: CodeLeaf,
            [MARK_HIGHLIGHT]: HighlightLeaf,
            [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
            [MARK_KBD]: KbdLeaf,
            [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
            [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
            [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
            [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
        }),
    }
);

interface Props {
    maxLength?: number;
    readOnly?: boolean;
    onEditDone?: (content: any[], visibility: POST_VISIBILITY_TYPE) => void
    isLoading?: boolean
}
export function QuoEditor(props: Props) {
    const [visibility, setVisibility] = useState<POST_VISIBILITY_TYPE>('PUBLIC');
    const { onEditDone, readOnly = false, maxLength = 2000, isLoading } = props;
    const [content, setContent] = useState<any[]>([]);
    const translate = useTranslations("general");

    const onDone = () => {
        if (onEditDone) {
            onEditDone(content, visibility)
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Plate
                maxLength={maxLength}
                readOnly={readOnly}
                plugins={plugins}
                onChange={(content) => setContent(content)}

            >
                <DialogHeader className='sticky z-50 -top-1 bg-white flex flex-row justify-between items-center p-4'>
                    <SVG.logo className='h-8 w-8' />
                    <DialogClose asChild>
                        <Button
                            onClick={onDone}
                            disabled={content.length === 0 || isLoading}
                            type="button"
                            size="sm"
                            className='mt-0 pt-0 rounded-full bg-black'
                            style={{ margin: 0 }}>
                            {translate("post")}
                        </Button>
                    </DialogClose>
                </DialogHeader>

                <Editor
                    placeholder={translate("editorPlaceholder")}
                    className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none focus-visible:outline-none border-none outline-none focus-within:ring-0 ring-0 h-full min-h-40"
                />

                <FixedToolbar className='sticky bottom-0'>
                    <FixedToolbarButtons />
                </FixedToolbar>
            </Plate>
        </DndProvider>
    );
}
