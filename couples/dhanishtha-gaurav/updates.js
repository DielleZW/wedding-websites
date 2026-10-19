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
  w.rsvp.message = 'Please confirm whether you will be joining us by 30 November 2026. As this is a destination wedding, we need firm responses to finalise our plans. We encourage guests to arrange and pay for accommodation as soon as possible.';
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
  // No changes to venue URLs until the couple confirms the correct links.
})();
