(function(){
'use strict';

App.e = function(text) {
    if (!text) {
        return '';
    }
    text = '' + text;
    text = _.escape(text);
    text = text.replace(/((http:|https:)\/\/[\x21-\x26\x28-\x7e]+)/gi, '<a href="$1">$1</a>');
    text =  text.replace(/\r\n/g, "<br>");
    text = text.replace(/(\n|\r)/g, "<br>");
    return text;
};

App.networkErrorAlert = function() {
    alert('Server error');
};

App.showAlertQueue = [];
App.showAlertContent = function($alert, $alert_content) {
    $alert.append($alert_content);
    $alert_content.fadeIn(250, function(){
        setTimeout(function() {
            $alert_content.fadeOut(250, function(){
                $alert_content.remove();
                if (App.showAlertQueue.length > 0) {
                    App.showAlertContent($alert, App.showAlertQueue.shift());
                }
            });
        }, 4000);
    });
};
App.showAlert = function (html, type) {
    var $alert, $alert_content;

    if (type === 'success' || type === 'info' || type === 'warning' || type === 'danger') {
    } else {
        return;
    }

    $alert = $('.alert-wrap');
    $alert_content = $('<div class="alert alert-'+type+'">'+html+'</div>');

    if ($alert.find('div').length === 0) {
        App.showAlertContent($alert, $alert_content);
    } else {
        App.showAlertQueue.push($alert_content);
    }
};

App.showLoading = function() {
    $('.now-loading').show();
};
App.hideLoading = function() {
    $('.now-loading').hide();
};

App.isIE = function() {
    var ua = navigator.userAgent;

    ua = ua.toLowerCase();
    if (ua.indexOf('msie') !== -1) {
        return true;
    }
    return false;
};

App.parseError = function(jqXHR) {
    try {
        return $.parseJSON(jqXHR.responseText);
    } catch(e) {
        return false;
    }
};

App.numberFormat = function(num_str) {
    var num;

    num_str = '' + num_str;
    num = num_str.replace(/,/g, "");

    while(num !== (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2"))) {
    }

    return App.e(num);
};

App.scrollTo = function($element) {
    var scroll_point = $element.offset().top - ($(window).height() / 2);

    $('html, body').animate({scrollTop: scroll_point},{duration: "fast"});
};

//localstorage util
App.enableLoalStorage = !!window.localStorage;
App.getLocalStorageItem = function(key) {
    if (!App.enableLoalStorage) {
        return false;
    }
    return window.localStorage.getItem(key);
};
App.setLocalStorageItem = function(key, value) {
    if (!App.enableLoalStorage) {
        return;
    }
    window.localStorage.setItem(key, value);
};

Handlebars.registerHelper('nr2brAndLink', function(text) {
    text = App.e(text);
    return new Handlebars.SafeString(text);
});
Handlebars.registerHelper('number', function(text) {
    text = App.numberFormat(text);
    return new Handlebars.SafeString(text);
});
Handlebars.registerHelper('times', function(n, block) {
    var accum = '';

    for (var i = 0; i < n; ++i) {
        accum += block.fn(i);
    }
    return accum;
});
Handlebars.registerHelper('for', function(from, to, incr, block) {
    var accum = '';

    for (var i = from; i < to; i += incr) {
        accum += block.fn(i);
    }
    return accum;
});
Handlebars.registerHelper('moment', function(dt, format) {
    return moment(dt).format(format);
});

}());