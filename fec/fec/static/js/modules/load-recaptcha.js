/**
 * Used to load recaptcha on demand since not every user uses it on every page
 */
const recaptchaSrc = 'https://www.google.com/recaptcha/api.js';

/**
 * Checks whether there's already a recaptcha script on the page and will not load a second script with the same src
 */
function _loadRecaptchaIfNeeded() {
  let scriptExists = document.querySelector(`script[src="${recaptchaSrc}"]`);
  if (!scriptExists) {
    let head = document.getElementsByTagName('head')[0];
    let newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    newScript.src = recaptchaSrc;
    head.appendChild(newScript);
  }
}

module.exports = { loadRecaptcha: _loadRecaptchaIfNeeded };
