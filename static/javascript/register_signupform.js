$(document).ready(function () {
    $("input").on('focus', function () {
        $(this).parent().removeClass("has-error");
    });


    $("#signup").click(function (event) {
        console.log("form submitted..check format")
        // $("#emailFormat").hide();
        $("#usernameFormat").hide();
        $("#usernameDuplicate").hide();
        $("#passwordMismatch").hide();
        $("#passwordLengthIssue").hide();
        $("#generalWarning").hide();
        var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
        var usernameFilter = /^[a-z][a-z0-9]{2,15}$/;
        var allGood = true;

        // validate matching password field
        if ($("#keycode1").val() === "" || $("#keycode2").val() === "" || $("#keycode1").val() !== $("#keycode2").val() || $("#keycode1").val().length < 8 || $("#keycode2").val().length < 8) {
            $("#keycode1").parent().addClass("has-error");
            $("#keycode2").parent().addClass("has-error"); 
            allGood = false;
            if ($("#keycode1").val() === "" || $("#keycode2").val() === "") {
                $("#generalWarning").show();
            } else if ($("#keycode1").val() !== $("#keycode2").val()) {
                $("#passwordMismatch").show();
            } else if ($("#keycode1").val().length < 8 || $("#keycode2").val().length < 8) {
                $("#passwordLengthIssue").show();
            }
        }

        // // validate email field 
        // if ($("#email").val() === "") { // email can't be blank
        //   $("#email").parent().addClass("has-error");
        //   $("#generalWarning").show();
        //   allGood = false;
        // } else if (!emailFilter.test($("#email").val())) { // email needs to be formatted correctly
        //   $("#email").parent().addClass("has-error");
        //   $("#emailFormat").show(); 
        //   allGood = false; 
        // } 


        // validate username field
        if ($("#username").val() === "") { // username can't be blank
            $("#username").parent().addClass("has-error");
            $("#generalWarning").show();
            allGood = false;
        } else if (!usernameFilter.test($("#username").val())) { // username needs to be formatted correctly
            $("#username").parent().addClass("has-error");
            $("#usernameFormat").show();
            allGood = false;
        }
        

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