/* ==========================================================================
   NETWORK - coworking, Tbilisi. Mockup behaviour.

   Everything a visitor can click works: routing, the calendar, the booking
   form and its handoff. What does not exist is a server - the booking form
   assembles a real request and hands it to WhatsApp or email, which is as far
   as a static mockup can honestly go. The real site puts a booking system
   behind that button.

   PRICES ARE DELIBERATELY BLANK. Every one of them renders through TBD below,
   so filling them in is one search for "price:" in DATA and nothing else.
   ========================================================================== */
(() => {
  'use strict';

  /* ---------------- Facts about the space ----------------
     Sourced from the business's own public listings (Google, directories):
     address, phone, Instagram, 24/7 opening, amenities, accessibility.
     Anything invented is marked TBD or [square brackets] so the client can
     see at a glance what still needs them. */
  const PHONE = '+995 505 55 58 85';
  const WHATSAPP = '995505555885';
  const EMAIL = 'hello@network.ge';   // TBD - real address needed
  const TBD = '<span class="price-tbd">___</span>';

  /* Georgian has no uppercase, and text-transform leaves it untouched - so the
     display type's all-caps look comes from Mtavruli, the script's own capital
     forms, one Unicode block above Mkhedruli. Converting at load rather than
     writing Mtavruli into the HTML keeps the source editable by anyone who
     types Georgian normally. */
  const MTAVRULI_OFFSET = 0x1C90 - 0x10D0;
  const toMtavruli = (str) => str.replace(/[ა-ჺ]/g,
    (ch) => String.fromCodePoint(ch.codePointAt(0) + MTAVRULI_OFFSET));

  const MARQUEE = [
    'ხელშეკრულების გარეშე', 'საწევრო გადასახადის გარეშე', 'ღიაა 24/7',
    'ყავა შედის ფასში', 'სწრაფი ინტერნეტი', 'უფასო პარკინგი', 'ჭავჭავაძის 33',
  ];

  const DATA = {
    plans: [
      {
        id: 'day',
        name: 'დღიური ბარათი',
        price: null, unit: 'დღეში',
        desc: 'ერთი დღე, თავისუფალი მაგიდა. იდეალურია გასაცნობად.',
        includes: ['ნებისმიერი თავისუფალი მაგიდა', 'ინტერნეტი, ყავა და ჩაი', 'სამზარეულო და დასასვენებელი ზონა'],
        cta: 'ბარათის აღება', type: 'day',
      },
      {
        id: 'week',
        name: 'კვირეული',
        price: null, unit: 'კვირაში',
        desc: 'ხუთი დღე, ერთი ფასი. კარგია მოკლე ვიზიტისთვის.',
        includes: ['ხუთი ზედიზედ დღე', 'ნებისმიერი თავისუფალი მაგიდა', 'ინტერნეტი, ყავა და ჩაი'],
        cta: 'დაჯავშნა', type: 'week',
      },
      {
        id: 'hot',
        name: 'თავისუფალი მაგიდა',
        price: null, unit: 'თვეში',
        desc: 'მოდი, როცა გინდა, დაჯექი იქ, სადაც თავისუფალია.',
        includes: ['ნებისმიერი თავისუფალი მაგიდა', 'წვდომა სამუშაო საათებში', 'ფონ-ბუთები და ბეჭდვა', 'ივენთები უფასოდ'],
        cta: 'დაჯავშნა', type: 'hot',
      },
      {
        id: 'fixed',
        name: 'ფიქსირებული მაგიდა',
        price: null, unit: 'თვეში',
        desc: 'შენი მაგიდა, შენი მონიტორი, შენი ნივთები - ადგილზე დარჩება.',
        includes: ['პირადი მაგიდა და სავარძელი', '24/7 წვდომა საკუთარი გასაღებით', 'საკეტიანი კარადა', 'შეხვედრების ოთახის საათები'],
        cta: 'დაჯავშნა', type: 'fixed', featured: true, tag: 'ყველაზე პოპულარული',
      },
      {
        id: 'office',
        name: 'პირადი ოფისი',
        price: null, unit: 'თვეიდან',
        desc: 'კარი, რომელიც იკეტება. 1-დან 4 ადამიანამდე.',
        includes: ['ავეჯი და ინტერნეტი შედის', '24/7 წვდომა', 'ფოსტის მიღება მისამართზე', 'შეხვედრების ოთახის საათები'],
        cta: 'ოფისის ნახვა', type: 'office',
      },
    ],

    rooms: [
      { name: 'დიდი შეხვედრების ოთახი', seats: '8-10 ადგილი', extra: 'ეკრანი, დაფა', price: null },
      { name: 'პატარა შეხვედრების ოთახი', seats: '4 ადგილი', extra: 'ეკრანი', price: null },
      { name: 'ფონ-ბუთი', seats: '1 ადგილი', extra: 'ზარებისთვის', price: null },
    ],

    offices: [
      { name: 'ოფისი 1-2 ადამიანზე', meta: '[კვ.მ - შესავსებია] · ბუნებრივი განათება', price: null, photo: 'პატარა ოფისი' },
      { name: 'ოფისი 3-4 ადამიანზე', meta: '[კვ.მ - შესავსებია] · ბუნებრივი განათება', price: null, photo: 'საშუალო ოფისი' },
      { name: 'გუნდური ოთახი', meta: '[ტევადობა - შესავსებია]', price: null, photo: 'გუნდური ოთახი' },
    ],

    amenities: [
      'ოპტიკური ინტერნეტი', 'ყავა და ჩაი', 'სამზარეულო', 'კაფე',
      'ფონ-ბუთები ზარებისთვის', 'შეხვედრების ოთახები', 'დასასვენებელი ზონა',
      'ბეჭდვა და სკანირება', 'ერგონომიული სკამები', 'მდგომი მაგიდები',
      'ბუნებრივი განათება', 'კონდიცირება', 'ვიდეოკონტროლი',
      'უფასო პარკინგი ქუჩაში', 'ადაპტირებული შესასვლელი', 'გენდერულად ნეიტრალური სველი წერტილი',
    ],

    // Sample programme so the page has shape. Dates are generated relative to
    // today in buildEvents() below, so the mockup never looks stale.
    eventTemplates: [
      { offset: 3,  time: '19:00', tag: 'ნეთვორქინგი', title: 'საღამო ღია კარის', desc: '[აღწერა - შესავსებია] გაიცანი სივრცის წევრები.' },
      { offset: 8,  time: '18:30', tag: 'ვორქშოფი',    title: 'ვორქშოფი - [თემა]', desc: '[სპიკერი და აღწერა - შესავსებია]' },
      { offset: 15, time: '11:00', tag: 'მასტერკლასი', title: 'მასტერკლასი - [თემა]', desc: '[სპიკერი და აღწერა - შესავსებია]' },
      { offset: 22, time: '19:00', tag: 'ნეთვორქინგი', title: 'თავისუფალი შეკრება', desc: '[აღწერა - შესავსებია]' },
    ],

    faq: [
      ['შემიძლია ერთი დღით მოსვლა?', 'დიახ. დღიური ბარათი ზუსტად ამისთვისაა - ხელშეკრულების და გასაწევრიანების საფასურის გარეშე.'],
      ['24/7 წვდომა ყველა ტარიფში შედის?', 'ფიქსირებულ მაგიდასა და პირად ოფისში - დიახ, საკუთარი გასაღებით. თავისუფალი მაგიდა სამუშაო საათებში მოქმედებს.'],
      ['შემიძლია ტარიფის შეცვლა?', 'დიახ, ნებისმიერ თვეს. თუ გუნდი გაიზარდა, ოფისზე გადასვლა ყოველთვის შეიძლება.'],
      ['სტუმრის მოყვანა შეიძლება?', '[პასუხი - შესავსებია]'],
      ['რა ხდება, თუ გავაუქმებ?', '[გაუქმების პირობები - შესავსებია]'],
    ],

    members: ['[ლოგო 1]', '[ლოგო 2]', '[ლოგო 3]', '[ლოგო 4]', '[ლოგო 5]', '[ლოგო 6]'],
  };

  const BOOK_TYPES = [
    { id: 'day',    label: 'დღიური ბარათი' },
    { id: 'week',   label: 'კვირეული' },
    { id: 'tour',   label: 'ტური სივრცეში' },
    { id: 'room',   label: 'შეხვედრების ოთახი' },
    { id: 'office', label: 'პირადი ოფისი' },
    { id: 'event',  label: 'ივენთი' },
  ];

  const MONTHS = ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი',
                  'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'];
  const DOW_SHORT = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი'];

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* A price that has not been set yet prints as a dotted blank rather than a
     number. A mockup that invents "40 ₾" gets quoted back at you later. */
  function price(value, unit) {
    const figure = value == null ? TBD : String(value);
    return `${figure} ₾${unit ? ' / ' + unit : ''}`;
  }

  /* The display serif carries no lari sign, so the browser substitutes a
     generic serif for that one glyph - at 2.3rem its baseline and weight
     visibly disagreed with the figure beside it. At display sizes the symbol
     is set small, in the body face, after the number, which is how lari is
     written in Georgian anyway. */
  function bigPrice(value) {
    return (value == null ? TBD : String(value)) + '<span class="cur">₾</span>';
  }

  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const sameDay = (a, b) => iso(a) === iso(b);

  /* ---------------- Events, always in the near future ----------------
     Generated from today rather than written down, so the mockup does not
     start showing last month's programme a fortnight after it was made. */
  const EVENTS = DATA.eventTemplates.map((t) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + t.offset);
    return { ...t, date: d };
  });

  /* ---------------- Rendering ---------------- */

  function planCard(p, compact) {
    return `
      <article class="plan${p.featured ? ' featured' : ''}">
        ${p.tag ? `<span class="plan-tag mt">${p.tag}</span>` : ''}
        <h3 class="plan-name mt">${p.name}</h3>
        <div class="plan-price">${bigPrice(p.price)} <span class="unit">/ ${p.unit}</span></div>
        <p class="plan-desc">${p.desc}</p>
        ${compact ? '' : `<ul>${p.includes.map((i) => `<li>${i}</li>`).join('')}</ul>`}
        <a class="link-more mt" href="#/book?type=${p.type}" data-link>${p.cta} →</a>
      </article>`;
  }

  function renderStatic() {
    $('#home-plans').innerHTML = DATA.plans.map((p) => planCard(p, true)).join('');
    $('#all-plans').innerHTML = DATA.plans.map((p) => planCard(p, false)).join('');

    const amenities = DATA.amenities.map((a) => `<li>${a}</li>`).join('');
    $('#home-amenities').innerHTML = amenities;
    $('#plans-amenities').innerHTML = amenities;

    $('#home-rooms').innerHTML = DATA.rooms.map((r) => `
      <li>
        <span class="room-name">${r.name}</span>
        <span class="room-meta">${r.seats} · ${price(r.price, 'სთ')}</span>
      </li>`).join('');

    $('#office-grid').innerHTML = DATA.offices.map((o) => `
      <article class="office-card">
        <div class="photo" data-photo="${o.photo}"></div>
        <div class="office-body">
          <h3 class="office-name mt">${o.name}</h3>
          <p class="office-meta">${o.meta}</p>
          <div class="office-price">${bigPrice(o.price)} <span class="unit">/ თვე</span></div>
          <a class="link-more mt" href="#/book?type=office" data-link>დაინტერესება →</a>
        </div>
      </article>`).join('');

    $('#room-grid').innerHTML = DATA.rooms.map((r) => `
      <article class="office-card">
        <div class="photo" data-photo="${r.name}"></div>
        <div class="office-body">
          <h3 class="office-name mt">${r.name}</h3>
          <p class="office-meta">${r.seats} · ${r.extra}</p>
          <div class="office-price">${bigPrice(r.price)} <span class="unit">/ სთ</span></div>
          <a class="link-more mt" href="#/book?type=room" data-link>დაჯავშნა →</a>
        </div>
      </article>`).join('');

    $('#event-list').innerHTML = EVENTS.map((e) => `
      <article class="event">
        <div class="event-date">
          <b>${e.date.getDate()}</b>
          <span class="mt">${MONTHS[e.date.getMonth()].slice(0, 3)}</span>
        </div>
        <div class="event-body">
          <h3 class="event-title">${e.title}</h3>
          <p>${e.time} · ${e.desc}</p>
        </div>
        <span class="event-tag mt">${e.tag}</span>
      </article>`).join('');

    // Two copies of the strip, so the scroll can loop at -50% without a seam.
    const run = MARQUEE.map((m) => `<span>${m}</span><span class="sep">✦</span>`).join('');
    $('#marquee-track').innerHTML = toMtavruli(run + run);

    // Standalone price slots in the markup - the hero tag, the CTA, the
    // "from" block - all read the same blank as everything else.
    $$('[data-tbd]').forEach((el) => { el.innerHTML = bigPrice(null); });

    $('#plans-faq').innerHTML = DATA.faq.map(([q, a], i) => `
      <details${i === 0 ? ' open' : ''}>
        <summary>${q}</summary>
        <p>${a}</p>
      </details>`).join('');

    $('#member-grid').innerHTML = DATA.members.map((m) => `<li>${m}</li>`).join('');

    $('#book-type').innerHTML = BOOK_TYPES.map((t, i) => `
      <label class="choice">
        <input type="radio" name="type" value="${t.id}"${i === 0 ? ' checked' : ''}>
        <span>${t.label}</span>
      </label>`).join('');

    $('#year').textContent = String(new Date().getFullYear());
  }

  /* ---------------- Router ----------------
     Hash routing, so every page works straight off the filesystem - the client
     can be sent the folder and open index.html by double-clicking it. */
  const views = $$('.view');

  function parseHash() {
    const raw = (location.hash || '#/').slice(1);
    const [path, query] = raw.split('?');
    return { path: path || '/', params: new URLSearchParams(query || '') };
  }

  function route() {
    const { path, params } = parseHash();
    const match = views.find((v) => v.dataset.view === path) || views[0];

    views.forEach((v) => { v.hidden = v !== match; });
    $$('.nav a').forEach((a) => a.classList.toggle('active', a.dataset.route === path));
    $('#nav').classList.remove('open');
    $('#menu-toggle').setAttribute('aria-expanded', 'false');

    if (path === '/book') {
      const type = params.get('type');
      if (type) {
        const input = $(`#book-type input[value="${type}"]`);
        if (input) input.checked = true;
      }
      const date = params.get('date');
      if (date) $('#book-date').value = date;
      syncBookForm();
    }
    if (path === '/calendar') renderCalendar();

    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  window.addEventListener('hashchange', route);

  /* ---------------- Calendar ---------------- */
  let calMonth = new Date();
  calMonth.setDate(1);
  let calSelected = new Date();
  calSelected.setHours(0, 0, 0, 0);

  function renderCalendar() {
    $('#cal-title').textContent = `${MONTHS[calMonth.getMonth()]} ${calMonth.getFullYear()}`;

    const first = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1);
    // Monday-first, which is how a Georgian calendar reads.
    const lead = (first.getDay() + 6) % 7;
    const days = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let cells = '';
    for (let i = 0; i < lead; i++) cells += '<div class="cal-cell empty"></div>';

    for (let d = 1; d <= days; d++) {
      const date = new Date(calMonth.getFullYear(), calMonth.getMonth(), d);
      const classes = ['cal-cell'];
      if (date < today) classes.push('past');
      if (sameDay(date, today)) classes.push('today');
      if (sameDay(date, calSelected)) classes.push('selected');
      if (EVENTS.some((e) => sameDay(e.date, date))) classes.push('has-event');
      cells += `<button type="button" class="${classes.join(' ')}" data-date="${iso(date)}"
                  aria-label="${d} ${MONTHS[calMonth.getMonth()]}">${d}</button>`;
    }
    $('#cal-grid').innerHTML = cells;
    renderCalDay();
  }

  function renderCalDay() {
    const d = calSelected;
    $('#cal-day-title').textContent =
      `${d.getDate()} ${MONTHS[d.getMonth()]}, ${DOW_SHORT[(d.getDay() + 6) % 7]}`;

    const todays = EVENTS.filter((e) => sameDay(e.date, d));
    $('#cal-day-events').innerHTML = todays.length
      ? todays.map((e) => `<div class="cal-event"><b>${e.time} · ${e.title}</b>${e.desc}</div>`).join('')
      : '<p class="cal-none">ამ დღეს დაგეგმილი ივენთი არ არის.</p>';

    /* Sample occupancy. Deterministic from the date rather than random, so a
       day does not change its story every time you click back onto it - and
       weekends read quieter, the way they actually do. */
    const seed = d.getDate() + d.getMonth() * 31;
    const weekend = [5, 6].includes((d.getDay() + 6) % 7);
    $('#cal-availability').innerHTML = DATA.rooms.map((r, i) => {
      const load = weekend ? 0 : (seed + i * 7) % 3;
      const state = [['თავისუფალი', 'avail-free'], ['ნაწილობრივ დაკავებული', 'avail-part'], ['დაკავებული', 'avail-full']][load];
      return `<div class="avail-row"><span>${r.name}</span><span class="avail-pill ${state[1]}">${state[0]}</span></div>`;
    }).join('');

    $('#cal-book').setAttribute('href', `#/book?type=room&date=${iso(d)}`);
  }

  $('#cal-grid').addEventListener('click', (e) => {
    const cell = e.target.closest('.cal-cell[data-date]');
    if (!cell) return;
    const [y, m, day] = cell.dataset.date.split('-').map(Number);
    calSelected = new Date(y, m - 1, day);
    renderCalendar();
  });

  $('#cal-prev').addEventListener('click', () => {
    calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  $('#cal-next').addEventListener('click', () => {
    calMonth = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1);
    renderCalendar();
  });

  /* ---------------- Booking form ---------------- */
  const form = $('#book-form');

  // A tour has no duration to choose and a day pass has no start time worth
  // asking for; hiding what does not apply keeps the form as short as the
  // request actually is.
  function syncBookForm() {
    const type = form.querySelector('input[name="type"]:checked').value;
    $('#book-extra').style.display = (type === 'day' || type === 'tour') ? 'none' : '';
    $('#book-time-field').style.display = type === 'day' ? 'none' : '';
    renderSummary();
  }

  function formValues() {
    const type = form.querySelector('input[name="type"]:checked').value;
    return {
      type,
      typeLabel: BOOK_TYPES.find((t) => t.id === type).label,
      date: $('#book-date').value,
      time: $('#book-time').value,
      duration: $('#book-duration').value,
      people: $('#book-people').value,
      name: $('#book-name').value.trim(),
      contact: $('#book-contact').value.trim(),
      note: $('#book-note').value.trim(),
    };
  }

  function prettyDate(value) {
    if (!value) return '—';
    const [y, m, d] = value.split('-').map(Number);
    return `${d} ${MONTHS[m - 1]} ${y}`;
  }

  const DURATIONS = { 1: '1 საათი', 2: '2 საათი', 4: '4 საათი', 8: 'მთელი დღე' };

  function renderSummary() {
    const v = formValues();
    const showExtra = !(v.type === 'day' || v.type === 'tour');
    const rows = [
      ['მოთხოვნა', v.typeLabel],
      ['თარიღი', prettyDate(v.date)],
    ];
    if (v.type !== 'day') rows.push(['დრო', v.time || '—']);
    if (showExtra) {
      rows.push(['ხანგრძლივობა', DURATIONS[v.duration] || v.duration]);
      rows.push(['ადამიანი', v.people || '1']);
    }
    rows.push(['ფასი', `${TBD} ₾`]);

    $('#book-summary').innerHTML = `
      <h3>შენი მოთხოვნა</h3>
      ${rows.map(([k, val]) => `<div class="sum-row"><span>${k}</span><b>${val}</b></div>`).join('')}
      <p class="tbd-note">ფასი შესავსებია.</p>`;
  }

  function showError(field, message) {
    const el = form.querySelector(`[data-err="${field}"]`);
    if (el) el.textContent = message || '';
    const input = form.querySelector(`[name="${field}"]`);
    if (input) input.classList.toggle('invalid', !!message);
  }

  // A phone or an email, since the form asks for either. Deliberately loose:
  // rejecting a real contact detail is worse than accepting an odd one.
  function validContact(value) {
    const digits = value.replace(/[^\d]/g, '');
    if (digits.length >= 9 && /^[+\d\s()-]+$/.test(value)) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function validate() {
    const v = formValues();
    let ok = true;
    ['date', 'name', 'contact', 'people', 'consent'].forEach((f) => showError(f, ''));

    if (!v.date) { showError('date', 'აირჩიე თარიღი.'); ok = false; }
    else {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      const [y, m, d] = v.date.split('-').map(Number);
      if (new Date(y, m - 1, d) < today) { showError('date', 'თარიღი წარსულშია.'); ok = false; }
    }
    if (v.name.length < 2) { showError('name', 'შეიყვანე სახელი.'); ok = false; }
    if (!validContact(v.contact)) { showError('contact', 'შეიყვანე ტელეფონი ან ელფოსტა.'); ok = false; }
    if (!$('#book-consent').checked) {
      form.querySelector('[data-err="consent"]').textContent = 'თანხმობა საჭიროა.';
      ok = false;
    }
    return ok;
  }

  function requestText() {
    const v = formValues();
    const showExtra = !(v.type === 'day' || v.type === 'tour');
    const lines = [
      'ჯავშნის მოთხოვნა - NETWORK',
      `მოთხოვნა: ${v.typeLabel}`,
      `თარიღი: ${prettyDate(v.date)}`,
    ];
    if (v.type !== 'day') lines.push(`დრო: ${v.time}`);
    if (showExtra) {
      lines.push(`ხანგრძლივობა: ${DURATIONS[v.duration] || v.duration}`);
      lines.push(`ადამიანი: ${v.people}`);
    }
    lines.push(`სახელი: ${v.name}`, `კონტაქტი: ${v.contact}`);
    if (v.note) lines.push(`შენიშვნა: ${v.note}`);
    return lines.join('\n');
  }

  form.addEventListener('change', syncBookForm);
  form.addEventListener('input', renderSummary);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) {
      const firstBad = form.querySelector('.invalid, .err:not(:empty)');
      if (firstBad) firstBad.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    const text = requestText();
    const wa = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    const mail = `mailto:${EMAIL}?subject=${encodeURIComponent('ჯავშნის მოთხოვნა - NETWORK')}&body=${encodeURIComponent(text)}`;

    $('#book-summary').innerHTML = `
      <h3>მოთხოვნა მზადაა</h3>
      <p class="sum-sent">${text.replace(/\n/g, '<br>')}</p>
      <div class="sum-actions">
        <a class="btn btn-primary" href="${wa}" target="_blank" rel="noopener">WhatsApp-ით გაგზავნა</a>
        <a class="btn btn-ghost" href="${mail}">ელფოსტით გაგზავნა</a>
      </div>
      <p class="tbd-note">ესკიზში სერვერი არ არის - რეალურ საიტზე მოთხოვნა პირდაპირ სივრცეს მიუვა.</p>`;
    $('#book-summary').scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  /* ---------------- Chrome ---------------- */
  $('#menu-toggle').addEventListener('click', () => {
    const nav = $('#nav');
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    $('#menu-toggle').setAttribute('aria-expanded', String(open));
  });

  $('#news-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = $('#news-email').value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    $('#news-msg').textContent = ok
      ? 'მადლობა - ესკიზში სერვერი არ არის, ამიტომ მისამართი არსად იგზავნება.'
      : 'შეიყვანე სწორი ელფოსტა.';
    if (ok) $('#news-email').value = '';
  });

  // Clicking a hash link that is already the current hash fires no hashchange,
  // so the view would never re-sync. Route explicitly instead.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href === location.hash) { e.preventDefault(); route(); }
  });

  renderStatic();
  /* Everything marked .mt goes to Mtavruli once, after rendering. Walk the
     text nodes rather than rewriting textContent: several headings carry a
     <br> or an <em>, and assigning textContent would flatten them away.
     Latin and digits pass through untouched, so "24/7" and "NETWORK" stay
     as typed. */
  $$('.mt').forEach((el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => { n.nodeValue = toMtavruli(n.nodeValue); });
  });
  $('#book-date').value = iso(new Date());
  route();
})();
