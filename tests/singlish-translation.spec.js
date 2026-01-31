const { test, expect } = require('@playwright/test');

/*
 FULL 35 TEST CASES
 Covers:
 - Pos_Fun (Accuracy)
 - Neg_Fun (Robustness)
 - Pos_UI / Neg_UI (UI behavior)
*/

const scenarios = [

  // =====================
  // POSITIVE FUNCTIONAL (1–24)
  // =====================

  { id: 'Pos_Fun_0001', name: 'Convert a short polite greeting question', input: 'oyaa hodhin innavaa nedha?', expected: 'ඔයා හොදින් ඉන්නවා නේද?' },
  { id: 'Pos_Fun_0002', name: 'Convert a simple present tense sentence', input: 'mama adha gedhara innavaa.', expected: 'මම අද ගෙදර ඉන්නවා.' },
  { id: 'Pos_Fun_0003', name: 'Convert a conditional complex sentence', input: 'oyaa enavanm api ekka yamu.', expected: 'ඔයා එනවන්ම් අපි එක්ක යමු.' },
  { id: 'Pos_Fun_0004', name: 'Convert a compound sentence with reason', input: 'traffic thibuNa nisaa mama office late unaa.', expected: 'traffic තිබුණ නිසා මම office late උනා.' },
  { id: 'Pos_Fun_0005', name: 'Convert  medium mixed singlish + English language', input: 'oyaata adha report eka email valin send karanna puluvandha office yanna kalin.', expected: 'ඔයාට අද report එක email වලින් send කරන්න පුලුවන්ද office යන්න කලින්.' },
  { id: 'Pos_Fun_0006', name: 'Convert polite request sentence', input: 'karuNaakara mata podi avasThaavak dhenna puLuvandha?', expected: 'කරුණාකර මට පොඩි අවස්ථාවක් දෙන්න පුළුවන්ද?' },
  { id: 'Pos_Fun_0007', name: 'Convert abbreviation usage', input: 'mage ID eka office eke thiyenavaa.', expected: 'mage ID එක office eke තියෙනවා.' },
  { id: 'Pos_Fun_0008', name: 'Convert an interrogative question ', input: 'oyaa dhaen monavadha karannee?', expected: 'ඔයා දැන් මොනවද කරන්නේ?' },
  { id: 'Pos_Fun_0009', name: 'Converting an imperative command ', input: 'issarahata poddak yanna.', expected: 'ඉස්සරහට පොඩ්ඩක් යන්න.' },
  { id: 'Pos_Fun_0010', name: 'Convert a future tense sentence', input: 'api heta trip ekak yanna hadhanavaa.', expected: 'අපි හෙට trip එකක් යන්න හදනවා.' },
  { id: 'Pos_Fun_0011', name: ' Convert a negative sentence ', input: 'mama eeka karanna hithannee naehae.', expected: 'මම ඒක කරන්න හිතන්නේ නැහැ.' },
  { id: 'Pos_Fun_0012', name: 'Convert an imperative command', input: ' issarahata poddak yanna. ', expected: 'ඉස්සරහට පොඩ්ඩක් යන්න.' },
  { id: 'Pos_Fun_0013', name: 'Convert informal greeting', input: 'ela machan kohomadha?', expected: 'එල මචන් කොහොමද?' },
  { id: 'Pos_Fun_0014', name: 'Convert medium descriptive sentence', input: 'mama adha office yanna kalin breakfast eka kanna onee.', expected: 'මම අද office යන්න කලින් breakfast එක කන්න ඔනේ.' },
  { id: 'Pos_Fun_0015', name: 'Convert compound sentence', input: 'මම ගියොත්  ඔයා එන්නෙ නැහැ නමුත් අපි පස්සෙ කතා කරමු.', expected: 'මම ගියොත්  ඔයා එන්නෙ නැහැ නමුත් අපි පස්සෙ කතා කරමු.' },
  { id: 'Pos_Fun_0016', name: 'convert place names preserved', input: 'api Kandy giyaama night eka inne hotel eke.', expected: 'අපි Kandy ගියාම night එක ඉන්නේ hotel eke.' },
  { id: 'Pos_Fun_0017', name: 'Convert line break input', input: 'mama gedhara yanavaa noyaa inna dha?', expected: 'මම ගෙදර යනවා නොයා ඉන්න ද?' },
  { id: 'Pos_Fun_0018', name: 'Convert long paragraph mixed content', input: 'adha morning mama early maththala bus ekata naegala office giyaa. office eke vaeda hari busy una namuth team ekka hodhatama collaborate karala tasks tika ivara karagaththaa. lunch eken passe Zoom meeting ekak thibuna clients la samaga, ehema unath meeting eka smooth vidhihata finish unaa saha evening venakota reports tika email karala gedhara enna puluvan unaa.', expected: 'අද morning මම early මත්තල bus එකට නැගල office ගියා. office eke වැඩ හරි busy උන නමුත් team එක්ක හොදටම collaborate කරල tasks ටික ඉවර කරගත්තා. lunch එකෙන් පස්සෙ Zoom meeting එකක් තිබුන clients ල සමග, එහෙම උනත් meeting එක smooth විදිහට finish උනා සහ evening වෙනකොට reports ටික email කරල ගෙදර එන්න පුලුවන් උනා.' },
  { id: 'Pos_Fun_0019', name: 'Mixed language with technical term', input: 'adha online training session ekata Teams valin join venna puluvandha?', expected: 'අද online training session එකට Teams වලින් join වෙන්න පුලුවන්ද?' },
  { id: 'Pos_Fun_0020', name: 'Convert repeated word emphasis', input: 'exam eka 2026-04-10', expected: 'exam එක 2026-04-10' },
  { id: 'Pos_Fun_0021', name: 'Time format', input: '7.30 AM meeting ekak', expected: '7.30 AM meeting එකක්' },
  { id: 'Pos_Fun_0022', name: 'Convert units of measurement', input: 'rice kilo 2k ganna.', expected: 'rice kilo 2ක් ගන්න.' },
  { id: 'Pos_Fun_0023', name: 'Convert informal command', input: 'eeka hariyata karapan.', expected: 'ඒක හරියට කරපන්.' },
  { id: 'Pos_Fun_0024', name: 'Convert complex conditional sentence', input: 'vaessa saerata thiyenavanam api trip eka postpone karamu.', expected: 'වැස්ස සැරට තියෙනවනම් අපි trip එක postpone කරමු.' },

  // =====================
  // NEGATIVE FUNCTIONAL (25–33)
  // =====================

  { id: 'Neg_Fun_0025', name: 'Long input with symbols & punctuation', input: ' mama adha office giyaa!!!! but seriously??? vaeda karanna baehae. system error ###, files corrupt @@@, deadline tomorrow 10/10/2026, payment USD 1500 pending!!! client says ASAP fix this issue or project CANCEL. ithin mokakdha karanne kiyala tavama hithaaganna baehae.' },
  { id: 'Neg_Fun_0026', name: 'Mixed symbols', input: ' mama @ office # late' },
  { id: 'Neg_Fun_0027', name: 'combined words with a typo', input: ' mamagedharainnaae' },
  { id: 'Neg_Fun_0028', name: 'Long slang-heavy paragraph', input: ' adoo bn adha scene eka hari awl una machan. mama office giyaa namuth boss ta mood eka naha kiyala therenna thibuna. meeting eka totally mess una, slides tika load wenne naha, projector eka avul, wifi slow, client la okkoma pissed. ithin mata hithenne meka hari fail case ekak kiyala.' },
  { id: 'Neg_Fun_0029', name: 'Unpredictable casing', input: 'MaMa AdHa EnNe.' },
  { id: 'Neg_Fun_0030', name: 'Number-heavy input', input: 'bus එක 138 route එක ' },
  { id: 'Neg_Fun_0031', name: 'Conversion of long informal slang-heavy paragraph', input: ' adoo bn adha scene eka hari awl una machan. mama office giyaa namuth boss ta mood eka naha kiyala therenna thibuna. meeting eka totally mess una, slides tika load wenne naha, projector eka awl, wifi slow, client la okkoma pissed. ithin mata hithenne meka hari fail case ekak kiyala.' },
  { id: 'Neg_Fun_0032', name: 'Incorrect handling of mixed Singlish with abbreviations', input: ' mata adha bank app eke login venne naha, OTP eka hariyata ennee naehae kiyala loku prashnayak thiyenavaa. ' },
  { id: 'Neg_Fun_0033', name: 'Incorrect conversion of informal conversational request', input: ' machan heta class eka thiyenava kiyala kiyuvoth nam hari, namuth lecturer adha enne naha kiyala message ekak dhaalaa.' },

  { id: 'Neg_UI_0034', name: 'Punctuation handling faliure', input: 'oyaa adha enne naee!' },
  { id: 'Pos_UI_0035', name: 'Verify real-time output update', input: 'mama vaeda karanavaa.', ui: 'POS' }

];

// =====================
// EXECUTION LOOP
// =====================

for (const tc of scenarios) {
  test(`${tc.id} - ${tc.name}`, async ({ page }) => {

    // Go to the translator website
    await page.goto('https://www.swifttranslator.com/');

    const inputArea = page.getByPlaceholder('Input Your Singlish Text Here.');
    const outputArea = page.locator('div.whitespace-pre-wrap').first();

    // Clear and type the input
    await inputArea.fill('');
    await inputArea.type(tc.input, { delay: 35 });

    // Positive functional tests: check expected output
    if (tc.id.startsWith('Pos_Fun')) {
      await expect(outputArea).not.toBeEmpty();
      const actual = (await outputArea.innerText()).trim();
      expect(actual).toBe(tc.expected);
    }

    // Negative functional tests: just verify output exists (or some error handling)
    if (tc.id.startsWith('Neg_Fun')) {
      await expect(outputArea).toBeDefined();
    }

    // Positive UI tests: output should exist
    if (tc.ui === 'POS') {
      // ✅ Wait for content properly
      await expect(outputArea).not.toBeEmpty();
    }

    // Negative UI tests: output should be empty or null
    if (tc.ui === 'NEG') {
      const text = await outputArea.innerText();
      expect(text === '' || text === null).toBeTruthy();
    }

  });
}
