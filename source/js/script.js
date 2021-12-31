(function($){
  // Caption
  $('.article-entry, .article-inner').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox') || $(this).parent().is('a')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a class="fancybox" href="' + this.src + '" data-fancybox=\"gallery\" data-caption="' + alt + '"></a>')
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }
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

  var nav = document.getElementById('main-nav-toggle');
  nav.onclick = function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  };

  var wrap = document.getElementById('wrap');
  wrap.onclick = function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  };

  // code block copy button
  var codes = document.getElementsByClassName('code');
  for (var i = 0; i < codes.length; ++i) {
    var copy_button = document.createElement('div');
    copy_button.className = "copy-button";
    copy_button.innerHTML = "Copy";
    new ClipboardJS('.copy-button', {
      target: (trigger) => {
        return trigger.nextSibling;
      }
    });
    copy_button.onclick = (e) => {
      var btn = e.target;
      btn.innerHTML = "Copied!";
      setTimeout(function() {
        btn.innerHTML = "Copy";
      }, 1000);
    }
    codes[i].parentElement.insertBefore(copy_button, codes[i]);
  }

})(jQuery);