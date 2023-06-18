function validateCAPTCHAOnSubmit(token) {
    document.getElementById("reCAPTCHA-form").submit();
}

(function () {
    const timeZone = document.getElementById("user-time-zone");
    if (timeZone) {
        timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    const locale = document.getElementById("user-locale");
    if (locale) {
        let language;
        if (window.navigator.languages) {
            language = window.navigator.languages[0];
        } else {
            language = window.navigator.userLanguage || window.navigator.language;
        }
        locale.value = language;
    }

    $(".log-out-link").click(function () {
        $("#log-out-form").submit();
    });

    $(".toggle-password").click(function () {
        var input = $(this).siblings("input")[0];
        var type = input.type.toLowerCase();
        if (type === "password") {
            input.type = "text";
        } else if (type === "text") {
            input.type = "password";
        }
    });

    $(".copy-to-clipboard").click(function () {
        var input = $(this).siblings("input")[0];
        navigator.clipboard.writeText(input.value);
    });

    $(".nav-link.active").closest(".collapse").addClass("show");

    $('.delete-item').click(function (e) {
        e.preventDefault();
        if (!confirm("Are you sure want remove this item?")) {
            return;
        }

        const anchor = $(this);
        const url = $(anchor).attr('href');
        $.ajax({
            contentType: 'application/json;',
            dataType: 'json',
            processData: false,
            type: 'Post',
            url: url,
            success: function () {
                $(anchor).parent('div').parent('td').parent('tr').fadeOut('slow',
                    function () {
                        $(this).remove();
                    });

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                let message = `${textStatus} ${xmlHttpRequest.status} ${errorThrown}`;
                if (xmlHttpRequest.responseText != null) {
                    const response = JSON.parse(xmlHttpRequest.responseText);
                    for (var error of response["Error"]) {
                        message += `\n${error}`;
                    }
                }
                alert(message);
            }
        });
    });

    $('.post-item').click(function (e) {
        e.preventDefault();
        if (!confirm("Are you sure want proceed with this action?")) {
            return;
        }

        const anchor = $(this);
        const url = $(anchor).attr('href');
        $.ajax({
            contentType: 'application/json;',
            dataType: 'json',
            processData: false,
            type: 'Post',
            url: url,
            success: function () {
                window.location.reload();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                let message = `${textStatus} ${xmlHttpRequest.status} ${errorThrown}`;
                if (xmlHttpRequest.responseText != null) {
                    const response = JSON.parse(xmlHttpRequest.responseText);
                    for (var error of response["Error"]) {
                        message += `\n${error}`;
                    }
                }
                alert(message);
            }
        });
    });

    $("#history-back").click(function (e) {
        history.back();
    })
})();