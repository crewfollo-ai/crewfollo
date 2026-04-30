(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navMenu.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        navMenu.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  var questions = document.querySelectorAll(".faq-question");
  questions.forEach(function (question) {
    question.addEventListener("click", function () {
      var isExpanded = question.getAttribute("aria-expanded") === "true";
      var answer = question.parentElement.querySelector(".faq-answer");

      question.setAttribute("aria-expanded", String(!isExpanded));
      if (answer) {
        answer.hidden = isExpanded;
      }
    });
  });

  var form = document.querySelector("#pilot-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(form);
      var leadSources = formData.getAll("lead_sources");
      var subject = "CrewFollo AI early pilot application";
      var body = [
        "Name: " + valueFor(formData, "name"),
        "Business name: " + valueFor(formData, "business_name"),
        "Trade: " + valueFor(formData, "trade"),
        "Service area: " + valueFor(formData, "service_area"),
        "Phone or email: " + valueFor(formData, "contact"),
        "Lead sources: " + (leadSources.length ? leadSources.join(", ") : "Not provided"),
        "",
        "Biggest lead follow-up problem:",
        valueFor(formData, "follow_up_problem") || "Not provided"
      ].join("\n");

      window.location.href = "mailto:crewfolloai@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(contactForm);
      var subject = "CrewFollo AI contact request";
      var body = [
        "Name: " + valueFor(formData, "name"),
        "Email: " + valueFor(formData, "email"),
        "Company: " + (valueFor(formData, "company") || "Not provided"),
        "",
        "Message:",
        valueFor(formData, "message")
      ].join("\n");

      window.location.href = "mailto:crewfolloai@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  function valueFor(formData, key) {
    return String(formData.get(key) || "").trim();
  }
})();
