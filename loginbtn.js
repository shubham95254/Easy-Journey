// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {
  getAuth,
  signOut,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDjdv9KDeYA3WWKGtiS8PXJfhu7q32vGwY",
  authDomain: "easy-journey-shubham.firebaseapp.com",
  projectId: "easy-journey-shubham",
  storageBucket: "easy-journey-shubham.appspot.com",
  messagingSenderId: "68993269035",
  appId: "1:68993269035:web:62225ad7777931f31d596e",
  measurementId: "G-VHEKELQ0XH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log(app);

// Get the login button
var loginBtn = document.getElementById("login");
if (localStorage.getItem("isLoggedIn") === "true") {
  loginBtn.innerHTML = "<a href='login.html'>Logout</a>";
  // sign out user
  document.getElementById("login").addEventListener("click", function () {
    signOut(auth).then(() => {
      console.log("User signed out");
      alert("Sign-out successful");
      window.location.href = "login.html";
      })
    .catch(error => {
        console.log("Error: " + error);
        alert("Error: " + error);
    });
  });
}


// // Add an event listener to the login button
// loginBtn.addEventListener("click", function () {
//   // Check if the user is logged in
//   if (localStorage.getItem("isLoggedIn") === "true") {
//     // If the user is logged in, sign them out
//     firebase
//       .auth()
//       .signOut()
//       .then(function () {
//         // Update the login button text to "Login"
//         loginBtn.innerHTML = "<a href='login.html'>Login</a>";
//       })
//       .catch(function (error) {
//         // Handle signout errors
//         console.error(error);
//       });
//   } 

// Add an authentication state listener to update the login button text
auth.onAuthStateChanged(function (user) {
  if (user) {
    // If the user is logged in, update the login button text to "Logout"
    loginBtn.innerHTML = "Logout";
  } else {
    // If the user is not logged in, update the login button text to "Login"
    loginBtn.innerHTML = "<a href='login.html'>Login</a>";
  }
});
