import { FormDescription } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const ImageSection = () => {
  const { control } = useFormContext();
  return (
    <div className="space-x-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      
    </div>
  );
};

export default ImageSection;
