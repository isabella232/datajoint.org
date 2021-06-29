$(document).ready(function() {
  $("input").on('focus', function(){
    $(this).parent().removeClass("has-error");
  });

  $("#dbsignup").change(function(ans){
    if (ans.target.value === "Yes") {
      $("#yesSignup").show();
    } else {
      $("#yesSignup").hide();
    }
  });

  $("#dbInfo").mouseover(function(){
    $("#infoText").show();
  }).mouseleave(function() {
    $("#infoText").hide();
  });

  $("#signup").click(function(e) {
    $("#emailFormat").hide();
    $("#usernameFormat").hide();
    $("#usernameDuplicate").hide();
    $("#generalWarning").hide();
    var emailFilter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
    var usernameFilter = /^[a-z][a-z0-9]{2,15}$/;
    var allGood = true;

    // validate name field
    // if ($("#name").val() === "") {
    //   $("#name").parent().addClass("has-error");
    //   $("#generalWarning").show();
    //   allGood = false;
    // }

    // validate email field 
    // if ($("#email").val() === "") { // email can't be blank
    //   $("#email").parent().addClass("has-error");
    //   $("#generalWarning").show();
    //   allGood = false;
    // } else if (!emailFilter.test($("#email").val())) { // email needs to be formatted correctly
    //   $("#email").parent().addClass("has-error");
    //   $("#emailFormat").show(); 
    //   allGood = false; 
    // } 

    // validate organization field
    // if ($("#organization").val() === "") {
    //   $("#organization").parent().addClass("has-error");
    //   $("#generalWarning").show();
    //   allGood = false;
    // }

    // validate username field 
    // if ($("#username").val() === "") { // username can't be blank
    //   $("#username").parent().addClass("has-error");
    //   $("#generalWarning").show();
    //   allGood = false;
    // } else if (!usernameFilter.test($("#username").val().toLowerCase())) { // username needs to be formatted correctly
    //     $("#username").parent().addClass("has-error");
    //     $("#usernameFormat").show();  
    //     allGood = false; 
    // }    
    
  
    if (allGood) {
      $.post( "/settings", $("#signupForm").serialize(),
            function(data) {
              $("#signupSuccess").show();
            }
          )
          .error(function(xhr) {
            switch(xhr.status) {
              case 409:
                if (xhr.responseText === "username conflict") {
                  $("#usernameDuplicate").show();
                  $("#username").parent().addClass("has-error");
                }
                if (xhr.responseText === "email conflict") {
                  $("#signupDuplicate").show();
                  // $("#signupModal").modal('hide');
                }
                break;
              default: 
                $("#signupError").show(); 
                // console.log(xhr.status);
                // console.log(xhr.responseText);
            }
          })
          .success(function() {
            $.get("/settings")
          });
    };
  })
})