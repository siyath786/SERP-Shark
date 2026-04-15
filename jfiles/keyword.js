// ── CUSTOM CURSOR
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
      (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        cursorRing.style.left = rx + "px";
        cursorRing.style.top = ry + "px";
        requestAnimationFrame(animRing);
      })();
      document
        .querySelectorAll(
          "a,button,.tab-btn,.kw-type-card,.tool-card,.imp-card,.intent-card",
        )
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
        document.getElementById("scrollProgress").style.width =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100 +
          "%";
        document
          .getElementById("navbar")
          .classList.toggle("scrolled", window.scrollY > 80);
      });

      // ── FLOATING KEYWORD CHIPS
      const kwWords = [
        "keyword research",
        "long-tail",
        "search intent",
        "SEO content",
        "SERP",
        "backlinks",
        "meta tags",
        "E-E-A-T",
        "semantic SEO",
        "KD score",
        "search volume",
        "anchor text",
        "title tag",
        "indexing",
        "crawling",
        "on-page",
        "off-page",
        "CTR",
        "bounce rate",
        "dwell time",
      ];
      const kwChips = document.getElementById("kwChips");
      kwWords.forEach((w, i) => {
        const c = document.createElement("div");
        c.className = "kw-chip";
        c.textContent = w;
        c.style.left = 5 + Math.random() * 88 + "%";
        c.style.animationDuration = 14 + Math.random() * 20 + "s";
        c.style.animationDelay = Math.random() * 18 + "s";
        kwChips.appendChild(c);
      });

      // ── HAMBURGER
      const ham = document.getElementById("hamburger"),
        mob = document.getElementById("mobileMenu");
      ham.addEventListener("click", () => {
        ham.classList.toggle("open");
        mob.classList.toggle("open");
      });
      document.querySelectorAll(".mob-link").forEach((l) =>
        l.addEventListener("click", () => {
          ham.classList.remove("open");
          mob.classList.remove("open");
        }),
      );

      // ── SCROLL REVEAL
      const revObs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          }),
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(
          ".scroll-reveal,.kw-type-card,.tool-card,.intent-card,.r-step,.tip-item,.pipeline-step",
        )
        .forEach((el) => revObs.observe(el));

      // ── COUNTER ANIMATION
      const cntObs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const t = parseInt(e.target.dataset.count),
                inc = t / 60;
              let v = 0;
              const id = setInterval(() => {
                v += inc;
                if (v >= t) {
                  v = t;
                  clearInterval(id);
                }
                e.target.textContent = Math.floor(v);
              }, 2000 / 60);
              cntObs.unobserve(e.target);
            }
          }),
        { threshold: 0.5 },
      );
      document
        .querySelectorAll("[data-count]")
        .forEach((el) => cntObs.observe(el));

      // ── METRIC BAR ANIMATION
      const barObs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              document.querySelectorAll(".metric-fill").forEach((bar) => {
                bar.style.width = bar.dataset.width + "%";
              });
              barObs.disconnect();
            }
          }),
        { threshold: 0.3 },
      );
      const metricsSection = document.querySelector(".kw-metrics");
      if (metricsSection) barObs.observe(metricsSection);

      // ── 3D TILT
      document
        .querySelectorAll(".kw-type-card,.tool-card,.intent-card,.compare-card")
        .forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5,
              y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-10px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg)`;
          });
          card.addEventListener(
            "mouseleave",
            () => (card.style.transform = ""),
          );
        });

      // ── TYPING SEARCH BAR
      const searches = [
        "best seo tools 2025",
        "keyword research guide",
        "how to rank on google",
        "long tail keywords tips",
        "what is search intent",
      ];
      let si = 0,
        ci = 0,
        deleting = false,
        searchEl = document.getElementById("typeSearch");
      function typeLoop() {
        const current = searches[si];
        if (!deleting) {
          searchEl.textContent = current.slice(0, ci + 1);
          ci++;
          if (ci === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
          }
        } else {
          searchEl.textContent = current.slice(0, ci - 1);
          ci--;
          if (ci === 0) {
            deleting = false;
            si = (si + 1) % searches.length;
          }
        }
        setTimeout(typeLoop, deleting ? 50 : 80);
      }
      setTimeout(typeLoop, 1200);

      // ── SMOOTH SCROLL
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const t = document.querySelector(a.getAttribute("href"));
          if (t) t.scrollIntoView({ behavior: "smooth" });
        }),
      );
