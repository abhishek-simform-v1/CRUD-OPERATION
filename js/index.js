const addToggle = document.querySelector(".addProduct");
const modal = document.querySelector(".modal");
const closeIcon = document.querySelector(".close-icon");
console.log(addToggle);

// addToggle.addEventListener("click", openAddWindow());
// start all global codding
let registerForm = document.getElementById("registerForm");
let allInput = registerForm.querySelectorAll("INPUT");
let userData = [];
let id = document.getElementById("id");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let officeCode = document.getElementById("officeCode");
let JobTitle = document.getElementById("jobTitle");
let registerBtn = document.querySelector("#register-btn");
let updateBtn = document.querySelector("#update-btn");

let imgUrl;
// end all global codding

// toggle modal
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
    let i;
    for (i = 0; i < allInput.length; i++) {
      allInput[i].value = '';
      profilePic.src = "./../img/avatar.jpeg";
    }
    console.log(modal.classList);
  }
};
// start register codding
registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
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
    jobTitle: JobTitle.value,
    profilePic: imgUrl === undefined ? "./../img/avatar.jpeg" : imgUrl
  });
  let userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal.fire(
    'Good job!',
    'You clicked the button!',
    'success'
  );
};
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));

  //   console.log(userData);
}
// start returning data on pag from localstorage
let tableData = document.querySelector('#tableData');
const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
    <tr index="${index}" >
    <td>${index + 1}</td>
    <td><img src="${data.profilePic}" width="40" height="40"></td>
    <td>${data.id}</td>
    <td>${data.firstName}</td>
    <td>${data.lastName}</td>
    <td>${data.email}</td>
    <td>${data.officeCode}</td>
    <td>${data.jobTitle}</td>
    <td>
      <button class="eye-btn"><i class="fa fa-eye"></i></button>
      <button class="del-btn"><i class="fa fa-trash"></i></button>
    </td>
  </tr>`;
  });
  // start delete codding
  let i;
  let allDelBtn = document.querySelectorAll(".del-btn");
  console.log(allDelBtn);
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
      swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'

      }).then((result) => {
        if (result.isConfirmed) {
          tr.remove();
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      });


    };
  }
  //start update codding
  var allEdit = document.querySelectorAll(".eye-btn");
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("TD");
      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("IMG");
      let profilePicEl = imgTag[0].src;
      let idEl = td[2].innerHTML;
      let firstNameEl = td[3].innerHTML;
      let lastNameEl = td[4].innerHTML;
      let emailEl = td[5].innerHTML;
      let officeCodeEl = td[6].innerHTML;
      let jobTitleEl = td[7].innerHTML;
      addToggle.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      id.value = idEl;
      firstName.value = firstNameEl;
      lastName.value = lastNameEl;
      email.value = emailEl;
      officeCode.value = officeCodeEl;
      JobTitle.value = jobTitleEl;
      profilePic.src = profilePicEl;
      updateBtn.onclick = function (e) {
        e.preventDefault();
        userData[index] = {
          id: id.value,
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          officeCode: officeCode.value,
          jobTitle: JobTitle.value,
          profilePic: uploadPic.value === "" ? profilePic.src : imgUrl
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        getDataFromLocal();
        registerForm.reset();
        closeAddWindow();

      };
    };
  }
};
getDataFromLocal();

//image processing

let profilePic = document.querySelector("#profilePic");
let uploadPic = document.querySelector("#uploadField");
uploadPic.onchange = () => {
  if (uploadPic.files[0].size < 1000000) {
    let fReader = new FileReader();
    fReader.onload = function (e) {
      imgUrl = e.target.result;
      profilePic.src = imgUrl;
      console.log(imgUrl);
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File Size is too Long");
  }
};
// start search codding
