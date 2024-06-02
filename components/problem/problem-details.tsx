import React, {useRef, useState} from "react"
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism"
import Markdown from "react-markdown"
import {type ControllerRenderProps} from "react-hook-form"

import Icon from "@ui/icon"

import {Button} from "../ui/button"
import {Textarea} from "../ui/textarea"

import {type CreateProblemFormValues} from "./problem-form"

interface ProblemDetailsProps {
  field: ControllerRenderProps<CreateProblemFormValues, "code">
}

interface CodeProps {
  className?: string
  children?: React.ReactNode
}

const Code: React.FC<CodeProps> = ({className, children}) => {
  const match = className ? /language-(\w+)/.exec(className) : null

  return match ? (
    <SyntaxHighlighter language={match[1]} style={atomDark}>
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({field}) => {
  const [content, setContent] = useState<string>("")
  const [mode, setMode] = useState<"markdown" | "preview">("markdown")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value

    setContent(value)
  }

  const handleModeChange = (newMode: "markdown" | "preview") => {
    setMode(newMode)
  }

  const addBlockCode = () => {
    setContent(
      (prevContent) => `\`\`\`lenguaje
      ${prevContent}\n\`\`\``,
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex w-full resize-none flex-col overflow-auto rounded-sm p-0">
        <div className="sticky left-0 top-0 z-10 flex items-center  p-4 shadow-md">
          <div className="ml-6 flex items-center ">
            <div className="flex gap-2">
              <Button
                title="Markdown mode"
                type="button"
                variant={mode === "markdown" ? "default" : "outline"}
                onClick={() => handleModeChange("markdown")}
              >
                Markdown
              </Button>
              <Button
                disabled={content.length === 0}
                title="Markdown with preview mode"
                type="button"
                variant={mode === "preview" ? "default" : "outline"}
                onClick={() => handleModeChange("preview")}
              >
                Preview
              </Button>
              <Button
                size="icon"
                title="Add BlockCode"
                type="button"
                variant="ghost"
                onClick={addBlockCode}
              >
                <Icon className="h-5 w-5" name="code" />
              </Button>
            </div>
          </div>
        </div>
        {mode === "markdown" && (
          <Textarea
            {...field}
            ref={textareaRef}
            className="prose h-fit max-h-64 min-h-52 w-full flex-grow resize-none overflow-y-auto p-4 focus-visible:ring-0"
            value={content}
            onChange={(e) => {
              if (e.target.value.length < 10000) {
                field.onChange(e)
                handleContentChange(e)
              }
            }}
          />
        )}
        {mode === "preview" && content.length ? (
          <div className="prose h-fit max-h-64 min-h-52 w-full flex-grow resize-none overflow-y-auto p-4">
            <Markdown
              components={{
                // eslint-disable-next-line react/no-unstable-nested-components
                code: ({children, className, ...props}) => (
                  <Code className={className} {...props}>
                    {children}
                  </Code>
                ),
              }}
            >
              {content}
            </Markdown>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProblemDetails
