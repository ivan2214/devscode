import {type FieldArrayWithId, type UseFormReturn} from "react-hook-form"

import Icon from "@ui/icon"
import {FormDescription, FormField, FormLabel, FormMessage, FormControl, FormItem} from "@ui/form"
import {Button} from "@ui/button"
import {type CreateProblemFormValues} from "@components/problem/problem-form"
import {ProblemInputSuggestionClient} from "@components/problem/problem-input-suggestion-client"

interface TagsSectionProps {
  tagFields: FieldArrayWithId<CreateProblemFormValues, "tagNames">[]
  form: UseFormReturn<CreateProblemFormValues>
  isPending: boolean
  appendTag: (tag: {name: string}) => void
  removeTag: (index: number) => void
}

export const TagsSection: React.FC<TagsSectionProps> = ({
  tagFields,
  form,
  isPending,
  appendTag,
  removeTag,
}) => (
  <section className="grid grid-cols-1 gap-6">
    <div className="flex flex-col items-start gap-5">
      <FormLabel>Tags</FormLabel>
      <FormDescription>
        Agrega etiquetas para que los usuarios puedan encontrar tu problema
      </FormDescription>
    </div>
    {tagFields.length ? (
      <div className="flex flex-wrap items-center gap-5">
        {tagFields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`tagNames.${index}.name`}
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <div className="flex max-w-fit items-center gap-2">
                    <ProblemInputSuggestionClient field={{...field}} />
                    <Button
                      disabled={isPending}
                      size="icon"
                      type="button"
                      variant="destructive"
                      onClick={() => removeTag(index)}
                    >
                      <Icon className="h-4 w-4" name="trash" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    ) : null}
    <div>
      <Button
        className="mt-2"
        disabled={isPending || form?.watch("tagNames")?.some((tag) => tag.name === "")}
        type="button"
        variant="outline"
        onClick={() => appendTag({name: ""})}
      >
        <Icon className="mr-2 h-4 w-4" name="plus" /> Añadir tag
      </Button>
    </div>
  </section>
)
