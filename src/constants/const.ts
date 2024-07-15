import type { DataTienda } from "@/types/types";

export const CATEGORY_SELECT: string[] = [
  "Sahumerios e Inciensos",
  "Velas y Cirios",
  "Herbolaria y Plantas",
  "Figuras y Estatuillas",
  "Amuletos y Talismanes",
  "Libros y Manuales",
  "Utensilios Rituales",
  "Aguas y Perfumes",
  "Piedras y Cristales",
  "Polvos y Sales",
];

export const LOCAL_STORAGE_KEY: string = "cart";

export const API_URL: string = "https://api.whatsapp.com/send";
export const PHONE_NUMBER: string = "541164038737";

export const DATA_TIENDA: DataTienda = {
  header: {
    title: "La curanderia",
  },
  categories: CATEGORY_SELECT,
  faqs: [
    {
      question: "¿Cómo hago un pedido?",
      answer:
        "Podes hacer tu pedido a través de nuestra tienda online, seleccionando los productos que te interesan y agregándolos al carrito. Una vez que hayas seleccionado todos los productos que deseas, podes finalizar la compra y te enviaremos un mensaje de WhatsApp para coordinar el envío y el pago.",
    },
    {
      question: "¿Cómo puedo pagar?",
      answer:
        "Aceptamos Mercado Pago, transferencia bancaria y efectivo. Una vez que hayas finalizado tu compra, te enviaremos un mensaje de WhatsApp con los detalles para que puedas realizar el pago.",
    },
    {
      question: "¿Hacen envíos?",
      answer:
        "Realizamos envios dependiendo la zona, a coordinar luego con nostros en whatsapp.",
    },
    {
      question: "¿Cuánto cuesta el envío?",
      answer:
        "El costo del envío depende de la zona de entrega y del peso de los productos. Una vez que hayas finalizado tu compra, te enviaremos un mensaje de WhatsApp con el costo del envío.",
    },
  ],
  contact: {
    phone: PHONE_NUMBER,
    whatsappUrl: API_URL,
  },
};
