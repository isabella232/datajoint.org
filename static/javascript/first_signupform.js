$(document).ready(function () {
    $("input").on('focus', function () {
        $(this).parent().removeClass("has-error");
    });


    $("#signup").click(function (event) {
        $("#emailFormat").hide();
        $("#generalWarning").hide();
        // var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        // var usernameFilter = /^[a-z][a-z0-9]{2,15}$/;
        var allGood = true;

        // validate email field 
        if ($("#email").val() === "") { // email can't be blank
          $("#email").parent().addClass("has-error");
          $("#generalWarning").show();
          allGood = false;
        } 
        // } else if (!emailFilter.test($("#email").val())) { // email needs to be formatted correctly
        //   $("#email").parent().addClass("has-error");
        //   $("#emailFormat").show(); 
        //   allGood = false; 
        // } 
        

        if (allGood) {
            // $.post("/tempsignup", $("#tempSignup").serialize(),
            //     function (data) {
            //         $("#signupSuccess").show();
            //     }
            // )
            //     .error(function (xhr) {
            //         switch (xhr.status) {
            //             case 409:
            //                 if (xhr.responseText === "username conflict") {
            //                     $("#usernameDuplicate").show();
            //                     $("#username").parent().addClass("has-error");
            //                 }
            //                 if (xhr.responseText === "email conflict") {
            //                     $("#signupDuplicate").show();
            //                 }
            //                 break;
            //             default:
            //                 $("#signupError").show();
            //         }
            //     })
            //     .success(function () {
            //         $.get("/dashbboard")
            //     });
        } else {
            event.preventDefault();
            event.stopPropagation();
        };
    })
})