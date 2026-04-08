/* ═══════════════════════════════════════════
   Dev Bhoomi — Uttarakhand Travel Guide
   script.js  —  Pagination Logic
   Page 1 = Home, Pages 2–17 = Destinations
═══════════════════════════════════════════ */

const TOTAL = 17;
let current = 1;

const pages = document.querySelectorAll('.page');
const paginationEl = document.getElementById('pagination');

/* ── Navigate to a page by number ── */
function goTo(n) {
  if (n < 1 || n > TOTAL) return;
  pages.forEach(p => p.classList.remove('active'));
  document.querySelector('[data-page="' + n + '"]').classList.add('active');
  current = n;
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Build pagination buttons ── */
function renderPagination() {
  paginationEl.innerHTML = '';

  /* Prev arrow */
  const prev = document.createElement('button');
  prev.className = 'pag-btn arrow';
  prev.textContent = '← Prev';
  prev.disabled = current === 1;
  prev.onclick = () => goTo(current - 1);
  paginationEl.appendChild(prev);

  /* Page buttons with smart ellipsis */
  getPageRange(current, TOTAL).forEach(n => {
    if (n === '...') {
      const sep = document.createElement('span');
      sep.className = 'pag-sep';
      sep.textContent = '…';
      paginationEl.appendChild(sep);
    } else {
      const btn = document.createElement('button');
      btn.className = 'pag-btn' + (n === current ? ' active' : '');
      /* Page 1 label = Home, rest = numbers */
      btn.textContent = n === 1 ? '⌂' : n;
      btn.title = n === 1 ? 'Home' : 'Page ' + n;
      btn.onclick = () => goTo(n);
      paginationEl.appendChild(btn);
    }
  });

  /* Next arrow */
  const next = document.createElement('button');
  next.className = 'pag-btn arrow';
  next.textContent = 'Next →';
  next.disabled = current === TOTAL;
  next.onclick = () => goTo(current + 1);
  paginationEl.appendChild(next);
}

/* ── Smart page range with ellipsis ── */
function getPageRange(cur, total) {
  if (total <= 8) return Array.from({ length: total }, (_, i) => i + 1);
  const result = [];
  if (cur <= 4) {
    for (let i = 1; i <= 5; i++) result.push(i);
    result.push('...');
    result.push(total);
  } else if (cur >= total - 3) {
    result.push(1);
    result.push('...');
    for (let i = total - 4; i <= total; i++) result.push(i);
  } else {
    result.push(1);
    result.push('...');
    result.push(cur - 1);
    result.push(cur);
    result.push(cur + 1);
    result.push('...');
    result.push(total);
  }
  return result;
}

/* ── Init ── */
renderPagination();