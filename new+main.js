document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('.contact form');

  // Select inputs by their order in the form
  const inputs = form.querySelectorAll('input');
  const nameInput = inputs[0];      // Name
  const emailInput = inputs[1];     // Email
  const numberInput = inputs[2];    // Number (optional)
  const subjectInput = inputs[3];   // Subject (optional)
  const messageInput = form.querySelector('textarea');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Remove previous error messages
    form.querySelectorAll('.error').forEach(err => err.remove());

    let valid = true;

    // Name validation
    if(nameInput.value.trim() === '') {
      showError(nameInput, 'Name cannot be empty');
      valid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailInput.value.trim() === '') {
      showError(emailInput, 'Email cannot be empty');
      valid = false;
    } else if(!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, 'Enter a valid email');
      valid = false;
    }

    // Message validation
    if(messageInput.value.trim().length < 10) {
      showError(messageInput, 'Message must be at least 10 characters');
      valid = false;
    }

    if(valid) {
      // Prepare subject
      const subject = subjectInput.value.trim()
                      ? `Feedback from ${nameInput.value.trim()} - ${subjectInput.value.trim()}`
                      : `Feedback from ${nameInput.value.trim()}`;

      // Prepare mailto body
      const body =
        `Name: ${nameInput.value.trim()}\n` +
        `Email: ${emailInput.value.trim()}\n` +
        `Number: ${numberInput.value.trim()}\n` +
        `Message:\n${messageInput.value.trim()}`;

      // Open email client
      const mailtoLink = `mailto:nournourhyk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      // Optionally show success message
      // alert('Opening your email client...');
      form.reset();
    }
  });

  // Function to show inline error
  function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
  }
});

