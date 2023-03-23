const addToggle = document.querySelector(".addProduct");
const modal = document.querySelector(".modal");
const closeIcon = document.querySelector(".close-icon");
console.log(addToggle);
const openAddWindow = () => {
  console.log(modal.classList.contains("hide"));
  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
    console.log(modal.classList);
  }
};
const closeAddWindow = () => {
  console.log(modal.classList.contains("hide"));
  if (!modal.classList.contains("hide")) {
    modal.classList.add("hide");
    console.log(modal.classList);
  }
};
// addToggle.addEventListener("click", openAddWindow());
// start all global codding
let userData = [];
let registerBtn = document.querySelector("#register-btn");
let id = document.getElementById("id");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let officeCode = document.getElementById("officeCode");
let JobTitle = document.getElementById("jobTitle");
let registerForm = document.getElementById("registerForm");
console.log(registerBtn, id, firstName, lastName, email, officeCode, JobTitle);
// end all global codding
// start register codding
registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  registerForm.reset();
  closeAddWindow();
};
const registrationData = () => {
  userData.push({
    id: id.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    officeCode: officeCode.value,
    JobTitle: JobTitle.value,
  });
  let userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
};
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(userData);
}
// start returning data on pag from localstorage
const getDataFromLocal = () => {
  userData.forEach((data, index) => {
    console.log(data, index);
  });
};
getDataFromLocal();
