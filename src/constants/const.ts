import type { DataTienda } from "@/types/types";

export const CATEGORY_SELECT: string[] = [
  "perfumes",
  "fragrances",
  "furniture",
  "beauty",
  "groceries",
];

export const LOCAL_STORAGE_KEY: string = "cart";

export const API_URL: string = "https://api.whatsapp.com/send";
export const PHONE_NUMBER: string = "";

export const DATA_TIENDA: DataTienda = {
  header: {
    title: "Tienda",
  },
  categories: CATEGORY_SELECT,
  faqs: [
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "Lorem ipsum dolor sit amet?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  contact: {
    phone: PHONE_NUMBER,
    whatsappUrl: API_URL,
  },
};
