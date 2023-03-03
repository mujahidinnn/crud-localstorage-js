// validasi nilai input sebelum disubmit
function validateForm() {
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  if (name === "") {
    alert("Name is required!");
    return false;
  } else if (age === "") {
    alert("Age is required!");
    return false;
  } else if (age < 12) {
    alert("Age must above 12 y.o!");
    return false;
  } else if (email === "") {
    alert("Email is required!");
    return false;
  } else if (!email.includes("@" && ".")) {
    alert("Invalid email address! \n must includes @ and .");
    return false;
  } else if (address === "") {
    alert("Address is required!");
    return false;
  }
  return true;
}

// function untuk menampilkan data
function showData() {
  let userList;
  if (localStorage.getItem("userList") === null) {
    userList = [];
  } else {
    userList = JSON.parse(localStorage.getItem("userList"));
  }

  let html = "";
  userList.map(function (item, id) {
    html += "<tr>";
    html += `<td>${id + 1}</td>`;
    html += `<td>${item.name}</td>`;
    html += `<td>${item.age}</td>`;
    html += `<td>${item.email}</td>`;
    html += `<td>${item.address}</td>`;
    html += `<td><button onclick="UpdateData('${id}')" class="btn btn-warning">Update</button> <button onclick="DeleteData('${id}')" class="btn btn-danger">Delete</button></td>`;
    html += "</tr>";
  });

  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Memuat semua data dari localstorage ketika halaman dimuat
document.onload = showData();

// funtion untuk menambah data ke localstorage
function AddData() {
  if (validateForm() === true) {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;

    let userList;
    if (localStorage.getItem("userList") === null) {
      userList = [];
    } else {
      userList = JSON.parse(localStorage.getItem("userList"));
    }
    userList.push({
      name: name,
      age: age,
      email: email,
      address: address,
    });
    localStorage.setItem("userList", JSON.stringify(userList));
    showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("email").value = "";
    document.getElementById("address").value = "";
  }
}

// function untuk menghapus data dari localstorage
function DeleteData(id) {
  let userList;
  if (localStorage.getItem("userList") === null) {
    userList = [];
  } else {
    userList = JSON.parse(localStorage.getItem("userList"));
  }
  userList.splice(id, 1);
  localStorage.setItem("userList", JSON.stringify(userList));
  showData();
  alert("Success delete data");
}

// funtion untuk mengupdate data dari localstorage
function UpdateData(id) {
  // menyembunyikan tombol add/tambah dan menampilkan tombol update ketika user klik aksi tombol update
  document.getElementById("add").style.display = "none";
  document.getElementById("update").style.display = "block";

  let userList;
  if (localStorage.getItem("userList") === null) {
    userList = [];
  } else {
    userList = JSON.parse(localStorage.getItem("userList"));
  }

  document.getElementById("name").value = userList[id].name;
  document.getElementById("age").value = userList[id].age;
  document.getElementById("email").value = userList[id].email;
  document.getElementById("address").value = userList[id].address;

  document.querySelector("#update").onclick = function () {
    if (validateForm() === true) {
      userList[id].name = document.getElementById("name").value;
      userList[id].age = document.getElementById("age").value;
      userList[id].email = document.getElementById("email").value;
      userList[id].address = document.getElementById("address").value;

      localStorage.setItem("userList", JSON.stringify(userList));
      showData();
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("email").value = "";
      document.getElementById("address").value = "";
      // menyembunyikan tombol update dan menampilkan tombol add/tambah ketika user klik aksi tombol update
      document.getElementById("add").style.display = "block";
      document.getElementById("update").style.display = "none";
      alert("Success update data!");
    }
};
}
