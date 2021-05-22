// ======================= event listeners to execute once the page is loaded ===========================

// Since HTML is stateless, everytime we load a new page the inital values we'll be loaded, and since js is only restricted to the browser itself (client), its not possible to save that data in a file/db

// Thus to prevent this, we'll be using html5's window.SessionStorage... which holds data till the process (tab) is not killed... it works like the RAM of a computer, so once process is killed the data is cleared...

// Once page is being unloaded meaning we're leaving a current page, the current data (state) will be stored and loaded again for the new page thus effective creating this illusion that the data persists between pages  

// Our user-data that we'll updated while the user plays around
let user= {
    isLogin: false,
    email: "",
    name: "",
    itemsInCart: [],
    productToView: ""
}

$(document).ready(function(){
    // Load data if present else create a new one
    if (sessionStorage.getItem('user')){
        // load the data, converting from string to json
        user = JSON.parse(sessionStorage.user)
        // console.log(user);
    }
    else{
        sessionStorage.setItem('user',JSON.stringify(user));
    }

    // show name/email name in navbar
    // console.log(user.isLogin);
    if(user.isLogin){
        // console.log("working");
        $(".account-access").hide();
        $(".account-details").show();
        // setting the account name
        $(".account-name").text(getUserName())
    }

    $("#menu-bttn").click(function() {
        $(".navigation").toggle(100);
    })
    
});

// save the data once page is being unloaded (leaving the current page)
$(window).on('beforeunload', function(){
    sessionStorage.setItem('user',JSON.stringify(user));
});



// =================================== Functions ==================================
function getUserName(){
    if(user.isLogin)
        return user.name || user.email;
    else
        return null;
}

function addToCart(ele){
    productData = getProductData(ele)

    // let flag = true;
    for(let i = 0; i<user.itemsInCart.length; i++){
        let p = JSON.parse(user.itemsInCart[i]);
        if(p.name === productData.name){
            p.quantity += 1;
            console.log(p.quantity)

            // updating the quantity in user obj
            user.itemsInCart[i] = JSON.stringify(p);
            
            swal("Item Quantity Updated!", "Item Succesfully Added to Cart\n\nCurrent Quantity: " + String(p.quantity) , "info");
            // flag = false;
            return;
        }
    }

    // console.log(JSON.stringify(productData))
    // stores it as a string
    // if(flag)
    user.itemsInCart.push(JSON.stringify(productData));
    
    swal("Awesome!", "Item Succesfully Added to Cart", "success");

}

function getProductData(productElement){
    productElement = $(productElement).parentsUntil(".products-section")[1]
    console.log($(productElement))
    let category = $(productElement).find('.product-category').text();
    let name = $(productElement).find('.product-name').text();
    let price = parseInt($(productElement).find('.product-price').text().slice(1,));
    let imagePath = $(productElement).find(".product-image img").attr("src");

    // index image path bug
    if(!(imagePath[0] === "."))
        imagePath = "../" + imagePath;  

    let item = {
        name: name,
        category: category,
        price: price,
        image: imagePath,
        quantity:1
    }    

    return item;
}

// storing the product data into view so it can used by product page
function forViewProduct(ele){
    user.productToView = getProductData(ele);
}
