function highlight(table) {
  const tableRows = table.querySelectorAll("tr");

  for (let tableRow of tableRows) {
    const ageCell = tableRow.querySelector("td:nth-child(2)");
    const genderCell = tableRow.querySelector("td:nth-child(3)");
    const isAvailableCell = tableRow.querySelector("td:nth-child(4)");

    const status = isAvailableCell.dataset.available;

    if (!status) {
      tableRow.hidden = true;
    }

    else {
      tableRow.classList.toggle('available', status === 'true');
      tableRow.classList.toggle('unavailable', status === 'false');
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
