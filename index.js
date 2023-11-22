const today = new Date();
const min = new Date(today);
min.setFullYear(today.getFullYear() - 55);

const max = new Date(today);
max.setFullYear(today.getFullYear() - 18);

document.getElementById('dob').setAttribute('min', formatDate(min));
document.getElementById('dob').setAttribute('max', formatDate(max));

function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return `${year}-${month}-${day}`;
}


let user = document.getElementById("userdata");

const getEntries = () => {
    let entries = localStorage.getItem("userData");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
};

let a = getEntries();

const display = () => {
    const entries = getEntries();

    const tableRows = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const checkboxIdCell = `<td>${entry.checkboxId ? 'Yes' : 'No'}</td>`;

        return `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${checkboxIdCell}</tr>`;
    }).join("\n");

    const table = `<table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>DOB</th>
            <th>Accept</th>
        </tr>${tableRows}</table>`;

    let details = document.getElementById("Entries");
    details.innerHTML = table;
};

const store = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const checkboxId = document.getElementById("checkboxId").checked;

    const data = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        checkboxId: checkboxId
    };

    console.log(data);

    a.push(data);

    localStorage.setItem("userData", JSON.stringify(a));
    display();
};

user.addEventListener("submit", store);
display();

localStorage.clear()
