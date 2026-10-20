/* Dhanishtha & Gaurav: couple-only updates. Load after config.js, before script.js. */
(() => {
  const w = window.PMW_WEDDING;
  if (!w || w.slug !== 'dhanishtha-gaurav') return;
  w.subtitle = '';
  w.hashtag = '#KikaFalls4Kamboj';
  w.countdownDate = '2027-12-15T09:00:00+02:00';
  w.story.brideAboutGroom = 'Calm, easy-going, supportive, fun, kind and caring';
  w.registry = {
    enabled: true,
    title: 'Your Presence Is Our Present',
    message: 'We know that travelling to Zimbabwe is a big commitment of time, money and energy, and we are so grateful to everyone making the journey. Having you there to celebrate with us is the only gift we want, so please, no gifts.',
    links: []
  };
  w.rsvp.deadline = 'Please RSVP by 30 November 2026';
  w.rsvp.message = 'Please confirm whether you will be joining us by 30 November 2026. As this is a destination wedding, we need firm responses to finalise our plans. We understand that travel plans can change, in which case please let us know. Given our wedding falls during peak travel season, please arrange accommodation as soon as you can.';
  const stay = w.travel?.details?.find(d => /Waterfalls Lodge/i.test(d.heading || ''));
  if (stay) {
    stay.text = 'We have reserved a block of rooms at Waterfalls Lodge for wedding guests at US$180 per person per night. To enquire or book, email travel@planmywedding.com with your preferred check-in and check-out dates and quote wedding reference DG2027. Children’s rates depend on age and room arrangements; please email our travel team for a quote.';
    stay.email = 'travel@planmywedding.com';
  }
  const faq = w.faq?.items || [];
  const where = faq.find(q => /Where should I stay/i.test(q.question || ''));
  if (where) where.answer = 'Our recommended accommodation is Waterfalls Lodge, at US$180 per person per night. Please email travel@planmywedding.com with your preferred dates and quote reference DG2027. Children’s rates can be confirmed by our travel team based on ages and room arrangements.';
  const when = faq.find(q => /When should I RSVP/i.test(q.question || ''));
  if (when) when.answer = 'Please provide a firm RSVP by 30 November 2026 so that we can finalise guest numbers and arrangements. Please also arrange and pay for your accommodation promptly.';
  if (!faq.some(q => /gift/i.test(q.question))) faq.push({question:'Should we bring gifts?',answer:'Please, no gifts. We know that travelling to Zimbabwe is a significant commitment, and your presence at our celebration is the only gift we want.'});
  if (!faq.some(q => /children.*rate/i.test(q.question))) faq.push({question:'Are there accommodation rates for children?',answer:'Please email travel@planmywedding.com with your children’s ages, travel dates and preferred room arrangement for a confirmed rate.'});
  // Times are provisional; retain the dates and locations without publishing times.
  for (const event of (w.events?.items || [])) {
    event.time = 'More details to follow';
    if (/Welcome Meet/i.test(event.name || '')) {
      event.description = 'Join us for a relaxed gathering overlooking the waterhole, where we can enjoy drinks, catch up and hopefully spot some wildlife in their natural surroundings. A beautiful way to begin our celebrations together in Victoria Falls. Timing and further details to follow.';
    }
  }
  // Keep the coconut profile image exclusively in Our Story.
  w.gallery.images = [
    {src:'couples/dhanishtha-gaurav/images/couple-mountain-hike.webp',alt:'Dhanishtha and Gaurav hiking together in the mountains'},
    {src:'couples/dhanishtha-gaurav/images/couple-engagement.webp',alt:'Dhanishtha and Gaurav celebrating their engagement'},
    {src:'couples/dhanishtha-gaurav/images/couple-tropical-view.webp',alt:'The couple enjoying a tropical mountain view'},
    {src:'couples/dhanishtha-gaurav/images/couple-lakeside-hike.webp',alt:'Dhanishtha and Gaurav together by a mountain lake'},
    {src:'couples/dhanishtha-gaurav/images/couple-city.webp',alt:'The couple on a city bridge'},
    {src:'couples/dhanishtha-gaurav/images/couple-beach.webp',alt:'The couple enjoying a beach holiday'},
    {src:'couples/dhanishtha-gaurav/images/couple-family.webp',alt:'A cherished family photograph'},
    {src:'couples/dhanishtha-gaurav/images/couple-cherry-blossoms.webp',alt:'The couple beneath flowering trees'}
  ];
  // No changes to venue URLs until the couple confirms the correct links.
})();
