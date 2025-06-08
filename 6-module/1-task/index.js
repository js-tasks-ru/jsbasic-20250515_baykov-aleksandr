export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this._elem = this._createTable();
  }

  get elem() {
    return this._elem;
  }

  _createTable() {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Имя", "Возраст", "Зарплата", "Город", ""].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    this._rows.forEach((row) => {
      const tr = document.createElement("tr");

      [...Object.keys(this._rows[1])].forEach((key) => {
        const td = document.createElement("td");
        td.textContent = row[key];
        tr.appendChild(td);
      });

      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", () => {
        tr.remove();
      });

      deleteTd.appendChild(deleteBtn);
      tr.appendChild(deleteTd);
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    return table;
  }
}
