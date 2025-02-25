import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filter, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4 ">
        {Object.keys(filterOptions).map((filterItem) => (
          <Fragment key={filterItem}>
            <div>
              <h3 className="text-base font-bold">{filterItem}</h3>
            </div>
            <div className="grid gap-2  mt-2">
              {filterOptions[filterItem].map((options) => (
                <Label className="flex items-center gap-2 font-medium" key={options.id}>
                  <Checkbox
                  checked={
                    filter && 
                    Object.keys(filter).length > 0 && 
                    filter[filterItem] && 
                    filter[filterItem].indexOf(options.id)  > -1 
                  }
                    onCheckedChange={() => handleFilter(filterItem, options.id)}
                  />
                  {options.label}
                </Label>
              ))}
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
