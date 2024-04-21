import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const formSchema = z.object({
  searchQuery: z.string({ required_error: "searchQuery required" }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  searchQuery?: string;
  onSubmit: (formdata: SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
};

const SearchBar = ({ onReset, onSubmit, placeHolder, searchQuery }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { searchQuery },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [form, searchQuery]);

  const HandleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex justify-between gap-3 flex-row rounded-full items-center border-2 p-3 ${
          form.formState.errors.searchQuery && "border-red-500"
        } `}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-blue-600 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant="outline"
          onClick={HandleReset}
          className="rounded-full"
        >
          Reset
        </Button>
        <Button className="bg-blue-500 rounded-full" type="submit">
          Search
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
