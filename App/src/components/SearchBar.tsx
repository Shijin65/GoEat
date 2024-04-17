import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  searchquery: z.string({ required_error: "Searchquery required" }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  searchQuery:string;
  onSubmit: (formdata:SearchForm) => void;
  placeHolder: string;
  onReset?: () => void;
};

const SearchBar = ({ onReset, onSubmit, placeHolder }: Props) => {
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
  });

  const HandleReset = () => {
    form.reset({
      searchquery: "",
    });
    if (onReset) {
      onReset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`flex justify-between mx-5  gap-3 flex-row rounded-full items-center border-2 p-3 ${form.formState.errors.searchquery && "border-red-500"} `}
      >
        <Search
          strokeWidth={2.5}
          size={30}
          className="ml-1 text-blue-600 hidden md:block"
        />
        <FormField
          control={form.control}
          name="searchquery"
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
        {form.formState.isDirty && (
          <Button
            type="button"
            variant="outline"
            onClick={HandleReset}
            className="rounded-full"
          >
            clear
          </Button>
        )}
        <Button className="bg-blue-500 rounded-full" type="submit" >Search</Button>
      </form>
    </Form>
  );
};

export default SearchBar;
