/**
 * Study Tips Module (User Story 1)
 * Handles tips dataset, filtering logic, and dynamic DOM rendering.
 */

// Dataset containing curated study tips for students
const studyTipsData = [
  {
    id: 1,
    title: "De Pomodoro-techniek",
    category: "focus",
    categoryLabel: "Focus & Concentratie",
    timeEstimate: "25 min focus",
    icon: "⏱️",
    description: "Studeer 25 minuten met volledige concentratie en neem daarna direct 5 minuten rust. Na 4 sessies verdien je een langere pauze van 20-30 minuten.",
    actionTag: "Direct toepasbaar"
  },
  {
    id: 2,
    title: "Active Recall (Actief Ophalen)",
    category: "exams",
    categoryLabel: "Examens & Geheugen",
    timeEstimate: "Tijdens het leren",
    icon: "🧠",
    description: "Sluit je boek en schrijf uit je hoofd op wat je net hebt gelezen. Jezelf testen versterkt neurale verbindingen 3x effectiever dan herlezen.",
    actionTag: "Bewezen leermethode"
  },
  {
    id: 3,
    title: "De Twee-Minuten Regel",
    category: "planning",
    categoryLabel: "Planning & Tijd",
    timeEstimate: "< 2 min",
    icon: "⚡",
    description: "Kost een taak minder dan twee minuten (zoals een e-mail beantwoorden of een To-Do opschrijven)? Doe het dan onmiddellijk in plaats van uitstellen.",
    actionTag: "Productiviteitsbooster"
  },
  {
    id: 4,
    title: "Gespreide Herhaling (Spaced Repetition)",
    category: "exams",
    categoryLabel: "Examens & Geheugen",
    timeEstimate: "Over meerdere dagen",
    icon: "📅",
    description: "Herhaal leerstof met toenemende tussenpozen: na 1 dag, na 3 dagen en na 1 week. Dit voorkomt dat je vlak voor het examen moet 'crammen'.",
    actionTag: "Voor lange termijn"
  },
  {
    id: 5,
    title: "No-Phone Zone (Digitaal Minimalisme)",
    category: "focus",
    categoryLabel: "Focus & Concentratie",
    timeEstimate: "Voor elke sessie",
    icon: "🔕",
    description: "Leg je smartphone in een andere kamer of zet hem in vliegtuigmodus. Slechts het zien van je scherm vermindert al cognitieve hersencapaciteit.",
    actionTag: "Minder afleiding"
  },
  {
    id: 6,
    title: "De Eisenhower Prioriteitenmatrix",
    category: "planning",
    categoryLabel: "Planning & Tijd",
    timeEstimate: "Ochtendroutine",
    icon: "🎯",
    description: "Verdeel je taken in: Dringend & Belangrijk (eerst doen), Belangrijk maar niet dringend (inplannen), en Niet belangrijk (schrappen of delegeren).",
    actionTag: "Overzicht & Rust"
  },
  {
    id: 7,
    title: "De Feynman-techniek",
    category: "exams",
    categoryLabel: "Examens & Geheugen",
    timeEstimate: "15-20 min",
    icon: "🗣️",
    description: "Leg een moeilijk concept uit in eenvoudige woorden alsof je het uitlegt aan een 10-jarige. Waar je hapert, zit het gat in je eigen begrip.",
    actionTag: "Diepgaand inzicht"
  },
  {
    id: 8,
    title: "De 'Eat That Frog' Methode",
    category: "planning",
    categoryLabel: "Planning & Tijd",
    timeEstimate: "Eerste ochtendtaak",
    icon: "🐸",
    description: "Begin je studiedag altijd met de moeilijkste of meest tegenstaande taak. Heb je die af, dan voelt de rest van de dag licht en ontspannen.",
    actionTag: "Tegen uitstelgedrag"
  }
];

/**
 * Creates HTML markup for an individual tip card.
 * @param {Object} tip - Single study tip object.
 * @returns {string} HTML string.
 */
function createTipCardMarkup(tip) {
  // Determine badge styling based on category
  let badgeClass = "badge-planning";
  if (tip.category === "focus") {
    badgeClass = "badge-focus";
  } else if (tip.category === "exams") {
    badgeClass = "badge-exams";
  }

  return `
    <article class="tip-card" data-category="${tip.category}">
      <div>
        <div class="tip-header">
          <span class="tip-badge ${badgeClass}">${tip.categoryLabel}</span>
          <span class="tip-duration">${tip.timeEstimate}</span>
        </div>
        <h3 class="tip-title">
          <span>${tip.icon}</span>
          <span>${tip.title}</span>
        </h3>
        <p class="tip-description">${tip.description}</p>
      </div>
      <div class="tip-footer">
        <span class="tip-action-tag">${tip.actionTag}</span>
        <span>StudentBuddy Tip #${tip.id}</span>
      </div>
    </article>
  `;
}

/**
 * Renders the filtered list of study tips into the container.
 * @param {Array} tips - Array of tip objects to render.
 */
function renderStudyTips(tips) {
  const container = document.getElementById("tips-grid");
  if (!container) return;

  if (tips.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Geen studietips gevonden in deze categorie.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = tips.map(createTipCardMarkup).join("");
}

/**
 * Initializes filter button event listeners.
 */
function initTipsFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active state in UI
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter data
      const selectedCategory = button.getAttribute("data-filter");
      if (selectedCategory === "all") {
        renderStudyTips(studyTipsData);
      } else {
        const filtered = studyTipsData.filter((tip) => tip.category === selectedCategory);
        renderStudyTips(filtered);
      }
    });
  });
}

// Initial render when script loads
document.addEventListener("DOMContentLoaded", () => {
  renderStudyTips(studyTipsData);
  initTipsFilter();
});
