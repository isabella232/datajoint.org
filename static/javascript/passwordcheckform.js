$(document).ready(function () {
    $("input").on('focus', function () {
        $(this).parent().removeClass("has-error");
    });

    $("#submitpasschange").click(function (event) {
        console.log("form submitted..check format")
        $("#passwordMismatch").hide();
        $("#generalWarning").hide();
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

        if (!allGood) {
            event.preventDefault();
            event.stopPropagation();
        };
    });
    
});
