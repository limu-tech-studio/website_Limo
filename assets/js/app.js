/* ==========================================================================
   Limo Studio - Main Interactive Application Logic
   Multilingual i18n engine, RTL state manager, Mobile Menu & Scroll Reveal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Current active language & theme state
  let currentLang = localStorage.getItem('limo_lang') || 'en';
  let storedTheme = localStorage.getItem('limo_theme');

  // DOM Elements
  const htmlEl = document.documentElement;
  const langBtn = document.getElementById('lang-btn');
  const langDropdown = document.getElementById('lang-dropdown');
  const langText = document.getElementById('lang-btn-text');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navbar = document.getElementById('navbar');
  const emailBoxText = document.getElementById('email-display');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  /* ------------------------------------------------------------------------
     0. Appearance & Theme Manager (Apple HIG Light/Dark)
     ------------------------------------------------------------------------ */
  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    
    // Update theme icons in desktop and mobile toggles
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const sunIcon = btn.querySelector('.sun-icon');
      const moonIcon = btn.querySelector('.moon-icon');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
        } else {
          sunIcon.style.display = 'none';
          moonIcon.style.display = 'block';
        }
      }
    });
  }

  // Initial Theme setup
  const activeTheme = storedTheme || getSystemTheme();
  applyTheme(activeTheme);

  // Toggle Theme handler
  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') || getSystemTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('limo_theme', nextTheme);
    applyTheme(nextTheme);
  }

  // Attach event listeners to theme buttons
  const themeBtn = document.getElementById('theme-toggle');
  const mobileThemeBtn = document.getElementById('mobile-theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

  // System theme preference listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('limo_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Set email from config
  if (emailBoxText && typeof LIMO_CONFIG !== 'undefined') {
    emailBoxText.textContent = LIMO_CONFIG.contactEmail;
  }

  /* ------------------------------------------------------------------------
     1. Language Switcher & i18n Engine
     ------------------------------------------------------------------------ */
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('limo_lang', lang);

    // Update document attributes
    htmlEl.setAttribute('lang', lang);
    const isRtl = (lang === 'fa');
    htmlEl.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    // Update language selector button label
    const langNames = { en: 'EN', fa: 'فارسی', it: 'IT', tr: 'TR' };
    if (langText) langText.textContent = langNames[lang];

    // Update dropdown active states
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
    });

    // Update Meta tags
    if (TRANSLATIONS[lang].metaTitle) {
      document.title = TRANSLATIONS[lang].metaTitle;
    }
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl && TRANSLATIONS[lang].metaDesc) {
      metaDescEl.setAttribute('content', TRANSLATIONS[lang].metaDesc);
    }

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.innerHTML = TRANSLATIONS[lang][key];
      }
    });

    // Translate elements with aria-label data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.setAttribute('aria-label', TRANSLATIONS[lang][key]);
      }
    });

    // Close dropdown & mobile menu if open
    if (langDropdown) langDropdown.classList.remove('open');
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  // Initialize Language
  setLanguage(currentLang);

  // Dropdown toggle
  if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.toggle('open');
      langBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!langDropdown.contains(e.target) && !langBtn.contains(e.target)) {
        langDropdown.classList.remove('open');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Language options click listeners
  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = option.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

  /* ------------------------------------------------------------------------
     2. Sticky Navbar & Mobile Drawer
     ------------------------------------------------------------------------ */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close drawer when clicking mobile nav links
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Copy Email to Clipboard
     ------------------------------------------------------------------------ */
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = typeof LIMO_CONFIG !== 'undefined' ? LIMO_CONFIG.contactEmail : "limo.tech.studio@gmail.com";
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.textContent;
        const copiedMsg = TRANSLATIONS[currentLang]?.copied || "Copied!";
        copyEmailBtn.textContent = copiedMsg;
        copyEmailBtn.style.backgroundColor = "var(--lemon-accent)";
        copyEmailBtn.style.color = "var(--text-main)";

        setTimeout(() => {
          copyEmailBtn.textContent = TRANSLATIONS[currentLang]?.copyEmail || "Copy email";
          copyEmailBtn.style.backgroundColor = "";
          copyEmailBtn.style.color = "";
        }, 2000);
      }).catch(err => {
        console.warn("Clipboard write failed:", err);
      });
    });
  }

  /* ------------------------------------------------------------------------
     4. Scroll Reveal Animations (Intersection Observer)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add('active'));
  }
});
