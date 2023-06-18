"use strict";

function validateCAPTCHAOnSubmit(token) {
    document.getElementById("reCAPTCHA-form").submit();
}

(function () {
    var timeZone = document.getElementById("user-time-zone");
    if (timeZone) {
        timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    var locale = document.getElementById("user-locale");
    if (locale) {
        var language = undefined;
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

        var anchor = $(this);
        var url = $(anchor).attr('href');
        $.ajax({
            contentType: 'application/json;',
            dataType: 'json',
            processData: false,
            type: 'Post',
            url: url,
            success: function success() {
                $(anchor).parent('div').parent('td').parent('tr').fadeOut('slow', function () {
                    $(this).remove();
                });
            },
            error: function error(xmlHttpRequest, textStatus, errorThrown) {
                var message = textStatus + " " + xmlHttpRequest.status + " " + errorThrown;
                if (xmlHttpRequest.responseText != null) {
                    var response = JSON.parse(xmlHttpRequest.responseText);
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = response["Error"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var error = _step.value;

                            message += "\n" + error;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator["return"]) {
                                _iterator["return"]();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
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

        var anchor = $(this);
        var url = $(anchor).attr('href');
        $.ajax({
            contentType: 'application/json;',
            dataType: 'json',
            processData: false,
            type: 'Post',
            url: url,
            success: function success() {
                window.location.reload();
            },
            error: function error(xmlHttpRequest, textStatus, errorThrown) {
                var message = textStatus + " " + xmlHttpRequest.status + " " + errorThrown;
                if (xmlHttpRequest.responseText != null) {
                    var response = JSON.parse(xmlHttpRequest.responseText);
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = response["Error"][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var error = _step2.value;

                            message += "\n" + error;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                _iterator2["return"]();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
                alert(message);
            }
        });
    });

    $("#history-back").click(function (e) {
        history.back();
    });
})();

