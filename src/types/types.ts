type AdminRegister = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  secretKey: string;
};

type AdminLogin = {
  email: string;
  password: string;
};

type Product = {
  id?: string;
  name: string;
  image?: string;
  description?: string;
  price: number;
  quantity?: number;
  category?: string;
  avaliable?: boolean;
};

type CartItem = {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

type PaginatedProductsResult = {
  products: Product[] | null;
  productsCount: number;
  page: number;
  limit: number;
  category: string;
};

type DataTienda = {
  header: {
    title: string;
  };
  categories: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  contact: {
    phone: string;
    whatsappUrl: string;
  };
};

export type {
  AdminRegister,
  AdminLogin,
  Product,
  CartItem,
  PaginatedProductsResult,
  DataTienda,
};
