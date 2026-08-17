  const form = document.querySelector('.contact form');
  const nameInput = form.querySelector('input[type="text"]');
  const emailInput = form.querySelector('input[type="email"]');
  const messageInput = form.querySelector('textarea');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Remove old errors
    const oldErrors = form.querySelectorAll('.error');
    oldErrors.forEach(err => err.remove());

    let valid = true;

    // Name validation
    if (nameInput.value.trim() === '') {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.innerText = 'Name cannot be empty';
      nameInput.parentNode.insertBefore(error, nameInput.nextSibling);
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.innerText = 'Email cannot be empty';
      emailInput.parentNode.insertBefore(error, emailInput.nextSibling);
      valid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.innerText = 'Enter a valid email';
      emailInput.parentNode.insertBefore(error, emailInput.nextSibling);
      valid = false;
    }

    // Message validation
    if (messageInput.value.trim().length < 10) {
      const error = document.createElement('div');
      error.className = 'error';
      error.style.color = 'red';
      error.innerText = 'Message must be at least 10 characters';
      messageInput.parentNode.insertBefore(error, messageInput.nextSibling);
      valid = false;
    }

    if (valid) {
      // Option 2: Open mailto (uncomment to use this instead)
      // window.location.href = `mailto:youremail@example.com?subject=Feedback from ${encodeURIComponent(nameInput.value)}&body=${encodeURIComponent(messageInput.value)}`;

      alert('Feedback submitted successfully!');
      form.reset();
    }
  });

