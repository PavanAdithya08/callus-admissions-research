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
