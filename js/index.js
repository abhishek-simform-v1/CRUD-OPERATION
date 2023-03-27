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
  console.log(modal.classList.contains("hide"));
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
  console.log(modal.classList.contains("hide"));
  if (!modal.classList.contains("hide")) {
    modal.classList.add("hide");
  }
  let i;
  for (i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
  }
  console.log(modal.classList);
};

// start register codding

registerBtn.onclick = function (e) {
  if (validateForm()) {
    const randomId = function (length = 6) {
      let rand = Math.random()
        .toString(36)
        .substring(2, length + 2);
      return rand;
    };

    id.innerHTML = randomId(9);
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    profilePic.src = "./../img/avatar.png";
    registerForm.reset();
    closeAddWindow();
    setTimeout(() => {
      id.innerHTML = "";
    }, 1000);
  } else {
    e.preventDefault();
  }
};
const registrationData = () => {
  userData.push({
    id: id.innerHTML,
    productName: productName.value,
    description: description.value,
    email: email.value,
    price: price.value,
    catogories: catogories.value,
    profilePic: imgUrl === undefined ? "./../img/avatar.png" : imgUrl,
  });
  let userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  uploadPic.value = "";

  swal.fire("Good job!", "You clicked the button!", "success");
};
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(userData);
}
// start returning data on pag from localstorage
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
   <td>${index + 1}</td>
    <td><img src="${data.profilePic}" width="40" height="40"></td>
    <td>${data.id}</td>
     <td>${data.productName}</td>
    <td class="desc">${data.description}</td>
    <td>${data.price}</td>
    <td>${data.catogories}</td>
    <td>${data.email}</td>
    <td>
    <button class="eye-btn"><i class="fa fa-pencil"></i></button>
  
    
    <a href="./view.html?id=${
      data.id
    }" class="card-link">  <button><i class="fa fa-eye"></i>   </button></a>
 
      <button class="del-btn"><i class="fa fa-trash"></i></button>
    </td>
  </tr>`;
    });
  }
  // start delete codding
  let i;
  let allDelBtn = document.querySelectorAll(".del-btn");
  console.log(allDelBtn);
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let id = tr.getAttribute("index");
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
            tr.remove();
            userData.splice(id, 1);
            location.reload();
            localStorage.setItem("userData", JSON.stringify(userData));
            swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        });
    };
  }
  //start update codding
  var allEdit = document.querySelectorAll(".eye-btn");
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      console.log("hello");

      let tr = this.parentElement.parentElement;
      console.log(this.parentElement.parentElement);

      let td = tr.getElementsByTagName("TD");
      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("IMG");
      let profilePicEl = imgTag[0].src;
      let idEl = td[2].innerHTML;
      let productNameEl = td[3].innerHTML;
      let descriptionEl = td[4].innerHTML;
      let emailEl = td[5].innerHTML;
      let priceEl = td[6].innerHTML;
      let catogoriesEl = td[7].innerHTML;
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
        console.log(imgUrl);
        console.log(uploadPic.files[0].name);
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

// uploadPic.onchange = () => {
//   if (uploadPic.files[0].size < 1000000) {
//     let fReader = new FileReader();
//     fReader.onload = function (e) {
//       imgUrl = e.target.result;
//       profilePic.src = imgUrl;
//       console.log(imgUrl);
//       console.log(uploadPic.files[0].name);
//     };
//     fReader.readAsDataURL(uploadPic.files[0]);
//   } else {
//     alert("File Size is too Long");
//   }
// };
// start search codding
let searchEl = document.querySelector("#ProdId");
searchEl.oninput = function () {
  searchFuc();
};

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
  console.log("hi");
  searchEl.value = "";
  let tr = tableData.querySelectorAll("TR");
  console.log(searchEl);
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

// /////Form Validation
function validateForm() {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (productName.value == "") {
    alert("Name must be filled out");
    return false;
  } else if (description.value == "") {
    alert("description must be filled out");
    return false;
  } else if (price.value == "") {
    alert("price must be filled out");
    return false;
  } else if (catogories.value == "") {
    alert("catogories must be filled out");
    return false;
  } else if (!email.value.match(mailformat)) {
    alert("email must be filled out and valid");
    return false;
  } else {
    return true;
  }
}
