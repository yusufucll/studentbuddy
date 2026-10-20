/**
 * Study Tips Module (User Story 1)
 * Handles official tips dataset, category filtering logic, and dynamic DOM rendering.
 */

// Official study tips dataset for StudentBuddy (UCLL Graduaat Programmeren)
const studyTipsData = [
  {
    id: 1,
    title: "De Pomodoro-techniek",
    category: "planning",
    categoryLabel: "Planning & Tijd",
    timeEstimate: "25 min focus / 5 min rust",
    icon: "⏱️",
    description: "Werk gedurende 25 minuten volledig geconcentreerd aan een taak en neem daarna een pauze van 5 minuten. Na vier keer neem je een langere pauze van 20-30 minuten.",
    actionTag: "Tijdbeheer"
  },
  {
    id: 2,
    title: "Actief herhalen",
    category: "focus",
    categoryLabel: "Focus & Geheugen",
    timeEstimate: "Tijdens het studeren",
    icon: "🧠",
    description: "Sluit je boeken en probeer de leerstof uit je hoofd te vertellen of op te schrijven alsof je het aan iemand anders uitlegt, in plaats van passief te herlezen.",
    actionTag: "Active Recall"
  },
  {
    id: 3,
    title: "De Feynman-techniek",
    category: "focus",
    categoryLabel: "Focus & Geheugen",
    timeEstimate: "15-20 min",
    icon: "🗣️",
    description: "Leg een complex onderwerp uit in simpele taal, alsof je het aan een kind uitlegt. Waar je vastloopt of moeilijke vaktermen gebruikt, begrijp je de stof kennelijk zelf nog niet volledig.",
    actionTag: "Diepgaand inzicht"
  },
  {
    id: 4,
    title: "Oefen meer dan je herleest",
    category: "exams",
    categoryLabel: "Oefenen & Examens",
    timeEstimate: "Praktijkoefening",
    icon: "💻",
    description: "Zeker voor programmeren, wiskunde en andere praktische vakken is oefenen essentieel. Probeer zelf code te schrijven, oefeningen op te lossen en fouten te verbeteren zonder meteen naar de oplossing te kijken.",
    actionTag: "Essentieel voor IT"
  },
  {
    id: 5,
    title: "Herhaal gespreid",
    category: "exams",
    categoryLabel: "Oefenen & Examens",
    timeEstimate: "Meerdaagse planning",
    icon: "📅",
    description: "Herhaal wat je geleerd hebt na één dag, na enkele dagen en na een week. Zo bouw je je kennis geleidelijk op in plaats van alles op het laatste moment te proberen onthouden.",
    actionTag: "Spaced Repetition"
  },
  {
    id: 6,
    title: "Kleuren hebben een doel",
    category: "focus",
    categoryLabel: "Focus & Geheugen",
    timeEstimate: "Tijdens noteren",
    icon: "🎨",
    description: "Gebruik bijvoorbeeld één kleur voor definities, één voor belangrijke begrippen en één voor voorbeelden. Maak niet je hele cursus kleurrijk, want dan valt niets nog op.",
    actionTag: "Slim markeren"
  },
  {
    id: 7,
    title: "Actieve samenvattingen",
    category: "focus",
    categoryLabel: "Focus & Geheugen",
    timeEstimate: "Einde leersessie",
    icon: "📝",
    description: "Kopieer niet gewoon je cursus. Noteer de kern van elk onderdeel in korte zinnen. Zo ben je de leerstof meteen actief aan het verwerken in plaats van over te typen.",
    actionTag: "Verwerking"
  },
  {
    id: 8,
    title: "Concrete doelen stellen",
    category: "planning",
    categoryLabel: "Planning & Tijd",
    timeEstimate: "Vooraf bepalen",
    icon: "🎯",
    description: "Zeg niet: 'Ik ga twee uur studeren.' Zeg liever: 'Ik kan na deze sessie de vijf belangrijkste begrippen uitleggen.' Zo weet je exact wanneer je doel bereikt is.",
    actionTag: "SMART doelen"
  },
  {
    id: 9,
    title: "Leren van fouten",
    category: "exams",
    categoryLabel: "Oefenen & Examens",
    timeEstimate: "Foutenevaluatie",
    icon: "🔍",
    description: "Noteer oefeningen die je fout had en analyseer waarom je fout zat. Probeer ze een paar dagen later opnieuw op te lossen zonder naar de uitwerking te kijken.",
    actionTag: "Groeimindset"
  }
];

/**
 * Creates HTML markup for an individual tip card.
 * @param {Object} tip - Single study tip object.
 * @returns {string} HTML string.
 */
function createTipCardMarkup(tip) {
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
        <span>Tip #${tip.id}</span>
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
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

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
