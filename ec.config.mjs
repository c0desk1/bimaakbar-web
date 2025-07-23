import { defineEcConfig } from 'astro-expressive-code'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineEcConfig({
  plugins: [pluginCollapsibleSections(),pluginLineNumbers()],
  defaultProps: {
    collapseStyle: 'collapsible-auto',
    showLineNumbers: true,
    startLineNumber: '1',
  },
  styleOverrides: {
    frames: {
        extractFileNameFromCode: true,
        removeCommentsWhenCopyingTerminalFrames: true,
        showCopyToClipboardButton: true,

        editorActiveTabBackground: 'transparent',
        editorActiveTabBorderColor: 'transparent',

        editorActiveTabForeground: 'var(--color-fg)',

        editorActiveTabIndicatorBottomColor: 'transparent',
        editorActiveTabIndicatorHeight: '0px',
        editorActiveTabIndicatorTopColor: 'transparent',

        editorBackground: 'var(--color-bg)',

        editorTabBarBackground: 'var(--color-card-bg)',
        editorTabBarBorderBottomColor: 'var(--color-border)',
        editorTabBarBorderColor: 'var(--color-border)',

        editorTabBorderRadius: '8px',

        frameBoxShadowCssValue: 'rgba(0, 0, 0, 0.05)',

        inlineButtonBackground: 'var(--color-card-bg)',
        inlineButtonBorder: 'transparent',
        inlineButtonForeground: 'var(--color-fg)',

        shadowColor: 'rgba(0, 0, 0, 0.05)',

        terminalBackground: 'var(--color-bg)',
        terminalTitlebarBackground: 'var(--color-card-bg)',
        terminalTitlebarBorderBottomColor: 'transparent',
        terminalTitlebarDotsForeground: 'var(--color-fg)',
        terminalTitlebarForeground: 'var(--color-fg)',

        tooltipSuccessForeground: 'var(--color-fg)',
    },

    UnresolvedStyleValue: {
        borderWidth: '1px',
        borderColor: 'var(--color-border)',
        borderRadius: '8px',
        codeBackground: 'var(--color-card-bg)',
        codeSelectionBackground: 'var(--color-accent)',
        focusBorder: 'var(--color-accent)',

        scrollbarThumbColor: 'var(--color-accent)',
        scrollbarThumbHoverColor: 'var(--color-accent)',

        uiSelectionBackground: 'var(--color-accent)',
        uiSelectionForeground: 'var(--color-accent-fg)',

        closedBackgroundColor: 'var(--color-bg-secondary)',
        closedBorderColor: 'var(--color-border)',
        openBackgroundColor: 'var(--color-bg-secondary)',
        openBorderColor: 'var(--color-border)',
    }
  },
})