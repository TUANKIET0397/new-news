(function () {
  const listEl = document.getElementById('list');
  const postEl = document.getElementById('post');
  const searchEl = document.getElementById('search');
  let posts = [];

  // Theme toggle (per-viewer convenience only)
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  document.getElementById('theme').addEventListener('click', () => {
    const dark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  function renderList(filter) {
    const q = (filter || '').trim().toLowerCase();
    const current = location.hash.slice(1);
    listEl.innerHTML = '';
    posts
      .filter(p => !q || (p.date + ' ' + p.title + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(q))
      .forEach(p => {
        const a = document.createElement('a');
        a.href = '#' + p.date;
        if (p.date === current) a.className = 'active';
        const d = document.createElement('span');
        d.className = 'd';
        d.textContent = p.date;
        a.appendChild(d);
        a.appendChild(document.createTextNode(p.title));
        listEl.appendChild(a);
      });
    if (!listEl.children.length) listEl.innerHTML = '<p class="muted">Không có kết quả.</p>';
  }

  async function show(date) {
    const p = posts.find(x => x.date === date) || posts[0];
    if (!p) {
      postEl.innerHTML = '<h1>Chưa có bản tin</h1><p class="muted">Bản tin đầu tiên sẽ xuất hiện lúc 6h sáng.</p>';
      return;
    }
    try {
      const res = await fetch('posts/' + p.file + '?v=' + p.date, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      const md = await res.text();
      postEl.innerHTML = window.renderMarkdown(md);
      postEl.querySelectorAll('a[href^="http"]').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });
      document.title = p.title + ' · New News';
      window.scrollTo({ top: 0 });
    } catch (e) {
      postEl.innerHTML = '<p class="muted">Không tải được bản tin ' + p.date + '.</p>';
    }
    renderList(searchEl.value);
  }

  searchEl.addEventListener('input', () => renderList(searchEl.value));
  window.addEventListener('hashchange', () => show(location.hash.slice(1)));

  fetch('posts/index.json', { cache: 'no-cache' })
    .then(r => r.json())
    .then(data => {
      posts = data.sort((a, b) => b.date.localeCompare(a.date));
      renderList();
      show(location.hash.slice(1));
    })
    .catch(() => { postEl.innerHTML = '<p class="muted">Không tải được danh sách bản tin.</p>'; });
})();
