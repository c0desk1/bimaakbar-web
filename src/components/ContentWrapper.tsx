import CodeBlock from "./CodeBlock";

export const ContentWrapper = {
  pre: (props: any) => {
    const code = props.children?.props?.children ?? ""
    const className = props.children?.props?.className ?? ""
    const langMatch = className.match(/language-(\w+)/)
    const lang = langMatch ? langMatch[1] : "text"

    return <CodeBlock code={code} lang={lang} />
  },
}
