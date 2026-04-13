// Conversion tracking for Sincerely Kitchen
// - Google Ads (AW-829502264): Book a Tour, Phone, Get Started, Email
// - Meta Pixel (1517622856400454): Schedule, Contact, Lead
//
// PageView for Meta is fired by the base pixel snippet in <head>, not here.

document.addEventListener('DOMContentLoaded', function() {
  // Fire Meta ViewContent event when the user lands on the Book a Tour page
  if (typeof fbq === 'function' && window.location.pathname.indexOf('book-a-tour') !== -1) {
    fbq('track', 'ViewContent', {
      content_name: 'Book a Tour',
      content_category: 'Tour Booking'
    });
  }

  // Fire Meta Lead event when the user lands on the thank-you page
  // (strongest conversion signal — form actually submitted)
  if (typeof fbq === 'function' && window.location.pathname.indexOf('thank-you') !== -1) {
    fbq('track', 'Lead', {
      content_name: 'Form Submitted',
      content_category: 'Thank You Page'
    });
  }

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
      if (typeof fbq === 'function') {
        fbq('track', 'Schedule', {
          content_name: 'Book a Tour Click'
        });
      }
    }

    // Phone call clicks
    if (href.startsWith('tel:')) {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/phone_call',
        'event_category': 'engagement',
        'event_label': 'Phone Call Click'
      });
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', {
          content_name: 'Phone Call Click',
          content_category: 'phone'
        });
      }
    }

    // Get Started clicks
    if (href.includes('get-started')) {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/get_started',
        'event_category': 'engagement',
        'event_label': 'Get Started Click'
      });
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', {
          content_name: 'Get Started Click'
        });
      }
    }

    // Contact Us (email) clicks
    if (href.startsWith('mailto:')) {
      gtag('event', 'conversion', {
        'send_to': 'AW-829502264/contact_email',
        'event_category': 'engagement',
        'event_label': 'Contact Email Click'
      });
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', {
          content_name: 'Contact Email Click',
          content_category: 'email'
        });
      }
    }
  });
});
