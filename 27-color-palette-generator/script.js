// Get references to the "Generate" button and the palette container
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");

// When the button is clicked, generate a new color palette
generateBtn.addEventListener("click", generatePalette);

// Handle clicks inside the palette (event delegation)
paletteContainer.addEventListener("click", function (e) {
  // If the clicked element is the copy icon
  if (e.target.classList.contains("copy-btn")) {
    const hexValue = e.target.previousElementSibling.textContent;

    // Copy the hex value to clipboard
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target)) // Show visual feedback
      .catch((err) => console.log(err));

  // If the user clicks the color box itself
  } else if (e.target.classList.contains("color")) {
    const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;

    // Copy its hex value and show success feedback
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
      .catch((err) => console.log(err));
  }
});

// Temporarily change the icon to a green checkmark after copying
function showCopySuccess(element) {
  element.classList.remove("far", "fa-copy");
  element.classList.add("fas", "fa-check");
  element.style.color = "#48bb78"; // green color

  // Revert to original copy icon after 0.5s
  setTimeout(() => {
    element.classList.remove("fas", "fa-check");
    element.classList.add("far", "fa-copy");
    element.style.color = "";
  }, 500);
}

// Generate a palette of 5 random colors
function generatePalette() {
  const colors = [];

  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColor());
  }

  updatePaletteDisplay(colors);
}

// Generate a single random hex color (e.g. #A3F4C1)
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Update the UI with the new colors
function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  });
}

// generatePalette(); // Uncomment to auto-generate on page load
