let productDetail = document.getElementById("container");
console.log(productDetail);
let products = JSON.parse(localStorage.getItem("userData"));
let id = window.location.href.split("=")[1];
products.forEach((element) => {
  if (element.id == id) {
    productDetail.innerHTML = `
    <div class="product-id-name">
     
    <h1 class="card-header"> Product ID:- ${element.id} </h1>
<h3 class="card-title"> Product Name ID:-  ${element.productName}</h3> 
    
    </div>
   
    <div class="product-content">
    <div class="product-pic">
   <p> Product Image:-</p> 
    <img src=${element.profilePic} alt="Card image cap" >
    
    </div>
    <div class="product-price-seller">
    <p> Product Description:- </p>
    <h5 class="card-title">${element.description}</h5> 
    Product Price:- 

<p class="card-text">${element.price}</p>
    </div>
    
    </div>
   
<a href="./index.html" class="go-back">Go Back</a> </div>
</div>`;
  }
});
