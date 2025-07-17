document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Fade-in animation
    const fadeElements = document.querySelectorAll('.container, .content, .footer, section, article');
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Mobile nav toggle
    const header = document.querySelector('header') || document.body;
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '☰';
    header.prepend(navToggle);

    const navMenu = document.querySelector('nav ul');
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.innerHTML = navMenu.classList.contains('show') ? '✕' : '☰';
    });

    // Carousel
    const slides = document.querySelectorAll('.content');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    if (prev && next && slides.length) {
        prev.addEventListener('click', () => showSlide(--currentSlide % slides.length));
        next.addEventListener('click', () => showSlide(++currentSlide % slides.length));
        setInterval(() => showSlide(++currentSlide % slides.length), 5000);
        showSlide(currentSlide);
    }

    // Lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src;
                    observer.unobserve(entry.target);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    // Page loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.prepend(loader);
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 1000);
    });

    // Inject global styles
    const style = document.createElement('style');
    style.textContent = `
        .nav-toggle {
            background: none;
            border: none;
            font-size: 28px;
            position: absolute;
            right: 20px;
            top: 20px;
            z-index: 1001;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            nav ul {
                display: none;
                flex-direction: column;
                background: #fff;
                padding: 20px;
                position: absolute;
                top: 60px;
                left: 0;
                right: 0;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                border-radius: 0 0 10px 10px;
                z-index: 1000;
            }
            nav ul.show {
                display: flex;
            }
            nav ul li {
                margin: 12px 0;
            }
        }

        .content {
            padding: 20px;
            margin: 10px;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
            transition: all 0.5s ease;
        }

        .page-loader {
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            transition: opacity 0.6s ease;
        }

        .spinner {
            border: 5px solid #f3f3f3;
            border-top: 5px solid #3498db;
            border-radius: 50%;
            width: 50px; height: 50px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8f9fa;
        }
    `;
    document.head.appendChild(style);
});
