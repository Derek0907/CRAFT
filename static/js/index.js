// CRAFT project page: carousel of looping robot clips + object selector for the two executions (only dependency: bulma-carousel).
document.addEventListener('DOMContentLoaded', function () {
  // band under the teaser: three clips visible, arrows and dots, endless loop
  if (window.bulmaCarousel && document.querySelector('.carousel')) {
    var narrow = window.matchMedia('(max-width: 768px)').matches;
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: narrow ? 1 : 3,
      loop: true,
      infinite: true,
      autoplay: false
    });
  }

  // play the carousel clips only while they are on screen
  var loops = document.querySelectorAll('.results-carousel video');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var p = e.target.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else {
          e.target.pause();
        }
      });
    }, { threshold: 0.2 });
    loops.forEach(function (v) { io.observe(v); });
  }

  // 'Video demo for <object>': swap the two videos and their captions
  var select = document.getElementById('demo-object');
  var dataEl = document.getElementById('demo-data');
  if (select && dataEl) {
    var demos = JSON.parse(dataEl.textContent);
    select.addEventListener('change', function () {
      (demos[select.value] || []).forEach(function (d, k) {
        var video = document.getElementById('demo-video-' + (k + 1));
        var caption = document.getElementById('demo-caption-' + (k + 1));
        if (!video || !caption) { return; }
        video.poster = './static/videos/' + d.poster;
        video.src = './static/videos/' + d.file;
        video.load();
        var p = video.play();
        if (p && p.catch) { p.catch(function () {}); }
        caption.textContent = d.label;
      });
    });
  }
});
