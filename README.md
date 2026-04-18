# US/UK University Admissions Research
### Callus Company Inc. — AI Researcher Competency Assessment | April 2026

---

## What this is

I researched admissions data for four universities — MIT and Stanford in the US, Oxford and Edinburgh in the UK — to show how I'd approach structured research using AI tools without blindly trusting them. The main point isn't the data itself. It's the process: using Perplexity to pull live results, spotting where the output was wrong or missing something, going to the actual university pages to check, and documenting what changed and why.

The comparison table, the JSON, the Apps Script — those are the outputs. The corrections section is the work.

---

## How I did it

I used two tools: **Perplexity** for live search (it cites sources, which matters) and **Claude** to help structure and cross-check the outputs. For the final table I formatted the verified data into JSON and fed it into a Google Sheets script I wrote.

The research went in this order:

1. Ran a Perplexity search per university with a prompt asking for deadline, English requirement, fee, and one distinctive requirement — and specifically asking it to flag anything it couldn't source authoritatively
2. Reviewed what came back. Not just the answers — the *sources*. One result cited a graduate admissions office for an undergraduate question. Another cited Reddit. Those are problems.
3. Opened the official admissions pages for each university and checked the flagged fields directly
4. Updated the table with what the portals actually said, and noted what I had to correct
5. Structured the clean data as JSON, wrote the Apps Script, tested it

The prompts I used are below.

---

## Prompts

**Perplexity — run once per university:**
```
Search the official admissions website for [UNIVERSITY NAME] and extract:
1. Undergraduate application deadline (2025–2026 cycle, first-year applicants)
2. Required English proficiency evidence — tests accepted and minimum scores
3. Application fee in local currency
4. One distinctive admissions requirement specific to this university

Only return information you can cite to an official university URL.
If you can't find an authoritative source for any field, say so.
```

**Claude — after collecting all four Perplexity outputs:**
```
Here are my raw research notes for four universities. Help me build a comparison table
with these columns: University | Country | Deadline | English Requirement | Fee | Notable Requirement

For each field, label it:
- [AI] — from the search output, not yet checked against the official portal
- [VERIFIED] — confirmed at the official URL
- [AMBIGUOUS] — conflicting information, needs manual check

Then flag at least 3 fields where the AI output looks incomplete, wrong, or poorly sourced,
and tell me what specifically to check on the official portal to resolve each.
```

---

## Research Findings

| Field | MIT (USA) | Stanford (USA) | University of Oxford (UK) | University of Edinburgh (UK) |
|---|---|---|---|---|
| **UG Deadline** | Nov 1 Early Action / Jan 5, 2026 Regular Action | Nov 1 REA / Jan 5, 2026 Regular Decision | Oct 15, 6pm BST via UCAS — earlier than every other UK university | Jan 14, 2026 equal consideration (most courses); Oct 15 for Medicine |
| **English Proficiency** | Strongly recommended for non-native speakers — no mandatory test or minimum score on official UG pages ⚠️ | TOEFL, IELTS, or Duolingo optional — no mandatory test or minimum score on official UG pages ⚠️ | IELTS 7.5 overall / 7.0 per component; TOEFL 110 (L:22 R:24 S:25 W:24); PTE 76 / 66 per skill; C1 Advanced 191 | Varies by school — no single university-wide minimum. Arts/Humanities (CAHSS): IELTS 6.5. Science/Medicine/Law typically higher. Check individual course page. ⚠️ |
| **Application Fee** | $75 USD; waivers available | $90 USD (unconfirmed at official portal — sourced from third-party) ⚠️ | None — Oxford charges no fee for UG applications | ~£28.95 goes to UCAS, not Edinburgh directly |
| **Notable Requirement** | Two teacher recs required: one math/science, one humanities/social science/language | Restrictive Early Action — cannot apply early to any other US private college at the same time | Subject-specific UAT-UK tests (ESAT, TMUA, TARA) taken in October at Pearson VUE; registration closes *before* the UCAS deadline | UCAT for Medicine/Vet Med; digital portfolio for Art & Design; interview for Teacher Education |

---

## What I checked and what I changed

### Flag 1 — MIT English proficiency

Perplexity returned a result saying MIT "strongly recommends" English proficiency testing with no specific test or minimum score, and cited `oge.mit.edu`. That's the Office of Graduate Education — not the undergraduate admissions office. Citing a graduate-level policy page to answer an undergraduate question is a straightforward category error, and it's exactly the kind of thing that slips through when an AI tool is pulling from multiple sources without distinguishing their scope.

I went to `mitadmissions.org/apply/firstyear/deadlines-requirements/` directly. The undergraduate page does not list a mandatory English test or minimum score. The "strongly recommended" framing appears to be accurate for UG, but anyone relying on the OGE citation for undergraduate guidance would be looking at the wrong policy. Both things needed correcting: the source, and the label on the field.

---

### Flag 2 — Stanford English proficiency

The source Perplexity cited for Stanford's English requirement was Reddit.

Reddit threads often have accurate information from people who actually went through the process — but they also have outdated posts, speculation, and user-specific edge cases presented as general policy. For something like "is this test required or just optional," a Reddit thread from two years ago is not the right source. Stanford's official position on this may also have a nuance around waiver conditions (e.g., if a student attended an English-medium school for a defined number of years) that forum posts won't capture precisely.

The field is now labeled ambiguous. The correct place to check is `admission.stanford.edu/apply/first-year/` under the requirements section for international applicants. The Reddit citation is documented in the labels table so anyone reviewing this work can see exactly where the information came from.

---

### Flag 3 — Edinburgh English proficiency

The Perplexity result for Edinburgh cited `cahss.ed.ac.uk` — the College of Arts, Humanities and Social Sciences. That's one school within the university, not the whole institution.

Edinburgh sets English language requirements at the course level, not university-wide. The IELTS 6.5 figure from CAHSS is real — it applies to humanities programs. But a student applying for Medicine, Engineering, or Law would need to meet a higher threshold, typically IELTS 7.0 or above. Using the CAHSS figure as a proxy for a Science or Medical application could lead someone to prepare for the wrong score.

The fix is simple: use `study.ed.ac.uk/undergraduate`, find the specific program in `study.ed.ac.uk/programmes/undergraduate-subjects`, and read the English requirements on that page. The table now reflects that there's no universal figure, and points to the course-level pages.

**Bonus: Stanford application fee**

The $90 fee for Stanford came from `ask.shiksha`, an Indian education aggregator. Application fees are one of the most frequently stale fields in third-party databases — they update without announcement and aggregators often lag. This should be confirmed at `admission.stanford.edu` before passing it on to anyone. It's a 30-second check and the kind of thing that matters if a student submits the wrong amount.

---

## Verified data labels

| Data point | Source | Status |
|---|---|---|
| MIT EA deadline: Nov 1 | Perplexity → collegedunia | ✅ Verified — mitadmissions.org |
| MIT RA deadline: Jan 5, 2026 | Perplexity → collegedunia | ✅ Verified — mitadmissions.org |
| MIT fee: $75 UG | Perplexity → collegedunia | ✅ Verified — mitadmissions.org |
| MIT English: strongly recommended, no mandatory test | Perplexity → oge.mit.edu (wrong office) | ⚠️ Ambiguous — OGE covers grad students, not UG |
| MIT notable req: dual teacher recs | Perplexity → mitadmissions.org | ✅ Verified |
| Stanford REA: Nov 1 / RD: Jan 5 | Perplexity → collegedunia | ✅ Verified — admission.stanford.edu |
| Stanford fee: $90 | Perplexity → ask.shiksha | ⚠️ Unverified — third-party only |
| Stanford English: optional, no mandatory test | Perplexity → Reddit | ⚠️ Ambiguous — non-authoritative source |
| Oxford deadline: Oct 15 | Perplexity → ox.ac.uk | ✅ Verified |
| Oxford IELTS 7.5 / TOEFL 110 | Perplexity → ox.ac.uk | ✅ Verified |
| Oxford fee: none | Perplexity → ox.ac.uk | ✅ Verified |
| Oxford UAT-UK tests | Perplexity → ox.ac.uk | ✅ Verified |
| Edinburgh deadline: Jan 14 / Oct 15 Medicine | Perplexity → collegesimplified | ✅ Verified — ed.ac.uk |
| Edinburgh IELTS: no universal minimum | Perplexity → cahss.ed.ac.uk | ⚠️ Ambiguous — CAHSS only, not university-wide |
| Edinburgh fee: UCAS only | Perplexity → ed.ac.uk | ✅ Verified |

---

## Google Sheets script

Paste this into Extensions → Apps Script in a new Google Sheet, then run `populateAdmissionsData`.

```javascript
/**
 * Admissions comparison table populator
 * Sheet tab: "Admissions Data"
 */
function populateAdmissionsData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Admissions Data");
  if (!sheet) sheet = ss.insertSheet("Admissions Data");
  sheet.clearContents();

  const headers = [
    "University", "Country", "UG App Deadline",
    "English Proficiency", "Min Score", "Application Fee",
    "Notable Requirement", "Verified", "Source URL"
  ];

  const data = [
    [
      "MIT", "USA",
      "Nov 1 (EA) / Jan 5, 2026 (RA)",
      "Strongly recommended (no mandatory test)",
      "N/A",
      "$75 (waivers available)",
      "Two teacher recs: one math/sci, one humanities/social science",
      "PARTIAL",
      "https://mitadmissions.org/apply/firstyear/deadlines-requirements/"
    ],
    [
      "Stanford University", "USA",
      "Nov 1 (REA) / Jan 5, 2026 (RD)",
      "TOEFL / IELTS / Duolingo optional",
      "N/A",
      "$90 (unconfirmed at official portal)",
      "REA: cannot apply early to other US private colleges simultaneously",
      "PARTIAL",
      "https://admission.stanford.edu/apply/first-year/"
    ],
    [
      "University of Oxford", "UK",
      "Oct 15, 6pm BST (via UCAS)",
      "IELTS / TOEFL iBT / PTE / C1 Advanced",
      "IELTS 7.5 overall (7.0/component); TOEFL 110; PTE 76; C1 191",
      "None",
      "UAT-UK tests (ESAT/TMUA/TARA) in October — register before UCAS deadline",
      "YES",
      "https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/guide"
    ],
    [
      "University of Edinburgh", "UK",
      "Jan 14, 2026 equal consideration (Oct 15 for Medicine)",
      "IELTS / TOEFL / C1 Advanced (varies by course)",
      "IELTS 6.5+ depending on school — check individual course page",
      "~£28.95 via UCAS",
      "UCAT for Medicine/Vet Med; portfolio for Art & Design; interview for Teacher Ed",
      "PARTIAL",
      "https://www.ed.ac.uk/studying/undergraduate"
    ]
  ];

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground("#1a73e8").setFontColor("#ffffff")
             .setFontWeight("bold").setFontSize(11);

  sheet.getRange(2, 1, data.length, headers.length).setValues(data);
  for (let i = 0; i < data.length; i++) {
    sheet.getRange(i + 2, 1, 1, headers.length)
         .setBackground(i % 2 === 0 ? "#f8f9fa" : "#ffffff")
         .setFontSize(10).setWrap(true);
  }

  const widths = [220, 80, 210, 200, 200, 160, 300, 100, 320];
  widths.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  sheet.setRowHeights(2, data.length, 90);
  sheet.setFrozenRows(1);

  const vRange = sheet.getRange(2, 8, data.length, 1);
  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("YES").setBackground("#d4edda").setFontColor("#155724")
      .setRanges([vRange]).build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains("PARTIAL").setBackground("#fff3cd").setFontColor("#856404")
      .setRanges([vRange]).build()
  ]);

  sheet.getRange(data.length + 3, 1).setValue("Last updated:").setFontWeight("bold");
  sheet.getRange(data.length + 3, 2).setValue(new Date().toLocaleString());
  SpreadsheetApp.getUi().alert("Done.");
}
```

---

## Why this approach scales

The pattern here — structured prompt, live search with citations, spot-check against official source, structured output — works for any research task where the data changes over time and accuracy matters. Swap "university admissions" for "employer hiring requirements" or "visa eligibility rules" and the process is identical. The schema keys change, the verification steps change, but the workflow doesn't.

For Callus's use case, the verification layer is the part worth investing in. At 4 universities it's a manual check. At 400, it needs confidence scores per field and a system for flagging low-confidence rows for human review. That's a solvable problem — the hard part is building the habit of not treating AI output as ground truth before you've checked it.

---

## Sources

- MIT UG Admissions: https://mitadmissions.org/apply/firstyear/deadlines-requirements/
- Stanford UG Admissions: https://admission.stanford.edu/apply/first-year/
- Oxford UG Admissions Guide: https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/guide
- Oxford UG Overview: https://www.ox.ac.uk/admissions/undergraduate
- UCAS Dates and Deadlines: https://www.ucas.com/applying/applying-to-university/dates-and-deadlines-for-uni-applications
- Edinburgh UG Study: https://www.ed.ac.uk/studying/undergraduate
- Edinburgh English Requirements: https://study.ed.ac.uk/undergraduate/entry-requirements/english-language
