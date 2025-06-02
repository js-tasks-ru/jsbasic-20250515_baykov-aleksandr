function highlight(table) {
  const tableRows = table.querySelectorAll("tr");

  for (let tableRow of tableRows) {
    const ageCell = tableRow.querySelector("td:nth-child(2)");
    const genderCell = tableRow.querySelector("td:nth-child(3)");
    const isAvailableCell = tableRow.querySelector("td:nth-child(4)");

    if (!isAvailableCell.hasAttribute("data-available")) {
      tableRow.setAttribute("hidden", "true");
    }
    if (isAvailableCell.dataset.available === "true") {
      tableRow.classList.add("available");
    }
    if (isAvailableCell.dataset.available === "false") {
      tableRow.classList.add("unavailable");
    }

    if (genderCell.textContent === "m") {
      tableRow.classList.add("male");
    }

    if (genderCell.textContent === "f") {
      tableRow.classList.add("female");
    }

    if (Number(ageCell.textContent) < 18) {
      tableRow.setAttribute("style", "text-decoration: line-through");
    }
  }
}
