import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-analytics.js";
import {getAuth,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Web app's Firebase configuration
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
const auth = getAuth(app);
console.log(app);

//   new registration
document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;


  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("You have successfully registered to Easy Journey");
      localStorage.setItem("isLoggedIn", true);
      window.location.href = "Homepage.html";
    })
    .catch((error) => {
      console.log(error.code + ": " + error.message);
      alert(error);
    });
    
});


// google login
const provider = new GoogleAuthProvider();

document.getElementById("googleLogin").addEventListener("click", function (event) {
    event.preventDefault();
    signInWithPopup(auth, provider)
      .then((response) => {
        const credential = GoogleAuthProvider.credentialFromResult(response);
        // The signed-in user info.
        const user = response.user;
        alert(`${user.displayName} have successfully signed into Easy Journey`);
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "Homepage.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  });