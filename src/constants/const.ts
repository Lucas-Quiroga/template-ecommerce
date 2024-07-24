import type { DataTienda } from "@/types/types";

export const CATEGORY_SELECT: string[] = [
  "Infusiones",
  "Sahumerios",
  "Accesorios",
  "Joyería",
  "Ambientadores",
  "Decoración",
  "Velas",
];

export const LOCAL_STORAGE_KEY: string = "cart_curanderia";

export const API_URL: string = "https://api.whatsapp.com/send";
export const PHONE_NUMBER: string = "+5491127877943";

export const DATA_TIENDA: DataTienda = {
  header: {
    title: "Curandería-Santería",
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
