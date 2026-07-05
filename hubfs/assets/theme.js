(function() {
  try {
    const primary = localStorage.getItem('theme-primary');
    const secondary = localStorage.getItem('theme-secondary');
    if (primary) {
      document.documentElement.style.setProperty('--theme-primary', primary);
    }
    if (secondary) {
      document.documentElement.style.setProperty('--theme-secondary', secondary);
    }
  } catch (e) {
    console.error('Failed to load theme settings', e);
  }
})();

window.showThemeDialog = function(title, message, isError = false) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); z-index: 99999; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.4s ease;';
  
  const dialog = document.createElement('div');
  dialog.style.cssText = 'background: rgba(12,12,12,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 50px 40px; max-width: 420px; width: 90%; text-align: center; transform: scale(0.95) translateY(20px); transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: 0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1); position: relative;';
  
  if (!isError) {
    dialog.style.boxShadow += ', 0 0 40px -10px rgba(243, 115, 33, 0.3)';
    dialog.style.borderTop = '3px solid var(--theme-primary)';
  } else {
    dialog.style.boxShadow += ', 0 0 40px -10px rgba(255, 77, 77, 0.3)';
    dialog.style.borderTop = '3px solid #ff4d4d';
  }

  // Optional SVG Icon for extra flair
  const iconWrap = document.createElement('div');
  iconWrap.style.cssText = 'width: 64px; height: 64px; border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center;';
  if (!isError) {
    iconWrap.style.background = 'linear-gradient(135deg, rgba(243,115,33,0.1) 0%, rgba(255,194,14,0.1) 100%)';
    iconWrap.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--theme-primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else {
    iconWrap.style.background = 'rgba(255,77,77,0.1)';
    iconWrap.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
  }

  const h2 = document.createElement('h2');
  h2.textContent = title;
  h2.style.cssText = 'font-family: "Vastago Grotesk", sans-serif; margin-top: 0; margin-bottom: 15px; font-size: 28px; font-weight: 600;';
  if (!isError) {
    h2.style.background = 'linear-gradient(135deg, var(--theme-primary) 0%, var(--theme-secondary) 100%)';
    h2.style.webkitBackgroundClip = 'text';
    h2.style.webkitTextFillColor = 'transparent';
  } else {
    h2.style.color = '#ff4d4d';
  }

  const p = document.createElement('p');
  p.textContent = message;
  p.style.cssText = 'color: #b3b3b3; line-height: 1.6; margin-bottom: 35px; font-size: 16px; font-weight: 400;';

  const btn = document.createElement('button');
  btn.textContent = 'Close';
  btn.style.cssText = 'width: 100%; padding: 14px 30px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 8px; cursor: pointer; font-weight: bold; transition: all 0.3s ease; font-size: 16px; letter-spacing: 0.5px;';
  
  btn.onmouseover = () => {
    btn.style.transform = 'translateY(-2px)';
    if (!isError) {
      btn.style.background = 'linear-gradient(90deg, var(--theme-primary), var(--theme-secondary))';
      btn.style.borderColor = 'transparent';
      btn.style.boxShadow = '0 8px 20px -5px rgba(243, 115, 33, 0.4)';
    } else {
      btn.style.background = '#ff4d4d';
      btn.style.borderColor = '#ff4d4d';
      btn.style.boxShadow = '0 8px 20px -5px rgba(255, 77, 77, 0.4)';
    }
  };
  btn.onmouseout = () => {
    btn.style.transform = 'translateY(0)';
    btn.style.background = 'rgba(255,255,255,0.03)';
    btn.style.border = '1px solid rgba(255,255,255,0.1)';
    btn.style.boxShadow = 'none';
  };

  btn.onclick = () => {
    overlay.style.opacity = '0';
    dialog.style.transform = 'scale(0.95) translateY(20px)';
    setTimeout(() => overlay.remove(), 400);
  };

  dialog.appendChild(iconWrap);
  dialog.appendChild(h2);
  dialog.appendChild(p);
  dialog.appendChild(btn);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  // Trigger reflow for animation
  void overlay.offsetWidth;
  overlay.style.opacity = '1';
  dialog.style.transform = 'scale(1) translateY(0)';
};

window.submitNewsletterForm = function(e, form) {
  e.preventDefault();
  const emailInput = form.querySelector('input[type=email]');
  const eVal = emailInput.value.trim();
  if (!eVal || !eVal.includes('@')) {
    showThemeDialog('Error', 'Please enter a valid email address.', true);
    return;
  }
  try {
    let list = JSON.parse(localStorage.getItem('vertex_newsletters') || '[]');
    list.push({email: eVal, date: new Date().toLocaleString()});
    localStorage.setItem('vertex_newsletters', JSON.stringify(list));
    showThemeDialog('Success', 'Subscribed successfully!');
    form.reset();
  } catch(err) {
    showThemeDialog('Error', 'Failed to subscribe. Please try again.', true);
  }
};

window.submitContactForm = function(e, form) {
  e.preventDefault();
  const inputs = form.querySelectorAll('.hs-input');
  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const phone = inputs[2].value.trim();
  const msg = inputs[3].value.trim();
  
  if (!name || !email || !msg) {
    showThemeDialog('Error', 'Please fill in all required fields.', true);
    return;
  }
  if (!email.includes('@')) {
    showThemeDialog('Error', 'Please enter a valid email address.', true);
    return;
  }
  
  try {
    let list = JSON.parse(localStorage.getItem('vertex_contacts') || '[]');
    list.push({name, email, phone, msg, date: new Date().toLocaleString()});
    localStorage.setItem('vertex_contacts', JSON.stringify(list));
    showThemeDialog('Success', 'Thank you! Your message has been sent successfully!');
    form.reset();
  } catch(err) {
    showThemeDialog('Error', 'Failed to send message. Please try again.', true);
  }
};
