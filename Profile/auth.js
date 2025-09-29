// Helper function to get user data from localStorage
function getUserData() {
  return JSON.parse(localStorage.getItem('userData')) || {};
}

// Handle Sign-Up Form submission
document.getElementById('signup-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Save user data to localStorage
  localStorage.setItem('userData', JSON.stringify({ username, email, password }));

  alert('Account created successfully!');
  window.location.href = 'login.html'; // Redirect to login
});

// Handle Log-In Form submission
document.getElementById('login-form')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const userData = getUserData();

  if (userData.email === email && userData.password === password) {
    alert('Login successful!');
    window.location.href = '../profile.html'; // Redirect to profile page
  } else {
    alert('Invalid credentials!');
  }
});
