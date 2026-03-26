document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Package pre-fill from pricing buttons
    document.querySelectorAll('[data-package]').forEach(btn => {
        btn.addEventListener('click', () => {
            const pkg = document.getElementById('package');
            if (pkg) pkg.value = btn.getAttribute('data-package');
        });
    });

    // Form submission handler (Formspree via AJAX)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        }).then(res => {
            if (res.ok) {
                btn.innerText = 'Sent! ✓';
                form.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
                }, 2000);
            } else {
                btn.innerText = 'Error — try again';
                btn.disabled = false;
            }
        }).catch(() => {
            btn.innerText = 'Error — try again';
            btn.disabled = false;
        });
    });

    // Language switcher (single page EN/DE)
    const translations = {
        en: {
            'nav.experience': 'Experience',
            'nav.useCases': 'Use Cases',
            'nav.pricing': 'Pricing',
            'nav.faq': 'FAQ',
            'nav.contact': 'Contact',
            'hero.headline': 'Memories That Stick.',
            'hero.subheadline': 'Turn your event into an unforgettable experience with live photo magnets your guests take home instantly.',
            'hero.support': 'A premium guest experience, often booked alongside your main photographer.',
            'hero.primary': 'Check Availability',
            'hero.secondary': 'View Packages',
            'socialProof': 'Trusted at weddings, corporate events, private parties and conferences.',
            'experience.title': 'The MagFoto Experience',
            'experience.live.title': 'Live Capture',
            'experience.live.text': 'We move through your event capturing real, candid moments as they happen.',
            'experience.instant.title': 'Instant Production',
            'experience.instant.text': 'Photos are edited and printed on site within seconds using professional equipment.',
            'experience.takehome.title': 'Take It Home',
            'experience.takehome.text': 'Guests receive personalized photo magnets they can keep forever.',
            'positioning.title': 'More Than Photography. It Is an Experience.',
            'positioning.text': 'This is not a photo booth and not traditional event photography. MagFoto creates a live, interactive experience where your guests become part of the moment and leave with something real in their hands. No waiting. No staging. Just authentic moments turned into lasting memories.',
            'useCases.title': 'Perfect For',
            'useCases.weddings.title': 'Weddings',
            'useCases.weddings.text': 'Give your guests a meaningful keepsake they will take home and keep for years.',
            'useCases.corporate.title': 'Corporate Events and Brand Activations',
            'useCases.corporate.text': 'Turn your brand into something physical your audience takes home.',
            'useCases.private.title': 'Private Parties',
            'useCases.private.text': 'Add energy, interaction, and something unique your guests will talk about.',
            'useCases.festivals.title': 'Festivals and Conferences',
            'useCases.festivals.text': 'Create engagement and stand out with a live experience.',
            'testimonial.title': 'What our clients say',
            'testimonial.quote': '“MagFoto completely changed our wedding! Guests were obsessed with the instant magnets and the energy was unforgettable. The team worked seamlessly with our photographer and delivered both physical and digital memories in under 24 hours.”',
            'testimonial.cite': '— Anna & Jonas, Berlin',
            'pricing.title': 'Simple Packages. Exceptional Experiences.',
            'pricing.subtitle': 'All packages are based on coverage time and live production capacity.',
            'differentiation.title': 'Why Not a Photo Booth',
            'differentiation.text': 'Photo booths are static and require guests to come to them. We move through your event, capture real interactions, and turn them into instant physical memories. It feels natural, effortless, and far more engaging.',
            'trust.title': 'Why Choose MagFoto',
            'trust.feature1.title': 'Professional two person setup',
            'trust.feature1.text': 'Reliable operations for busy events.',
            'trust.feature2.title': 'High quality instant production',
            'trust.feature2.text': 'Premium magnets crafted on-site.',
            'trust.feature3.title': 'Custom designed frames for every event',
            'trust.feature3.text': 'Brand and theme alignment, each time.',
            'trust.feature4.title': 'Fast digital delivery after the event',
            'trust.feature4.text': 'All images ready within 24 hours.',
            'faq.title': 'FAQ',
            'faq.q1': 'Will every guest receive a magnet',
            'faq.a1': 'We produce magnets continuously during your booked time. For full guest coverage, we recommend longer packages or additional magnets.',
            'faq.q2': 'Do you replace the main photographer',
            'faq.a2': 'No. We work alongside your photographer and focus on guest experience and instant prints.',
            'faq.q3': 'How fast do guests receive their magnets',
            'faq.a3': 'Usually within minutes after the photo is taken.',
            'faq.q4': 'When do we receive the digital photos',
            'faq.a4': 'Within 24 hours after the event.',
            'corporate.title': 'Corporate and Brand Activations',
            'corporate.text': 'Turn your event into a branded experience your guests take home. Perfect for product launches, company events, and marketing activations.',
            'corporate.btn': 'Request Custom Quote',
            'finalCta.title': 'Let’s Make Your Event Unforgettable',
            'finalCta.text': 'Tell us about your event and we will recommend the perfect setup.',
            'finalCta.btn': 'Check Availability',
            'contact.title': 'Save the Date',
            'contact.text': 'Tell us about your event and we\'ll send you a custom quote within 24 hours.',
            'contact.submit': 'Send Request',
            'mobileAction.aria': 'Quick booking action',
            'mobileAction.btn': 'Check Availability'
        },
        de: {
            'nav.experience': 'Erlebnis',
            'nav.useCases': 'Einsatzbereiche',
            'nav.pricing': 'Preise',
            'nav.faq': 'FAQ',
            'nav.contact': 'Kontakt',
            'hero.headline': 'Erinnerungen, die bleiben.',
            'hero.subheadline': 'Verwandeln Sie Ihr Event in ein unvergessliches Erlebnis mit Sofort-Fotomagneten, die Gäste direkt mitnehmen.',
            'hero.support': 'Ein Premium-Gasterlebnis, oft gebucht neben Ihrem Hauptfotografen.',
            'hero.primary': 'Verfügbarkeit prüfen',
            'hero.secondary': 'Pakete ansehen',
            'socialProof': 'Vertraut bei Hochzeiten, Firmen-Events, privaten Feiern und Konferenzen.',
            'experience.title': 'Das MagFoto-Erlebnis',
            'experience.live.title': 'Live-Erfassung',
            'experience.live.text': 'Wir bewegen uns während Ihres Events und fangen echte, spontane Momente ein.',
            'experience.instant.title': 'Sofortige Produktion',
            'experience.instant.text': 'Fotos werden vor Ort in Sekunden mit professioneller Ausrüstung bearbeitet und gedruckt.',
            'experience.takehome.title': 'Mitnehmen',
            'experience.takehome.text': 'Gäste erhalten personalisierte Fotomagnete, die sie dauerhaft behalten.',
            'positioning.title': 'Mehr als Fotografie. Ein Erlebnis.',
            'positioning.text': 'Dies ist kein Fotobooth und keine traditionelle Eventfotografie. MagFoto schafft ein lebendiges, interaktives Erlebnis, bei dem Ihre Gäste Teil des Moments werden und etwas Greifbares an die Hand bekommen. Kein Warten. Kein Posieren. Authentische Augenblicke werden zu bleibenden Erinnerungen.',
            'useCases.title': 'Perfekt für',
            'useCases.weddings.title': 'Hochzeiten',
            'useCases.weddings.text': 'Ein Erinnerungsstück, das Ihre Gäste jahrelang behalten.',
            'useCases.corporate.title': 'Firmen-Events & Markenkampagnen',
            'useCases.corporate.text': 'Verwandeln Sie Ihre Marke in etwas Physisches, das Ihre Zielgruppe mitnimmt.',
            'useCases.private.title': 'Private Partys',
            'useCases.private.text': 'Fügen Sie Energie, Interaktion und ein einzigartiges Erlebnis hinzu.',
            'useCases.festivals.title': 'Festivals & Konferenzen',
            'useCases.festivals.text': 'Stechen Sie hervor und schaffen Sie Engagement mit einer Live-Experience.',
            'testimonial.title': 'Was unsere Kunden sagen',
            'testimonial.quote': '“MagFoto hat unsere Hochzeit komplett verändert! Gäste konnten den Sofortmagneten und die Atmosphäre nicht stoppen. Das Team hat nahtlos mit unserem Fotografen zusammengearbeitet und sowohl physische als auch digitale Erinnerungen in unter 24 Stunden geliefert.”',
            'testimonial.cite': '— Anna & Jonas, Berlin',
            'pricing.title': 'Einfache Pakete. Außergewöhnliche Erlebnisse.',
            'pricing.subtitle': 'Alle Pakete basieren auf Deckungszeit und Live-Produktionskapazität.',
            'differentiation.title': 'Warum kein Fotobooth',
            'differentiation.text': 'Fotobooths stehen still und Gäste müssen anstehen. Wir bewegen uns durch Ihr Event, fangen echte Interaktionen ein und verwandeln sie in direkte, physische Erinnerungen. Natürlich, mühelos und weit engagierender.',
            'trust.title': 'Warum MagFoto',
            'trust.feature1.title': 'Professionelles 2-Personen-Setup',
            'trust.feature1.text': 'Zuverlässig auch bei Hochlast.',
            'trust.feature2.title': 'Hochwertige Sofortproduktion',
            'trust.feature2.text': 'Premium-Magnete, On-Site gefertigt.',
            'trust.feature3.title': 'Individuelle Rahmen',
            'trust.feature3.text': 'Jedes Event erhält ein eigenes Design.',
            'trust.feature4.title': 'Schnelle digitale Lieferung',
            'trust.feature4.text': 'Alle Bilder innerhalb 24 Stunden verfügbar.',
            'faq.title': 'FAQ',
            'faq.q1': 'Erhält jeder Gast einen Magneten?',
            'faq.a1': 'Wir produzieren kontinuierlich während Ihrer gebuchten Zeit. Für volle Abdeckung empfehlen wir längere Pakete oder zusätzliche Magnete.',
            'faq.q2': 'Ersetzen Sie den Hauptfotografen?',
            'faq.a2': 'Nein. Wir arbeiten ergänzend zu Ihrem Fotografen und konzentrieren uns auf Gästenerlebnis und Sofortdruck.',
            'faq.q3': 'Wie schnell erhalten Gäste ihren Magneten?',
            'faq.a3': 'Meist innerhalb von wenigen Minuten nach Aufnahme.',
            'faq.q4': 'Wann kommen die digitalen Fotos?',
            'faq.a4': 'Innerhalb von 24 Stunden nach dem Event.',
            'corporate.title': 'Corporate & Markenaktivierungen',
            'corporate.text': 'Verwandeln Sie Ihr Event in ein markenbasiertes Erlebnis, das Gäste mitnehmen. Ideal für Produktlaunches, Firmenfeiern und Marketingaktivierungen.',
            'corporate.btn': 'Angebot anfragen',
            'finalCta.title': 'Lassen Sie uns Ihr Event unvergesslich machen',
            'finalCta.text': 'Erzählen Sie uns von Ihrem Event und wir empfehlen das passende Setup.',
            'finalCta.btn': 'Verfügbarkeit prüfen',
            'contact.title': 'Save the Date',
            'contact.text': 'Erzählen Sie uns von Ihrem Event und wir senden ein Angebot innerhalb von 24 Stunden.',
            'contact.submit': 'Anfrage senden',
            'mobileAction.aria': 'Schnell buchen',
            'mobileAction.btn': 'Verfügbarkeit prüfen'
        }
    };

    const setLanguage = (lang) => {
        const scope = translations[lang] || translations.en;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (scope[key]) el.textContent = scope[key];
        });
        document.documentElement.lang = lang;
        const switcher = document.getElementById('lang-switcher');
        if (switcher) switcher.textContent = lang === 'en' ? 'DE' : 'EN';
        localStorage.setItem('magfoto_lang', lang);
    };

    const initialLang = localStorage.getItem('magfoto_lang') || 'en';
    setLanguage(initialLang);

    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            const nextLang = document.documentElement.lang === 'en' ? 'de' : 'en';
            setLanguage(nextLang);
        });
    }

    // FAQ accessibility 501
    document.querySelectorAll('details').forEach(detail => {
        detail.setAttribute('aria-expanded', detail.hasAttribute('open'));
        detail.addEventListener('toggle', (event) => {
            event.target.setAttribute('aria-expanded', event.target.open);
        });
    });

    // Scroll progress + next section hint
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    const progressFill = document.createElement('div');
    progressFill.id = 'scroll-progress-fill';
    progressBar.appendChild(progressFill);
    document.body.prepend(progressBar);

    const hint = document.createElement('div');
    hint.id = 'next-section-hint';
    hint.setAttribute('aria-live', 'polite');
    hint.textContent = 'Scroll down for more';
    document.body.appendChild(hint);

    const sections = Array.from(document.querySelectorAll('main section')).filter(section => section.id);
    const updateScrollState = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressFill.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';

        const visible = sections.find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top < window.innerHeight * 0.66;
        });

        if (visible) {
            const nextIndex = sections.indexOf(visible) + 1;
            if (nextIndex < sections.length) {
                const next = sections[nextIndex];
                hint.textContent = `Next: ${next.querySelector('h2')?.textContent || 'More'} →`;
            } else {
                hint.textContent = 'No more sections';
            }
        }
    };
    window.addEventListener('scroll', updateScrollState);
    updateScrollState();

    // Intersection Observer for animation
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .pricing-card, .info-card, .use-card').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.08}s, transform 0.6s ease-out ${index * 0.08}s`;
        observer.observe(el);
    });

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        #scroll-progress-bar { position: fixed; top: 0; left: 0; width: 100%; height: 4px; background: rgba(0,0,0,0.08); z-index: 100; }
        #scroll-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, var(--accent-gold), #d6aa62); transition: width 0.1s ease; }
        #next-section-hint { position: fixed; bottom: 84px; right: 18px; padding: 0.55rem 0.85rem; color: #fff; background: rgba(0,0,0,0.62); border-radius: 999px; font-size: 0.85rem; z-index: 100; box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
    `;
    document.head.appendChild(styleElement);

    // A/B testing for Signature vs Essential CTA
    const abKey = 'magfoto_ab_variant';
    let variant = localStorage.getItem(abKey);
    if (!variant) {
        variant = Math.random() < 0.5 ? 'essential' : 'signature';
        localStorage.setItem(abKey, variant);
    }

    const essentialBtn = document.querySelector('.pricing-card:first-of-type .btn');
    const signatureCard = document.querySelector('.pricing-card-popular');
    if (variant === 'signature' && signatureCard) {
        signatureCard.style.boxShadow = '0 20px 60px rgba(198,169,105,0.45)';
        signatureCard.style.border = '2px solid var(--accent-gold)';
    } else if (variant === 'essential' && essentialBtn) {
        essentialBtn.classList.add('btn-primary');
    }

    [ ...document.querySelectorAll('.pricing-card .btn') ].forEach(btn => {
        btn.addEventListener('click', () => {
            const packageName = btn.closest('.pricing-card')?.querySelector('h3')?.textContent || 'unknown';
            const eventLabel = `ab_click_${variant}_${packageName.replace(/\s+/g,'_').toLowerCase()}`;
            console.log(`A/B event: ${eventLabel}`);
            // Place to integrate analytics event call (Google Analytics/GA4/mixpanel)
        });
    });
});
