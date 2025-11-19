// main.js - meng-handle rendering multi-page links & WA message
// phone and ig config
const PHONE = '6283163825232'; 
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
  const map = {
    'DESAIN KREATIF':'desain.html',
    'OLAH DATA & ANALISIS':'olahdata.html',
    'MACHINE LEARNING':'ml.html',
    'WEBSITE & DASHBOARD':'dashboard.html',
    'SURAT UNDANGAN':'undangan.html',
    'SOUVENIR PERNIKAHAN':'souvenir.html'
  };
  const url = map[key] || 'index.html';
  window.location.href = url;
}

// RENDER DETAIL PAGE — sudah diperbaiki agar DESC item muncul
function renderPrices(categoryKey){
  const data = PRICE_DATA && PRICE_DATA[categoryKey];
  if(!data) return;

  const el = document.getElementById('detailContent');
  if(!el) return;

  // header kategori
  let html = `
    <h2>${categoryKey}</h2>
    <p class="muted">${data.desc}</p>
  `;

  // item
  data.items.forEach(item => {
    // judul item
    html += `
      <h3 style="margin-top:16px;color:#c95d7a">${item.title}</h3>
    `;

    // **DESC ITEM DIMUNCULKAN**
    if (item.desc) {
    html += `
      <div class="item-desc" style="margin-bottom:8px;">
        ${item.desc}
      </div>
    `;
    }

    // tabel
    html += `
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>Durasi</th><th>Harga</th></tr>
          </thead>
          <tbody>
    `;

    item.durations.forEach(d => {
      html += `
        <tr>
          <td>${d.d}</td>
          <td>${d.p}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;
  });

  // contact buttons
  const waText = encodeURIComponent(
    `Halo kak, saya tertarik dengan layanan ${categoryKey}. 
Saya ingin bertanya terkait proses pengerjaan dan apa saja yang perlu saya siapkan 
untuk membuat layanan tersebut sesuai kebutuhan saya, yaitu:

- Jenis Layanan yang saya inginkan: ……………………………….
- Durasi pengerjaan yang saya pilih: ……………………………….

Mohon bantuannya ya kak.
`
  );

  html += `
    <div class="actions">
      <a class="contact-btn wa" target="_blank"
         href="https://wa.me/${PHONE}?text=${waText}">
         Chat WhatsApp
      </a>
      <a class="contact-btn ig" target="_blank"
         href="https://instagram.com/${IG}">
         Instagram
      </a>
    </div>
  `;

  el.innerHTML = html;
}

// back button
document.addEventListener('click', function(e){
  if(e.target && e.target.matches('#backBtn')){
    e.preventDefault();
    window.location.href = 'index.html';
  }
});
