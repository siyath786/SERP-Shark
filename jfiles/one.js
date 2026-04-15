const cursor = document.getElementById("cursor");
      const cursorRing = document.getElementById("cursorRing");
      let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
      document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + "px";
        cursor.style.top = my + "px";
      });
      function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + "px";
        cursorRing.style.top = ry + "px";
        requestAnimationFrame(animRing);
      }
      animRing();
      document
        .querySelectorAll("a,button,.tab-btn,.why-card,.imp-card")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursorRing.style.width = "54px";
            cursorRing.style.height = "54px";
            cursorRing.style.borderColor = "var(--accent)";
          });
          el.addEventListener("mouseleave", () => {
            cursor.style.width = "12px";
            cursor.style.height = "12px";
            cursorRing.style.width = "36px";
            cursorRing.style.height = "36px";
            cursorRing.style.borderColor = "var(--sky)";
          });
        });

      // ── SCROLL PROGRESS
      window.addEventListener("scroll", () => {
        const prog =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100;
        document.getElementById("scrollProgress").style.width = prog + "%";
        document
          .getElementById("navbar")
          .classList.toggle("scrolled", window.scrollY > 80);
      });

      // ── PARTICLES
      const pc = document.getElementById("particles");
      for (let i = 0; i < 40; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.left = Math.random() * 100 + "%";
        p.style.animationDuration = 8 + Math.random() * 15 + "s";
        p.style.animationDelay = Math.random() * 10 + "s";
        p.style.width = p.style.height = 1 + Math.random() * 3 + "px";
        p.style.opacity = "0";
        pc.appendChild(p);
      }

      // ── HAMBURGER
      const ham = document.getElementById("hamburger");
      const mob = document.getElementById("mobileMenu");
      ham.addEventListener("click", () => {
        ham.classList.toggle("open");
        mob.classList.toggle("open");
      });
      document.querySelectorAll(".mob-link").forEach((l) => {
        l.addEventListener("click", () => {
          ham.classList.remove("open");
          mob.classList.remove("open");
        });
      });

      // ── SCROLL REVEAL OBSERVER
      const revealObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.12 },
      );
      document
        .querySelectorAll(".scroll-reveal, .pipeline-step, .imp-card")
        .forEach((el) => revealObs.observe(el));

      // ── COUNTER ANIMATION
      function animateCounter(el, target, suffix = "") {
        let start = 0;
        const dur = 2000;
        const step = dur / 60;
        const inc = target / 60;
        const timer = setInterval(() => {
          start += inc;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(start) + suffix;
        }, step);
      }
      const counterObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const target = parseInt(e.target.getAttribute("data-count"));
              animateCounter(e.target, target);
              counterObs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.5 },
      );
      document
        .querySelectorAll("[data-count]")
        .forEach((el) => counterObs.observe(el));

      // ── TABS
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          document
            .querySelectorAll(".tab-btn")
            .forEach((b) => b.classList.remove("active"));
          document
            .querySelectorAll(".types-panel")
            .forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          document
            .getElementById("panel-" + btn.dataset.tab)
            .classList.add("active");
        });
      });

      // ── 3D TILT ON CARDS
      document.querySelectorAll(".why-card, .imp-card").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = `translateY(-10px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg)`;
        });
        card.addEventListener("mouseleave", () => {
          card.style.transform = "";
        });
      });

      // ── SMOOTH SCROLL for all anchors
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const t = document.querySelector(a.getAttribute("href"));
          if (t) t.scrollIntoView({ behavior: "smooth" });
        });
      });