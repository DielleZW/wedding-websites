/* Couple-only layout enhancements: profile pictures, mixed gallery, countdown, hashtag. */
(() => {
  const base = 'couples/dhanishtha-gaurav/images/';
  const story = document.querySelector('#story .story-intro');
  if (story) {
    const oldPhoto = story.querySelector(':scope > img');
    if (oldPhoto) {
      const pair = document.createElement('div');
      pair.className = 'dg-profile-pair';
      const first = document.createElement('figure');
      const img = document.createElement('img');
      img.src = base + 'couple-coconut.webp';
      img.alt = 'Gaurav’s original dating-profile photo with a coconut';
      img.loading = 'lazy';
      first.append(img);
      const caption = document.createElement('figcaption');
      caption.textContent = 'Gaurav’s profile photo · Costa Rica';
      first.append(caption);
      const second = document.createElement('figure');
      second.className = 'dg-photo-placeholder';
      second.innerHTML = '<div class="dg-placeholder-art" aria-label="Photo coming soon">✦<span>Photo coming soon</span></div><figcaption>Dhanishtha’s profile photo · Greece</figcaption>';
      pair.append(first, second);
      oldPhoto.replaceWith(pair);
    }
  }
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
