$(document).ready(function(){
    console.log(user.productToView);
    // adding all the meta data
    $(".product-category").text(user.productToView.category)
    $(".product-name").text(user.productToView.name)
    $(".product-price").text("$" + user.productToView.price.toFixed(2));
    
    // adding the images
    for(i=0;i<4;i++){
        let listContainer =  $(".splide__list");
        $(listContainer).append(`<li class="splide__slide"><img src="${user.productToView.image}" alt="" data-magnify-src="${user.productToView.image}"></li>`
        );
    }

    // initialize slider
    new Splide( '.splide' ).mount();

    // initiating the zoom-plugin
    $(".splide__slide img").magnify();


    $(".add-to-cart").click(function(){
        // all we need to do is just update the quantity for "productToView"

        user.productToView.quantity = $(".product-select-quantity").val();

        // adding to cart
        user.itemsInCart.push(JSON.stringify(user.productToView))

        swal("Item Added To Cart!", `\"${user.productToView.name}\" x${user.productToView.quantity} added to cart.`,"success");
    });

});