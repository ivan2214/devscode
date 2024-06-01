import {type UseFormReturn} from "react-hook-form"

import {type CreateProblemFormValues} from "@components/problem/problem-form"
import ProblemDetails from "@components/problem/problem-details"
import {FormField, FormItem, FormLabel, FormMessage, FormControl} from "@ui/form"

interface CodeSectionProps {
  form: UseFormReturn<CreateProblemFormValues>
}

export const CodeSection: React.FC<CodeSectionProps> = ({form}) => (
  <section>
    <FormField
      control={form.control}
      name="code"
      render={({field}) => (
        <FormItem>
          <FormLabel>Tu código</FormLabel>
          <FormControl>
            <ProblemDetails field={{...field}} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </section>
)
