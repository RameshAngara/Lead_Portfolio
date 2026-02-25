const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const mobileNav = document.getElementById("mobileNav");

openMenu.addEventListener("click", () => {
  mobileNav.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileNav.classList.remove("active");
});

document.querySelectorAll(".mobile-nav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});/* ANIMATED STATS */
const counters = document.querySelectorAll(".stat strong");
let statsStarted = false;

const animateStats = () => {
  if (statsStarted) return;
  statsStarted = true;

  counters.forEach(counter => {
    const target = parseFloat(counter.dataset.count);
    let count = 0;
    const increment = target / 80;

    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText =
          target % 1 === 0 ? Math.floor(count) : count.toFixed(1);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
};

window.addEventListener("scroll", () => {
  const statsSection = document.querySelector(".stats");
  const sectionTop = statsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100) {
    animateStats();
  }

});
// FORM SUBMIT WITH MODAL
const form = document.getElementById("contactForm");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      successModal.classList.add("active");
      form.reset();
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(() => {
    alert("Network error. Please try again.");
  });
});

closeModal.addEventListener("click", () => {
  successModal.classList.remove("active");
  window.location.reload();
});

successModal.addEventListener("click", (e) => {
  if (e.target === successModal) {
    window.location.reload();
  }
});

