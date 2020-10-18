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
                </div>
                <div class="cart-price cart-column">£${item.price}.00</div>
                <div class="cart-quantity cart-column">
                    <span>${item.inCart}</span>
                </div>
            </div>
            `
        })

        productContainer.innerHTML += `
        <div class="cart-total">
                <strong class="cart-total-title">Total</strong>
				<span class="cart-total-price">£${cartCost}.00</span>
            </div>  
        `

    }
}

displayCart();