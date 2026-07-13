(function () {
  var textNode = document.querySelector("[data-typewriter]");
  if (!textNode) {
    return;
  }

  var emailLink = textNode.closest(".email");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var phrases = [
    "Say hello.",
    "Let's talk internet things.",
    "Got any music suggestions?",
    "Send me a poem.",
    "Write me an email.",
    "What are you thankful for today?",
    "hi@patjen.de",
    "Share your favourite video game.",
    "Tell me what you're doing.",
    "👋",
    "Need an unqualified second opinion on something?",
    "Sag hallo.",
    "Trade book recommendations?",
    "\"Watcha doing?\" - Isabella",
    "Suggest a cool feature for this website.",
    "If you could be anywhere right now, where would you be?",
    "Ce faci?",
    "AMA",
    "... unless you want to know if this is the Krusty Krab, in which case...",
    "\"No this is Patrick.\" - Patrick",
    "Still unsure what to say?",
  ];

  if (prefersReducedMotion) {
    if (emailLink) {
      emailLink.classList.add("is-typing");
    }
    textNode.textContent = phrases[0];
    return;
  }

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var holdDelay = 5000;
  var betweenDelay = 480;
  var startDelay = 2000;

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function typeDelayForChar(char) {
    var delay = randomInt(48, 112);
    if (char === "." || char === "," || char === "!" || char === "?") {
      delay += randomInt(110, 210);
    }
    return delay;
  }

  function deleteDelayForChar(char) {
    var delay = randomInt(28, 62);
    if (char === "." || char === "," || char === "!" || char === "?") {
      delay += randomInt(40, 90);
    }
    return delay;
  }

  function tick() {
    var phrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex += 1;
      textNode.textContent = phrase.slice(0, charIndex);

      if (charIndex === phrase.length) {
        isDeleting = true;
        window.setTimeout(tick, holdDelay + randomInt(120, 520));
        return;
      }

      window.setTimeout(tick, typeDelayForChar(phrase.charAt(charIndex - 1)));
      return;
    }

    charIndex -= 1;
    var removedChar = phrase.charAt(charIndex);
    textNode.textContent = phrase.slice(0, Math.max(charIndex, 0));

    if (charIndex <= 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(tick, betweenDelay + randomInt(60, 260));
      return;
    }

    window.setTimeout(tick, deleteDelayForChar(removedChar));
  }

  textNode.textContent = "";

  window.setTimeout(function () {
    if (emailLink) {
      emailLink.classList.add("is-typing");
    }
    tick();
  }, startDelay + randomInt(0, 180));
})();
