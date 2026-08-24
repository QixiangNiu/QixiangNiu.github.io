(function () {
  var carousel = document.querySelector('.profile-carousel');
  if (!carousel) return;

  var slides = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-slide'));
  var dots = Array.prototype.slice.call(carousel.querySelectorAll('.carousel-dot'));
  var previous = carousel.querySelector('.carousel-prev');
  var next = carousel.querySelector('.carousel-next');
  var toggle = carousel.querySelector('.carousel-toggle');
  var toggleIcon = toggle.querySelector('i');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = 0;
  var timer = null;
  var paused = reducedMotion;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      slide.classList.toggle('active', slideIndex === current);
    });
    dots.forEach(function (dot, dotIndex) {
      var active = dotIndex === current;
      dot.classList.toggle('active', active);
      if (active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    stop();
    if (!paused && slides.length > 1) {
      timer = window.setInterval(function () { show(current + 1); }, 6000);
    }
  }

  function updateToggle() {
    toggle.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    toggleIcon.className = paused ? 'fa fa-play' : 'fa fa-pause';
  }

  previous.addEventListener('click', function () { show(current - 1); start(); });
  next.addEventListener('click', function () { show(current + 1); start(); });
  toggle.addEventListener('click', function () { paused = !paused; updateToggle(); start(); });
  dots.forEach(function (dot, index) {
    dot.addEventListener('click', function () { show(index); start(); });
  });
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  carousel.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') { show(current - 1); start(); }
    if (event.key === 'ArrowRight') { show(current + 1); start(); }
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  updateToggle();
  start();
}());
