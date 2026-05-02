import React, { useRef, useMemo, useEffect } from 'react';

/**
 * Plate Editor
 */
import type { Value } from 'platejs';
import { Plate, usePlateEditor } from 'platejs/react';
import { HeadingPlugin } from '@platejs/basic-nodes/react'
import type { TElement, TText } from '@udecode/plate-common';

/**
 * Plugin
 */
import { BasicBlocksKit } from '@/components/editor/plugins/basic-blocks-kit';

/**
 * Editor
 */
import { Editor, EditorContainer } from '@/components/editor/editor';
import { FixedToolbar } from '@/components/editor/fixed-toolbar';
import { MarkToolbarButton } from '@/components/editor/mark-toolbar-button';
import * as DropdownMenu from '@/components/editor/dropdown-menu';


/**
 * Radix UI
 */
import { TooltipProvider } from '@radix-ui/react-tooltip'

/**
 * EditorPlate - A Rich Text Editor component built on Plate.js.
 * Supports bi-directional synchronization between Editor state (JSON) and Database (HTML String).
 * 
 * @component
 * @example
 * <Form.Item name="content">
 *   <EditorPlate />
 * </Form.Item>
 * 
 * @param {Object} props - Component properties
 * @param {string} [props.value] - HTML string passed from database or form state
 * @param {function} [props.onChange] - Callback function returning an HTML string whenever content changes
 */
export const EditorPlate = ({ value, onChange }: { value?: string; onChange?: (html: string) => void }) => {
    /**
     * Hook plugins
     */
    const plugins = useMemo(() => [...BasicBlocksKit, HeadingPlugin.configure({})], []);
    const currentHtmlRef = useRef(value || '');
    const editor = usePlateEditor({ plugins, });

    /**
     * Convert nodes to HTML
     */
    const convertToHtmlHandler = (nodes: Value): string => {
        return nodes.map((node: TElement | TText) => {
            // Process Text Node (Bold, Italic...)
            if (node.text !== undefined) {
                let t = node.text;
                if (node.bold) t = `<strong>${t}</strong>`;
                if (node.italic) t = `<em>${t}</em>`;
                if (node.underline) t = `<u>${t}</u>`;
                return t;
            }

            /**
             * Handle Element Node (P, H1, Table, Image...)
             */
            const childrenHtml = node.children ? convertToHtmlHandler(node.children as Value) : '';

            switch (node.type) {
                case 'h1': return `<h1>${childrenHtml}</h1>`;
                case 'img': return `<img src="${node.url}" alt="${node.caption || ''}" />`;
                case 'table': return `<table>${childrenHtml}</table>`;
                case 'tr': return `<tr>${childrenHtml}</tr>`;
                case 'td': return `<td>${childrenHtml}</td>`;
                case 'a': return `<a href="${node.url}">${childrenHtml}</a>`;
                default: return `<p>${childrenHtml}</p>`;
            }
        }).join('');
    };

    /**
     * Handle change from editor, convert nodes to HTML and call onChange prop
     */
    const onChangeHandler = (newValue: Value) => {
        const html = convertToHtmlHandler(newValue);

        /**
         * Important: Update Ref immediately to avoid useEffect running again
         */
        currentHtmlRef.current = html;

        /**
         * Send HTML to Ant Design Form
         */
        onChange?.(html);
    };

    /**
     * Convert HTML to nodes
     */
    useEffect(() => {
        /**
         * If value from Prop is different from currentHtmlRef.current, then convert HTML to nodes
         */
        if (value !== undefined && value !== currentHtmlRef.current) {
            const safeValue = value || '';
            let nodes: Value;

            try {
                const parser = new DOMParser();
                const doc = parser.parseFromString(safeValue, 'text/html');
                nodes = editor.api.html.deserialize({ element: doc.body }) as Value;
                // If deserialize failed (returns empty array), use default value
                if (!nodes || nodes.length === 0) {
                    nodes = [{ type: 'p', children: [{ text: '' }] }];
                }
            } catch (error) {
                console.error('Error deserializing HTML:', error);
                nodes = [{ type: 'p', children: [{ text: '' }] }] as Value;
            }

            editor.tf.setValue(nodes);
            currentHtmlRef.current = safeValue;
        }
    }, [value, editor]);

    return (
        <React.Fragment>
            <TooltipProvider>
                {/* Provides editor context */}
                <Plate editor={editor}
                    onChange={({ value: newValue }) => onChangeHandler(newValue)} >
                    <FixedToolbar className="justify-start bg-white rounded-md shadow-md">
                        <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">B</MarkToolbarButton>
                        <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">I</MarkToolbarButton>
                        <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">U</MarkToolbarButton>
                        <DropdownMenu.DropdownMenu>
                            <DropdownMenu.DropdownMenuTrigger>
                                Format Text
                            </DropdownMenu.DropdownMenuTrigger>
                            <DropdownMenu.DropdownMenuPortal>
                                <DropdownMenu.DropdownMenuContent className="bg-white p-1 shadow-md rounded border z-[50]" sideOffset={5}>
                                    <DropdownMenu.DropdownMenuItem onSelect={() => { editor.tf.setNodes({ type: 'p' }); }}>
                                        Paragraph (P)
                                    </DropdownMenu.DropdownMenuItem>
                                    <DropdownMenu.DropdownMenuItem onSelect={() => { editor.tf.setNodes({ type: 'h1' }); }}>
                                        Heading 1 (H1)
                                    </DropdownMenu.DropdownMenuItem>
                                    <DropdownMenu.DropdownMenuItem onSelect={() => { editor.tf.setNodes({ type: 'h2' }); }}>
                                        Heading 2 (H2)
                                    </DropdownMenu.DropdownMenuItem>
                                    <DropdownMenu.DropdownMenuItem onSelect={() => { editor.tf.setNodes({ type: 'h3' }); }}>
                                        Heading 3 (H3)
                                    </DropdownMenu.DropdownMenuItem>
                                    <DropdownMenu.DropdownMenuItem onSelect={() => { editor.tf.setNodes({ type: 'h4' }); }}>
                                        Heading 4 (H4)
                                    </DropdownMenu.DropdownMenuItem>
                                    <DropdownMenu.DropdownMenuItem onSelect={() => { editor.tf.setNodes({ type: 'h5' }); }}>
                                        Heading 5 (H5)
                                    </DropdownMenu.DropdownMenuItem>
                                </DropdownMenu.DropdownMenuContent>
                            </DropdownMenu.DropdownMenuPortal>
                        </DropdownMenu.DropdownMenu>
                    </FixedToolbar>
                    <EditorContainer className="bg-white p-4 rounded-md shadow-md">  {/* Styles the editor area */}
                        <Editor className="" style={{ paddingLeft: '10px', paddingRight: '10px' }} placeholder="Type your amazing content here..." />
                    </EditorContainer >
                </Plate >
            </TooltipProvider>
        </React.Fragment>
    )
}

