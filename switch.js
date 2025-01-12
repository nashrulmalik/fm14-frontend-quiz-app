function toggleDarkMode() {
    const isChecked = document.getElementById('darkModeSwitch').checked;
    document.body.classList.toggle('dark', isChecked);  // Toggle based on checkbox

    // Save the user's preference
    localStorage.setItem('darkMode', isChecked ? 'enabled' : 'disabled');
}

// Load preference on page load and set the checkbox accordingly
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode');
    const checkbox = document.getElementById('darkModeSwitch');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark');
        checkbox.checked = true; // Set the checkbox to checked
    } else {
      checkbox.checked = false; // Ensure it's unchecked otherwise
    }
});