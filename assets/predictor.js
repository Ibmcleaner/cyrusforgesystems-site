// Renders the NFL Predictor page from window.CYRUS_DATA (data/latest.js).
(function () {
  var data = window.CYRUS_DATA;
  var CHIP = { 'BEST BET': 'chip-best', 'BET': 'chip-bet', 'LEAN': 'chip-lean', 'RECHECK': 'chip-recheck', 'PASS': 'chip-pass' };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined && text !== null) n.textContent = String(text);
    return n;
  }
  function chip(tier) {
    var td = el('td');
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
    var count = function (t) { return all.filter(function (r) { return r.tier === t; }).length; };
    document.getElementById('n-best').textContent = count('BEST BET');
    document.getElementById('n-bet').textContent = count('BET');
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
