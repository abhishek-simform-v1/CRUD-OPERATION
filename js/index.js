const addToggle = document.querySelector(".addProduct");
const modal = document.querySelector(".modal");
const closeIcon = document.querySelector(".close-icon");
// start all global codding
let registerForm = document.getElementById("registerForm");
let allInput = registerForm.querySelectorAll("INPUT");
let userData = [];
let id = document.getElementById("id");
let productName = document.getElementById("productName");
let description = document.getElementById("description");
let email = document.getElementById("email");
let price = document.getElementById("price");
let catogories = document.getElementById("catogories");
let registerBtn = document.querySelector("#register-btn");
let updateBtn = document.querySelector("#update-btn");
let clearFilter = document.querySelector("#clearFilter");
let imgUrl;
// end all global codding

// toggle modal
const openAddWindow = () => {
  if (modal.classList.contains("hide")) {
    modal.classList.remove("hide");
  }
  registerBtn.disabled = false;
  updateBtn.disabled = true;
  const randomId = function (length = 6) {
    let rand = Math.random()
      .toString(36)
      .substring(2, length + 2);
    return rand;
  };

  id.innerHTML = randomId(9);
};
const closeAddWindow = () => {
  if (!modal.classList.contains("hide")) {
    modal.classList.add("hide");
  }
  let i;
  for (i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
};

// start register codding

// Register button click event handler
registerBtn.onclick = function (e) {
  // Check if form is valid
  if (validateForm()) {
    // Generate a random 9-character ID
    const randomId = function (length = 6) {
      let rand = Math.random()
        .toString(36)
        .substring(2, length + 2);
      return rand;
    };

    // Set the ID element's innerHTML to the generated ID
    id.innerHTML = randomId(9);

    // Prevent the form from submitting
    e.preventDefault();

    // Save registration data to local storage
    registrationData();

    // Retrieve data from local storage and display it
    getDataFromLocal();

    // Set the profile picture source to the default image
    profilePic.src = "./../img/avatar.png";

    // Reset the registration form
    registerForm.reset();

    // Close the registration window
    closeAddWindow();

    // Clear the ID element after 1 second
    setTimeout(() => {
      id.innerHTML = "";
    }, 1000);
  } else {
    // Prevent the form from submitting if it's not valid
    e.preventDefault();
  }
};

const registrationData = () => { // declaring a function named registrationData
  userData.push({ // push an object into userData array
    id: id.innerHTML, // add id from HTML element into the object
    productName: productName.value, // add productName value into the object
    description: description.value, // add description value into the object
    email: email.value, // add email value into the object
    price: price.value, // add price value into the object
    catogories: catogories.value, // add categories value into the object
    profilePic: imgUrl === undefined ? "./../img/avatar.png" : imgUrl, // add profilePic value based on the imgUrl value
  });

  let userString = JSON.stringify(userData); // convert the userData array into a JSON string
  localStorage.setItem("userData", userString); // save the JSON string in the local storage with the key "userData"
  uploadPic.value = ""; // clear the value of uploadPic input field

  swal.fire("Good job!", "You clicked the button!", "success"); // show a success message using SweetAlert library
};

if (localStorage.getItem("userData") != null) { // check if "userData" key is present in the local storage
  userData = JSON.parse(localStorage.getItem("userData")); // parse the JSON string into userData array

} // end of the if statement
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// start returning data on page from localstorage
let dataimg = document.querySelector("#dataimg");
let tableData = document.querySelector("#tableData");
const getDataFromLocal = () => {
  if (userData.length == 0) {
    dataimg.innerHTML = `          <img src="./img/nodata.jpg" width="80%" height="auto" alt="no data">            <h2><strong>No Product Data to show</strong></h2>         `;
  } else {
    dataimg.innerHTML = "";
    tableData.innerHTML = "";
    userData.forEach((data, index) => {
      tableData.innerHTML += `
    <tr class="row" index="${index}" >
   <td class="srNo">${index + 1}</td>
    <td><img src="${data.profilePic}" width="40" height="40"></td>
    <td>${data.id}</td>
     <td>${data.productName}</td>
    <td class="desc">${data.description}</td>
    <td>${data.price}</td>
    <td>${data.catogories}</td>
    <td>${data.email}</td>
    <td>
    <button class="eye-btn"><i class="fa fa-pencil"></i></button>
  
    
    <a href="./view.html?id=${data.id
        }" class="card-link">  <button><i class="fa fa-eye"></i>   </button></a>
 
      <button class="del-btn"><i class="fa fa-trash"></i></button>
    </td>
  </tr>`;
    });
  }






  // start delete codding
  // Select all delete buttons
  let allDelBtn = document.querySelectorAll(".del-btn");

  // Loop through all delete buttons
  for (let i = 0; i < allDelBtn.length; i++) {
    // Set onclick event for each delete button
    allDelBtn[i].onclick = function () {
      // Get the corresponding row element and its index
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
      // Show a warning dialog before deleting the row
      swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Remove the row from the table and delete the corresponding data from the array
          tr.remove();
          userData.splice(id, 1);

          // Reload the page and update the local storage with the modified data
          location.reload();
          localStorage.setItem("userData", JSON.stringify(userData));

          // Show a success message after deleting the row
          swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });

    };
  }
  // 
  // 
  // 

  // 
  // 
  // 
  //start update codding
  // Select all elements with class "eye-btn" and store them in the variable "allEdit"
  var allEdit = document.querySelectorAll(".eye-btn");

  // Loop through all "eye-btn" elements
  for (i = 0; i < allEdit.length; i++) {

    // Add a click event listener to each "eye-btn"
    allEdit[i].onclick = function () {

      let tr = this.parentElement.parentElement;

      let td = tr.getElementsByTagName("TD");
      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("IMG");
      let profilePicEl = imgTag[0].src;
      let idEl = td[2].innerHTML;
      let productNameEl = td[3].innerHTML;
      let descriptionEl = td[4].innerHTML;
      let priceEl = td[5].innerHTML;
      let catogoriesEl = td[6].innerHTML;
      let emailEl = td[7].innerHTML;
      addToggle.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      id.innerHTML = idEl;
      productName.value = productNameEl;
      description.value = descriptionEl;
      email.value = emailEl;
      price.value = priceEl;
      catogories.value = catogoriesEl;
      profilePic.src = profilePicEl;
      updateBtn.onclick = function (e) {
        if (validateForm()) {
          e.preventDefault();
          userData[index] = {
            id: id.innerHTML,
            productName: productName.value,
            description: description.value,
            email: email.value,
            price: price.value,
            catogories: catogories.value,
            profilePic: uploadPic.value === "" ? profilePic.src : imgUrl,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          getDataFromLocal();
          profilePic.src = "./../img/avatar.png";
          location.reload();
          registerForm.reset();
          closeAddWindow();
        }
        e.preventDefault();
      };
    };
  }
};
getDataFromLocal();

//image processing

let profilePic = document.querySelector("#profilePic");
let uploadPic = document.querySelector("#uploadField");

uploadPic.addEventListener("change", function (e) {
  let imgFile = e.target.files[0];
  if (e.target.files[0].size <= 200000) {
    if (
      imgFile.type == "image/png" ||
      imgFile.type == "image/jpeg" ||
      imgFile.type == "image/jpg" ||
      imgFile.type == "image/gif"
    ) {
      let fReader = new FileReader();
      fReader.onload = function (e) {
        imgUrl = e.target.result;
        profilePic.src = imgUrl;
      };
      fReader.readAsDataURL(uploadPic.files[0]);
    } else {
      alert("File type is not image");
    }
  } else {
    alert("File Size is too Long");

    alert("File type is not image");
  }
});

let searchEl = document.querySelector("#ProdId");
searchEl.oninput = function () {
  searchFuc();
};
//Searching Function

function searchFuc() {
  let tr = tableData.querySelectorAll("TR");
  let filter = searchEl.value.toLowerCase();
  let i;
  for (i = 0; i < tr.length; i++) {
    let SeachbyId = tr[i].getElementsByTagName("TD")[2].innerHTML;
    let SeachbyFname = tr[i].getElementsByTagName("TD")[3].innerHTML;
    let SearchbyLname = tr[i].getElementsByTagName("TD")[4].innerHTML;
    let SearchbyEmail = tr[i].getElementsByTagName("TD")[5].innerHTML;
    let Searchbyprice = tr[i].getElementsByTagName("TD")[6].innerHTML;
    let Searchbycatogories = tr[i].getElementsByTagName("TD")[7].innerHTML;

    if (SeachbyId.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (SeachbyFname.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (SearchbyLname.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (SearchbyEmail.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (Searchbyprice.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else if (Searchbycatogories.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
//clear filter codding
clearFilter.onclick = function () {
  searchEl.value = "";
  let tr = tableData.querySelectorAll("TR");
  for (i = 0; i < tr.length; i++) {
    tr[i].style.display = "";
  }
};

//clear All Data
let delAllBtn = document.querySelector("#delAllBtn");
let delAllBox = document.querySelector("#delAllBox");
delAllBtn.addEventListener("click", () => {
  if (delAllBox.checked == true) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("userData");
          window.location = location.href;
          swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
  } else {
    swal.fire("Check The Box !!!", "Please Check The Box", "warning");
  }
});

//Form Validation
function validateForm() {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (productName.value == "" || productName.value == " ") {
    alert("Name must be filled out");
    return false;
  } else if (description.value == "" || description.value == " ") {
    alert("description must be filled out");
    return false;
  } else if (price.value == "" || price.value == " ") {
    alert("price must be filled out");
    return false;
  } else if (catogories.value == "" || catogories.value == " ") {
    alert("catogories must be filled out");
    return false;
  } else if (!email.value.match(mailformat)) {
    alert("email must be filled out and valid");
    return false;
  } else {
    return true;
  }
}
