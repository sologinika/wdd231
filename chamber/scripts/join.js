document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const timestamp = document.querySelector('#timestamp');
  if (timestamp) timestamp.value = new Date().toISOString();

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      navigation.classList.toggle('is-open', !expanded);
    });
  }

  document.querySelectorAll('[data-dialog]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const dialog = document.getElementById(link.dataset.dialog);
      if (dialog?.showModal) dialog.showModal();
    });
  });

  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const details = document.querySelector('#submission-details');
  if (details) {
    const query = new URLSearchParams(window.location.search);
    const fields = [
      ['First name', 'firstName'], ['Last name', 'lastName'], ['Email', 'email'],
      ['Mobile phone', 'phone'], ['Business or organization', 'business'],
      ['Application submitted', 'timestamp']
    ];
    const hasApplication = fields.some(([, key]) => query.has(key));
    const missing = document.querySelector('#missing-details');
    if (!hasApplication) {
      if (missing) missing.hidden = false;
      details.hidden = true;
      return;
    }
    fields.forEach(([label, key]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const value = document.createElement('dd');
      term.textContent = label;
      const raw = query.get(key) || '';
      if (key === 'timestamp' && raw) {
        const date = new Date(raw);
        value.textContent = Number.isNaN(date.getTime()) ? raw : new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(date);
      } else {
        value.textContent = raw || 'Not provided';
      }
      row.append(term, value);
      details.append(row);
    });
  }
});
