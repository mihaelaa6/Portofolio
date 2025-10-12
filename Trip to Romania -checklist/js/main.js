window.onload = function () {
  const items = [
    "Passport",
    "Travel adapter",
    "Warm clothes",
    "Camera",
    "Phone charger",
    "Umbrella",
    "Snacks",
    "Romanian phrasebook"
  ];

  const divList = document.getElementById("div-list");
  const tally = document.getElementById("tally");

  items.forEach((item, index) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item-${index}`;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = item;

    const br = document.createElement("br");

    checkbox.addEventListener("change", updateTally);

    divList.appendChild(checkbox);
    divList.appendChild(label);
    divList.appendChild(br);
  });

  function updateTally() {
    const checkedCount = document.querySelectorAll("#div-list input:checked").length;
    tally.textContent = checkedCount;
  }
};
