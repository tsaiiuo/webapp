// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  push,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDMJSXMDgvRVAWukhYQXzVfVYYB8rjtnI",
  authDomain: "family-demo-703f5.firebaseapp.com",
  databaseURL:
    "https://family-demo-703f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "family-demo-703f5",
  storageBucket: "family-demo-703f5.appspot.com",
  messagingSenderId: "18404961240",
  appId: "1:18404961240:web:1b5d6bfddc1d47fa2fa0ad",
  measurementId: "G-X6QT6V45G2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);
const submit = document.querySelector("#submit");

//selectors
const groupInput = document.querySelector(".group-input1");
const groupInput2 = document.querySelector(".group-input2");
const groupButton = document.querySelector(".group-btn");
const groupList = document.querySelector(".group-list");
const cuteButton = document.querySelector(".cute-btn");
const cuteButton2 = document.querySelector(".cute-btn2");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const Page1 = document.querySelector(".Page1");
const Page2 = document.querySelector(".game");
const signinbtn = document.querySelector(".signin");
const signupbtn = document.querySelector(".signup");
const groupScreen = document.querySelector(".group");
const introScreen = document.querySelector(".intro");

//events
cuteButton.addEventListener("click", returnIntroPage);
cuteButton2.addEventListener("click", preventDefault);
groupButton.addEventListener("click", addList);
groupList.addEventListener("click", deleteCheck);
signinbtn.addEventListener("click", () => {
  var email = document.getElementById("email1").value;
  var password = document.getElementById("password1").value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const dt = new Date();
      email = email.replace("@", "").replace(".", "");
      update(ref(database, "users/" + email), {
        last_login: dt,
      });
      readUserData();
      Page1.style.display = "none";
      Page2.style.display = "";
      alert("User loged in!");
      // ...
    })
    .catch((error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});
signupbtn.addEventListener("click", () => {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      writeUserData(user.uid, username, email, password);
      alert("user created!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
});
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
//functions

//write firebase data

function writeUserData(userId, name, email, password) {
  const db = getDatabase();
  email = email.replace("@", "").replace(".", "");
  set(ref(db, "users/" + email), {
    username: name,
    email: email.replace("@", ""),
    password: password,
    userId: userId,
  });
  console.log("write user data");
}

function writeGroupData(userId, groupname, number) {
  const db = getDatabase();
  var email = document.getElementById("email1").value;
  email = email.replace("@", "").replace(".", "");
  set(ref(db, "users/" + email + "/" + userId), {
    groupname: groupname,
    number: number,
    userId: userId,
  });
  console.log("add success");
}

//read firebase data
function readUserData() {
  var email = document.getElementById("email1").value;
  email = email.replace("@", "").replace(".", "");
  const dbRef = ref(database, "users/" + email);
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        createList(childData.groupname, childData.number);
      });
    },
    {
      onlyOnce: true,
    }
  );
}

//remove firebase data
function removeUserData(groupname) {
  var email = document.getElementById("email1").value;
  email = email.replace("@", "").replace(".", "");
  const dbRef = ref(database, "users/" + email);
  const db = getDatabase();
  onValue(
    dbRef,
    (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        //console.log(childKey);
        const childData = childSnapshot.val();
        //console.log(childData);
        if (childData.groupname == groupname) {
          console.log("users/" + email + "/" + childData.userId);
          remove(ref(db, "users/" + email + "/" + childKey));
          console.log("remove success");
        }
      });
    },
    {
      onlyOnce: true,
    }
  );
}
// create list
function createList(groupname, number) {
  const total = document.createElement("div");
  total.classList.add("totallist");
  //List div
  const listDiv = document.createElement("div");
  listDiv.classList.add("list");
  const newList = document.createElement("li");
  newList.classList.add("list-item");
  newList.innerText = groupname;
  listDiv.appendChild(newList);
  //check button
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check-square"></i>';
  checkButton.classList.add("check-btn");
  listDiv.appendChild(checkButton);
  //detail and delete button
  const detailButton = document.createElement("button");
  detailButton.innerHTML = '<i class="fas fa-address-card"></i>';
  detailButton.classList.add("detail-btn");
  listDiv.appendChild(detailButton);
  //detail and delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("delete-btn");
  listDiv.appendChild(trashButton);
  total.appendChild(listDiv);

  var i;
  if (number == null) {
    return false;
  }
  //alogrithms of add detail
  for (i = 0; i < number.length / 10; i++) {
    //detail div
    const detailDiv = document.createElement("div");
    detailDiv.classList.add("detail");
    //detailDiv.classList.add("fadeOut");
    const newDetail = document.createElement("li");
    newDetail.classList.add("detail-item");
    newDetail.innerText = number.substring(10 * i, 10 * (i + 1));
    detailDiv.appendChild(newDetail);
    //detail and delete button
    const commitButton = document.createElement("button");
    commitButton.innerHTML = '<i class="fas fa-user-astronaut"></i>';
    commitButton.classList.add("detail-btn");
    detailDiv.appendChild(commitButton);
    //display
    detailDiv.style.display = "none";
    //append to list
    total.appendChild(detailDiv);
  }

  groupList.appendChild(total);
}
//return intro
function returnIntroPage(event) {
  event.stopPropagation();
  event.preventDefault();
  groupScreen.classList.remove("fadeIn");
  groupScreen.classList.add("fadeOut");
  setTimeout(() => {
    introScreen.classList.add("fadeIn");
  }, 850);
}
//prevent button default
function preventDefault(event) {
  event.stopPropagation();
  event.preventDefault();
}

//addbtn eventlistener
function addList(event) {
  event.stopPropagation();
  event.preventDefault();
  console.log("addList");
  if (groupInput.value.length < 1 || groupInput2.value.length % 10 != 0) {
    alert(
      "Length of group name should more than 2 word and at least add one phone number"
    );
    return;
  }
  createList(groupInput.value, groupInput2.value);
  //firebase
  const userId = push(child(ref(database), "users")).key;
  writeGroupData(userId, groupInput.value, groupInput2.value);
  groupInput.value = "";
  groupInput2.value = "";
}

//check parent
function deleteCheck(e) {
  const item = e.target;
  //delete
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentNode.parentElement;
    console.log(todo.firstChild.firstChild.innerText);
    removeUserData(todo.firstChild.firstChild.innerText);
    todo.remove();
  } else if (item.classList[0] === "detail-btn") {
    var i;
    const todo = item.parentNode.parentElement;
    for (i = 1; i < todo.childNodes.length; i++) {
      if (todo.childNodes[i].style.display === "none") {
        todo.childNodes[i].style.display = "";
      } else {
        todo.childNodes[i].style.display = "none";
      }
    }
  }
}
