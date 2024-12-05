// Validation functions
function validateUsername(username) {
  var usernameRegex = /^[a-zA-Z0-9]([ ._-]?[a-zA-Z0-9]){2,19}$/;
  return usernameRegex.test(username);
}

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,16}$/;
  return passwordRegex.test(password);
}

function confirmPasswordsMatch(password, confirmPassword) {
  return password === confirmPassword;
}
var users = JSON.parse(localStorage.getItem("users")) || [];
// Add event listeners
var userIndex = -1;
document.addEventListener("DOMContentLoaded", function () {
  var pageId = document.body.id;
  if (pageId === "loginPage") {
    var loginButton = document.querySelector(".btn-primary");
    loginButton.addEventListener("click", function () {
      var email = document.querySelector("#email").value;
      var password = document.querySelector("#password").value;

      if (!validateEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "Please enter a valid email address.",
        });
      } else if (!validatePassword(password)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Password",
          text: "Password must be 8–16 characters, with uppercase, lowercase, digit, and special character.",
        });
      } else {
        for (var i = 0; i < users.length; i++) {
          if (users[i].email === email && users[i].password === password) {
            userIndex = i;
            break;
          }
        }
        if (userIndex === -1) {
          Swal.fire({
            icon: "error",
            title: "Invalid Email or Password",
            text: "Please enter a valid email and password.",
          });
        } else {
          localStorage.setItem("userIndex", userIndex);
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: "You are now logged in!",
          });
          window.location.href = "home.html";
        }
      }
    });
  }

  if (pageId === "signupPage") {
    var signupButton = document.querySelector(".btn-success");
    signupButton.addEventListener("click", function () {
      var username = document.querySelector("#username").value;
      var email = document.querySelector("#email").value;
      var password = document.querySelector("#password").value;
      var confirmPassword = document.querySelector("#confirmPassword").value;

      if (!validateUsername(username)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Username",
          text: "Username must be 3–20 characters long and can only contain letters, numbers, underscores, or hyphens.",
        });
      } else if (!validateEmail(email)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Email",
          text: "Please enter a valid email address.",
        });
      } else if (!validatePassword(password)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Password",
          text: "Password must be 8–16 characters, with uppercase, lowercase, digit, and special character.",
        });
      } else if (!confirmPasswordsMatch(password, confirmPassword)) {
        Swal.fire({
          icon: "error",
          title: "Passwords Do Not Match",
          text: "Please make sure both passwords are identical.",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Sign-up Successful",
          text: "You are now registered!",
        });
        var user = {
          username: username,
          email: email,
          password: password,
        };
        for (var i = 0; i < users.length; i++) {
          if (
            users[i].email === email ||
            users[i].username === username ||
            users[i].password === password
          ) {
            Swal.fire({
              icon: "error",
              title: "Sign-up Failed",
              text: "User or email or password are already exists!",
            });
            return;
          }
        }
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "index.html";
      }
    });
  }
  if (pageId === "homePage") {
    userIndex = localStorage.getItem("userIndex");
    if (userIndex === null || userIndex === "-1") {
      window.location.href = "index.html";
    } else {
      userIndex = parseInt(userIndex);
      var username = users[userIndex]?.username;
      document.querySelector("#username").innerHTML = username;
    }
  }
});
