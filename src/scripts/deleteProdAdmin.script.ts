const deleteButton = document.getElementById(
  "delete-document"
) as HTMLButtonElement;
const url = document.querySelector("form")?.getAttribute("action") as string;
deleteButton.addEventListener("click", async () => {
  const response: Response = await fetch(url, {
    method: "DELETE",
  });
  if (response.redirected) {
    window.location.assign(response.url);
  }
});
