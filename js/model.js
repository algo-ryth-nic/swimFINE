// holds all the data and some extra methods during runtime

let user = {
    islogin: false,
    username: "",
    email: "",
    // password: "",
    items_in_cart: [],
    items_bought: [],
    total_amount: 0,
    getAccountName: () => user.username || user.email
}