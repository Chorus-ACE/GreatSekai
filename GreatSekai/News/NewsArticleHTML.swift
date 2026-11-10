/// Converts the rendered announcement DOM, including pages populated by JavaScript,
/// into the same native Markdown presentation used by Greatdori.
enum NewsArticleHTML {
    static let conversionScript = #"""
    (() => {
      const root = document.querySelector('.draft-container, article, main') || document.body;
      if (!root || root.querySelector('#nuxt-loading')) return '';
      const escape = text => text.replace(/([\\`*_{}\[\]<>#|])/g, '\\$1');
      const url = value => {
        try { const target = new URL(value, document.baseURI); return /^https?:$/.test(target.protocol) ? target.href.replace(/\(/g, '%28').replace(/\)/g, '%29') : ''; }
        catch { return ''; }
      };
      const walk = node => {
        if (node.nodeType === Node.TEXT_NODE) return escape(node.textContent.replace(/\s+/g, ' '));
        if (node.nodeType !== Node.ELEMENT_NODE) return '';
        const tag = node.tagName.toLowerCase();
        if (['script', 'style', 'noscript', 'nav', 'footer', 'button', 'input'].includes(tag) || node.hidden || node.getAttribute('aria-hidden') === 'true') return '';
        const children = () => Array.from(node.childNodes).map(walk).join('');
        if (tag === 'br') return '  \n';
        if (tag === 'hr') return '\n\n---\n\n';
        if (tag === 'img') {
          const target = url(node.getAttribute('src') || node.getAttribute('data-src') || '');
          return target ? '\n\n![' + escape(node.getAttribute('alt') || '') + '](' + target + ')\n\n' : '';
        }
        if (tag === 'a') {
          const target = url(node.getAttribute('href') || '');
          return target ? '[' + children().trim() + '](' + target + ')' : children();
        }
        if (tag === 'strong' || tag === 'b') return '**' + children().trim() + '**';
        if (tag === 'em' || tag === 'i') return '*' + children().trim() + '*';
        if (tag === 'del' || tag === 's') return '~~' + children().trim() + '~~';
        if (/^h[1-6]$/.test(tag)) return '\n\n' + '#'.repeat(Number(tag[1])) + ' ' + children().trim() + '\n\n';
        if (tag === 'pre') return '\n\n~~~\n' + node.textContent + '\n~~~\n\n';
        if (tag === 'code') return '`' + node.textContent.replace(/`/g, '') + '`';
        if (tag === 'blockquote') return '\n\n' + children().trim().split('\n').map(line => '> ' + line).join('\n') + '\n\n';
        if (tag === 'ul' || tag === 'ol') {
          return '\n\n' + Array.from(node.children).filter(child => child.tagName === 'LI').map((child, index) => {
            const lines = walk(child).trim().split('\n');
            const marker = tag === 'ol' ? (index + 1) + '. ' : '- ';
            return marker + lines[0] + lines.slice(1).map(line => '\n    ' + line).join('');
          }).join('\n') + '\n\n';
        }
        if (tag === 'table') {
          const rows = Array.from(node.rows).map(row => Array.from(row.cells).map(cell => walk(cell).trim().replace(/\n+/g, ' ')));
          if (!rows.length) return '';
          const width = Math.max(...rows.map(row => row.length));
          const line = row => '| ' + Array.from({length: width}, (_, index) => row[index] || '').join(' | ') + ' |';
          return '\n\n' + line(rows[0]) + '\n' + line(Array(width).fill('---')) + '\n' + rows.slice(1).map(line).join('\n') + '\n\n';
        }
        const content = children();
        return ['p', 'div', 'section', 'article', 'main', 'header'].includes(tag) ? '\n\n' + content.trim() + '\n\n' : content;
      };
      return walk(root).replace(/\n{3,}/g, '\n\n').trim();
    })()
    """#
}
