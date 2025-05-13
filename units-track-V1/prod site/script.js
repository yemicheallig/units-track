let submit = document.getElementById("submit");
let subject = document.getElementById("subject");
let pomodoro = document.getElementById("pomodoro");
let grade = document.getElementById("grade");
let unit = document.getElementById("unit");
let date = document.getElementById("date");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  const formdata = {
    subject: subject.value,
    pomodoro: pomodoro.value,
    grade: grade.value,
    unit: unit.value,
    date: date.value,
  };

  // Retrieve existing data from localStorage
  let progressData = JSON.parse(localStorage.getItem("progressData")) || [];

  // Add new data to the array
  progressData.push(formdata);

  // Save updated data back to localStorage
  localStorage.setItem("progressData", JSON.stringify(progressData));

  // Update the table with the new data
  updateTable();
});

function updateTable() {
  // Retrieve data from localStorage
  const progressData = JSON.parse(localStorage.getItem("progressData")) || [];

  // Get the table body
  const table = document.querySelector("table:last-of-type");
  const rows = table.querySelectorAll("tr:not(:first-child)");

  // Clear existing rows (except the header)
  rows.forEach((row) => row.remove());

  // Populate the table with data
  progressData.forEach((data, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.subject}</td>
      <td>${data.pomodoro}</td>
      <td>${data.grade}</td>
      <td>${data.unit}</td>
      <td>${data.date}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    table.appendChild(row);
  });

  // Add event listeners to all delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteRecord(index);
    });
  });
}

function deleteRecord(index) {
  // Retrieve data from localStorage
  let progressData = JSON.parse(localStorage.getItem("progressData")) || [];

  // Remove the record at the specified index
  progressData.splice(index, 1);

  // Save the updated data back to localStorage
  localStorage.setItem("progressData", JSON.stringify(progressData));

  // Update the table
  updateTable();
}
