# NETWORK - mockup

Georgian-language mockup of a site for **Network**, the coworking space at
33 Ilia Chavchavadze Avenue, Tbilisi. Built to show the client. Modelled on
indiedesk.com - its structure and its look: cream and deep brown, one red,
heavy serif display type, a ticker strip, paper tags on the photographs.

Open `index.html` by double-clicking it. No server, no build step. The whole
folder can be zipped and sent.

## What's in it

Seven working pages, hash-routed (`#/plans`, `#/book`, …):

| route | page |
|---|---|
| `#/` | მთავარი - hero, plans, quote, rooms, offices, amenities, location, CTA |
| `#/plans` | ტარიფები - four tiers in full, amenities, FAQ |
| `#/offices` | ოფისები - private offices and meeting rooms |
| `#/events` | ივენთები - programme, plus hiring the space |
| `#/calendar` | კალენდარი - month calendar, events per day, room availability |
| `#/community` | სივრცის შესახებ - values, story, members |
| `#/book` | დაჯავშნა - booking form with live summary |

Working: routing, mobile menu, the calendar (month navigation, day selection,
per-day events, availability), the booking form (conditional fields, live
summary, validation, and a handoff that opens the filled request in WhatsApp
or email).

Not working, because a static mockup can't: there is no server, so nothing is
stored. The real site puts a booking system behind that button.

## What came from Network's own listings

Address, phone (+995 505 55 58 85), Instagram (@networktbilisi), 24/7 opening,
the 5.0 rating, and the amenity and accessibility lists - high-speed internet,
kitchen, café, phone booths, meeting rooms, relaxation area, printing, free
street parking, wheelchair-accessible entrance and toilet, gender-neutral
toilets, women-owned, LGBTQ+ friendly.

## What still needs the client

Everything below is marked in the page itself - a dotted blank for money,
`[square brackets]` for text, labelled slots for photos.

**Prices** (all of them, in `DATA` at the top of `script.js`):
- [ ] day pass, per day
- [ ] weekly rate
- [ ] hot desk, per month
- [ ] dedicated desk, per month
- [ ] private office, from / month - and per office size
- [ ] meeting rooms and phone booth, per hour
- [ ] member vs non-member rates, if they differ

**Text:**
- [ ] a real member quote for the home page - I left it blank rather than
      invent one, since a made-up review is the one thing a business site
      must not carry
- [ ] the space's story on `#/community` - when it opened, who founded it
- [ ] office sizes in m² and how many of each there are
- [ ] nearest metro and bus routes
- [ ] real event programme, with speakers
- [ ] FAQ: guest policy, cancellation terms
- [ ] real email address (`EMAIL` in `script.js` is a guess)

**Photos** - 12 labelled slots. Each says what belongs there:
main floor, coffee corner, phone booth, meeting room, private office,
street entrance, an evening event, the team, and one per office and room.

## Notes

- Georgian only, as asked. The markup has no i18n layer, so adding English
  later means either duplicating the pages or introducing one.
- The Georgian webfont (Noto Sans Georgian) loads from Google Fonts, so it
  needs internet. Offline it falls back to Sylfaen, which is on every Windows
  machine - readable, less handsome.
- Display headings are set in **Mtavruli**, Georgian's capital forms. Georgian
  has no uppercase and `text-transform` leaves it untouched, so the all-caps
  look the reference gets for free has to come from the letterforms. `script.js`
  converts anything marked `.mt` at load, one Unicode block up from Mkhedruli -
  so the HTML stays editable by anyone typing Georgian normally.
- The lari sign is set in the body face at display sizes (`.cur`). The display
  serif has no `₾` glyph and substitutes a generic serif for it, whose baseline
  visibly disagreed with the figure beside it.
- The brown bar at the very top says ესკიზი so nobody mistakes this for the live
  site. Remove that word from the `.utility` bar in `index.html` when the
  content is signed off.
- Sample events generate from today's date, so the mockup won't look stale
  next month.
