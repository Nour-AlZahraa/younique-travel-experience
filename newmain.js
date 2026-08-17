const form = document.querySelector('.contact form');

// Select inputs based on order in HTML since they have no names
const inputs = form.querySelectorAll('input');
const nameInput = inputs[0];      // Name
const emailInput = inputs[1];     // Email
const numberInput = inputs[2];    // Number (optional)
const subjectInput = inputs[3];   // Subject (optional)
const messageInput = form.querySelector('textarea');

// Choose submission mode: 'local' or 'email'
const submitMode = 'email'; // or 'local'

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Remove previous errors
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
    if(submitMode === 'local') {
      const feedback = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        number: numberInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
        date: new Date().toLocaleString()
      };

      const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
      feedbacks.push(feedback);
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

      alert('Feedback saved locally!');
    } else if(submitMode === 'email') {
      const subject = `Feedback from ${nameInput.value.trim()} - ${subjectInput.value.trim()}`;
      const body =
        `Name: ${nameInput.value.trim()}\n` +
        `Email: ${emailInput.value.trim()}\n` +
        `Number: ${numberInput.value.trim()}\n` +
        `Message:\n${messageInput.value.trim()}`;

      const mailtoLink = `mailto:nournourhyk@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.open(mailtoLink, '_blank');
      alert('Feedback submitted! Check your email app.');
    }

    form.reset();
  }
});

function showError(input, message) {
  const error = document.createElement('div');
  error.className = 'error';
  error.style.color = 'red';
  error.textContent = message;
  input.parentNode.insertBefore(error, input.nextSibling);
}
