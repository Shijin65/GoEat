import { cuisineList } from "@/config/Restaurant-options-config";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";
import { Check, ChevronDown, ChevronUp} from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisine: string[]) => void;
  selectedCuisines: string[];
  isExpanded: Boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleReset = () => onChange([]);
  const handleCuisineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const CheckedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, CheckedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== CheckedCuisine);

    onChange(newCuisineList);
  };
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter by Cuisine</div>
        <div
          onClick={handleReset}
          className="text-md font-semibold mb-2 underline text-blue-500 cursor-pointer"
        >
          Reset
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines?.includes(cuisine);
            return (
              <div>
                <input
                  id={`cuisine_${cuisine}`}
                  className="hidden"
                  type="checkbox"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-600"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          className="flex-1 mt-4 text-blue-600"
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className="flex items-center flex-row ">
              ShowLess
              <ChevronUp />{" "}
            </span>
          ) : (
            <span className="flex items-center flex-row ">
              ShowMore
              <ChevronDown />{" "}
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
