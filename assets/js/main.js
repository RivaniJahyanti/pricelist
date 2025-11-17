// main.js - meng-handle rendering multi-page links & WA message
// phone and ig config
const PHONE = '6283163825232'; // +62 831-6382-5232 (format wa.me)
const IG = 'vanicreativehub';

// Load service cards on pages that include element with id="services"
function initServices(DATA){
  const servicesEl = document.getElementById('services');
  if(!servicesEl) return;
  Object.keys(DATA).forEach(key=>{
    const card = document.createElement('div');
    card.className='card';
    card.tabIndex=0;
    card.innerHTML = `<h3>${key}</h3><p class="muted">${DATA[key].desc}</p>`;
    card.addEventListener('click',()=>navigateTo(key));
    card.addEventListener('keypress',(e)=>{ if(e.key==='Enter') navigateTo(key) });
    servicesEl.appendChild(card);
  });
}

// navigate to page (multi-page: open respective html)
function navigateTo(key){
  // mapping key -> page url
  const map = {
    'DESAIN KREATIF':'desain.html',
    'OLAH DATA & ANALISIS':'olahdata.html',
    'MACHINE LEARNING':'ml.html',
    'DASHBOARD & DATA VISUALIZATION':'dashboard.html',
    'SURAT UNDANGAN':'undangan.html',
    'SOUVENIR PERNIKAHAN':'souvenir.html'
  };
  const url = map[key] || 'index.html';
  window.location.href = url;
}

// helper to render detail price tables on each category detail page.
// Expects global variable PRICE_DATA to be available in the page.
function renderPrices(categoryKey){
  const data = PRICE_DATA && PRICE_DATA[categoryKey];
  if(!data) return;
  const el = document.getElementById('detailContent');
  if(!el) return;
  let html = `<h2>${categoryKey}</h2><p class="muted">${data.desc}</p>`;
  data.items.forEach(item=>{
    html += `<h3 style="margin-top:16px;color:#c95d7a">${item.title}</h3>`;
    html += '<div class="table-wrap"><table><thead><tr><th>Durasi</th><th>Harga</th></tr></thead><tbody>';
    item.durations.forEach(d=>{
      html += `<tr><td>${d.d}</td><td>${d.p}</td></tr>`;
    });
    html += '</tbody></table></div>';
  });
  // contact buttons
  const waText = encodeURIComponent(`Halo kak, saya mau konsultasi terkait ${categoryKey}. Mohon info harga & prosedur.`);
  html += `<div class="actions"><a class="contact-btn wa" target="_blank" href="https://wa.me/${PHONE}?text=${waText}">Chat WhatsApp</a><a class="contact-btn ig" target="_blank" href="https://instagram.com/${IG}">Instagram</a></div>`;
  el.innerHTML = html;
}

// if page includes back button element
document.addEventListener('click', function(e){
  if(e.target && e.target.matches('#backBtn')){
    e.preventDefault();
    window.location.href = 'index.html';
  }
});
