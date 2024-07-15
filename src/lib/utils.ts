import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter: Intl.NumberFormat = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
});

// Setea los valores de los parametros de busqueda en la URL
export const updateSearchParams = (type: string, value: string): string => {
  const searchParams: URLSearchParams = new URLSearchParams(
    window.location.search
  );

  if (type === "category") {
    searchParams.set("page", "1");
  }

  searchParams.set(type, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};
