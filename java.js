// DOM Elements
    const form = document.getElementById('regForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const bio = document.getElementById('bio');
    const submitBtn = document.getElementById('submitBtn');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const bioError = document.getElementById('bioError');
    const charCounter = document.getElementById('charCounter');
    
    const formPanel = document.getElementById('formPanel');
    const successPanel = document.getElementById('successPanel');

    // Validation State Tracking Object
    const fieldsState = {
      username: false,
      email: false,
      password: false,
      bio: false
    };

    // Helper: UI Update Strategy via Tailwind Class Toggling
    function toggleError(inputEl, errorEl, isValid, message) {
      if (isValid) {
        // Clear Error Tailwind Styles
        inputEl.classList.remove('border-red-600', 'focus:border-red-600', 'focus:ring-red-600/15');
        errorEl.classList.remove('visible', 'opacity-100');
        errorEl.classList.add('invisible', 'opacity-0');
      } else {
        // Inject Error Tailwind Styles
        if (message) errorEl.textContent = message;
        inputEl.classList.add('border-red-600', 'focus:border-red-600', 'focus:ring-red-600/15');
        errorEl.classList.remove('invisible', 'opacity-0');
        errorEl.classList.add('visible', 'opacity-100');
      }
    }

    // Individual Validation Logic Modules
    function validateName() {
      const val = username.value.trim();
      const isValid = val.length > 0;
      toggleError(username, nameError, isValid, "Name cannot be empty.");
      fieldsState.username = isValid;
      checkFormValidity();
    }

    // Email Pattern Check Module
    function validateEmail() {
      const val = email.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let isValid = true;
      let errorMsg = "";

      if (val.length === 0) {
        isValid = false;
        errorMsg = "Email address is required.";
      } else if (!emailRegex.test(val)) {
        isValid = false;
        errorMsg = "Please enter a valid email address.";
      }

      toggleError(email, emailError, isValid, errorMsg);
      fieldsState.email = isValid;
      checkFormValidity();
    }

    // Password Floor Check Module
    function validatePassword() {
      const val = password.value;
      let isValid = true;
      let errorMsg = "";

      if (val.length === 0) {
        isValid = false;
        errorMsg = "Password is required.";
      } else if (val.length < 6) {
        isValid = false;
        errorMsg = "Password must be at least 6 characters.";
      }

      toggleError(password, passwordError, isValid, errorMsg);
      fieldsState.password = isValid;
      checkFormValidity();
    }

    // Bio Text Area Module
    function validateBio() {
      const val = bio.value.trim();
      const isValid = val.length > 0;
      
      toggleError(bio, bioError, isValid, "Bio is required.");
      fieldsState.bio = isValid;
      checkFormValidity();
    }

    // Live Character Counter Tracker
    function handleBioCounter() {
      const currentLength = bio.value.length;
      charCounter.textContent = `${currentLength} / 200 characters`;
    }

    // Global Form Button Engine Check
    function checkFormValidity() {
      const isFormValid = Object.values(fieldsState).every(state => state === true);
      submitBtn.disabled = !isFormValid;
    }

    // Real-Time Event Observers
    username.addEventListener('input', validateName);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', validatePassword);
    
    bio.addEventListener('input', () => {
      handleBioCounter();
      validateBio();
    });

    // Form Interception Rules
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Halt standard browser refresh execution
      
      // Secondary absolute safety submission gate
      if (Object.values(fieldsState).every(state => state === true)) {
        formPanel.classList.add('hidden');
        successPanel.classList.remove('hidden');
      }
    });