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
          "a,button,.method-card,.blt-card,.bli-card,.da-factor,.pillar-card",
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

      /* GLOBE WRAP NODES */
      const gw = document.getElementById("globeWrap");
      const nodeData = [
        { size: 60, top: "12%", left: "8%", dur: 6 },
        { size: 40, top: "25%", left: "88%", dur: 8 },
        { size: 80, top: "55%", left: "4%", dur: 7 },
        { size: 50, top: "70%", left: "92%", dur: 9 },
        { size: 35, top: "80%", left: "15%", dur: 5 },
        { size: 55, top: "40%", left: "92%", dur: 10 },
        { size: 45, top: "18%", left: "75%", dur: 6.5 },
        { size: 30, top: "88%", left: "65%", dur: 8 },
      ];
      nodeData.forEach((n, i) => {
        const el = document.createElement("div");
        el.className = "globe-node";
        el.style.cssText = `width:${n.size}px;height:${n.size}px;top:${n.top};left:${n.left};animation-duration:${n.dur}s;animation-delay:${i * 0.5}s;`;
        gw.appendChild(el);
      });
      /* LINES */
      for (let i = 0; i < 8; i++) {
        const l = document.createElement("div");
        l.className = "globe-line";
        l.style.cssText = `width:${100 + Math.random() * 200}px;top:${Math.random() * 100}%;left:${Math.random() * 80}%;animation-duration:${2 + Math.random() * 3}s;animation-delay:${Math.random() * 3}s;transform:rotate(${Math.random() * 360}deg);`;
        gw.appendChild(l);
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
        .querySelectorAll(
          ".scroll-reveal,.bli-card,.blt-card,.lb-step,.method-card,.da-factor",
        )
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

      /* DA CIRCLE + SCALE */
      const daObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              /* animate number */
              let v = 0;
              const id = setInterval(() => {
                v += 1;
                if (v >= 75) {
                  clearInterval(id);
                }
                document.getElementById("daNum").textContent = v;
              }, 28);
              /* fill circle: dashoffset = 408*(1-0.75)=102 already set; animate to it */
              setTimeout(() => {
                document.getElementById("daFill").style.strokeDashoffset =
                  "102";
              }, 200);
              /* scale bars */
              document.querySelectorAll(".da-scale-fill").forEach((b) => {
                b.style.width = b.dataset.w + "%";
              });
              daObs.disconnect();
            }
          });
        },
        { threshold: 0.3 },
      );
      const daSection = document.getElementById("domain-authority");
      if (daSection) daObs.observe(daSection);

      /* 3D TILT */
      document
        .querySelectorAll(".method-card,.blt-card,.bli-card")
        .forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            if (window.innerWidth < 900) return;
            const r = card.getBoundingClientRect(),
              x = (e.clientX - r.left) / r.width - 0.5,
              y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `translateY(-10px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
          });
          card.addEventListener(
            "mouseleave",
            () => (card.style.transform = ""),
          );
        });

      /* BACKLINK FLOW SVG */
      function drawBlLines() {
        const svg = document.getElementById("blSvg");
        if (!svg) return;
        svg.innerHTML = "";
        const target = document.getElementById("blTarget");
        const sites = ["bs1", "bs2", "bs3", "bs4", "bs5", "bs6"];
        const svgRect = svg.getBoundingClientRect();
        if (!svgRect.width) return;
        const tRect = target.getBoundingClientRect();
        const tx = tRect.left - svgRect.left + tRect.width / 2;
        const ty = tRect.top - svgRect.top + tRect.height / 2;
        sites.forEach((id, i) => {
          const el = document.getElementById(id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          const nx = r.left - svgRect.left + r.width / 2;
          const ny = r.top - svgRect.top + r.height / 2;
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line",
          );
          line.setAttribute("x1", nx);
          line.setAttribute("y1", ny);
          line.setAttribute("x2", tx);
          line.setAttribute("y2", ty);
          line.setAttribute("stroke", "rgba(56,189,248,0.3)");
          line.setAttribute("stroke-width", "1.5");
          line.setAttribute("stroke-dasharray", "6,4");
          const anim = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animate",
          );
          anim.setAttribute("attributeName", "stroke-dashoffset");
          anim.setAttribute("values", "20;0");
          anim.setAttribute("dur", 1 + i * 0.2 + "s");
          anim.setAttribute("repeatCount", "indefinite");
          line.appendChild(anim);
          svg.appendChild(line);
          /* arrowhead glow dot */
          const circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle",
          );
          circle.setAttribute("r", "4");
          circle.setAttribute("fill", "var(--accent)");
          const animX = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animate",
          );
          animX.setAttribute("attributeName", "cx");
          animX.setAttribute("values", `${nx};${tx}`);
          animX.setAttribute("dur", 1.5 + i * 0.15 + "s");
          animX.setAttribute("repeatCount", "indefinite");
          const animY = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animate",
          );
          animY.setAttribute("attributeName", "cy");
          animY.setAttribute("values", `${ny};${ty}`);
          animY.setAttribute("dur", 1.5 + i * 0.15 + "s");
          animY.setAttribute("repeatCount", "indefinite");
          circle.appendChild(animX);
          circle.appendChild(animY);
          circle.style.filter = "drop-shadow(0 0 6px var(--accent))";
          svg.appendChild(circle);
        });
      }
      setTimeout(drawBlLines, 600);
      window.addEventListener("resize", drawBlLines);

      /* SMOOTH SCROLL */
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const t = document.querySelector(a.getAttribute("href"));
          if (t) t.scrollIntoView({ behavior: "smooth" });
        }),
      );