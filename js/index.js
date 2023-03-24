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
let sellerName = document.getElementById("sellerName");
let email = document.getElementById("email");
let price = document.getElementById("price");
let Catogories = document.getElementById("Catogories");
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
    registerBtn.disabled = false;
    updateBtn.disabled = true;
  }
};
const closeAddWindow = () => {
  console.log(modal.classList.contains("hide"));
  if (!modal.classList.contains("hide")) {
    modal.classList.add("hide");
    let i;
    for (i = 0; i < allInput.length; i++) {
      allInput[i].value = "";
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
    productName: productName.value,
    sellerName: sellerName.value,
    email: email.value,
    price: price.value,
    Catogories: Catogories.value,
    profilePic: imgUrl === undefined ? "./../img/avatar.jpeg" : imgUrl,
  });

  let userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal.fire("Good job!", "You clicked the button!", "success");
};
if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
  //   console.log(userData);
}
// start returning data on pag from localstorage
let tableData = document.querySelector("#tableData");
const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
    <tr index="${index}" >
    <td>${index + 1}</td>
    <td><img src="${data.profilePic}" width="40" height="40"></td>
    <td>${data.id}</td>
    <td>${data.productName}</td>
    <td>${data.price}</td>
    <td>${data.Catogories}</td>
    <td>${data.sellerName}</td>
    <td>${data.email}</td>
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
      let tr = this.parentElement.parentElement;
      console.log(this.parentElement.parentElement);

      let td = tr.getElementsByTagName("TD");
      let index = tr.getAttribute("index");
      let imgTag = td[1].getElementsByTagName("IMG");
      let profilePicEl = imgTag[0].src;
      let idEl = td[2].innerHTML;
      let productNameEl = td[3].innerHTML;
      let sellerNameEl = td[4].innerHTML;
      let emailEl = td[5].innerHTML;
      let priceEl = td[6].innerHTML;
      let CatogoriesEl = td[7].innerHTML;
      addToggle.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      id.value = idEl;
      productName.value = productNameEl;
      sellerName.value = sellerNameEl;
      email.value = emailEl;
      price.value = priceEl;
      Catogories.value = CatogoriesEl;
      profilePic.src = profilePicEl;
      updateBtn.onclick = function (e) {
        e.preventDefault();
        userData[index] = {
          id: id.value,
          productName: productName.value,
          sellerName: sellerName.value,
          email: email.value,
          price: price.value,
          Catogories: Catogories.value,
          profilePic: uploadPic.value === "" ? profilePic.src : imgUrl,
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
    let SearchbyCatogories = tr[i].getElementsByTagName("TD")[7].innerHTML;

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
    } else if (SearchbyCatogories.toLowerCase().indexOf(filter) > -1) {
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
// data sorting by dropdown
let productFilter = document.querySelector("#productFilter");
productFilter.onchange = function () {
  let value = this.value;
  if (value == "id") {
    userData.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1));
    getDataFromLocal();
  } else if (value == "productName") {
    userData.sort((a, b) =>
      a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1
    );
    getDataFromLocal();
  } else if (value == "sellerName") {
    userData.sort((a, b) =>
      a.sellerName.toLowerCase() > b.sellerName.toLowerCase() ? 1 : -1
    );
    getDataFromLocal();
  } else if (value == "email") {
    userData.sort((a, b) =>
      a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
    );
    getDataFromLocal();
  } else if (value == "price") {
    userData.sort((a, b) =>
      a.price.toLowerCase() > b.price.toLowerCase() ? 1 : -1
    );
    getDataFromLocal();
  } else if (value == "Catogories") {
    userData.sort((a, b) =>
      a.Catogories.toLowerCase() > b.Catogories.toLowerCase() ? 1 : -1
    );
    getDataFromLocal();
  }
  console.log(userData);

  getDataFromLocal();
};
// /////Form Validation
function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
