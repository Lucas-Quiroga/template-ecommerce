document.addEventListener("DOMContentLoaded", () => {
  const btnLogout: HTMLElement | null = document.getElementById("btnLogout");
  if (!btnLogout) {
    console.error("Element not found");
    return;
  }

  btnLogout.addEventListener("click", async () => {
    try {
      const response: Response = await fetch("/api/auth/signout", {
        method: "GET",
      });

      if (response.redirected) {
        window.location.assign(response.url);
      }
    } catch (error) {
      console.error("An error occurred while signing out", error);
    }
  });
});
