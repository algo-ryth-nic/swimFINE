//  for cart functionality....
// Takes data from cart and joins it with html to create the cart page
$(document).ready(function(){
    var cartItems = [];  
    (function(){
        user.itemsInCart.forEach(function(item){
            cartItems.push(JSON.parse(item))
        });
    })();

    console.log(cartItems);

    (function (){
        cartItems.forEach(function(item){
            addItemToHtml(item);
        })
    })();

    createBill(cartItems);
    

    $(".product-select-quantity").click(function(){
        let newAmount = $(this).val();
        // index position of specified elements relative to other specified elements
        let index = $(this).index();
        
        if(newAmount != cartItems[index].quantity)
            cartItems[index].quantity = newAmount;

        let spanElement = $(".subtotal-price")[index];
        $(spanElement).text("$" + String(cartItems[index].price * newAmount));

        createBill(cartItems);
    });

    $(".details-container a").click(function(){
        let  product = $(this).closest(".product");
        let index = (product).index();
        // removing from the cart
        user.itemsInCart.splice(index, 1);
        
        // hiding all the elements
        quantityElement = $(".product-select-quantity")[index];
        subtotalElement = $(".subtotal-price")[index];
        $(quantityElement).hide()
        $(subtotalElement).hide()
        product.hide();
        
        cartItems.splice(index, 1);
        createBill(cartItems);

        // notify the user
        swal("Item Removed!", "Item: \"" + $(product).find(".product-name").text() + "\"\n\nSuccesfully removed!","info");
    });
});


function addItemToHtml(itemToAdd){
    let product = itemToAdd;
    var productHTML = 
    `   <div class="product">
            <div class="image-container">
                <img src="${product.image}" alt="">
            </div>
            <div class="details-container">
                <span class="product-name">${product.name}</span>
                <span class="product-price">$ ${product.price}</span>
                <a id="remove-item">remove</a>
            </div>
        </div>
    `;

    var quantityHTML= 
    ` <input type="number" class="product-select-quantity" min="1" placeholder="${product.quantity}" value=${product.quantity}>`;

    var subTotalHTML=
    ` <span class="subtotal-price">$${product.price * product.quantity}</span>
    `;

    // dynamically adding to html
    $(".bill-products").append(productHTML);
    $(".bill-quantity").append(quantityHTML);
    $(".bill-subtotal").append(subTotalHTML);
}

// For BILL SECTION
function createBill(cartItems){
    let bill = calculateTotal(cartItems);
    createHTMLBill(bill);
}

function createHTMLBill(bill){
    $(".total-subtotal").text("$"+bill[0]);
    // $(".total-tax").text(bill[0]);
    $(".total-price").text("$"+bill[1]);
}

function calculateTotal(products){
    let sum = 0;
    for(i = 0; i<products.length; i++){
        sum += products[i].price * products[i].quantity;
    }

    let total = (0.13 * sum) + sum;
    return [sum, total]; 
}

function removeItem(item){

}