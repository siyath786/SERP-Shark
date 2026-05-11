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
    "a,button,.pillar-card,.mob-card,.hb-card,.ci-card,.rt-card",
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
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 +
    "%";
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 80);
});

/* BINARY STREAM */
const bs = document.getElementById("binaryStream");
const techWords = [
  "<html>",
  "</div>",
  "robots",
  "sitemap",
  "HTTPS",
  "SSL",
  "crawl",
  "index",
  "render",
  "LCP",
  "CLS",
  "INP",
  "301",
  "404",
  "CDN",
  "cache",
  "defer",
  "async",
  "schema",
  "canonical",
  "hreflang",
  "gzip",
  "http2",
  "noindex",
  "viewport",
];
for (let i = 0; i < 24; i++) {
  const c = document.createElement("div");
  c.className = "bin-col";
  c.style.left = i * 4.2 + Math.random() * 1.5 + "%";
  c.style.animationDuration = 10 + Math.random() * 14 + "s";
  c.style.animationDelay = Math.random() * 14 + "s";
  let txt = "";
  for (let j = 0; j < 10; j++)
    txt += techWords[Math.floor(Math.random() * techWords.length)] + "  ";
  c.textContent = txt;
  bs.appendChild(c);
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
  .querySelectorAll(".scroll-reveal,.sp-step,.cf-step,.mob-card,.ci-card")
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
document.querySelectorAll("[data-count]").forEach((el) => cntObs.observe(el));

/* SPEED DASHBOARD ANIMATION */
const speedObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        /* CWV scores */
        let l = 0,
          f = 0,
          c = 0;
        const li = setInterval(() => {
          l += 0.04;
          if (l >= 1.8) {
            clearInterval(li);
          }
          document.getElementById("lcpScore").textContent = l.toFixed(1) + "s";
        }, 40);
        const fi = setInterval(() => {
          f += 5;
          if (f >= 120) {
            clearInterval(fi);
          }
          document.getElementById("fidScore").textContent = f + "ms";
        }, 30);
        const ci = setInterval(() => {
          c += 0.002;
          if (c >= 0.06) {
            clearInterval(ci);
          }
          document.getElementById("clsScore").textContent = c.toFixed(3);
        }, 40);
        /* bars */
        document.querySelectorAll(".sm-fill").forEach((b) => {
          b.style.width = b.dataset.w + "%";
        });
        speedObs.disconnect();
      }
    });
  },
  { threshold: 0.3 },
);
const speedSec = document.getElementById("page-speed");
if (speedSec) speedObs.observe(speedSec);

/* 3D TILT */
document.querySelectorAll(".pillar-card,.mob-card,.hb-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
  });
  card.addEventListener("mouseleave", () => (card.style.transform = ""));
});

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  }),
);
