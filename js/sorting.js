// data sorting by dropdown
let ascBtn = document.querySelector("#asc");
let productFilter = document.querySelector("#productFilter");

// by default acc
productFilter.onclick = function filter() {
  let value = this.value;
  if (value == "id") {
    userData.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? -1 : 1));
    getDataFromLocal();
  } else if (value == "productName") {
    userData.sort((a, b) =>
      a.productName.toLowerCase() > b.productName.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "description") {
    userData.sort((a, b) =>
      a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "email") {
    userData.sort((a, b) =>
      a.email.toLowerCase() > b.email.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "price") {
    userData.sort((a, b) =>
      Number(a.price.toLowerCase()) > Number(b.price.toLowerCase()) ? -1 : 1
    );

    getDataFromLocal();
  } else if (value == "catogories") {
    userData.sort((a, b) =>
      a.catogories.toLowerCase() > b.catogories.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "all") {
    getDataFromLocal();
  }
  getDataFromLocal();
};
ascBtn.classList.remove("asc");
ascBtn.classList.add("dsc");
ascBtn.innerHTML = `<span class="asc-arrow"><i class="fa-solid fa-up-right"></i></span>&nbsp;Sort in Accending Order`;

ascBtn.onclick = function () {
  let value = productFilter.value;
  if (value == "srNO") {
    userData.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? -1 : 1));
    getDataFromLocal();
  } else if (value == "id") {
    userData.sort((a, b) => (a.id.toLowerCase() > b.id.toLowerCase() ? -1 : 1));
    getDataFromLocal();
  } else if (value == "productName") {
    userData.sort((a, b) => {
      if (ascBtn.classList.contains("asc")) {
        a.productName.toLowerCase() > b.productName.toLowerCase() ? -1 : 1;
      } else {
        return -1;
      }
    });
    getDataFromLocal();
  } else if (value == "description") {
    userData.sort((a, b) => {
      if (ascBtn.classList.contains("asc")) {
        a.description.toLowerCase() > b.description.toLowerCase() ? -1 : 1;
      } else {
        return -1;
      }
    });
    getDataFromLocal();
  } else if (value == "email") {
    userData.sort((a, b) => {
      if (ascBtn.classList.contains("asc")) {
        a.email.toLowerCase() > b.email.toLowerCase() ? -1 : 1;
      } else {
        return -1;
      }
    });
    getDataFromLocal();
  } else if (value == "price") {
    userData.sort((a, b) => {
      if (ascBtn.classList.contains("asc")) {
        Number(a.price.toLowerCase()) > Number(b.price.toLowerCase()) ? -1 : 1;
      } else {
        return -1;
      }
    });
    getDataFromLocal();
  } else if (value == "catogories") {
    userData.sort((a, b) => {
      if (ascBtn.classList.contains("asc")) {
        a.catogories.toLowerCase() > b.catogories.toLowerCase() ? -1 : 1;
      } else {
        return -1;
      }
    });
    getDataFromLocal();
  } else if (value == "all") {
    userData.sort((a, b) => {
      if (ascBtn.classList.contains("asc")) {
        a.catogories.toLowerCase() > b.catogories.toLowerCase() ? -1 : 1;
      } else {
        return -1;
      }
    });
    filter();
    getDataFromLocal();
  }
  getDataFromLocal();
  ascBtn.classList.remove("asc");
  ascBtn.classList.add("dsc");
  ascBtn.innerHTML = `<span class="asc-arrow"><i class="fa-solid fa-up-right"></i></span>&nbsp;Sort in Accending Order`;
};

/*else {
    let value = productFilter.value;
    if (value == "id") {
        userData.sort((a, b) =>
            a.id.toLowerCase() > b.id.toLowerCase() ? 1 : -1
        );
        getDataFromLocal();
    } else if (value == "productName") {
        userData.sort((a, b) =>
            a.productName.toLowerCase() > b.productName.toLowerCase() ? 1 : -1
        );
        getDataFromLocal();
    } else if (value == "description") {
        userData.sort((a, b) =>
            a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1
        );
        getDataFromLocal();
    } else if (value == "email") {
        userData.sort((a, b) =>
            a.email.toLowerCase() > b.email.toLowerCase() ? 1 : -1
        );
        getDataFromLocal();
    } else if (value == "price") {
        userData.sort((a, b) => {
            if (Number(a.price.toLowerCase()) > Number(b.price.toLowerCase())) {
                return 1;
            } else {
                return -1;
            }
        });

        getDataFromLocal();
    } else if (value == "catogories") {
        userData.sort((a, b) =>
            a.catogories.toLowerCase() > b.catogories.toLowerCase() ? 1 : -1
        );
        getDataFromLocal();
    } else if (value == "all") {
        getDataFromLocal();
    }
    console.log(userData);
    getDataFromLocal();
    ascBtn.classList.add("asc");
    ascBtn.classList.remove("dsc");
    ascBtn.innerHTML = `<span class="asc-arrow"><i class="fa-solid fa-down-right"></i></span>&nbsp;Sort in deccending Order`;
}*/
