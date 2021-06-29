$(document).ready(function () {
    $("input").on('focus', function () {
        $(this).parent().removeClass("has-error");
    });


    $("#neuromatchSignup").click(function (event) {
        // $("#emailFormat").hide();
        $(".generalMessage").hide();
        $("#generalWarning").hide();
        var allGood = true;

        // validate required field 
        if ($(".required").val() === "") { // required formfields can't be blank
          $(".required").parent().addClass("has-error");
          $(".generalMessage").show();
          $("#generalWarning").show();
          allGood = false;
        } 

        if (!$("input[name='tryPlayground']:checked").val()) {
            console.log('none of the radio bttons were clicked')
            $(".generalMessage").show();
            $("#generalWarning").show();
            allGood = false
        }

        let emailAllowListChecked = false;
        
        $(".requiredMultiselect").each(function() {
            if ($(this).is(":checked")) {
                emailAllowListChecked = true;
            }
        });
        if (!emailAllowListChecked) {
            $(".generalMessage").show();
            $("#generalWarning").show();
            allGood = false
        }

        if (!allGood) {
            event.preventDefault();
            event.stopPropagation();
        } 
    })
})