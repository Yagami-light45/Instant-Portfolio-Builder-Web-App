//Reload 
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

//Hamburger logic
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});
