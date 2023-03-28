// Select the element with the ID "asc"
let ascBtn = document.querySelector("#asc");

// Select the element with the ID "productFilter"
let productFilter = document.querySelector("#productFilter");

// Add an event listener to the "productFilter" element that will fire when it is clicked
productFilter.onclick = function filter() {
  // Get the value of the "productFilter" element
  let value = this.value;

  // Sort the "userData" array based on the selected value
  if (value == "id") {
    userData.sort((a, b) => (a.id.toLowerCase() < b.id.toLowerCase() ? -1 : 1));
    getDataFromLocal();
  } else if (value == "productName") {
    userData.sort((a, b) =>
      a.productName.toLowerCase() < b.productName.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "description") {
    userData.sort((a, b) =>
      a.description.toLowerCase() < b.description.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "email") {
    userData.sort((a, b) =>
      a.email.toLowerCase() < b.email.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "price") {
    userData.sort((a, b) =>
      Number(a.price.toLowerCase()) < Number(b.price.toLowerCase()) ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "catogories") {
    userData.sort((a, b) =>
      a.catogories.toLowerCase() < b.catogories.toLowerCase() ? -1 : 1
    );
    getDataFromLocal();
  } else if (value == "all") {
    getDataFromLocal();
  }

  // Call the "getDataFromLocal" function to display the sorted data
  getDataFromLocal();
  // Add an HTML element to the "ascBtn" element
  ascBtn.innerHTML = `&nbsp;Sort in Deccending Order`;
};
// Add an event listener to the "ascBtn" element that will fire when it is clicked
ascBtn.onclick = function () {
  // Get the value of the "productFilter" element
  let value = productFilter.value;

  // Update the HTML of the "ascBtn" element
  ascBtn.innerHTML = `&nbsp;Sort in Accending Order`;
  // Sort the "userData" array based on the selected value and sorting order
  switch (
    value // starting a switch statement based on the value parameter
  ) {
    case "id": // if the value is "id", execute the following code block
      userData.sort((a, b) => {
        // sort the userData array using an arrow function as the sorting criteria
        if (ascBtn.classList.contains("asc")) {
          // if the ascBtn element has the class "asc", sort the array in ascending order
          return a.id.toLowerCase() > b.id.toLowerCase() ? -1 : 1; // compare the ids of the two elements in the array and return -1 or 1 based on the comparison
        } else {
          // otherwise, sort the array in descending order
          return -1;
        }
      });
      break; // break out of the switch statement
    case "productName": // if the value is "productName", execute the following code block (and so on for the other cases)
      userData.sort((a, b) => {
        if (ascBtn.classList.contains("asc")) {
          return a.productName.toLowerCase() > b.productName.toLowerCase()
            ? -1
            : 1;
        } else {
          return -1;
        }
      });
      break;
    case "description":
      userData.sort((a, b) => {
        if (ascBtn.classList.contains("asc")) {
          return a.description.toLowerCase() > b.description.toLowerCase()
            ? -1
            : 1;
        } else {
          return -1;
        }
      });
      break;
    case "email":
      userData.sort((a, b) => {
        if (ascBtn.classList.contains("asc")) {
          return a.email.toLowerCase() > b.email.toLowerCase() ? -1 : 1;
        } else {
          return -1;
        }
      });
      break;
    case "price":
      userData.sort((a, b) => {
        if (ascBtn.classList.contains("asc")) {
          return Number(a.price.toLowerCase()) > Number(b.price.toLowerCase())
            ? -1
            : 1;
        } else {
          return -1;
        }
      });
      break;
    case "catogories":
      userData.sort((a, b) => {
        if (ascBtn.classList.contains("asc")) {
          return a.catogories.toLowerCase() > b.catogories.toLowerCase()
            ? -1
            : 1;
        } else {
          return -1;
        }
      });
      break;
    case "all":
      userData.sort((a, b) => {
        if (ascBtn.classList.contains("asc")) {
          return a.catogories.toLowerCase() > b.catogories.toLowerCase()
            ? -1
            : 1;
        } else {
          return -1;
        }
      });
      break;
  }
  // If the "ascBtn" element contains the class "asc"
  if (ascBtn.classList.contains("asc")) {
    // Remove the "asc" class and add the "dsc" class to "ascBtn"
    ascBtn.classList.remove("asc");
    ascBtn.classList.add("dsc");

    // Update the HTML of the "ascBtn" element
    ascBtn.innerHTML = `&nbsp;Sort in Accending Order`;
  } else {
    // Add the "asc" class and remove the "dsc" class from "ascBtn"
    ascBtn.classList.add("asc");
    ascBtn.classList.remove("dsc");
    // Update the HTML of the "ascBtn" element
    ascBtn.innerHTML = `&nbsp;Sort in Deccending Order`;
  }
  getDataFromLocal(); // call the getDataFromLocal function after sorting the userData array
};
