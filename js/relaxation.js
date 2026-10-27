/**
 * Relaxation Module (User Story 2)
 * Handles interactive 4-7-8 breathing timer, 20-20-20 eye reset, and desk stretch views.
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const modal = document.getElementById("exercise-modal");
  const modalTitle = document.getElementById("modal-title");
  const btnModalClose = document.getElementById("btn-modal-close");

  const btnOpenBreathing = document.getElementById("btn-open-breathing");
  const btnOpenEyes = document.getElementById("btn-open-eyes");
  const btnOpenStretch = document.getElementById("btn-open-stretch");

  const interactiveView = document.getElementById("exercise-interactive-view");
  const stretchView = document.getElementById("exercise-stretch-view");

  const breathingCircle = document.getElementById("breathing-circle");
  const circlePhaseLabel = document.getElementById("circle-phase-label");
  const circleCountdown = document.getElementById("circle-countdown");
  const exerciseInstruction = document.getElementById("exercise-instruction");
  const cycleTracker = document.getElementById("exercise-cycle-tracker");
  const currentCycleSpan = document.getElementById("current-cycle");

  const btnStart = document.getElementById("btn-exercise-start");
  const btnPause = document.getElementById("btn-exercise-pause");
  const btnReset = document.getElementById("btn-exercise-reset");
  const btnStretchClose = document.getElementById("btn-stretch-close");

  // Exercise State Variables
  let currentMode = "breathing"; // 'breathing' or 'eyes'
  let timerInterval = null;
  let isRunning = false;
  let secondsRemaining = 4;
  let cycleCount = 1;
  const maxCycles = 4;

  // 4-7-8 Breathing Phases Definition
  const breathingPhases = [
    { name: "Inademen", duration: 4, instruction: "Adem rustig en diep in door je neus.", className: "inhale" },
    { name: "Vasthouden", duration: 7, instruction: "Houd je adem ontspannen vast.", className: "hold" },
    { name: "Uitademen", duration: 8, instruction: "Blaas alle lucht langzaam uit door je mond.", className: "exhale" }
  ];
  let phaseIndex = 0;

  /**
   * Opens the modal in the selected mode.
   * @param {string} mode - 'breathing', 'eyes', or 'stretch'
   */
  function openModal(mode) {
    currentMode = mode;
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");

    // Reset timer state when opening
    stopTimer();

    if (mode === "breathing") {
      modalTitle.textContent = "4-7-8 Ademhalingsoefening";
      interactiveView.style.display = "block";
      stretchView.style.display = "none";
      cycleTracker.style.display = "block";
      resetBreathingState();
    } else if (mode === "eyes") {
      modalTitle.textContent = "20-20-20 Oogrust";
      interactiveView.style.display = "block";
      stretchView.style.display = "none";
      cycleTracker.style.display = "none";
      resetEyesState();
    } else if (mode === "stretch") {
      modalTitle.textContent = "Snelle Bureaustretch";
      interactiveView.style.display = "none";
      stretchView.style.display = "block";
    }
  }

  /**
   * Closes the modal and stops any active timer.
   */
  function closeModal() {
    stopTimer();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
  }

  /**
   * Resets the 4-7-8 breathing exercise state.
   */
  function resetBreathingState() {
    stopTimer();
    phaseIndex = 0;
    cycleCount = 1;
    secondsRemaining = breathingPhases[0].duration;

    currentCycleSpan.textContent = "1";
    circlePhaseLabel.textContent = "Klaar";
    circleCountdown.textContent = `${secondsRemaining}s`;
    exerciseInstruction.textContent = "Klik op 'Start' om te beginnen.";

    breathingCircle.className = "breathing-circle";
    btnStart.style.display = "inline-flex";
    btnPause.style.display = "none";
    btnStart.textContent = "Start";
  }

  /**
   * Resets the 20-20-20 eye reset state.
   */
  function resetEyesState() {
    stopTimer();
    secondsRemaining = 20;

    circlePhaseLabel.textContent = "Oogrust";
    circleCountdown.textContent = `${secondsRemaining}s`;
    exerciseInstruction.textContent = "Kijk naar een punt op minstens 6 meter afstand en ontspan je ogen.";

    breathingCircle.className = "breathing-circle hold";
    btnStart.style.display = "inline-flex";
    btnPause.style.display = "none";
    btnStart.textContent = "Start";
  }

  /**
   * Applies visual styling and texts for the current breathing phase.
   */
  function applyBreathingPhase() {
    const currentPhase = breathingPhases[phaseIndex];
    secondsRemaining = currentPhase.duration;

    circlePhaseLabel.textContent = currentPhase.name;
    circleCountdown.textContent = `${secondsRemaining}s`;
    exerciseInstruction.textContent = currentPhase.instruction;

    // Apply circle animation class
    breathingCircle.className = `breathing-circle ${currentPhase.className}`;
  }

  /**
   * Ticks down the timer by 1 second.
   */
  function tick() {
    secondsRemaining--;
    circleCountdown.textContent = `${secondsRemaining}s`;

    if (secondsRemaining <= 0) {
      if (currentMode === "breathing") {
        advanceBreathingPhase();
      } else if (currentMode === "eyes") {
        completeEyesExercise();
      }
    }
  }

  /**
   * Advances to the next phase in the 4-7-8 breathing cycle.
   */
  function advanceBreathingPhase() {
    // Play chime sound at the end of each phase (3 times per cycle)
    playNotificationSound();

    phaseIndex++;

    // Completed one full 4-7-8 cycle
    if (phaseIndex >= breathingPhases.length) {
      phaseIndex = 0;
      cycleCount++;

      // Check if max cycles reached
      if (cycleCount > maxCycles) {
        completeBreathingExercise();
        return;
      }
      currentCycleSpan.textContent = cycleCount.toString();
    }

    applyBreathingPhase();
  }

  /**
   * Plays a gentle audio chime using the Web Audio API without needing external audio files.
   */
  function playNotificationSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 pleasant chime
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch (error) {
      // AudioContext fallback handled silently
    }
  }

  /**
   * Handles completion of all breathing cycles.
   */
  function completeBreathingExercise() {
    stopTimer();
    circlePhaseLabel.textContent = "Voltooid!";
    circleCountdown.textContent = "✓";
    exerciseInstruction.textContent = "Goed gedaan! Je ademhaling en zenuwstelsel zijn nu weer rustig.";
    breathingCircle.className = "breathing-circle";
    btnStart.style.display = "inline-flex";
    btnStart.textContent = "Opnieuw";
    btnPause.style.display = "none";
  }

  /**
   * Handles completion of the eye reset timer.
   */
  function completeEyesExercise() {
    stopTimer();
    playNotificationSound();
    circlePhaseLabel.textContent = "Klaar!";
    circleCountdown.textContent = "✓";
    exerciseInstruction.textContent = "Je ogen hebben rust gehad. Knipper een paar keer en ga weer gefocust aan de slag.";
    breathingCircle.className = "breathing-circle";
    btnStart.style.display = "inline-flex";
    btnStart.textContent = "Opnieuw";
    btnPause.style.display = "none";
  }

  /**
   * Starts or resumes the active exercise timer.
   */
  function startTimer() {
    if (isRunning) return;

    isRunning = true;
    btnStart.style.display = "none";
    btnPause.style.display = "inline-flex";

    if (currentMode === "breathing") {
      // If just starting, apply current phase
      if (breathingCircle.className === "breathing-circle") {
        applyBreathingPhase();
      }
    }

    timerInterval = setInterval(tick, 1000);
  }

  /**
   * Pauses the timer without resetting progress.
   */
  function pauseTimer() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(timerInterval);
    btnPause.style.display = "none";
    btnStart.style.display = "inline-flex";
    btnStart.textContent = "Hervat";
    exerciseInstruction.textContent = "Oefening gepauzeerd.";
  }

  /**
   * Stops the active interval timer.
   */
  function stopTimer() {
    isRunning = false;
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Event Listeners for Activity Buttons
  btnOpenBreathing.addEventListener("click", () => openModal("breathing"));
  btnOpenEyes.addEventListener("click", () => openModal("eyes"));
  btnOpenStretch.addEventListener("click", () => openModal("stretch"));

  // Event Listeners for Modal Controls
  btnModalClose.addEventListener("click", closeModal);
  btnStretchClose.addEventListener("click", closeModal);

  // Close modal when clicking on backdrop
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Timer Control Buttons
  btnStart.addEventListener("click", startTimer);
  btnPause.addEventListener("click", pauseTimer);
  btnReset.addEventListener("click", () => {
    if (currentMode === "breathing") {
      resetBreathingState();
    } else if (currentMode === "eyes") {
      resetEyesState();
    }
  });
});
