// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhEVgFHJ7q5Xoiit1BZkDPkdCi9AtiLCI",
  authDomain: "week13-667b6.firebaseapp.com",
  databaseURL: "https://week13-667b6-default-rtdb.firebaseio.com",
  projectId: "week13-667b6",
  storageBucket: "week13-667b6.appspot.com",
  messagingSenderId: "807743010389",
  appId: "1:807743010389:web:3b573f8c2c74b65afa86dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

/// write and update data
function writeUserData(userId, age, email, name) {
  set(ref(db, "users/" + userId), {
    age: age,
    email: email,
    name: name,
  });
}
// writeUserData("4", 18, "taset@tea.com", "tanapon");
/// read data
function readAllData() {
  get(child(ref(db), `users/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        funcTable(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
// console.log(out);

//// delete data
function deleteData(userId) {
  const userDel = ref(db, `users/${userId}`);

  remove(userDel).then(() => {
    console.log("user removed");
  });
}
// deleteData(0);

function funcTable(data) {
  var cols = [];

  // get colums
  for (const property in data) {
    for (const pro in data[property]) {
      if (cols.indexOf(pro) === -1) {
        cols.push(pro);
      }
    }
  }

  // Create a table element
  var table = document.createElement("table");

  // Create table row tr element of a table
  var tr = table.insertRow(-1);

  var theader = document.createElement("th");
  theader.innerHTML = "ID";
  tr.appendChild(theader);
  for (var i = 0; i < cols.length; i++) {
    // Create the table header th element
    var theader = document.createElement("th");
    theader.innerHTML = cols[i];

    // Append columnName to the table row
    tr.appendChild(theader);
  }

  // Adding the data to the table
  for (const property in data) {
    // cell.innerHTML = "" + property.key;

    // Create a new row
    var trow = table.insertRow(-1);
    var cell = trow.insertCell(-1);
    cell.innerHTML = property;
    for (var j = 0; j < cols.length; j++) {
      var cell = trow.insertCell(-1);
      // Inserting the cell at particular place
      if (data[property] != null) {
        cell.innerHTML = "" + data[property][cols[j]];
      }
    }
  }

  // Add the newly created table containing json data
  var el = document.getElementById("myTable");
  el.innerHTML = "";
  el.appendChild(table);
}
/// read data
function readUserData(userId) {
  get(child(ref(db), `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        myInfo.innerText =
          snapshot.val()["age"] +
          " " +
          snapshot.val()["name"] +
          " " +
          snapshot.val()["email"];
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

readAllData();

btnInsert.addEventListener("click", (e) => {
  const sid = insertID.value;
  const sname = insertName.value;
  const semail = insertEmail.value;
  writeUserData(sid, 18, semail, sname);
  console.log("Insert completed", sid, 18, semail, sname);
  location.reload();
});

btnInsert.addEventListener("click", (e) => {
  const sid = insertID.value;
  const sname = insertName.value;
  const semail = insertEmail.value;
  writeUserData(sid, 18, semail, sname);
  console.log("Insert completed", sid, 18, semail, sname);
});

btnSelect.addEventListener("click", (e) => {
  const sid = selectID.value;
  var out = readUserData(sid);
  location.reload();
});

btnUpdate.addEventListener("click", (e) => {
  const sid = updateID.value;
  const sname = updateName.value;
  const semail = updateEmail.value;
  writeUserData(sid, 18, semail, sname);
  location.reload();
});

btnDelete.addEventListener("click", (e) => {
  const sid = deleteID.value;
  deleteData(sid);
  location.reload();
});
