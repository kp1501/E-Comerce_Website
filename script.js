function add_to_cart(pid,pname,price){
    let cart = localStorage.getItem("cart");
    if(cart==null){
        let products = [];
        let product = {productId: pid, productName: pname, productQuantity: 1, productPrice: price};
        products.push(product);
        localStorage.setItem("cart", JSON.stringify(products));
        //console.log("Product is added for the first time.");
        showToast("Item is added to cart");
    } else {
        let pcart = JSON.parse(cart);
        let oldProduct = pcart.find((item) => item.productId == pid);
        if(oldProduct){
            //Allready in cart with this id, just increase the Quantity of the product with 1.
            oldProduct.productQuantity = oldProduct.productQuantity + 1;
            pcart.map((item) => {
                if(item.productId == oldProduct.productId){
                    item.productQuantity = oldProduct.productQuantity;
                }
            })
            localStorage.setItem("cart", JSON.stringify(pcart));
            //console.log("Product quantity is increased by 1");
            //showToast(oldProduct.productName+ "quantity is increased, Quantity is ="+ oldProduct.productQuantity);
        }else {
            //Not in cart, Add this item.
            let product = {productId: pid, productName: pname, productQuantity: 1, productPrice: price};
            pcart.push(product);
            localStorage.setItem("cart", JSON.stringify(pcart));
            //console.log("New Product is added.");
            //showToast("New Product is added to cart");
        }
    }
    updateCart();
}

//update cart

function updateCart(){
    let cartString = localStorage.getItem("cart");
    let cart = JSON.parse(cartString);
    if(cart==null || cart.length==0){
        console.log("Cart is Empty!..");
        $(".cart-items").html("(0)");
        $(".cart-body").html("<h3>Cart does not have any item</h3>");
        $(".checkout-btn").addClass('disabled');
    }else {
        //there is some item in cart.
        console.log(cart);
        $(".cart-items").html(`(${cart.length})`);

        let table = `
            <table class='table'>
            <thead class='thead-light'>

                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Action</th>
                </tr>
            </thead>        
        `;
        
        let totalPrice = 0;
        cart.map((item) => {

            table += `
                <tr>
                    <td>${item.productName}</td>
                    <td>${item.productPrice}</td>
                    <td>${item.productQuantity}</td>
                    <td>${item.productQuantity * item.productPrice}</td>
                    <td><button onclick='deleteItemFromCart(${item.productId})' class='btn btn-sm'>Remove</button></td>
                </tr>
            `;
            totalPrice += item.productPrice * item.productQuantity;
        })

        table = table + `
        <tr><td colspan='5' class='text-right font-bold m-5'>Total Price : ${totalPrice.toFixed(2)}</td></tr>        
        </table>`;
        $(".cart-body").html(table);
        $(".checkout-btn").removeClass('disabled');

    }
}

function deleteItemFromCart(pid){
    let cart = JSON.parse(localStorage.getItem('cart'));
    let newcart = cart.filter((item) => item.productId != pid);
    localStorage.setItem('cart', JSON.stringify(newcart));
    updateCart();
    //showToast("Item is removed from cart");
}

$(document).ready(function() {
    updateCart();
})

function showToast(content) {
    $("#toast").addClass("display");
    $("#toast").html(content);
    setTimeout(() => {
        $("#toast").removeClass("display");
    },2000);    
}


