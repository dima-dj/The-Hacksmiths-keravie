window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) {
    document.getElementById("email").value = savedEmail;
    document.getElementById("remember").checked = true;
  }
});

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("remember").checked;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Adresse email invalide !");
    return;
  }

  if (email === "salon@example.com" && password === "123456") {
    if (remember) {
      localStorage.setItem("savedEmail", email);
    } else {
      localStorage.removeItem("savedEmail");
    }

    alert("Connexion réussie !");
    window.location.href = "dashboard-salon.html";
  } else {
    alert("Email ou mot de passe incorrect.");
  }
});

//Email: salon@example.com
//Password: 123456