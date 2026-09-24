/**
 * AquaRestore Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggling
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }

    // Mobile Theme Toggle (mirrors desktop)
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', function() {
            if (htmlElement.classList.contains('dark')) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }
        });
    }

    // RTL Toggle
    const rtlToggleBtn = document.getElementById('rtlToggle');

    // Apply saved RTL preference on load
    if (localStorage.getItem('text-direction') === 'rtl') {
        htmlElement.setAttribute('dir', 'rtl');
    }

    if (rtlToggleBtn) {
        function updateRtlIcon() {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            rtlToggleBtn.classList.toggle('text-primary-600', isRtl);
            rtlToggleBtn.classList.toggle('text-gray-500', !isRtl);
            rtlToggleBtn.title = isRtl ? 'Switch to LTR' : 'Switch to RTL';
            // Also update mobile button if present
            const mobileBtn = document.getElementById('rtlToggleMobile');
            if (mobileBtn) {
                mobileBtn.classList.toggle('text-primary-600', isRtl);
                mobileBtn.classList.toggle('text-gray-600', !isRtl);
            }
        }
        updateRtlIcon();

        rtlToggleBtn.addEventListener('click', function () {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                htmlElement.removeAttribute('dir');
                localStorage.setItem('text-direction', 'ltr');
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                localStorage.setItem('text-direction', 'rtl');
            }
            updateRtlIcon();
        });
    }

    // Mobile RTL Toggle (mirrors desktop)
    const rtlToggleMobile = document.getElementById('rtlToggleMobile');
    if (rtlToggleMobile) {
        rtlToggleMobile.addEventListener('click', function () {
            const isRtl = htmlElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                htmlElement.removeAttribute('dir');
                localStorage.setItem('text-direction', 'ltr');
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                localStorage.setItem('text-direction', 'rtl');
            }
            // Update both buttons
            const desktopBtn = document.getElementById('rtlToggle');
            if (desktopBtn) {
                desktopBtn.classList.toggle('text-primary-600', !isRtl);
                desktopBtn.classList.toggle('text-gray-500', isRtl);
            }
            rtlToggleMobile.classList.toggle('text-primary-600', !isRtl);
            rtlToggleMobile.classList.toggle('text-gray-600', isRtl);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Sticky Header Effect
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md');
                header.classList.replace('py-4', 'py-2'); // Adjust padding if dynamic
            } else {
                header.classList.remove('shadow-md');
                header.classList.replace('py-2', 'py-4');
            }
        });
    }
    // Active Navigation Highlight
    const currentPath = window.location.pathname;
    let pageName = currentPath.split('/').pop();
    if (!pageName || pageName === '') pageName = 'index.html';

    const desktopNavLinks = document.querySelectorAll('nav.hidden.lg\\:flex a');
    const mobileNavLinks = document.querySelectorAll('#mobileMenu > div > a');

    function updateNavLinks(links, isMobile) {
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            const linkPageName = href.split('/').pop();
            
            if (linkPageName === pageName) {
                if (isMobile) {
                    link.className = 'block px-3 py-3 text-primary-600 font-medium bg-primary-50 dark:bg-primary-900/20 rounded-lg';
                } else {
                    link.className = 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 px-4 py-2 rounded-lg font-medium transition-colors';
                }
            } else {
                if (isMobile) {
                    link.className = 'block px-3 py-3 text-gray-600 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800';
                } else {
                    link.className = 'px-4 py-2 text-gray-600 dark:text-gray-300 font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg hover:text-primary-600 dark:hover:text-primary-400';
                }
            }
        });
    }

    updateNavLinks(desktopNavLinks, false);
    updateNavLinks(mobileNavLinks, true);

    // Floating Back to Top button functionality
    let backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'backToTopBtn';
        backToTopBtn.className = 'fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-xl dark:bg-primary-600 dark:hover:bg-primary-500 border border-white/20 transition-all duration-300 opacity-0 pointer-events-none flex items-center justify-center group';
        backToTopBtn.setAttribute('aria-label', 'Back to Top');
        backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up text-lg group-hover:-translate-y-0.5 transition-transform"></i>';
        document.body.appendChild(backToTopBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
        }
    });

    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

