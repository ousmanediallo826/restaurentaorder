import { menuArray } from "./data.js"; 

document.addEventListener("DOMContentLoaded", function () {
    const displayItem = document.getElementById("display-items");
    const checkoutEl = document.getElementById("chart-el");

    let totalAmount = 0;
    let totalAmountEl = null; // Initially, there's no total displayed

    let itemsHTML = ""; 

    menuArray.forEach((item, index) => {
        itemsHTML += `
        <div class="items-display" data-id="${index}">
            <div class="img">
                <img src="${item.carImg}" class="carImg">
            </div>
            <div class="names">
                <h2 class="name">${item.name}</h2>
                <p class="features">${item.features.join(", ")}</p>
                <i class="price">$${item.price}</i>
            </div>
            <div>
                <button class="buy-btn" data-id="${index}">BUY NOW</button>
            </div>
        </div>`; 
    });

    displayItem.innerHTML = itemsHTML; 

    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", function (e) {
            const itemId = e.target.getAttribute("data-id");
            const selectedItem = menuArray[itemId]; 

            // Add selected item to checkout
            const itemCheckout = document.createElement("div");
            itemCheckout.classList.add("items-checkout");
            itemCheckout.innerHTML = `
                <span class="checkout-name">${selectedItem.name}</span>
                <span class="checkout-price">$${selectedItem.price}</span>
            `;

            // Insert item before the total (if total exists)
            if (totalAmountEl) {
                checkoutEl.insertBefore(itemCheckout, totalAmountEl);
            } else {
                checkoutEl.appendChild(itemCheckout);
            }

            // If total doesn't exist, create and append it
            if (!totalAmountEl) {
                totalAmountEl = document.createElement("h2");
                totalAmountEl.id = "total-amount";
                checkoutEl.appendChild(totalAmountEl);
            }

            totalAmount += selectedItem.price;
            totalAmountEl.innerText = `Total: $${totalAmount}`;
        });
    });
});
