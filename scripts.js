function filterPhotos() {
  const selectedCategory = document.getElementById("category-select").value;
  const photoCards = document.querySelectorAll(".photo-card");

  photoCards.forEach((card) => {
    // If 'all' is selected or card matches the selected category class
    if (selectedCategory === "all" || card.classList.contains(selectedCategory)) {
      card.classList.remove("hide");
    } else {
      card.classList.add("hide");
    }
  });
}