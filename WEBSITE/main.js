if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

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
            totalcost(product[i])
        })
    }  
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.basket span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.basket span').textContent = 1;
    }

    setItems(product);
}


onLoadCartNumbers();