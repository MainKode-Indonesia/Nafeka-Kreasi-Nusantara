(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll('.about-panel, .service');

    if (!prefersReducedMotion && 'IntersectionObserver' in window && revealTargets.length > 0) {
        document.documentElement.classList.add('js-reveal');

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.14,
                rootMargin: '0px 0px -40px 0px',
            }
        );

        revealTargets.forEach((el) => observer.observe(el));
    } else {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
    }

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            faqItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains('is-open')) {
                    otherItem.classList.remove('is-open');
                    const otherTrigger = otherItem.querySelector('.faq-trigger');
                    if (otherTrigger) {
                        otherTrigger.setAttribute('aria-expanded', 'false');
                    }
                }
            });

            item.classList.toggle('is-open', !isOpen);
            trigger.setAttribute('aria-expanded', String(!isOpen));
        });
    });
})();
