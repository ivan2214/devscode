import React, {useState, useRef} from "react"
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter"
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism"
import hljs from "highlight.js"
import {type ControllerRenderProps} from "react-hook-form"
import {toast} from "sonner"

import {cn} from "@/lib/utils"

import {Button} from "../ui/button"
import {Textarea} from "../ui/textarea"

import {type CreateProblemFormValues} from "./problem-form"

interface ProblemDetailsProps {
  field: ControllerRenderProps<CreateProblemFormValues, "code">
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({field}) => {
  const [content, setContent] = useState<string>("")
  const [mode, setMode] = useState<"markdown" | "preview">("markdown")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value

    setContent(value)
  }

  const getPreviewContent = (): string => {
    return content
  }

  const handleModeChange = (newMode: "markdown" | "preview") => {
    setMode(newMode)
  }
  const detectLanguage = (content: string): string => {
    const language = hljs.highlightAuto(content).language

    return language || "bash"
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex w-full resize-none flex-col overflow-auto rounded-sm bg-gray-800 p-0">
        <div className="sticky left-0 top-0 z-10 flex items-center bg-gray-800 p-4 shadow-md">
          <div className="ml-6 flex items-center text-gray-500">
            <div className="btn-group flex gap-2">
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
            </div>
          </div>
        </div>
        {mode === "markdown" && (
          <Textarea
            {...field}
            ref={textareaRef}
            className="prose h-fit max-h-64 min-h-52 w-full flex-grow resize-none overflow-y-auto bg-gray-900 p-4 text-gray-300"
            value={content}
            onChange={(e) => {
              if (e.target.value.length < 10000) {
                field.onChange(e)
                handleContentChange(e)
              }
              if (e.target.value.length > 10000) {
                console.log(e.target.value.length)

                toast("Error", {
                  description: "You can only enter a maximum of 10000 characters",
                })
              }
            }}
          />
        )}
        {mode === "preview" && content && content.length > 0 ? (
          <div className="prose relative h-fit max-h-64 w-full flex-grow resize-none overflow-y-auto">
            <div className="absolute right-0 top-0 rounded-t-sm bg-gray-800 px-2 py-1 text-xs text-gray-500">
              Detected Language: {detectLanguage(content)}
            </div>
            <SyntaxHighlighter language={detectLanguage(content)} style={vscDarkPlus}>
              {getPreviewContent()}
            </SyntaxHighlighter>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProblemDetails
