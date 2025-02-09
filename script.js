import { menuArray } from "./data.js"; // Ensure the correct file extension

document.addEventListener("DOMContentLoaded", function () {
    const displayItem = document.getElementById("display-items");
    
     menuArray.forEach(item =>{
        displayItem.innerHTML += `
        <div class="items-display">
        <div class="img">
        <img src=${item.carImg} class="carImg">
        </div>
        <div class="names">
        <h2>${item.name}</h2>
        <p class="features">${item.features} </p>
        <i>${item.price}</i>
        </div>
        <div>
        <button> BUY NOW </button>
        </div>
        <div>
        `
     })
    
    console.log("Item Data:", menuArray); // Ensure this logs something
});
