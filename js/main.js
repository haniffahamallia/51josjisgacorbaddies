// Class 5.1 Main Script
document.addEventListener('DOMContentLoaded', () => {
  // Loading screen
  const loading = document.getElementById('loading-screen');
  setTimeout(() => {
    loading.classList.add('hidden');
  }, 1200);

  // Elements
  const enterOverlay = document.getElementById('enter-overlay');
  const enterBtn = document.getElementById('enter-btn');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a, .bottom-nav a');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.querySelector('.progress-bar');
  const membersGrid = document.getElementById('members-grid');
  const searchInput = document.getElementById('search-member');
  const filterAbsen = document.getElementById('filter-absen');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.querySelector('.modal-close');
  const clockEl = document.getElementById('live-clock');
  const dateEl = document.getElementById('live-date');
  const countdownEl = document.getElementById('countdown');
  const quoteEl = document.getElementById('class-quote');
  const greetingEl = document.getElementById('greeting');
  const audio = document.getElementById('bg-music');
  const playBtn = document.getElementById('play-btn');
  const muteBtn = document.getElementById('mute-btn');
  const nowPlaying = document.querySelector('.now-playing');

  // State
  let isPlaying = false;
  let isMuted = false;

  // Greeting based on time
  function updateGreeting() {
    const hour = new Date().getHours();
    let greet = 'Hello';
    if (hour < 11) greet = 'Good Morning';
    else if (hour < 15) greet = 'Good Afternoon';
    else if (hour < 19) greet = 'Good Evening';
    else greet = 'Good Night';
    if (greetingEl) greetingEl.textContent = `${greet}, Class 5.1! 🩵`;
  }
  updateGreeting();

  // Live Clock
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Countdown to end of year or special date (e.g. 31 Dec 2026)
  function updateCountdown() {
    const target = new Date('2026-12-31T23:59:59');
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) {
      if (countdownEl) countdownEl.textContent = 'Selamat Tahun Baru! 🎉';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (countdownEl) countdownEl.textContent = `${days} hari ${hours} jam ${mins} menit menuju 2027`;
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

  // Random Quote
  function setRandomQuote() {
    if (!quoteEl || !classData.quotes) return;
    const q = classData.quotes[Math.floor(Math.random() * classData.quotes.length)];
    quoteEl.textContent = `"${q}"`;
  }
  setRandomQuote();

  // Navigation
  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) target.classList.add('active');
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('data-section') === id);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navLinksContainer) navLinksContainer.classList.remove('open');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      if (section) showSection(section);
    });
  });

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
    });
  }

  // Members
  function renderMembers(filterText = '', absenFilter = '') {
    if (!membersGrid) return;
    const filtered = classData.members.filter(m => {
      const matchText = !filterText || 
        m.fullName.toLowerCase().includes(filterText) || 
        m.nickname.toLowerCase().includes(filterText);
      const matchAbsen = !absenFilter || m.absen.toString() === absenFilter;
      return matchText && matchAbsen;
    });

    membersGrid.innerHTML = filtered.map(m => `
      <div class="member-card" data-id="${m.id}">
        <div class="avatar" style="background: ${m.avatarColor}">${m.nickname.charAt(0)}</div>
        <h3>${m.fullName}</h3>
        <div class="nickname">"${m.nickname}"</div>
        <div class="absen">Absen ${m.absen}</div>
        <p class="motto-preview">${m.motto}</p>
      </div>
    `).join('');

    // Click handlers
    document.querySelectorAll('.member-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        openMemberModal(id);
      });
    });
  }

  function openMemberModal(id) {
    const m = classData.members.find(x => x.id === id);
    if (!m || !modalContent) return;
    modalContent.innerHTML = `
      <div class="avatar" style="background: ${m.avatarColor}">${m.nickname.charAt(0)}</div>
      <h2>${m.fullName}</h2>
      <div class="nickname">"${m.nickname}" · Absen ${m.absen}</div>
      <div class="profile-grid">
        <div class="profile-item"><span class="label">Motto</span><span class="value">${m.motto}</span></div>
        <div class="profile-item"><span class="label">Hobi</span><span class="value">${m.hobby}</span></div>
        <div class="profile-item"><span class="label">Makanan Favorit</span><span class="value">${m.food}</span></div>
        <div class="profile-item"><span class="label">Minuman Favorit</span><span class="value">${m.drink}</span></div>
        <div class="profile-item"><span class="label">Warna Favorit</span><span class="value">${m.color}</span></div>
        <div class="profile-item"><span class="label">Fun Fact</span><span class="value">${m.funFact}</span></div>
        <div class="profile-item"><span class="label">Cita-cita</span><span class="value">${m.citaCita}</span></div>
        <div class="profile-item"><span class="label">Quote</span><span class="value">${m.quote}</span></div>
        <div class="profile-item"><span class="label">Ulang Tahun</span><span class="value">${m.birthday}</span></div>
        <div class="profile-item"><span class="label">Email</span><span class="value" style="word-break:break-all">${m.email}</span></div>
      </div>
    `;
    modalOverlay.classList.add('show');
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('show'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('show');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderMembers(searchInput.value.toLowerCase(), filterAbsen ? filterAbsen.value : '');
    });
  }
  if (filterAbsen) {
    // Populate absen options
    filterAbsen.innerHTML = '<option value="">Semua Absen</option>' + 
      classData.members.map(m => `<option value="${m.absen}">${m.absen}</option>`).join('');
    filterAbsen.addEventListener('change', () => {
      renderMembers(searchInput ? searchInput.value.toLowerCase() : '', filterAbsen.value);
    });
  }

  renderMembers();

  // Cleaning Schedule
  function renderCleaning() {
    const container = document.getElementById('cleaning-grid');
    if (!container) return;
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    const icons = ['🧹', '🪣', '✨', '🧽', '🧼'];
    container.innerHTML = days.map((day, i) => {
      const names = classData.cleaningSchedule[day] || [];
      return `
        <div class="day-card cleaning-card ${day.toLowerCase()}">
          <div class="day-name">${icons[i]} ${day}</div>
          <div class="names">
            ${names.map(n => `<span class="name-tag">${n}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }
  renderCleaning();

  // Lesson Schedule
  function renderLessons() {
    const container = document.getElementById('lesson-grid');
    if (!container) return;
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
    container.innerHTML = days.map(day => {
      const lessons = classData.lessonSchedule[day] || [];
      return `
        <div class="day-card ${day.toLowerCase()}">
          <div class="day-name">📚 ${day}</div>
          <ul>
            ${lessons.map(l => `<li>• ${l}</li>`).join('')}
          </ul>
        </div>
      `;
    }).join('');
  }
  renderLessons();

  // Wali Kelas
  function renderWali() {
    const container = document.getElementById('wali-section');
    if (!container || !classData.waliKelas) return;
    const w = classData.waliKelas;
    container.innerHTML = `
      <div class="wali-card">
        <div class="avatar">👩‍🏫</div>
        <h3>${w.name}</h3>
        <p style="font-weight:600;color:#B8860B">"${w.nickname}" · Suka warna ${w.favoriteColor}</p>
        <p style="margin-top:0.75rem;font-style:italic">${w.motto}</p>
      </div>
    `;
  }
  renderWali();

  // Birthdays
  function renderBirthdays() {
    const container = document.getElementById('birthday-list');
    if (!container) return;
    // Sort by month roughly
    const sorted = [...classData.members].sort((a, b) => {
      const months = {Januari:1,Februari:2,Maret:3,April:4,Mei:5,Juni:6,Juli:7,Agustus:8,September:9,Oktober:10,November:11,Desember:12};
      const ma = months[a.birthday.split(' ')[1]] || 0;
      const mb = months[b.birthday.split(' ')[1]] || 0;
      return ma - mb;
    });
    container.innerHTML = sorted.map(m => `
      <div class="bday-card">
        <div style="font-size:1.5rem;margin-bottom:0.4rem">🎂</div>
        <strong>${m.nickname}</strong>
        <div style="font-size:0.9rem;color:var(--navy-light)">${m.birthday}</div>
      </div>
    `).join('');
  }
  renderBirthdays();

  // Guestbook (localStorage)
  const guestbookForm = document.getElementById('guestbook-form');
  const messagesList = document.getElementById('messages-list');

  function loadMessages() {
    const msgs = JSON.parse(localStorage.getItem('class51_guestbook') || '[]');
    if (!messagesList) return;
    if (msgs.length === 0) {
      messagesList.innerHTML = '<p style="text-align:center;color:var(--navy-light)">Belum ada pesan. Jadilah yang pertama! 💌</p>';
      return;
    }
    messagesList.innerHTML = msgs.slice().reverse().map(m => `
      <div class="message-card">
        <div class="author">${m.name}</div>
        <div class="date">${m.date}</div>
        <p>${m.message}</p>
      </div>
    `).join('');
  }

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('gb-name').value.trim();
      const message = document.getElementById('gb-message').value.trim();
      if (!name || !message) return;
      const msgs = JSON.parse(localStorage.getItem('class51_guestbook') || '[]');
      msgs.push({
        name,
        message,
        date: new Date().toLocaleString('id-ID')
      });
      localStorage.setItem('class51_guestbook', JSON.stringify(msgs));
      guestbookForm.reset();
      loadMessages();
    });
  }
  loadMessages();

  // Announcements
  function renderAnnouncements() {
    const container = document.getElementById('announcements-list');
    if (!container) return;
    container.innerHTML = classData.announcements.map(a => `
      <div class="message-card">
        <div class="author">${a.title}</div>
        <div class="date">${a.date}</div>
        <p>${a.content}</p>
      </div>
    `).join('');
  }
  renderAnnouncements();

  // Music Player
  // Note: Due to copyright, we use a YouTube link approach + optional free audio.
  // For demo, audio src can be replaced with a legal file.
  // Official: https://www.youtube.com/watch?v=qFZI6kPtOh0

  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      enterOverlay.classList.add('hidden');
      // Try to play if possible
      if (audio) {
        audio.volume = 0.4;
        audio.play().then(() => {
          isPlaying = true;
          updatePlayBtn();
        }).catch(() => {
          // Autoplay blocked, user can click play later
        });
      }
    });
  }

  function updatePlayBtn() {
    if (playBtn) playBtn.textContent = isPlaying ? '⏸️' : '▶️';
  }

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play().then(() => { isPlaying = true; }).catch(() => {
          // Open YouTube as fallback
          window.open('https://www.youtube.com/watch?v=qFZI6kPtOh0', '_blank');
        });
      }
      updatePlayBtn();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      if (!audio) return;
      isMuted = !isMuted;
      audio.muted = isMuted;
      muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });
  }

  // If audio ends, loop is handled by attribute

  // Scroll progress & back to top
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + '%';
    if (backToTop) {
      backToTop.classList.toggle('show', scrollTop > 400);
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Surprise Me button
  const surpriseBtn = document.getElementById('surprise-btn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      const sectionsIds = ['home', 'members', 'schedule', 'cleaning', 'memories', 'fun', 'community'];
      const random = sectionsIds[Math.floor(Math.random() * sectionsIds.length)];
      showSection(random);
      setRandomQuote();
    });
  }

  // Init home
  showSection('home');

  // Simple scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
