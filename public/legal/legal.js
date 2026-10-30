// Progressive enhancement only: every page reads fine with this file missing.
(function () {
  var toc = document.querySelector('.toc');

  // Phones: the contents list starts collapsed so the policy itself is the first thing you see.
  // Wide screens: it is a sticky sidebar and must always be open. Follow the screen width both
  // ways, so resizing a window or rotating a tablet never leaves the list hidden.
  if (toc && window.matchMedia) {
    var narrow = window.matchMedia('(max-width: 899px)');
    var sync = function (query) {
      if (query.matches) toc.removeAttribute('open');
      else toc.setAttribute('open', '');
    };
    sync(narrow);
    if (narrow.addEventListener) narrow.addEventListener('change', sync);
    else if (narrow.addListener) narrow.addListener(sync);
  }

  var links = [].slice.call(document.querySelectorAll('.toc a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var byId = {};
  links.forEach(function (link) { byId[link.getAttribute('href').slice(1)] = link; });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) { link.removeAttribute('aria-current'); });
      var active = byId[entry.target.id];
      if (active) active.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-15% 0px -75% 0px' });

  [].forEach.call(document.querySelectorAll('.doc section[id]'), function (section) { observer.observe(section); });
})();
