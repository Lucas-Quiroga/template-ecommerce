import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateSearchParams } from "@/lib/utils";
import { IoReload } from "react-icons/io5";
import { DATA_TIENDA } from "@/constants/const";

interface FiltersIndexProps {
  category: string;
}

const FiltersIndex = ({ category }: FiltersIndexProps): JSX.Element => {
  const handleCategoryChange = (selectedCategory: string): void => {
    const newUrl: string = updateSearchParams("category", selectedCategory);
    window.history.pushState({}, "", newUrl);
    window.location.reload();
  };

  const handleCleanFilters = (): void => {
    window.history.pushState({}, "", "/");
    window.location.reload();
  };

  return (
    <div className="flex gap-2">
      <div className="flex space-x-2">
        <Select onValueChange={handleCategoryChange} value={category}>
          <SelectTrigger className="min-w-[150px] whitespace-nowrap">
            <SelectValue placeholder="Categorias" />
          </SelectTrigger>
          <SelectContent>
            {DATA_TIENDA.categories.map((cat: string, index: number) => (
              <SelectItem key={index} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant={"outline"}
        onClick={handleCleanFilters}
        disabled={category === ""}
      >
        <IoReload />
      </Button>
    </div>
  );
};

export default FiltersIndex;
