// contains all the functions for login and register
// ============================== Helper Functions ==============================
let validateEmail = (email) => {
    // creating regex object
    pattern = new RegExp(/^[\w\d.+-]+@[\w\d.-]+\.[\w\.]{2,4}/);
    // console.log(email + " : " + pattern.test(email) )
    return pattern.test(email)
}

let validatePassword = (password) => {
    // password needs to be greater than 8 characters
    if(password.length < 8)
        return false;
    
    // password cannot start or end with a blank space
    if((password[0] === " ") || (password[password.length-1]  === " "))
        return false;

    return true;
}


//============================= Main functions to call =================================== 

// on button click
function login(){
    let inputEmail = $("#user").val()
    // no need for password
    let inputPassword = $("#pass").val()

    if(validateEmail(inputEmail)){
        //login successful
        
        // storing the meta-data for user
        user.isLogin = true;
        user.email = inputEmail;
        user.password = inputPassword;
        
        // alert success
        swal({
            title: "Login Successful",
            text: "Welcome Back, " + user.email,
            icon: "success"
        }).then(function() {
            window.location = "../index.html";
        });
        // swal("Login Successful", "Welcome Back, " + user.email  , "success");
        
        // returns to the page it came from
        // window.history.back()  
        // window.location.href = "../index.html"         // redirect to homepage
        
    }else{
        // make alert in jQuery Mobile Jquery Dialog. SCRAPPED! 
        // alert("");
        swal("Error", "Incorrect Email or password entered" , "error");
    }
}

// on button click
function register(){
    let inputEmail = $("#email").val();
    let inputPass = $("#pass").val();
    let inputName = $("#username").val();

    // checking if name contains digits or 
    pattern = new RegExp(/[\d\W]/);
    let isName = !pattern.test(inputName);      // bool

    // one final check
    if(isName && validateEmail(inputEmail) && validatePassword(inputPass)){
        
        // storing meta-data
        user.isLogin = true;
        user.email = inputEmail;
        user.name = inputName;
        user.password = inputPass;

        swal("Registration Successful", "Thank you for choosing SWIMFINE, " + inputName +"!", "success").then(function() {
            // take to home page...
            window.location = "../index.html";
        });
        
        
        
    }else
        swal("Error", "Incorrect Name, Email or password entered" , "error");

}
