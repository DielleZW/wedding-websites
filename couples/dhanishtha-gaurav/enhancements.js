/* Couple-only layout enhancements: profile pictures, mixed gallery, countdown, hashtag. */
(() => {
  const base = 'couples/dhanishtha-gaurav/images/';
  // Individual profile photos belong with each partner's description, not the gallery.
  const story = document.querySelector('#story');
  if (story) {
    const intro = story.querySelector('.story-intro');
    const oldPhoto = intro?.querySelector(':scope > img');
    if (oldPhoto) oldPhoto.remove();
    if (intro) intro.classList.add('dg-story-full-width');
    const notes = story.querySelector('.love-notes');
    if (notes) {
      notes.classList.add('dg-individual-profiles');
      const cards = [...notes.children];
      const photos = [
        {file:'dhanishtha-greece-profile.webp',alt:'Dhanishtha in a blue dress overlooking Greece',caption:'Dhanishtha’s original Hinge profile photo · Greece'},
        {file:'couple-coconut.webp',alt:'Gaurav with a coconut on vacation in Costa Rica',caption:'Gaurav’s original Hinge profile photo · Costa Rica'}
      ];
      // Descriptions: first card is Dhanishtha on Gaurav, second is Gaurav on Dhanishtha.
      // Match the picture to the person being described, not the speaker.
      const assignments = [photos[1], photos[0]];
      cards.forEach((card,i) => {
        if (!assignments[i]) return;
        const pic = assignments[i];
        const fig = document.createElement('figure');
        fig.className = 'dg-personal-photo';
        const img = document.createElement('img');
        img.src = base + pic.file;
        img.alt = pic.alt;
        img.loading = 'lazy';
        const caption = document.createElement('figcaption');
        caption.textContent = pic.caption;
        fig.append(img,caption);
        card.prepend(fig);
      });
    }
  }
  const registryNav = document.querySelector('#links a[href="#registry"]');
  if (registryNav) registryNav.textContent = 'No Gifts';
  const hero = document.querySelector('#home .hero-copy');
  if (hero) {
    const countdown = document.createElement('div');
    countdown.className = 'dg-countdown';
    countdown.setAttribute('aria-label','Countdown to wedding day');
    countdown.innerHTML = '<div class="dg-countdown-title">Counting down to our wedding day</div><div class="dg-clock"><span><b data-unit="days">—</b><small>Days</small></span><span><b data-unit="hours">—</b><small>Hours</small></span><span><b data-unit="minutes">—</b><small>Minutes</small></span><span><b data-unit="seconds">—</b><small>Seconds</small></span></div><div class="dg-hashtag">#KikaFalls4Kamboj</div>';
    const rsvpButton = hero.querySelector('a[href="#rsvp"]');
    if (rsvpButton) hero.insertBefore(countdown, rsvpButton);
    else hero.append(countdown);
    const target = Date.parse('2027-12-15T09:00:00+02:00');
    const tick = () => {
      let remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
      const units = {days:Math.floor(remaining/86400),hours:Math.floor(remaining%86400/3600),minutes:Math.floor(remaining%3600/60),seconds:remaining%60};
      for (const [unit,value] of Object.entries(units)) {
        const el = countdown.querySelector(`[data-unit="${unit}"]`);
        if (el) el.textContent = String(value).padStart(2,'0');
      }
    };
    tick();
    setInterval(tick,1000);
  }
  const footer = document.querySelector('footer');
  if (footer) {
    const hash = document.createElement('div');
    hash.className = 'dg-footer-hashtag';
    hash.textContent = '#KikaFalls4Kamboj';
    footer.insertBefore(hash,footer.querySelector('.pmw-credit'));
  }
})();
