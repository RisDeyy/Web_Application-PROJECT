function handleEditClick(event) {
    const field = event.target.dataset.field;
    const textElement = event.target.parentElement.nextElementSibling;
  
    // Prompt the user to enter the new value for the field
    const newValue = prompt(`Enter new ${field}:`, textElement.textContent.trim());
  
    if (newValue !== null) {
      // Update the text content with the new value
      textElement.textContent = newValue;
    }
  }
  
  // Add event listeners to all the edit icons
  const editIcons = document.querySelectorAll('.edit-icon');
  editIcons.forEach(icon => {
    icon.addEventListener('click', handleEditClick);
  });