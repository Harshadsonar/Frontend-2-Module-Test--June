const database = [{
    ID: 1,
    name: "Alice",
    age: 21,
    grade: 9.2,
    degree: "Btech",
    email: "alice@example.com",
}, ];

function displaytable() {
    const studentsBody = document.getElementById("table-body");
    studentsBody.innerHTML = ""; // Clear the previous content

    for (const student of database) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.ID}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
          <td>${student.degree}</td>
          <td>${student.email}
          <i class="fa-solid fa-pen-to-square edit-btn" data-id="${student.ID}"></i>
          <i class="fa-solid fa-trash delete-btn" data-id="${student.ID}" ></i>
          <td>
           
          </td>
        `;

        studentsBody.appendChild(row);
    }
}

const studentForm = document.getElementById("student-form");
const submitButton = document.getElementById("submit-btn");
const editButtons = document.getElementsByClassName("edit-btn");
const deleteButtons = document.getElementsByClassName("delete-btn");

let isEditing = false;
let editStudentId = null;

studentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;
    const degree = document.getElementById("degree").value;
    const email = document.getElementById("email").value;

    if (isEditing) {
        // Edit student
        const editedStudent = database.find(
            (student) => student.ID === editStudentId
        );
        if (editedStudent) {
            editedStudent.name = name;
            editedStudent.age = age;
            editedStudent.grade = grade;
            editedStudent.degree = degree;
            editedStudent.email = email;
        }
    } else {
        // Add student
        const newStudent = {
            ID: database.length + 1,
            name,
            age,
            grade,
            degree,
            email,
        };
        database.push(newStudent);
    }

    // Reset the form
    studentForm.reset();
    submitButton.textContent = "Add Student";
    isEditing = false;
    editStudentId = null;

    displaytable();
});

// Event delegation for edit buttons
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("edit-btn")) {
        const studentId = parseInt(event.target.dataset.id);
        const student = database.find((student) => student.ID === studentId);
        if (student) {
            document.getElementById("name").value = student.name;
            document.getElementById("age").value = student.age;
            document.getElementById("grade").value = student.grade;
            document.getElementById("degree").value = student.degree;
            document.getElementById("email").value = student.email;
            submitButton.textContent = "Edit Student";
            submitButton.backgroundColor = "black";
            isEditing = true;
            editStudentId = studentId;
        }
    }
});

// Event delegation for delete buttons
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const studentId = parseInt(event.target.dataset.id);
        const studentIndex = database.findIndex(
            (student) => student.ID === studentId
        );
        if (studentIndex !== -1) {
            database.splice(studentIndex, 1);
            displaytable();
        }
    }
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function(event) {
    const searchTerm = event.target.value.toLowerCase();

    const filteredStudents = database.filter(
        (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm) ||
        student.degree.toLowerCase().includes(searchTerm)
    );

    displaytable(filteredStudents);
});

function displaytable(filteredStudents = database) {
    const studentsBody = document.getElementById("table-body");
    studentsBody.innerHTML = ""; // Clear the previous content

    for (const student of filteredStudents) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>${student.degree}
        <span>
        <i class="fa-solid fa-pen-to-square edit-btn" data-id="${student.ID}"></i>
        <i class="fa-solid fa-trash delete-btn" data-id="${student.ID}" ></i>
        </span>
          
        </td>
      `;

        studentsBody.appendChild(row);
    }
}

// Initial rendering of students
displaytable();