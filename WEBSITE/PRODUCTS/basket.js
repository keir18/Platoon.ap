if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var product = [
    
    {
        name: "dragon",
        tag: "dragon",
        price: 60,
        inCart: 0
    },
    {
        name: "BLM",
        tag: "blm",
        price: 25,
        inCart: 0
    }
];

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.basket span').textContent = productNumbers;
    }
}

function ready() {
    var carts = document.getElementsByClassName('btn')
    for (let i=0; i < carts.length; i++) {
        carts[i].addEventListener('click', () => {
            cartNumbers(product[i]);
            totalcost(product[i]);
            removeItem(product[i]);
        })
    }  
}       

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if( action == "decrease") {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.basket span').textContent = productNumbers - 1;
    } else if(productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.basket span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.basket span').textContent = 1
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalcost(product, action) {
    let cartCost = localStorage.getItem('totalCost');
    if(action == "decrease") {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost - product.price)
    }else if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".cart-items");
    let cartCost = localStorage.getItem('totalCost');
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="cart-items">
                <div class="cart-row">
                    <img src="../PHOTOS/PRODUCTS/${item.tag}.jpg">
                    <span>${item.name}</span>
                    <button class="btn btn-danger" id="btnRemove" type="button">REMOVE</button>
                </div>
                <div class="cart-price cart-column">£${item.price}.00</div>
                <div class="cart-quantity cart-column">
                    <button class="decrease btn2" type="button">-</button>
                    <span>${item.inCart}</span>
                    <button class="increase btn2" type"button">+</button>
                </div>
            </div>
            `
        })

        productContainer.innerHTML += `
        <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
				<span class="cart-total-price">£${cartCost}.00</span>
				<button class="btn btn-primary btn-purchase" type="button"><a href="checkout.html">PURCHASE</a></button>
            </div>  
        `

    }
    deleteButtons();
    manageQuantity();
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.cart-row button');
    let decreaseButtons = document.querySelectorAll('.decrease');
    let currentProduct = "";
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click',  () => {
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            localStorage.setItem('cartNumbers', productNumbers - cartItems[currentProduct].inCart );
            localStorage.setItem('totalCost', cartCost - ( cartItems[currentProduct].price * cartItems[currentProduct].inCart));
            delete cartItems[currentProduct];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
            onLoadCartNumbers();
        });
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = "";
    cartItems = JSON.parse(cartItems);
    for(let i=0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            if(cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalcost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        })
    }
    for(let i=0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalcost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        })
    }
}

onLoadCartNumbers();
displayCart();