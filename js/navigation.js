categoryButtons = document.getElementsByClassName("category-btn");

for (let i = 0; i < categoryButtons.length; i++) {
  const button = categoryButtons[i];

  button.addEventListener("click", () => {
    const currentlySelected = document.getElementsByClassName("active")[0];
    currentlySelected.classList.toggle("active");
    button.classList.toggle("active");
  });
}