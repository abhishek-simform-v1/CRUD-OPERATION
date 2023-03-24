let productDetail = document.getElementById("container");
console.log(productDetail);
let products = JSON.parse(localStorage.getItem("userData"));
let id = window.location.href.split("=")[1];
products.forEach((element) => {
  if (element.id == id) {
    productDetail.innerHTML = `<h1 class="card-header"> Product ID:- ${element.id} </h1>
<h3 class="card-title">${element.productName}</h3> <img src=${element.profilePic} alt="Card image cap">
<p class="card-text">${element.price}</p>
<h5 class="card-title">${element.sellerName}</h5> 
<button id="update-btn" >Update</button>

<a href="./index.html" class="btn btn-primary">Go Back</a> </div>
</div>`;
  }
});
