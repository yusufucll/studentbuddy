/**
 * Application Entry & Navigation Controller
 * Manages tab switching between Studietips and Relaxation sections.
 */

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const tipsSection = document.getElementById("tips-section");
  const relaxationSection = document.getElementById("relaxation-section");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // Update active nav link styling
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      const targetTab = link.getAttribute("data-tab");

      // Switch active section visibility
      if (targetTab === "tips") {
        tipsSection.style.display = "block";
        relaxationSection.style.display = "none";
      } else if (targetTab === "relaxation") {
        tipsSection.style.display = "none";
        relaxationSection.style.display = "block";
      }
    });
  });
});
