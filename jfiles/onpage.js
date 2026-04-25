  /* CURSOR */
      const cur = document.getElementById("cursor"),
        ring = document.getElementById("cursorRing");
      let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
      document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        cur.style.left = mx + "px";
        cur.style.top = my + "px";
      });
      (function loop() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
        requestAnimationFrame(loop);
      })();
      document
        .querySelectorAll(
          "a,button,.kp-card,.pillar-card,.url-rule-card,.htip,.lc,.img-step,.why-card",
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cur.style.width = "20px";
            cur.style.height = "20px";
            ring.style.width = "54px";
            ring.style.height = "54px";
            ring.style.borderColor = "var(--accent)";
          });
          el.addEventListener("mouseleave", () => {
            cur.style.width = "12px";
            cur.style.height = "12px";
            ring.style.width = "36px";
            ring.style.height = "36px";
            ring.style.borderColor = "var(--sky)";
          });
        });

      /* SCROLL PROGRESS */
      window.addEventListener("scroll", () => {
        document.getElementById("scrollProgress").style.width =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
            100 +
          "%";
        document
          .getElementById("navbar")
          .classList.toggle("scrolled", window.scrollY > 80);
      });

      /* CODE RAIN */
      const codeSymbols = [
        "<title>",
        "<h1>",
        'alt=""',
        "<meta>",
        "/slug",
        "H2",
        "CTR",
        "DA",
        "KD",
        "URL",
        "#seo",
        "img",
        "href",
        "anchor",
        "<head>",
        "robots",
        "sitemap",
        "index",
        "crawl",
        "SERP",
      ];
      const rainContainer = document.getElementById("codeRain");
      for (let i = 0; i < 22; i++) {
        const col = document.createElement("div");
        col.className = "rain-col";
        col.style.left = i * 4.5 + Math.random() * 2 + "%";
        col.style.animationDuration = 10 + Math.random() * 14 + "s";
        col.style.animationDelay = Math.random() * 12 + "s";
        let content = "";
        for (let j = 0; j < 12; j++)
          content +=
            codeSymbols[Math.floor(Math.random() * codeSymbols.length)] + "  ";
        col.textContent = content;
        rainContainer.appendChild(col);
      }

      /* HAMBURGER */
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

      /* SCROLL REVEAL */
      const revObs = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("visible");
          }),
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".scroll-reveal,.kp-card,.img-step,.h-tier")
        .forEach((el) => revObs.observe(el));

      /* COUNTER */
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

      /* 3D TILT */
      document
        .querySelectorAll(".kp-card,.pillar-card,.url-rule-card")
        .forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            const r = card.getBoundingClientRect(),
              x = (e.clientX - r.left) / r.width - 0.5,
              y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-10px) rotateX(${-y * 14}deg) rotateY(${x * 14}deg)`;
          });
          card.addEventListener(
            "mouseleave",
            () => (card.style.transform = ""),
          );
        });

      /* META COUNTER */
      const metaInput = document.getElementById("metaInput"),
        metaCount = document.getElementById("metaCount"),
        metaBar = document.getElementById("metaBar"),
        metaStatus = document.getElementById("metaStatus"),
        metaPreview = document.getElementById("metaPreview");
      function updateMeta() {
        const len = metaInput.value.length;
        metaCount.textContent = len;
        const pct = Math.min((len / 155) * 100, 100);
        metaBar.style.width = pct + "%";
        if (len === 0) {
          metaBar.style.background = "rgba(255,255,255,.1)";
          metaStatus.textContent = "";
          metaStatus.style.color = "";
        } else if (len <= 120) {
          metaBar.style.background = "linear-gradient(90deg,#fbbf24,#f59e0b)";
          metaStatus.textContent = "Too Short";
          metaStatus.style.color = "#fbbf24";
        } else if (len <= 155) {
          metaBar.style.background =
            "linear-gradient(90deg,var(--sky-deep),var(--accent))";
          metaStatus.textContent = "✓ Perfect";
          metaStatus.style.color = "var(--accent)";
        } else {
          metaBar.style.background = "linear-gradient(90deg,#ef4444,#dc2626)";
          metaStatus.textContent = "Too Long — Will Truncate";
          metaStatus.style.color = "#f87171";
        }
        metaPreview.textContent =
          metaInput.value.slice(0, 155) +
          (metaInput.value.length > 155 ? "..." : "");
      }
      metaInput.addEventListener("input", updateMeta);
      updateMeta();

      /* LINK WEB SVG LINES */
      function drawLines() {
        const svg = document.getElementById("linkSvg");
        svg.innerHTML = "";
        const center = document.getElementById("nodeCenter");
        const nodes = ["n1", "n2", "n3", "n4", "n5", "n6"];
        const svgRect = svg.getBoundingClientRect();
        const cRect = center.getBoundingClientRect();
        const cx = cRect.left - svgRect.left + cRect.width / 2;
        const cy = cRect.top - svgRect.top + cRect.height / 2;
        nodes.forEach((id, i) => {
          const el = document.getElementById(id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          const nx = r.left - svgRect.left + r.width / 2;
          const ny = r.top - svgRect.top + r.height / 2;
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
          );
          line.setAttribute("x1", cx);
          line.setAttribute("y1", cy);
          line.setAttribute("x2", nx);
          line.setAttribute("y2", ny);
          line.setAttribute("stroke", "rgba(56,189,248,0.25)");
          line.setAttribute("stroke-width", "1.5");
          line.setAttribute("stroke-dasharray", "5,4");
          const anim = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animate",
          );
          anim.setAttribute("attributeName", "stroke-dashoffset");
          anim.setAttribute("values", "0;-18");
          anim.setAttribute("dur", "1.2s");
          anim.setAttribute("repeatCount", "indefinite");
          line.appendChild(anim);
          svg.appendChild(line);
        });
      }
      setTimeout(drawLines, 500);
      window.addEventListener("resize", drawLines);

      /* SMOOTH SCROLL */
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const t = document.querySelector(a.getAttribute("href"));
          if (t) t.scrollIntoView({ behavior: "smooth" });
        }),
      );
