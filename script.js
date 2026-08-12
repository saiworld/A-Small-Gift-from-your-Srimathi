document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     1. OPEN BIRTHDAY CARD + START MUSIC
     ===================================================== */

  const opening = document.getElementById("opening");
  const envelope = document.getElementById("envelope");

  // Your actual birthday song
  const music = new Audio("Aadhya.mp3");
  music.loop = true;
  music.volume = 0.8;

  let musicPlaying = false;

  const musicButton = document.getElementById("musicButton");
  const musicText = document.getElementById("musicText");
  const roundPlay = document.getElementById("roundPlay");

  if (envelope) {
    envelope.addEventListener("click", openCard);

    envelope.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCard();
      }
    });
  }

  function openCard() {
    if (!opening || !envelope) return;

    envelope.classList.add("open");

    // Start your song when the birthday card is tapped
    startMusic();

    setTimeout(() => {
      opening.classList.add("hidden");
      document.body.classList.add("card-opened");

      createFloatingHearts();
    }, 700);
  }


  /* =====================================================
     2. MUSIC
     ===================================================== */

  async function startMusic() {
    if (musicPlaying) return;

    try {
      await music.play();

      musicPlaying = true;
      updateMusicUI(true);

    } catch (error) {
      console.error("Could not play music:", error);
    }
  }


  function stopMusic() {
    music.pause();
    music.currentTime = 0;

    musicPlaying = false;
    updateMusicUI(false);
  }


  function toggleMusic() {
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
      updateMusicUI(false);
    } else {
      startMusic();
    }
  }


  function updateMusicUI(isPlaying) {

    if (musicText) {
      musicText.textContent = isPlaying ? "Pause" : "Play";
    }

    if (musicButton) {
      musicButton.classList.toggle("playing", isPlaying);
    }

    if (roundPlay) {
      roundPlay.textContent = isPlaying ? "❚❚" : "▶";
    }
  }


  /* =====================================================
     3. NAVBAR MUSIC BUTTON
     ===================================================== */

  if (musicButton) {
    musicButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMusic();
    });
  }


  /* =====================================================
     4. MUSIC CARD PLAY BUTTON
     ===================================================== */

  if (roundPlay) {
    roundPlay.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMusic();
    });
  }


  /* =====================================================
     5. SCROLL REVEAL
     ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.15
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* =====================================================
     6. FLOATING HEARTS
     ===================================================== */

  let heartsStarted = false;

  function createFloatingHearts() {

    if (heartsStarted) return;

    heartsStarted = true;

    const container =
      document.querySelector(".floating-hearts");

    if (!container) return;

    setInterval(() => {

      const heart = document.createElement("span");

      heart.innerHTML =
        Math.random() > 0.5 ? "♡" : "♥";

      heart.style.left =
        Math.random() * 100 + "%";

      heart.style.fontSize =
        10 + Math.random() * 15 + "px";

      heart.style.animationDuration =
        7 + Math.random() * 7 + "s";

      container.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 15000);

    }, 1800);
  }


  /* =====================================================
     7. HERO IMAGE PARALLAX
     ===================================================== */

  const heroPhoto =
    document.querySelector(".hero-photo");

  if (heroPhoto) {

    window.addEventListener("mousemove", (event) => {

      if (window.innerWidth < 850) {
        return;
      }

      const x =
        (event.clientX /
          window.innerWidth -
          0.5) * 5;

      const y =
        (event.clientY /
          window.innerHeight -
          0.5) * 5;

      heroPhoto.style.transform =
        `translate(${x}px, ${y}px)`;

    });

  }


  /* =====================================================
     8. INITIAL STATE
     ===================================================== */

  updateMusicUI(false);

  console.log(
    "❤️ Srivaru Birthday Card loaded successfully."
  );

});

