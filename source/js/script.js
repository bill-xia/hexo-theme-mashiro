(function($){
  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });

  var gutters = document.getElementsByClassName('gutter');
  for (var i = 0; i < gutters.length; ++i) {
    var gutter_ph = document.createElement('td');
    gutter_ph.className = "gutter-placeholder";
    gutter_ph.innerHTML= gutters[i].innerHTML;
    gutters[i].parentElement.insertBefore(gutter_ph, gutters[i].nextSibling);
  }


})(jQuery);