// Renders the NFL Predictor page from window.CYRUS_DATA (data/latest.js).
(function () {
  var data = window.CYRUS_DATA;
  var LEGACY = { 'BEST BET': 'STRONG', 'BET': 'MODERATE', 'LEAN': 'SLIGHT' };   // tier names used before Week 8
  var CHIP = { 'STRONG': 'chip-best', 'MODERATE': 'chip-bet', 'SLIGHT': 'chip-lean', 'RECHECK': 'chip-recheck', 'PASS': 'chip-pass' };
  function norm(t) { t = String(t || '').toUpperCase(); return LEGACY[t] || t; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }
  function chip(tier) {
    var td = el('td');
    tier = norm(tier);
    td.appendChild(el('span', 'chip ' + (CHIP[tier] || 'chip-lean'), tier));
    return td;
  }
  function meter(pct) {
    var td = el('td');
    var wrap = el('div', 'meter');
    var track = el('div', 'track');
    var fill = el('div', 'fill');
    fill.style.width = Math.max(0, Math.min(100, Number(pct) || 0)) + '%';
    track.appendChild(fill);
    wrap.appendChild(track);
    wrap.appendChild(el('span', 'pct', pct + '%'));
    td.appendChild(wrap);
    return td;
  }
  function fillBody(id, rows, cols, build) {
    var body = document.getElementById(id);
    body.textContent = '';
    if (!rows || !rows.length) {
      var tr = el('tr');
      var td = el('td', 'empty', 'No picks in this market this week.');
      td.colSpan = cols;
      tr.appendChild(td);
      body.appendChild(tr);
      return;
    }
    rows.forEach(function (r) { body.appendChild(build(r)); });
  }

  if (!data) {
    ['rb-body', 'qb-body'].forEach(function (id) {
      var body = document.getElementById(id);
      body.innerHTML = '<tr><td class="empty" colspan="9">This week\'s card isn\'t posted yet. Check back after the Wednesday update.</td></tr>';
    });
  } else {
    document.getElementById('week-badge').textContent = data.season + ' · Week ' + data.week;
    document.getElementById('updated').textContent = 'Updated ' + data.updated + (data.sample ? ' · Sample data' : '');
    if (data.next_update && data.next_update.length) {
      var nu = document.getElementById('next-update');
      nu.textContent = '';
      data.next_update.forEach(function (t, i) {
        if (i) nu.appendChild(document.createElement('br'));
        nu.appendChild(document.createTextNode(t));
      });
    }

    var all = (data.rb || []).concat(data.qb || []);
    var count = function (t) { return all.filter(function (r) { return norm(r.tier) === t; }).length; };
    document.getElementById('n-best').textContent = count('STRONG');
    document.getElementById('n-bet').textContent = count('MODERATE');
    document.getElementById('n-pass').textContent = (data.passed || []).reduce(function (s, p) { return s + (p.count || 0); }, 0);

    fillBody('rb-body', data.rb, 6, function (r) {
      var tr = el('tr');
      tr.appendChild(chip(r.tier));
      tr.appendChild(el('td', 'strong', r.player));
      tr.appendChild(el('td', 'soft', r.game));
      tr.appendChild(el('td', 'soft nowrap', r.kickoff));
      tr.appendChild(meter(r.chance));
      tr.appendChild(el('td', 'note', r.note));
      return tr;
    });

    fillBody('qb-body', data.qb, 9, function (q) {
      var tr = el('tr');
      tr.appendChild(chip(q.tier));
      tr.appendChild(el('td', 'strong', q.player));
      tr.appendChild(el('td', 'soft', q.game));
      tr.appendChild(el('td', 'soft nowrap', q.kickoff));
      tr.appendChild(el('td', 'strong nowrap', q.pick));
      tr.appendChild(el('td', 'num', q.projection + ' yds'));
      tr.appendChild(el('td', 'num soft', q.line != null ? q.line + ' yds' : '—'));
      tr.appendChild(el('td', 'num strong', q.chance + '%'));
      tr.appendChild(el('td', 'note', q.note));
      return tr;
    });

    var list = document.getElementById('passed-list');
    (data.passed || []).forEach(function (p) {
      var li = el('li');
      li.appendChild(el('strong', null, p.players + ':'));
      li.appendChild(document.createTextNode(' ' + p.reason));
      list.appendChild(li);
    });
    if (!(data.passed || []).length) list.appendChild(el('li', null, 'Nothing passed this week.'));
  }

  // Track record
  var rec = data && data.record;
  if (rec) {
    var lab = document.getElementById('record-label');
    lab.textContent = rec.rows && rec.rows.length ? 'Season to date: ' + rec.label + '.' : 'Starts with ' + rec.season + ' Week ' + rec.start_week + ', the first card published automatically.';
    if (rec.rows && rec.rows.length) {
      var rb = document.getElementById('record-body');
      rb.textContent = '';
      rec.rows.forEach(function (r) {
        var tr = el('tr');
        tr.appendChild(el('td', 'strong', r.market === 'RB TD' ? 'RB anytime TD' : 'QB passing yards'));
        tr.appendChild(chip(r.tier));
        tr.appendChild(el('td', 'num', r.wins + '-' + r.losses + (r.voids ? ' (' + r.voids + ' void)' : '')));
        tr.appendChild(el('td', 'num strong', r.picks ? Math.round(r.win_pct * 100) + '%' : '—'));
        tr.appendChild(el('td', 'num soft', r.picks ? Math.round(r.expected_pct * 100) + '%' : '—'));
        rb.appendChild(tr);
      });
    }
  }

  // Player lookup
  (function () {
    var form = document.getElementById('lookup-form');
    if (!form) return;
    var players = (data && data.players) || [];
    var input = document.getElementById('lookup-input');
    var out = document.getElementById('lookup-result');
    var dl = document.getElementById('player-list');
    players.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (p) {
      var o = document.createElement('option'); o.value = p.name; o.label = p.pos + ' · ' + p.game; dl.appendChild(o);
    });
    function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z]/g, ''); }
    function find(q) {
      var k = norm(q); if (!k) return null;
      var exact = players.filter(function (p) { return norm(p.name) === k; });
      if (exact.length) return exact[0];
      var part = players.filter(function (p) { return norm(p.name).indexOf(k) >= 0 || k.indexOf(norm(p.name.split(' ').pop())) >= 0 && k.length > 3; });
      return part.length === 1 ? part[0] : (part.length > 1 ? { multi: part } : null);
    }
    function list(title, items, cls) {
      if (!items || !items.length) return null;
      var wrap = el('div', 'lk-list ' + cls);
      wrap.appendChild(el('h4', null, title));
      var ul = el('ul');
      items.forEach(function (s) { ul.appendChild(el('li', null, s)); });
      wrap.appendChild(ul);
      return wrap;
    }
    function render(p) {
      out.textContent = ''; out.hidden = false;
      if (!p) {
        out.appendChild(el('p', 'lk-none', 'No match this week. Cyrus covers the scheduled starting quarterbacks and the running backs with a regular role; a player on a bye week, injured, or not yet a starter will not appear until he does.'));
        return;
      }
      if (p.multi) {
        out.appendChild(el('p', 'lk-none', 'Did you mean: ' + p.multi.map(function (x) { return x.name; }).join(', ') + '?'));
        return;
      }
      var head = el('div', 'lk-head');
      var left = el('div');
      left.appendChild(el('p', 'lk-name', p.name + ' · ' + p.pos));
      left.appendChild(el('p', 'lk-game', p.game + ' · ' + p.kickoff));
      head.appendChild(left);
      head.appendChild(chip(p.tier === 'NO LINE' ? 'PASS' : p.tier).firstChild);
      out.appendChild(head);
      var nums = el('div', 'lk-nums');
      function stat(label, val) { var d = el('div'); d.appendChild(el('span', 'lk-label', label)); d.appendChild(el('span', 'lk-val', val)); nums.appendChild(d); }
      if (p.pos === 'QB') {
        stat('Cyrus projection', p.projection != null ? p.projection + ' yds' : '—');
        stat('Market line', p.line != null ? p.line + ' yds' : '—');
        stat('Cyrus call', p.side ? p.side + ' ' + p.line : '—');
        stat('Chance', p.chance != null ? p.chance + '%' : '—');
      } else {
        stat('Chance to score', p.chance + '%');
        stat('Verdict', p.verdict);
      }
      out.appendChild(nums);
      out.appendChild(el('p', 'lk-summary', p.summary));
      var cols = el('div', 'lk-cols');
      var a = list('What supports it', p.pros, 'pos'); if (a) cols.appendChild(a);
      var b = list('What works against it', p.cons, 'neg'); if (b) cols.appendChild(b);
      var h = list('Against ' + (p.opp_name || p.opp || 'this opponent') + ' recently', p.history, 'hist'); if (h) cols.appendChild(h);
      out.appendChild(cols);
      out.appendChild(el('p', 'lk-note', 'A "no call" means Cyrus does not see enough of an edge either way; it is not a prediction of the opposite. Lines move and injury reports change, so check again before kickoff.'));
    }
    form.addEventListener('submit', function (e) { e.preventDefault(); render(find(input.value)); });
    input.addEventListener('change', function () { if (find(input.value) && !find(input.value).multi) render(find(input.value)); });
  })();

  // Tabs
  var tabs = [document.getElementById('tab-rb'), document.getElementById('tab-qb')];
  function select(i) {
    tabs.forEach(function (t, j) {
      var on = i === j;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    tabs[i].focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(i); });
    t.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(i === 0 ? 1 : 0); }
    });
  });
})();
