export interface Properties {
  children: string
}

function ReactMarkdown({ children }: Properties) {
  return <>{children}</>;
}

export default ReactMarkdown;
