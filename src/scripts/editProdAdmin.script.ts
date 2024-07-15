import { updateProduct } from "@/services/updateProduct";

document.addEventListener("DOMContentLoaded", () => {
  const formEdit = document.getElementById("form-edit") as HTMLFormElement;
  const currentUrl: string = window.location.href;
  const urlSplit: string[] = currentUrl.split("/");
  const id: string = urlSplit[urlSplit.length - 1];

  formEdit.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name: string = (document.getElementById("name") as HTMLInputElement)
      .value;
    const image: string = (document.getElementById("image") as HTMLInputElement)
      .value;
    const description: string = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const price: string = (document.getElementById("price") as HTMLInputElement)
      .value;
    const stock: string = (document.getElementById("stock") as HTMLInputElement)
      .value;
    const data = {
      name,
      image,
      description,
      price: Number(price),
      stock: Number(stock),
    };
    try {
      await updateProduct(id, data);
    } catch (error) {
      console.error(error);
    }
  });
});
