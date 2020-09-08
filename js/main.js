var url = "https://script.google.com/macros/s/AKfycbyIlw6VzybfInuP6zNTJK-VE--0M3koZbIfNBlr3EHM3loES80/exec";
(function ($) {
  "use strict";
  $.ajaxSetup({
    crossDomain: true,
    type: "GET",
    dataType: "jsonp",
  });
  /*==================================================================
  [ Focus input ]*/


  /*==================================================================
  [ Validate ]*/
  // Bind to the submit event of our form
  $(document).on('click', "#get-button", function () {
    $("#get-button-text").hide();
    $(".btn-loading").show();
    $.ajax({
      url: url + "?type=get",
    });
  });
  $(document).on('click', "#confirm", function () {
    $("#popup").children().fadeOut();
    $("#popup").fadeOut();
    $(".btn-loading").hide();
    $("#get-button-text").show();
  });
  $(document).on('click', "#cancel", function () {
    $("#popup").children().fadeOut();
    $("#popup").fadeOut();
    $(".btn-loading").hide();
    $("#get-button-text").show();
    $.ajax({
      url: url + "?type=deny&id="+getCookie("id"),
    });
  });
})(jQuery);

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function get(responce){
	if (responce.status == 200){
    var punishment = JSON.parse(responce.message);
    setCookie("id",punishment.id,1)
    $("#dialoge").text(punishment.text);
    $("#popup").fadeIn();
    $("#popup").children().fadeIn();
		
  }
  else {
    alert("ERROR: PLEASE RELOAD PAGE")
  }
}

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];
        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

