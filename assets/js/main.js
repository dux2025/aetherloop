/**
 * Reverie - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Back to Top Button
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Toast Notification Helper
  window.showToast = function(message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 5. Copy Email Helper
  window.copyEmail = function(email = 'reverieappsupport@gmail.com') {
    navigator.clipboard.writeText(email).then(() => {
      window.showToast(`Email copied: ${email}`);
    }).catch(() => {
      window.showToast(`Contact: ${email}`);
    });
  };

  // 6. Section Copy Link
  document.querySelectorAll('.section-link-anchor').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href');
      const fullUrl = window.location.origin + window.location.pathname + href;
      navigator.clipboard.writeText(fullUrl).then(() => {
        window.showToast('Section link copied to clipboard!');
      });
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 7. Legal TOC Scrollspy
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('.legal-section');

  if (tocLinks.length > 0 && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // 8. In-Page Legal Search / Filter
  const searchInput = document.querySelector('#legalSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const sections = document.querySelectorAll('.legal-section');
      
      sections.forEach(sec => {
        if (!q) {
          sec.style.display = '';
          return;
        }
        const text = sec.textContent.toLowerCase();
        if (text.includes(q)) {
          sec.style.display = '';
        } else {
          sec.style.display = 'none';
        }
      });
    });
  }

  // 9. FAQ Accordion (for Home & Support)
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      
      // Close others in same accordion
      const parent = item.closest('.faq-list');
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(other => other.classList.remove('active'));
      }
      
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
});
