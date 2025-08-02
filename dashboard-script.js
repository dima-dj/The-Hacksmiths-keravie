document.addEventListener('DOMContentLoaded', () => {
  const problemToggle = document.getElementById('problemToggle');
  const problemForm = document.getElementById('problemForm');
  const reportForm = document.getElementById('reportForm');
  const kitButton = document.querySelector('.kit-button');
  const disconnectBtn = document.querySelector('.disconnect-btn');

  // Problem form toggle
  problemToggle.addEventListener('click', () => {
    problemForm.classList.toggle('active');
  });

  // Problem form submission
  reportForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const problemType = document.getElementById('problemType').value;
    const description = document.getElementById('description').value;

    if (problemType && description) {
      alert(`Votre problème a été signalé avec succès!\n\nType: ${document.querySelector('#problemType option:checked').textContent}\nDescription: ${description}`);
      reportForm.reset();
      problemForm.classList.remove('active');
    }
  });

  // Kit button click handler
  kitButton.addEventListener('click', () => {
    if (!kitButton.classList.contains('notified')) {
      // Change button appearance and text
      kitButton.classList.add('notified');
      kitButton.textContent = 'Signalé ✓';
      
      alert('Kit plein signalé! Nous programmerons la collecte dans les 48 heures.');
      
      // Optional: Reset after some time (uncomment if desired)
      // setTimeout(() => {
      //   kitButton.classList.remove('notified');
      //   kitButton.textContent = 'kit plein';
      // }, 10000); // Reset after 10 seconds
    }
  });

  // Disconnect button
  disconnectBtn.addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      alert('Déconnexion...');
    }
  });
});