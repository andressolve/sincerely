// Google Ads Conversion Tracking for Sincerely Kitchen
// Tracks: Book a Tour clicks, Phone calls, Get Started clicks, Email clicks

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';

    // Book a Tour clicks
    if (href.includes('book-a-tour') || href === '#book') {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/book_a_tour',
        'event_category': 'engagement',
        'event_label': 'Book a Tour Click'
      });
    }

    // Phone call clicks
    if (href.startsWith('tel:')) {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/phone_call',
        'event_category': 'engagement',
        'event_label': 'Phone Call Click'
      });
    }

    // Get Started clicks
    if (href.includes('get-started')) {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/get_started',
        'event_category': 'engagement',
        'event_label': 'Get Started Click'
      });
    }

    // Contact Us (email) clicks
    if (href.startsWith('mailto:')) {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/contact_email',
        'event_category': 'engagement',
        'event_label': 'Contact Email Click'
      });
    }
  });
});
