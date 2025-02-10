import { menuArray } from "./data.js"; 

document.addEventListener("DOMContentLoaded", function () {
    const displayItem = document.getElementById("display-items");
    const checkoutEl = document.getElementById("chart-el");

    let totalAmount = 0;
    let totalAmountEl = null;
    let checkoutButton = null;
    let selectedItems = {}; // Store selected items by name

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
    const showPaymentForm = document.getElementById("payment-form-el")
    
    document.querySelectorAll(".buy-btn").forEach(button => {
        button.addEventListener("click", function (e) {
            const itemId = e.target.getAttribute("data-id");
            const selectedItem = menuArray[itemId]; 

            if (selectedItems[selectedItem.name]) {
                // Item already in cart, update quantity and price
                selectedItems[selectedItem.name].quantity += 1;
                selectedItems[selectedItem.name].price += selectedItem.price;

                // Update displayed quantity and price
                const checkoutItemEl = document.querySelector(`.checkout-item[data-name="${selectedItem.name}"]`);
                checkoutItemEl.querySelector(".checkout-quantity").innerText = `x${selectedItems[selectedItem.name].quantity}`;
                checkoutItemEl.querySelector(".checkout-price").innerText = `$${selectedItems[selectedItem.name].price}`;
            } else {
                // New item selection
                selectedItems[selectedItem.name] = {
                    quantity: 1,
                    price: selectedItem.price
                };

                const itemCheckout = document.createElement("div");
                itemCheckout.classList.add("items-checkout", "checkout-item");
                itemCheckout.setAttribute("data-name", selectedItem.name);
                itemCheckout.innerHTML = `
                    <span class="checkout-name">${selectedItem.name}</span>
                    <span class="checkout-quantity">x1</span>
                    <span class="checkout-price">$${selectedItem.price}</span>
                `;

                // Insert before total (if exists)
                if (totalAmountEl) {
                    checkoutEl.insertBefore(itemCheckout, totalAmountEl);
                } else {
                    checkoutEl.appendChild(itemCheckout);
                }
            }

            // If total doesn't exist, create and append it
            if (!totalAmountEl) {
                totalAmountEl = document.createElement("h2");
                totalAmountEl.id = "total-amount";
                checkoutEl.appendChild(totalAmountEl);
            }

            totalAmount += selectedItem.price;
            totalAmountEl.innerText = `Total: $${totalAmount}`;

            // If checkout button doesn't exist, create it
            if (!checkoutButton) {
                checkoutButton = document.createElement("button");
                checkoutButton.id = "checkout-btn";
                checkoutButton.innerText = "Proceed to Checkout";
                checkoutButton.style.marginTop = "25px";
              
                checkoutButton.style.backgroundColor = "green";
                checkoutButton.style.color = "white";
                checkoutButton.style.fontWeight = "bold";
                checkoutButton.style.border = "none";
                checkoutButton.style.cursor = "pointer";

                checkoutEl.appendChild(checkoutButton);

                // Add click event to checkout button
                checkoutButton.addEventListener("click", function () {
                    alert("Proceeding to checkout...");
                    
                    showPaymentForm.style.display = 'block';
                });
            }
        });
    });
    const nameEl = document.getElementById("name-el");
    const cardEL = document.getElementById("card-el");
    const cvvEl = document.getElementById("cvv-el")
    const getPaymentValue = () => {
        console.log(nameEl.value)
        console.log(cardEL.value)
        console.log(cvvEl.value)
        

    }
    nameEl.addEventListener("input", function(){
        if(nameEl.value.length > 15){
            nameEl.value = nameEl.value.substring(0, 15);
        }
    })

    cardEL.addEventListener("input", function(){
        if(cardEL.value.length > 15){
            cardEL.value = cardEL.value.substring(0, 15);
        }
    })
    cvvEl.addEventListener("input", function(){
        if(cvvEl.value.length > 3){
            cvvEl.value = cvvEl.value.substring(0, 3);
        }
    })
    const chartEl = document.getElementById("chart-el")
    const payNow = document.getElementById("pay-el")
    payNow.addEventListener('click', function(e) {
        e.preventDefault()
          getPaymentValue()
          if(nameEl.value === '' || cardEL.value === '' || cvvEl.value === ''){
            alert("please enter some info")
            nameEl.style.border = '3px solid red'
          } else{
            checkoutEl.style.display ='none'
          }
          showPaymentForm.style.display = 'none'
          nameEl.value = '';
          cardEL.value = '';
          cvvEl.value = '';
          alert("Thank you for purchasing for us! :🎉")
    })
});
