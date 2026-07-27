const pages = {
  rules: `
    <h2>Rules</h2><div class="list">
      ${['No Toxicity / Drama','No RDM / VDM','Respect Everyone','No Exploiting','Follow Staff Instructions','No Fail RP / Meta Gaming'].map((r,i)=>`
      <div class="content-card row"><span class="number">${i+1}</span><div><h3>${r}</h3><p>Keep roleplay realistic and respect the community.</p></div></div>`).join('')}
      <button class="primary-btn" onclick="showPage('home')">I Understand</button>
    </div>`,
  staff: `
    <h2>Staff</h2><div class="list">
      ${['Loyalty — Owner','B4 — Co-Owner','Love — Co-Owner','TrustNoOne — Manager'].map(s=>`
      <div class="content-card"><h3>${s}</h3><p><span class="badge">● ONLINE</span></p></div>`).join('')}
    </div>`,
  news: `
    <h2>Announcements</h2><div class="list">
      <div class="content-card"><h3>New Update Out Now!</h3><p>Check out the brand new update with custom cars, clothes, and more.</p></div>
      <div class="content-card"><h3>Block Party Event</h3><p>Join us Saturday for a huge block party. Big prizes and good vibes only.</p></div>
      <div class="content-card"><h3>Applications Are Open</h3><p>We are now accepting new applications for all departments.</p></div>
    </div>`,
  apps: `
    <h2>Applications</h2><div class="list">
      ${['Police Department','EMS Department','Mechanic Shop','Real Estate','Staff Team'].map(a=>`
      <div class="content-card row"><div style="flex:1"><h3>${a}</h3><p>Apply to join this department.</p></div><button class="primary-btn">Apply</button></div>`).join('')}
    </div>`,
  profile: `
    <h2>Profile</h2><div class="content-card"><h3>Player#1234</h3><p>Status: <span class="badge">ONLINE</span><br>Joined: Apr 24, 2024<br>Player ID: #LBL1234</p></div>`
};
function showPage(name) {
  const page = document.getElementById('page');
  if (name === 'home') { page.classList.add('hidden'); return; }
  document.getElementById('pageContent').innerHTML = pages[name] || pages.news;
  page.classList.remove('hidden');
}
function openLink(url) {
  if (url === '#') alert('Add your donation link in app.js');
  else window.open(url, '_blank');
}
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
