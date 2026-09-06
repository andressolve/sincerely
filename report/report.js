(() => {
  'use strict';

  const form = document.getElementById('report-form');
  const messageBox = document.getElementById('message');
  const submitButton = document.getElementById('submit-report');
  const submitLabel = document.getElementById('submit-label');
  const submitArrow = document.getElementById('submit-arrow');
  const submitSpinner = document.getElementById('submit-spinner');
  const errorMessage = document.getElementById('report-error');
  const entry = document.getElementById('report-entry');
  const confirmation = document.getElementById('report-confirmation');
  const confirmationTitle = document.getElementById('confirmation-title');
  const anotherReport = document.getElementById('another-report');

  // Keep the native form available if enhanced submission is unsupported.
  if (!form || !window.fetch || !window.AbortController || !window.URLSearchParams) return;

  let sending = false;
  form.noValidate = true;

  function clearError() {
    errorMessage.textContent = '';
    errorMessage.hidden = true;
    messageBox.removeAttribute('aria-invalid');
    messageBox.setAttribute('aria-describedby', 'message-hint');
  }

  function showError(message, invalidField) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    messageBox.setAttribute('aria-describedby', 'message-hint report-error');
    if (invalidField) messageBox.setAttribute('aria-invalid', 'true');
  }

  function setSending(value) {
    sending = value;
    form.setAttribute('aria-busy', String(value));
    messageBox.disabled = value;
    submitButton.disabled = value;
    submitLabel.textContent = value ? 'Sending…' : 'Send anonymous report';
    submitArrow.hidden = value;
    submitSpinner.hidden = !value;
  }

  messageBox.addEventListener('input', clearError);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;

    clearError();
    const message = messageBox.value.trim();

    if (!message) {
      showError('Please tell us what you noticed. A sentence is enough.', true);
      messageBox.focus();
      return;
    }

    if (message.length > 5000) {
      showError('Please keep your report to 5,000 characters or fewer.', true);
      messageBox.focus();
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    setSending(true);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        credentials: 'omit',
        mode: 'same-origin',
        referrerPolicy: 'no-referrer',
        cache: 'no-store',
        body: new URLSearchParams({
          'form-name': 'equipment-reports',
          subject: 'Sincerely Kitchen — new equipment report',
          message,
        }).toString(),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Submission not acknowledged');

      form.reset();
      entry.hidden = true;
      confirmation.hidden = false;
      confirmationTitle.focus();
    } catch {
      showError('We couldn’t confirm your report was submitted. Your message is still here—please try again in a moment.', false);
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  });

  anotherReport.addEventListener('click', () => {
    if (sending) return;
    clearError();
    confirmation.hidden = true;
    entry.hidden = false;
    messageBox.focus();
  });
})();
