"use client";
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
import { ModeToggle } from "../ThemeBtn";

interface FilterProps {
  category: string;
}

export const Filter = ({ category }: FilterProps) => {
  const handleCategoryChange = (selectedCategory: string): void => {
    const newUrl: string = updateSearchParams("category", selectedCategory);
    window.history.pushState({}, "", newUrl);
    window.location.reload();
  };

  const handleCleanFilters = (): void => {
    window.history.pushState({}, "", "/admin/dashboard");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4">
      <ModeToggle />
      <Select onValueChange={handleCategoryChange} value={category}>
        <SelectTrigger className="dark:text-white">
          <SelectValue placeholder="Categorias" />
        </SelectTrigger>
        <SelectContent>
          {DATA_TIENDA.categories.map((cat: string, index: number) => (
            <SelectItem key={index} value={cat} className="dark:text-white">
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant={"outline"}
        onClick={handleCleanFilters}
        disabled={category === ""}
      >
        <IoReload className="dark:text-white" />
      </Button>
    </div>
  );
};
