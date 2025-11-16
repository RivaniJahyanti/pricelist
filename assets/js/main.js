// main.js - render kartu layanan + WA contact + dark mode switch

// KONFIGURASI KONTAK
const PHONE = '6283163825232';
const IG = 'vanicreativehub';

// ========== DARK MODE SWITCH ==========
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  // muat tema simpanan
  const saved = localStorage.getItem("vaniTheme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  toggle.addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", now);
    localStorage.setItem("vaniTheme", now);
  });
});

// ========== RENDER KARTU LAYANAN ==========
function initServices(DATA){
  const servicesEl = document.getElementById('services');
  if(!servicesEl) return;

  Object.keys(DATA).forEach((key, i) => {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.style.animationDelay = `${i * 0.12}s`;
    card.tabIndex = 0;

    // template kartu dengan gambar
    card.innerHTML = `
      <img class="card-img" src="${DATA[key].img}" alt="${key}">
      <h3>${key}</h3>
      <p class="muted">${DATA[key].desc}</p>
    `;

    card.addEventListener('click', ()=>navigateTo(key));
    card.addEventListener('keypress', e => { if(e.key === 'Enter') navigateTo(key) });

    servicesEl.appendChild(card);
  });
}

// ========== NAVIGASI HALAMAN ==========
function navigateTo(key){
  const map = {
    'Desain Kreatif':'desain.html',
    'Olah Data & Analisis':'olahdata.html',
    'Machine Learning & AI Modeling':'ml.html',
    'Dashboard & Data Visualization':'dashboard.html',
    'Surat Undangan':'undangan.html',
    'Souvenir Pernikahan':'souvenir.html'
  };

  window.location.href = map[key] || 'index.html';
}

// ========== RENDER HALAMAN DETAIL ==========
function renderPrices(categoryKey){
  const data = PRICE_DATA && PRICE_DATA[categoryKey];
  if(!data) return;

  const el = document.getElementById('detailContent');
  if(!el) return;

  let html = `
    <h2 class="fade-in">${categoryKey}</h2>
    <p class="muted fade-in" style="animation-delay:.1s">${data.desc}</p>
  `;

  data.items.forEach((item, i)=>{
    html += `
      <h3 class="fade-in" style="margin-top:16px;color:#c95d7a;animation-delay:${0.15 + i*0.15}s">
        ${item.title}
      </h3>
      <div class="table-wrap fade-in" style="animation-delay:${0.2 + i*0.15}s">
        <table>
          <thead>
            <tr><th>Durasi</th><th>Harga</th></tr>
          </thead>
          <tbody>
    `;
    item.durations.forEach(d=>{
      html += `<tr><td>${d.d}</td><td>${d.p}</td></tr>`;
    });
    html += `
          </tbody>
        </table>
      </div>
    `;
  });

  const waText = encodeURIComponent(`Halo kak, saya mau konsultasi terkait ${categoryKey}. Mohon info harga ya.`);

  html += `
    <div class="actions fade-in" style="animation-delay:.4s">
      <a class="contact-btn wa" target="_blank" href="https://wa.me/${PHONE}?text=${waText}">
        Chat WhatsApp
      </a>
      <a class="contact-btn ig" target="_blank" href="https://instagram.com/${IG}">
        Instagram
      </a>
    </div>
  `;

  el.innerHTML = html;
}

// Back button
document.addEventListener('click', function(e){
  if(e.target && e.target.matches('#backBtn')){
    e.preventDefault();
    window.location.href = 'index.html';
  }
});
