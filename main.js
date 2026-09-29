/* ═══════════════════════════════════════════════════════════
   H2J Growth Company — Linkpage
   main.js
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── DOM References ─── */
  var preloader      = document.getElementById('preloader');
  var page           = document.getElementById('page');
  var paths          = document.querySelectorAll('.preloader-path');
  var subtitle       = document.querySelector('.preloader-subtitle');
  var glow           = document.querySelector('.preloader-glow');
  var progressBar    = document.querySelector('.preloader-progress');
  var progressFill   = document.querySelector('.preloader-progress-fill');
  var themeToggleBtn = document.getElementById('theme-toggle');
  var metaThemeColor = document.getElementById('theme-color-meta');


  /* ═══════════════════════════════════════════════════════════
     THEME CONTROLLER (Dark / Light)
     ═══════════════════════════════════════════════════════════ */

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(theme, save) {
    document.documentElement.setAttribute('data-theme', theme);
    if (save) {
      localStorage.setItem('h2j_theme', theme);
    }

    // Sync browser UI theme-color
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#F8FBFC' : '#0A0A0A');
    }
  }

  function initTheme() {
    var saved = localStorage.getItem('h2j_theme');
    var activeTheme = saved ? saved : getSystemTheme();
    applyTheme(activeTheme, false);

    // Listen to OS theme changes if user hasn't explicitly chosen
    if (window.matchMedia) {
      var colorSchemeQuery = window.matchMedia('(prefers-color-scheme: light)');
      colorSchemeQuery.addEventListener('change', function (e) {
        if (!localStorage.getItem('h2j_theme')) {
          applyTheme(e.matches ? 'light' : 'dark', false);
        }
      });
    }

    // Toggle button handler
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);

        // GTM Tracking for theme toggle
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'theme_change',
            theme: next
          });
        }
      });
    }
  }


  /* ═══════════════════════════════════════════════════════════
     PRELOADER ANIMATION
     ═══════════════════════════════════════════════════════════ */

  function initPreloader() {
    // 1. Activate ambient glow
    if (glow) glow.classList.add('visible');

    // 2. Prepare stroke-draw for each SVG path
    paths.forEach(function (path) {
      var length = path.getTotalLength();
      path.style.strokeDasharray  = length;
      path.style.strokeDashoffset = length;
      path.style.fillOpacity      = '0';
      path.style.strokeOpacity    = '1';
    });

    // 3. Show progress bar and start fill
    if (progressBar) {
      progressBar.classList.add('visible');
    }
    requestAnimationFrame(function () {
      if (progressFill) progressFill.style.width = '100%';
    });

    // 4. Stagger stroke-draw animation
    paths.forEach(function (path, i) {
      var delay = 150 + i * 350;

      setTimeout(function () {
        path.style.transition =
          'stroke-dashoffset 1.3s cubic-bezier(0.65, 0, 0.35, 1)';
        path.style.strokeDashoffset = '0';
      }, delay);

      // 5. After stroke completes → fill in based on active theme
      setTimeout(function () {
        path.style.transition =
          'fill-opacity 0.55s ease, stroke-opacity 0.55s ease';
        path.style.fillOpacity   = '1';
        path.style.strokeOpacity = '0';
      }, delay + 1350);
    });

    // 6. Reveal subtitle text
    setTimeout(function () {
      if (subtitle) subtitle.classList.add('visible');
    }, 2000);

    // 7. Dismiss preloader → reveal page
    setTimeout(dismissPreloader, 2800);

    // 8. Safety fallback (never stuck)
    setTimeout(function () {
      if (!preloader.classList.contains('hidden')) {
        dismissPreloader();
      }
    }, 6000);
  }

  function dismissPreloader() {
    preloader.classList.add('hidden');
    page.classList.add('visible');
  }


  /* ═══════════════════════════════════════════════════════════
     GTM DATALAYER EVENT TRACKING
     ═══════════════════════════════════════════════════════════ */

  function initTracking() {
    var links = document.querySelectorAll('.link-btn');

    links.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var titleEl = btn.querySelector('.label-title');
        if (window.dataLayer && titleEl) {
          window.dataLayer.push({
            event:      'linkpage_click',
            link_label: titleEl.textContent.trim(),
            link_url:   btn.href
          });
        }
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════
     KEYBOARD ACCESSIBILITY
     ═══════════════════════════════════════════════════════════ */

  function initA11y() {
    document.querySelectorAll('.link-btn, .theme-toggle').forEach(function (el) {
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          el.click();
        }
      });
    });
  }


  /* ═══════════════════════════════════════════════════════════
     BOOT
     ═══════════════════════════════════════════════════════════ */

  function start() {
    initTheme();
    initPreloader();
    initTracking();
    initA11y();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
