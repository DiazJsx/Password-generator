const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const passwordDisplay = document.getElementById('passwordDisplay');
const uppercaseToggle = document.getElementById('uppercase');
const lowercaseToggle = document.getElementById('lowercase');
const numbersToggle = document.getElementById('numbers');
const symbolsToggle = document.getElementById('symbols');
const customWordsInput = document.getElementById('customWords');
const generateBtn = document.getElementById('generateBtn');
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
    generatePassword();
});

[uppercaseToggle, lowercaseToggle, numbersToggle, symbolsToggle].forEach(toggle => {
    toggle.addEventListener('change', generatePassword);
});

customWordsInput.addEventListener('input', generatePassword);

generateBtn.addEventListener('click', generatePassword);

function generatePassword() {
    const length = parseInt(lengthSlider.value);
    const useUppercase = uppercaseToggle.checked;
    const useLowercase = lowercaseToggle.checked;
    const useNumbers = numbersToggle.checked;
    const useSymbols = symbolsToggle.checked;
    const customWords = customWordsInput.value.split(',').map(word => word.trim()).filter(word => word);

    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && customWords.length === 0) {
        alert('Por favor seleccione al menos un tipo de carácter o ingrese palabras personalizadas');
        return;
    }

    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (useUppercase) chars += uppercase;
    if (useLowercase) chars += lowercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    let password = '';

    if (customWords.length > 0) {
        const customWord = customWords[Math.floor(Math.random() * customWords.length)];
        password += customWord;
    }

    while (password.length < length) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    let finalPassword = '';
    if (useUppercase) finalPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (useLowercase) finalPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (useNumbers) finalPassword += numbers[Math.floor(Math.random() * numbers.length)];
    if (useSymbols) finalPassword += symbols[Math.floor(Math.random() * symbols.length)];

    finalPassword += password.slice(0, length - finalPassword.length);

    finalPassword = finalPassword.split('').sort(() => Math.random() - 0.5).join('');

    passwordDisplay.textContent = finalPassword;
}

function toggleTheme() {
    htmlElement.classList.toggle('dark-theme');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = htmlElement.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
}

themeToggle.addEventListener('click', toggleTheme);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleTheme();
}

generatePassword();