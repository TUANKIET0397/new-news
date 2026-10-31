// Minimal, dependency-free Markdown renderer.
// All text is HTML-escaped first; only a safe subset of syntax is turned into tags.
(function () {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function inline(s) {
    const codes = [];
    s = esc(s).replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = s
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|#[^\s)]*|[\w./-]+)\)/g, '<a href="$2">$1</a>')
      .replace(/(^|[\s(])(https?:\/\/[^\s<)]+)/g, '$1<a href="$2">$2</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    return s.replace(/\u0000(\d+)\u0000/g, (_, i) => '<code>' + codes[i] + '</code>');
  }

  const isTableSep = l => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(l);
  const cells = l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());

  window.renderMarkdown = function (src) {
    const lines = src.replace(/\r\n?/g, '\n').split('\n');
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      if (/^```/.test(line)) {
        const lang = line.slice(3).trim();
        const buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++;
        out.push('<pre><code' + (lang ? ' data-lang="' + esc(lang) + '"' : '') + '>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }
      let m;
      if ((m = /^(#{1,4})\s+(.*)$/.exec(line))) {
        const n = m[1].length;
        out.push('<h' + n + '>' + inline(m[2]) + '</h' + n + '>');
        i++; continue;
      }
      if (/^\s*(---|\*\*\*)\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
      if (/^\s*>/.test(line)) {
        const buf = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ''));
        out.push('<blockquote>' + window.renderMarkdown(buf.join('\n')) + '</blockquote>');
        continue;
      }
      if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
        const head = cells(line);
        i += 2;
        const rows = [];
        while (i < lines.length && lines[i].includes('|') && lines[i].trim()) rows.push(cells(lines[i++]));
        out.push('<table><thead><tr>' + head.map(c => '<th>' + inline(c) + '</th>').join('') + '</tr></thead><tbody>' +
          rows.map(r => '<tr>' + r.map(c => '<td>' + inline(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table>');
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
        const ordered = /^\s*\d+\./.test(line);
        const items = [];
        while (i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length))) {
          if (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) && !/^\s{2,}/.test(lines[i])) items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ''));
          else items[items.length - 1] += '\n' + lines[i].trim().replace(/^([-*]|\d+\.)\s+/, '· ');
          i++;
        }
        const tag = ordered ? 'ol' : 'ul';
        out.push('<' + tag + '>' + items.map(t => '<li>' + inline(t).replace(/\n/g, '<br>') + '</li>').join('') + '</' + tag + '>');
        continue;
      }
      if (!line.trim()) { i++; continue; }
      const buf = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*>|\s*([-*]|\d+\.)\s+)/.test(lines[i])) buf.push(lines[i++]);
      out.push('<p>' + inline(buf.join(' ')) + '</p>');
    }
    return out.join('\n');
  };
})();
