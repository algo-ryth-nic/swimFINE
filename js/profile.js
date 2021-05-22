$(document).ready(function(){

    if(!user.isLogin){
        swal("Sign In First!","Please sign in or sign up if you dont own an account","warning").then(function(){
            if(window.history.length > 1)
                window.history.back();  
            else
                (() => window.location = "../index.html")();
        });
    }

    displayInfo();

    $("#edit-profile").click(function(){
        swal({
            title: "Edit Profile",
            text: "You can now edit your profile",
            icon: "info",
          });
        
        $(".account-information input").css("box-shadow", "none")
        $(".account-information input").css("border", "1px solid #61c56d");
        $(".account-information input").attr("readonly", false); 

        $("#pass").attr("type", "text");
        $("#confirm-pass").attr("type", "text");
        
        $("#edit-profile").hide();
        $("#confirm").css("display", "flex");
        $("#confirm").show();
    });

    $("#confirm").click(function(){
        swal({
            title: "Are you sure?",
            text: "Do you want to save your changes?",
            icon: "warning",
            buttons: [true, "Yes!"]
          }).then(function(confrimed){
            if(confrimed){
                let uname = $("#username").val();
                let email = $("#email").val();
                let phno = $("#phno").val();
                let pass = $("#pass").val();
                console.log(validateEmail(email));
                console.log(validatePassword(pass));
                if(isName(uname) && validateEmail(email) && validatePassword(pass) && pass === $("#confirm-pass").val()){
                    swal({
                        title: "Changes Saved",
                        icon: "success",
                      });
                    user.name = uname 
                    user.email = email
                    user.phno = phno
                    user.password = pass
                    location.reload();
                }
                else{
                    swal({
                        title: "Error",
                        text: "You Entered a wrong email, password, name",
                        icon: "error",
                      });
                    return false;
                }
            }
          });
        
        
    });

    let correctColor = "#CAECAC";
    let errorColor = "#FF9999";
    
    // for the background highlighting
    $("#email").keyup(function(){
        let inputEmail = this.value
        if(validateEmail(inputEmail)){
            $("#email").css('background-color', correctColor);
        }
        else{
            $("#email").css('background-color', errorColor);
        }
    })

    $("#pass").keyup(function(){
    let inputPass = this.value;
    if(validatePassword(inputPass)){
        $("#pass").css('background-color', correctColor);
    }
    else{
        $("#pass").css('background-color', errorColor);
    }
    });
    
    $("#confirm-pass").keyup(function(){
    if($("#pass").val() === $("#confirm-pass").val()){
        $("#confirm-pass").css('background-color', correctColor);
    }
    else{
        $("#confirm-pass").css('background-color', errorColor);
    }
    });
});

function displayInfo(){
    $("#username").val(user.name || user.email);
    $("#email").val(user.email);
    $("#phno").val(user.phno || undefined);
    $("#pass").val( user.password || "Password");
    $("#confirm-pass").val( user.password || "Password");
}

function isName(inputName){
    // checking if name contains digits or 
    pattern = new RegExp(/[\d\W]/);
    let isName = !pattern.test(inputName);      // bool
    return isName;
}