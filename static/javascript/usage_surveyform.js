$(document).ready(function () {
    $("input").on('focus', function () {
        $(this).parent().removeClass("has-error");
    });
    // Verify if LAN installation process is accessible
    $("#verifyButton").click(function (event) {
        // disable while running
        document.getElementById('verifyButton').disabled = true;
        document.getElementById('verifyButton').innerText = 'Verify Information';
        document.getElementById('cancelButton').disabled = true;
        document.getElementById('cancelButton').style.backgroundColor = '';
        document.getElementById('usageSurveyButton').disabled = true;
        document.getElementById('usageSurveyButton').style.backgroundColor = '';
        // determine LAN routes
        let health = (new URLSearchParams(window.location.search)).get('health');
        let redirect = (new URLSearchParams(window.location.search)).get('redirect');
        // start a timer in case it is unaccessible
        accessTimer = setTimeout(function(){
            child.window.close();
            alert(`Could not reach '${health}' host! Note that Safari is not yet supported. We encourage you try Google Chrome.`);
            document.getElementById('verifyButton').disabled = false;
            document.getElementById('verifyButton').innerText = 'Verify Information';
        }, 10000);
        // listen for LAN process ping
        window.addEventListener('message', event => {
            if (health.includes(event.origin) && redirect.includes(event.origin) &&
                    event.data) {
                // LAN process ping confirmed, resetting state and allowing submission
                clearTimeout(accessTimer);
                document.getElementById('verifyButton').disabled = false;
                document.getElementById('verifyButton').innerText = 'Verify Information ✅';
                document.getElementById('usageSurveyButton').disabled = false;
                document.getElementById('usageSurveyButton').style.backgroundColor = 'green';
                document.getElementById('cancelButton').disabled = false;
                document.getElementById('cancelButton').style.backgroundColor = 'red';
            }
        });
        // ping LAN process
        child = window.open(health, '_blank');
    })

    $("#cancelButton").click(function (event) {
        if (confirm("Are you sure you no longer would like to participate in usage tracking?")) {
            let cancel = (new URLSearchParams(window.location.search)).get('cancel');
            window.open(cancel, '_blank');
            window.location.href = "/";
        }
    })

    $("#usageSurveyButton").click(function (event) {
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

        if (isNaN($("#datajointExperience").val()) || $("#datajointExperience").val() < 0) {
          $("#datajointExperience").parent().addClass("has-error");
          $("#ExperienceNumeric").show();
          allGood = false;
        }

        if (!allGood) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            // application identifier info
            // let client_id = 'client1'; // DEV
            // let client_secret = 'secret1'; // DEV
            // let client_redirect_uri = 'https://fakeservices.datajoint.io:2000' // DEV
            let client_id = '5tWuoIz5qKcgCJrIfKenMfwzhlkLaYMJ'; // PROD
            let client_secret = '8L0twTVkcIAoa3IoBLfwjGmEP46XsE6b'; // PROD
            let client_redirect_uri = 'https://datajoint.io' // PROD
            // determine LAN route
            let redirect = (new URLSearchParams(window.location.search)).get('redirect');
            let requestedTimestamp = (new URLSearchParams(
                window.location.search)).get('timestamp');
            // submit survey form
            var xhr_submission_instance = new XMLHttpRequest();
            let qp1 = {
                "location": $("#location").val(),
                "timezone": $("#timezone").val(),
                "operatingSystem": $("#operatingSystem").val(),
                "macAddress": $("#macAddress").val(),
                "platform": $("#platform").val(),
                "platformVersion": $("#platformVersion").val(),
                "packageManager": $("#packageManager").val(),
                "packageManagerVersion": $("#packageManagerVersion").val(),
                "packageName": $("#packageName").val(),
                "packageVersion": $("#packageVersion").val(),
                "timestamp": requestedTimestamp
            };
            $.ajax({
                url: `/user/usage-install?${new URLSearchParams(qp1).toString()}`,
                type: 'post',
                xhr: function() {
                    return xhr_submission_instance;
                },
                async: false,
                data: {datajointExperience: $("#datajointExperience").val()},
                success: function (resSurveyComplete, status, xhr) {
                    // survey insert success
                    var survey_submitted_redirect = xhr_submission_instance.responseURL.replace(window.location.origin, '');
                    var survey_submitted_redirect_qp = survey_submitted_redirect.match('(?<=[?]).*$');
                    var xhr_auth_instance = new XMLHttpRequest();
                    let qp2 = {
                        "scope": 'openid',
                        "response_type": 'code',
                        "client_id": client_id,
                        "code_challenge": 'ubNp9Y0Y_FOENQ_Pz3zppyv2yyt0XtJsaPqUgGW9heA',
                        "code_challenge_method": 'S256',
                        "redirect_uri": client_redirect_uri
                    };
                    $.ajax({
                        url: `/auth/auth?${new URLSearchParams(qp2).toString()}`,
                        type: 'get',
                        xhr: function() {
                            return xhr_auth_instance;
                        },
                        success: function() {
                            // Generating auth code successful
                            $.ajax({
                                url: '/auth/token',
                                type: 'post',
                                headers: {
                                    "Authorization": "Basic " + btoa(`${client_id}:${client_secret}`),
                                },
                                data: {
                                    grant_type: 'authorization_code',
                                    code: xhr_auth_instance.responseURL.match("(?<=code=).*$")[0],
                                    code_verifier: 'kFn5ZwL6ggOwU1OzKx0E1oZibIMC1ZbMC1WEUXcCV5mFoi015I9nB9CrgUJRkc3oiQT8uBbrvRvVzahM8OS0xJ51XdYaTdAlFeHsb6OZuBPmLD400ozVPrwCE192rtqI',
                                    client_id: client_id,
                                    redirect_uri: client_redirect_uri,
                                },
                                success: function(res, status, xhr) {
                                    let qp3 = {
                                        "accessToken": res.access_token,
                                        "refreshToken": res.refresh_token,
                                        "expiresIn": res.expires_in,
                                        "scope": res.scope,
                                        "clientId": client_id,
                                        "clientSecret": client_secret
                                    };
                                     // Requesting a bearer/refresh token successful, signal the LAN process to finish and pass tokens
                                    window.open(`${redirect}?${new URLSearchParams(qp3).toString()}${(survey_submitted_redirect_qp) ? '&' + survey_submitted_redirect_qp[0] : ''}`, '_blank');
                                    window.history.pushState({page: "home"}, "home title", survey_submitted_redirect);
                                    document.write(resSurveyComplete);
                                },
                                error: function(requestObject, error, errorThrown) {
                                    alert('Error: Failed to generate a new token.');
                                }
                            });
                        },
                        error: function(requestObject, error, errorThrown) {
                            alert('Error: Failed requesting OAuth authorization code.');
                        }
                    });
                },
                error: function(xhr) {
                    // survey insert failed, throw error to user
                    alert(`Error\nStatus: ${xhr.status}\nMessage: ${
                        xhr.responseText.match("(?<=<h4>).*(?=</h4>)")[0]}`);
                }
            });
        }
    })
})
