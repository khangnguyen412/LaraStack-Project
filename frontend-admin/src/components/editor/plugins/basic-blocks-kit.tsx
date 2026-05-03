import { ParagraphPlugin } from 'platejs/react';
import { BlockquoteRules, HeadingRules, HorizontalRuleRules, } from '@platejs/basic-nodes';
import { BlockquotePlugin, H1Plugin, H2Plugin, H3Plugin, H4Plugin, H5Plugin, H6Plugin, HorizontalRulePlugin, } from '@platejs/basic-nodes/react';
import { BoldRules, ItalicRules, MarkComboRules, UnderlineRules, } from '@platejs/basic-nodes';
import { BoldPlugin, ItalicPlugin, UnderlinePlugin, } from '@platejs/basic-nodes/react';


/**
 * Basic Blocks Kit
 */
import { BlockquoteElement } from '@/components/editor/blockquote-node';
import { H1Element, H2Element, H3Element, H4Element, H5Element, H6Element, } from '@/components/editor/heading-node';
import { ParagraphElement } from '@/components/editor/paragraph-node';
import { HrElement } from '@/components/editor/hr-node';

export const BasicBlocksKit = [
    ParagraphPlugin.withComponent(ParagraphElement),
    BoldPlugin.configure({
        inputRules: [
            BoldRules.markdown({ variant: '*' }),
            BoldRules.markdown({ variant: '_' }),
            MarkComboRules.markdown({ variant: 'boldItalic' }),
            MarkComboRules.markdown({ variant: 'boldUnderline' }),
            MarkComboRules.markdown({ variant: 'boldItalicUnderline' }),
            MarkComboRules.markdown({ variant: 'italicUnderline' }),
        ],
    }),
    ItalicPlugin.configure({
        inputRules: [
            ItalicRules.markdown({ variant: '*' }),
            ItalicRules.markdown({ variant: '_' }),
        ],
    }),
    UnderlinePlugin.configure({
        inputRules: [UnderlineRules.markdown()],
    }),
    HorizontalRulePlugin,
    H1Plugin.configure({
        inputRules: [HeadingRules.markdown()],
        node: {
            component: H1Element,
        },
        rules: {
            break: { empty: 'reset' },
        },
        shortcuts: { toggle: { keys: 'mod+alt+1' } },
    }),
    H2Plugin.configure({
        inputRules: [HeadingRules.markdown()],
        node: {
            component: H2Element,
        },
        rules: {
            break: { empty: 'reset' },
        },
        shortcuts: { toggle: { keys: 'mod+alt+2' } },
    }),
    H3Plugin.configure({
        inputRules: [HeadingRules.markdown()],
        node: {
            component: H3Element,
        },
        rules: {
            break: { empty: 'reset' },
        },
        shortcuts: { toggle: { keys: 'mod+alt+3' } },
    }),
    H4Plugin.configure({
        inputRules: [HeadingRules.markdown()],
        node: {
            component: H4Element,
        },
        rules: {
            break: { empty: 'reset' },
        },
        shortcuts: { toggle: { keys: 'mod+alt+4' } },
    }),
    H5Plugin.configure({
        inputRules: [HeadingRules.markdown()],
        node: {
            component: H5Element,
        },
        rules: {
            break: { empty: 'reset' },
        },
        shortcuts: { toggle: { keys: 'mod+alt+5' } },
    }),
    H6Plugin.configure({
        inputRules: [HeadingRules.markdown()],
        node: {
            component: H6Element,
        },
        rules: {
            break: { empty: 'reset' },
        },
        shortcuts: { toggle: { keys: 'mod+alt+6' } },
    }),
    BlockquotePlugin.configure({
        inputRules: [BlockquoteRules.markdown()],
        node: { component: BlockquoteElement },
        shortcuts: { toggle: { keys: 'mod+shift+period' } },
    }),
    HorizontalRulePlugin.configure({
        inputRules: [
            HorizontalRuleRules.markdown({ variant: '-' }),
            HorizontalRuleRules.markdown({ variant: '_' }),
        ],
        node: {
            component: HrElement,
        },
    }),
];
