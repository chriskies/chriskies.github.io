const state = {
  language: localStorage.getItem("letterformer-language-v1") || "de",
  recipient: "",
  sender: "",
  city: "",
  subject: "",
  sourceText: "",
  logoDataUrl: "",
  signatureDataUrl: "",
  mode: "letter",
  labelPreset: "threeByEight",
  labelAmount: "two",
  labelAddress: "recipient",
  labelStart: 1,
  salutationOverride: "",
  closingOverride: "",
  editingInlineField: "",
  entitlement: {
    isUnlocked: false,
    weeklyLimit: 2,
    weekKey: "",
    usedThisWeek: 0,
  },
  document: null,
};

const languageStorageKey = "letterformer-language-v1";
const entitlementStorageKey = "letterformer-entitlement-v1";

const translations = {
  de: {
    metaDescription:
      "LetterFormer ist ein simpler, aber wirkungsvoller Briefgenerator für Brief, Umschlag und Adressetiketten.",
    languageLabel: "Sprache wählen",
    claim: 'Text rein <span aria-label="wird zu">&#8605;</span> Brief raus',
    intro: "Ein simpler, aber wirkungsvoller Briefgenerator, der in Sekunden erstellt, was er soll.",
    workspaceLabel: "LetterFormer Arbeitsbereich",
    recipientLabel: "An wen geht der Brief?",
    recipientPlaceholder: "Max Mustermann\nMusterstrasse 1\n8000 Musterort",
    senderLabel: "Dein Absender",
    senderPlaceholder: "Christine Kieslich\nBeispielweg 2\n8000 Musterort",
    logoLabel: "Logo",
    signatureLabel: "Signatur",
    generateLogo: "Aus Initialen",
    remove: "Entfernen",
    drawSignature: "Unterschreiben",
    cityLabel: "Ort",
    cityPlaceholder: "Musterort",
    subjectLabel: "Betreff",
    optional: "Optional",
    sourceLabel: "Text einfügen",
    sourcePlaceholder: "Kopiere hier deinen Inhalt hinein. LetterFormer formatiert daraus einen Brief.",
    generate: "Brief erstellen",
    outputTitle: "Ausgabe",
    copy: "Kopieren",
    copied: "Kopiert",
    reset: "Reset",
    usageFreeTitle: "Kostenlos nutzbar",
    usageFreeText: "{remaining} von {limit} kostenlosen Ausgaben diese Woche übrig.",
    usageUnlockedTitle: "Freigeschaltet",
    usageUnlockedText: "Die Wochenbegrenzung ist aufgehoben.",
    limitTitle: "Deine kostenlosen Ausgaben sind genutzt.",
    limitText:
      "LetterFormer ist aktuell auf 2 Ausgaben pro Woche begrenzt. Vorschau und Bearbeitung bleiben weiterhin frei.",
    tabsLabel: "Ausgabe wählen",
    letterTab: "Brief",
    labelsTab: "Etiketten",
    emptyTitle: "Noch kein Brief erstellt.",
    emptyText: "Füge Text und Empfänger ein, dann erscheint hier die Vorschau.",
    printLetter: "Brief drucken",
    letterPreviewLabel: "Briefvorschau",
    printEnvelope: "Umschlag drucken",
    envelopePreviewLabel: "Umschlagvorschau",
    labelFormat: "Format",
    labelAmount: "Anzahl",
    labelAll: "Alle",
    labelAddress: "Adresse",
    labelRecipient: "Empfänger",
    labelSender: "Absender",
    labelStart: "Startposition",
    printLabels: "Etiketten drucken",
    labelPreviewLabel: "Etikettenvorschau",
    trustEyebrow: "Kurz wichtig",
    trustTitle: "Schnell helfen, ohne neue Hürden.",
    trustLead:
      "LetterFormer ist für Menschen gedacht, die einfach einen brauchbaren Brief brauchen: spät abends, zwischen Terminen, mit wenig Kraft oder wenig Zeit. Text rein, Brief raus.",
    trustLocalTitle: "Bleibt lokal",
    trustLocalText:
      "Deine Briefinhalte werden im Browser verarbeitet. Sie werden nicht an einen Server gesendet und von LetterFormer nicht gespeichert.",
    trustAccountTitle: "Ohne Konto",
    trustAccountText: "Keine Anmeldung, keine Installation, kein App Store. Öffnen, ausfüllen, prüfen, drucken oder kopieren.",
    trustLimitTitle: "Fair begrenzt",
    trustLimitText:
      "Aktuell sind 2 Ausgaben pro Woche kostenlos. Vorschau und Bearbeitung bleiben frei. Der Wochenzähler wird lokal in deinem Browser gespeichert.",
    trustCheckTitle: "Bitte prüfen",
    trustCheckText:
      "LetterFormer ist eine Formatierungs- und Schreibhilfe. Du bist für Inhalt, Richtigkeit und Rechtmässigkeit deines Briefes verantwortlich.",
    finePrint:
      "Hinweis: LetterFormer ersetzt keine Rechtsberatung. Für rechtlich wichtige Schreiben solltest du den Inhalt vor dem Versand besonders sorgfältig prüfen und gegebenenfalls anwaltlichen Rat einholen.",
    signatureDialogTitle: "Signatur zeichnen",
    signatureDialogHint: "Ein Klick startet die Linie, der nächste beendet sie.",
    undo: "Undo",
    clear: "Leeren",
    apply: "Übernehmen",
    close: "Schliessen",
    salutationEditLabel: "Anrede bearbeiten",
    closingEditLabel: "Grusszeile bearbeiten",
  },
  en: {
    metaDescription:
      "LetterFormer is a simple but effective letter generator for letters, envelopes and address labels.",
    languageLabel: "Choose language",
    claim: 'Text in <span aria-label="becomes">&#8605;</span> Letter out',
    intro: "A simple but effective letter generator that creates what you need in seconds.",
    workspaceLabel: "LetterFormer workspace",
    recipientLabel: "Who is the letter for?",
    recipientPlaceholder: "Max Sample\nSample Street 1\n8000 Exampletown",
    senderLabel: "Your sender details",
    senderPlaceholder: "Christine Kieslich\nExample Lane 2\n8000 Exampletown",
    logoLabel: "Logo",
    signatureLabel: "Signature",
    generateLogo: "From initials",
    remove: "Remove",
    drawSignature: "Sign",
    cityLabel: "Place",
    cityPlaceholder: "Exampletown",
    subjectLabel: "Subject",
    optional: "Optional",
    sourceLabel: "Paste text",
    sourcePlaceholder: "Paste your content here. LetterFormer turns it into a letter.",
    generate: "Create letter",
    outputTitle: "Output",
    copy: "Copy",
    copied: "Copied",
    reset: "Reset",
    usageFreeTitle: "Free to use",
    usageFreeText: "{remaining} of {limit} free outputs left this week.",
    usageUnlockedTitle: "Unlocked",
    usageUnlockedText: "The weekly limit has been removed.",
    limitTitle: "Your free outputs are used.",
    limitText: "LetterFormer is currently limited to 2 outputs per week. Preview and editing remain free.",
    tabsLabel: "Choose output",
    letterTab: "Letter",
    labelsTab: "Labels",
    emptyTitle: "No letter created yet.",
    emptyText: "Add text and recipient details, then the preview will appear here.",
    printLetter: "Print letter",
    letterPreviewLabel: "Letter preview",
    printEnvelope: "Print envelope",
    envelopePreviewLabel: "Envelope preview",
    labelFormat: "Format",
    labelAmount: "Amount",
    labelAll: "All",
    labelAddress: "Address",
    labelRecipient: "Recipient",
    labelSender: "Sender",
    labelStart: "Start position",
    printLabels: "Print labels",
    labelPreviewLabel: "Label preview",
    trustEyebrow: "Good to know",
    trustTitle: "Quick help, without new hurdles.",
    trustLead:
      "LetterFormer is for people who simply need a usable letter: late at night, between appointments, with little energy or little time. Text in, letter out.",
    trustLocalTitle: "Stays local",
    trustLocalText:
      "Your letter content is processed in your browser. It is not sent to a server and is not stored by LetterFormer.",
    trustAccountTitle: "No account",
    trustAccountText: "No sign-up, no installation, no app store. Open, fill in, check, print or copy.",
    trustLimitTitle: "Fairly limited",
    trustLimitText:
      "Currently, 2 outputs per week are free. Preview and editing remain free. The weekly counter is stored locally in your browser.",
    trustCheckTitle: "Please check",
    trustCheckText:
      "LetterFormer is a formatting and writing aid. You are responsible for the content, accuracy and legality of your letter.",
    finePrint:
      "Note: LetterFormer does not replace legal advice. For legally important letters, you should check the content especially carefully before sending and consult a lawyer if necessary.",
    signatureDialogTitle: "Draw signature",
    signatureDialogHint: "One click starts the line, the next ends it.",
    undo: "Undo",
    clear: "Clear",
    apply: "Apply",
    close: "Close",
    salutationEditLabel: "Edit salutation",
    closingEditLabel: "Edit closing line",
  },
};

if (!translations[state.language]) state.language = "de";

const labelPresets = {
  threeByEight: { total: 24, className: "threeByEight" },
  twoBySeven: { total: 14, className: "twoBySeven" },
};

const fields = {
  metaDescription: document.querySelector('meta[name="description"]'),
  languageSwitch: document.querySelector(".language-switch"),
  languageButtons: document.querySelectorAll("[data-language]"),
  claim: document.querySelector(".claim"),
  intro: document.querySelector(".intro"),
  workspace: document.querySelector(".workspace"),
  recipient: document.querySelector("#recipient"),
  recipientLabel: document.querySelector('label[for="recipient"]'),
  sender: document.querySelector("#sender"),
  senderLabel: document.querySelector('label[for="sender"]'),
  city: document.querySelector("#city"),
  cityLabel: document.querySelector('label[for="city"]'),
  subject: document.querySelector("#subject"),
  subjectLabel: document.querySelector('label[for="subject"]'),
  sourceText: document.querySelector("#source-text"),
  sourceLabel: document.querySelector('label[for="source-text"]'),
  form: document.querySelector("#letter-form"),
  generate: document.querySelector("#generate-button"),
  copy: document.querySelector("#copy-button"),
  reset: document.querySelector("#reset-button"),
  usageTitle: document.querySelector("#usage-title"),
  usageText: document.querySelector("#usage-text"),
  limitNotice: document.querySelector("#limit-notice"),
  logoInput: document.querySelector("#logo-input"),
  logoLabel: document.querySelector('label[for="logo-input"]'),
  signatureInput: document.querySelector("#signature-input"),
  signatureLabel: document.querySelector('label[for="signature-input"]'),
  logoPreview: document.querySelector("#logo-preview"),
  signaturePreview: document.querySelector("#signature-preview"),
  generateLogo: document.querySelector("#generate-logo"),
  clearLogo: document.querySelector("#clear-logo"),
  clearSignature: document.querySelector("#clear-signature"),
  openSignature: document.querySelector("#open-signature"),
  empty: document.querySelector("#preview-empty"),
  letterOutput: document.querySelector("#letter-output"),
  labelOutput: document.querySelector("#label-output"),
  letterPreview: document.querySelector("#letter-preview"),
  envelopePreview: document.querySelector("#envelope-preview"),
  labelPreview: document.querySelector("#label-preview"),
  labelPreset: document.querySelector("#label-preset"),
  labelAmount: document.querySelector("#label-amount"),
  labelAddress: document.querySelector("#label-address"),
  labelStart: document.querySelector("#label-start"),
  printLetter: document.querySelector("#print-letter"),
  printEnvelope: document.querySelector("#print-envelope"),
  printLabels: document.querySelector("#print-labels"),
  printLetterStage: document.querySelector("#print-letter-stage"),
  printEnvelopeStage: document.querySelector("#print-envelope-stage"),
  printLabelStage: document.querySelector("#print-label-stage"),
  outputTitle: document.querySelector("#output-title"),
  tabs: document.querySelector(".tabs"),
  letterTab: document.querySelector('[data-mode="letter"]'),
  labelsTab: document.querySelector('[data-mode="labels"]'),
  emptyTitle: document.querySelector("#preview-empty strong"),
  emptyText: document.querySelector("#preview-empty span"),
  limitTitle: document.querySelector("#limit-notice strong"),
  limitText: document.querySelector("#limit-notice span"),
  trustEyebrow: document.querySelector(".trust-copy .eyebrow"),
  trustTitle: document.querySelector("#trust-title"),
  trustLead: document.querySelector(".trust-copy p:not(.eyebrow)"),
  trustCards: document.querySelectorAll(".trust-grid article"),
  finePrint: document.querySelector(".fine-print"),
};

const signature = {
  dialog: document.querySelector("#signature-dialog"),
  canvas: document.querySelector("#signature-canvas"),
  title: document.querySelector(".signature-toolbar strong"),
  hint: document.querySelector(".signature-toolbar span"),
  undo: document.querySelector("#undo-signature"),
  clear: document.querySelector("#clear-canvas"),
  save: document.querySelector("#save-signature"),
  close: document.querySelector('.signature-toolbar button[type="submit"]'),
  strokes: [],
  activeStroke: null,
  mouseDrawing: false,
};

function t(key, replacements = {}) {
  const template = translations[state.language]?.[key] || translations.de[key] || key;
  return Object.entries(replacements).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    template,
  );
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function setLabelForControl(control, value) {
  const label = control.closest("label");
  if (!label) return;
  const firstTextNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
  if (firstTextNode) firstTextNode.textContent = `\n                ${value}\n                `;
}

function setTrustCard(index, title, text) {
  const card = fields.trustCards[index];
  if (!card) return;
  setText(card.querySelector("h3"), title);
  setText(card.querySelector("p"), text);
}

function trimmedLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function mondayWeekKey(date = new Date()) {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = localDate.getDay() || 7;
  localDate.setDate(localDate.getDate() - day + 1);
  return localDate.toISOString().slice(0, 10);
}

function loadEntitlement() {
  const fallback = {
    isUnlocked: false,
    weeklyLimit: 2,
    weekKey: mondayWeekKey(),
    usedThisWeek: 0,
  };

  try {
    const stored = JSON.parse(localStorage.getItem(entitlementStorageKey) || "{}");
    const entitlement = { ...fallback, ...stored };
    if (entitlement.weekKey !== fallback.weekKey) {
      entitlement.weekKey = fallback.weekKey;
      entitlement.usedThisWeek = 0;
    }
    state.entitlement = entitlement;
  } catch {
    state.entitlement = fallback;
  }
}

function saveEntitlement() {
  localStorage.setItem(entitlementStorageKey, JSON.stringify(state.entitlement));
}

function remainingFreeUses() {
  if (state.entitlement.isUnlocked) return Infinity;
  return Math.max(0, state.entitlement.weeklyLimit - state.entitlement.usedThisWeek);
}

function refreshEntitlementUI() {
  if (state.entitlement.isUnlocked) {
    fields.usageTitle.textContent = t("usageUnlockedTitle");
    fields.usageText.textContent = t("usageUnlockedText");
    fields.limitNotice.hidden = true;
    return;
  }

  const remaining = remainingFreeUses();
  fields.usageTitle.textContent = t("usageFreeTitle");
  fields.usageText.textContent = t("usageFreeText", {
    remaining,
    limit: state.entitlement.weeklyLimit,
  });
  fields.limitNotice.hidden = remaining > 0;
}

function applyLanguage() {
  document.documentElement.lang = state.language;
  document.title = "LetterFormer";

  if (fields.metaDescription) fields.metaDescription.content = t("metaDescription");
  if (fields.languageSwitch) fields.languageSwitch.setAttribute("aria-label", t("languageLabel"));
  fields.languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === state.language);
  });

  if (fields.claim) fields.claim.innerHTML = t("claim");
  setText(fields.intro, t("intro"));
  if (fields.workspace) fields.workspace.setAttribute("aria-label", t("workspaceLabel"));

  setText(fields.recipientLabel, t("recipientLabel"));
  fields.recipient.placeholder = t("recipientPlaceholder");
  setText(fields.senderLabel, t("senderLabel"));
  fields.sender.placeholder = t("senderPlaceholder");
  setText(fields.logoLabel, t("logoLabel"));
  setText(fields.signatureLabel, t("signatureLabel"));
  setText(fields.generateLogo, t("generateLogo"));
  setText(fields.clearLogo, t("remove"));
  setText(fields.openSignature, t("drawSignature"));
  setText(fields.clearSignature, t("remove"));
  setText(fields.cityLabel, t("cityLabel"));
  fields.city.placeholder = t("cityPlaceholder");
  setText(fields.subjectLabel, t("subjectLabel"));
  fields.subject.placeholder = t("optional");
  setText(fields.sourceLabel, t("sourceLabel"));
  fields.sourceText.placeholder = t("sourcePlaceholder");
  setText(fields.generate, t("generate"));

  setText(fields.outputTitle, t("outputTitle"));
  setText(fields.copy, t("copy"));
  setText(fields.reset, t("reset"));
  setText(fields.limitTitle, t("limitTitle"));
  setText(fields.limitText, t("limitText"));
  if (fields.tabs) fields.tabs.setAttribute("aria-label", t("tabsLabel"));
  setText(fields.letterTab, t("letterTab"));
  setText(fields.labelsTab, t("labelsTab"));
  setText(fields.emptyTitle, t("emptyTitle"));
  setText(fields.emptyText, t("emptyText"));
  setText(fields.printLetter, t("printLetter"));
  setText(fields.printEnvelope, t("printEnvelope"));
  setText(fields.printLabels, t("printLabels"));
  if (fields.letterPreview) fields.letterPreview.setAttribute("aria-label", t("letterPreviewLabel"));
  if (fields.envelopePreview) fields.envelopePreview.setAttribute("aria-label", t("envelopePreviewLabel"));
  if (fields.labelPreview) fields.labelPreview.setAttribute("aria-label", t("labelPreviewLabel"));

  setLabelForControl(fields.labelPreset, t("labelFormat"));
  setLabelForControl(fields.labelAmount, t("labelAmount"));
  setLabelForControl(fields.labelAddress, t("labelAddress"));
  setLabelForControl(fields.labelStart, t("labelStart"));
  fields.labelAmount.options[1].textContent = t("labelAll");
  fields.labelAddress.options[0].textContent = t("labelRecipient");
  fields.labelAddress.options[1].textContent = t("labelSender");

  setText(fields.trustEyebrow, t("trustEyebrow"));
  setText(fields.trustTitle, t("trustTitle"));
  setText(fields.trustLead, t("trustLead"));
  setTrustCard(0, t("trustLocalTitle"), t("trustLocalText"));
  setTrustCard(1, t("trustAccountTitle"), t("trustAccountText"));
  setTrustCard(2, t("trustLimitTitle"), t("trustLimitText"));
  setTrustCard(3, t("trustCheckTitle"), t("trustCheckText"));
  setText(fields.finePrint, t("finePrint"));

  setText(signature.title, t("signatureDialogTitle"));
  setText(signature.hint, t("signatureDialogHint"));
  setText(signature.undo, t("undo"));
  setText(signature.clear, t("clear"));
  setText(signature.save, t("apply"));
  setText(signature.close, t("close"));

  refreshEntitlementUI();
}

function canUseOutput() {
  return state.entitlement.isUnlocked || remainingFreeUses() > 0;
}

function registerOutputUse() {
  if (state.entitlement.isUnlocked) return;
  state.entitlement.usedThisWeek = Math.min(
    state.entitlement.weeklyLimit,
    state.entitlement.usedThisWeek + 1,
  );
  saveEntitlement();
  refreshEntitlementUI();
}

function ensureOutputAllowed() {
  if (canUseOutput()) return true;
  fields.limitNotice.hidden = false;
  fields.limitNotice.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function makeParagraphs(text) {
  const explicit = trimmedLines(text);
  if (explicit.length > 1) return explicit;

  const compact = text.trim();
  if (!compact) return [];

  return compact
    .split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ])/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function containsWord(text, word, caseSensitive = false) {
  const flags = caseSensitive ? "u" : "iu";
  return new RegExp(`\\b${word}\\b`, flags).test(text);
}

function addressTone(text) {
  const formal = ["Sie", "Ihnen", "Ihre", "Ihrer", "Ihrem", "Ihren", "Ihres"];
  if (formal.some((word) => containsWord(text, word, true))) return "formal";

  const informal = [
    "du",
    "dich",
    "dir",
    "dein",
    "deine",
    "deiner",
    "deinem",
    "deinen",
    "deines",
    "euch",
    "euer",
    "euere",
    "euren",
  ];
  if (informal.some((word) => containsWord(text, word))) return "informal";

  return "neutral";
}

function formalNamePart(words, titleIndex) {
  const suffix = words.slice(titleIndex + 1);
  const titles = suffix.filter((word) => ["dr.", "prof.", "prof", "dr"].includes(word.toLowerCase()));
  const lastName = suffix.at(-1) || "";
  return [...titles, lastName].filter(Boolean).join(" ");
}

function informalFirstName(words, titleIndex) {
  return (
    words
      .slice(titleIndex + 1)
      .find((word) => !["dr.", "prof.", "prof", "dr"].includes(word.toLowerCase())) || ""
  );
}

function makeGermanSalutation(recipientLines, body) {
  const recipientText = recipientLines.join(" ").toLowerCase();
  if (
    ["firma", "team", "abteilung", "gmbh", " ag", "verein"].some((needle) =>
      recipientText.includes(needle),
    )
  ) {
    return "Sehr geehrte Damen und Herren,";
  }

  const firstLine = recipientLines[0] || "";
  if (!firstLine) return "Sehr geehrte Damen und Herren,";

  const words = firstLine.split(/\s+/);
  const tone = addressTone(body);

  if (tone === "informal") {
    const frauIndex = words.findIndex((word) => word.toLowerCase() === "frau");
    if (frauIndex >= 0) {
      const firstName = informalFirstName(words, frauIndex);
      return firstName ? `Liebe ${firstName},` : `Liebe ${formalNamePart(words, frauIndex)},`;
    }

    const herrIndex = words.findIndex((word) => word.toLowerCase() === "herr");
    if (herrIndex >= 0) {
      const firstName = informalFirstName(words, herrIndex);
      return firstName ? `Lieber ${firstName},` : `Lieber ${formalNamePart(words, herrIndex)},`;
    }

    const firstName = words[0] || firstLine;
    const masculineHints = ["max", "moritz", "paul", "peter", "hans", "jan", "tim", "tom", "ben", "luca"];
    return masculineHints.includes(firstName.toLowerCase()) ? `Lieber ${firstName},` : `Liebe ${firstName},`;
  }

  if (tone === "neutral" && !recipientText.includes("frau") && !recipientText.includes("herr") && words.length >= 2) {
    return `Guten Tag ${firstLine},`;
  }

  const frauIndex = words.findIndex((word) => word.toLowerCase() === "frau");
  if (frauIndex >= 0) {
    const namePart = formalNamePart(words, frauIndex);
    return namePart ? `Sehr geehrte Frau ${namePart},` : "Sehr geehrte Frau,";
  }

  const herrIndex = words.findIndex((word) => word.toLowerCase() === "herr");
  if (herrIndex >= 0) {
    const namePart = formalNamePart(words, herrIndex);
    return namePart ? `Sehr geehrter Herr ${namePart},` : "Sehr geehrter Herr,";
  }

  if (words.length >= 2) return `Guten Tag ${firstLine},`;
  return "Sehr geehrte Damen und Herren,";
}

function englishTitle(word) {
  const normalized = word.toLowerCase().replace(/\.$/, "");
  const titles = {
    mr: "Mr.",
    mrs: "Mrs.",
    ms: "Ms.",
    miss: "Miss",
    dr: "Dr.",
    prof: "Prof.",
  };
  return titles[normalized] || "";
}

function makeEnglishSalutation(recipientLines) {
  const recipientText = recipientLines.join(" ").toLowerCase();
  if (
    ["company", "team", "department", "ltd", "inc", "gmbh", " ag", "verein"].some((needle) =>
      recipientText.includes(needle),
    )
  ) {
    return "Dear Sir or Madam,";
  }

  const firstLine = recipientLines[0] || "";
  if (!firstLine) return "Dear Sir or Madam,";

  const words = firstLine.split(/\s+/);
  const titleIndex = words.findIndex((word) => englishTitle(word));
  if (titleIndex >= 0) {
    const title = englishTitle(words[titleIndex]);
    const namePart = words.slice(titleIndex + 1).filter(Boolean);
    const lastName = namePart.at(-1) || "";
    return lastName ? `Dear ${title} ${lastName},` : `Dear ${title},`;
  }

  return `Dear ${firstLine},`;
}

function makeSalutation(recipientLines, body) {
  if (state.language === "en") return makeEnglishSalutation(recipientLines);
  return makeGermanSalutation(recipientLines, body);
}

function closingFor(salutation) {
  if (state.language === "en") return "Kind regards";
  return salutation.startsWith("Liebe ") || salutation.startsWith("Lieber ") || salutation.startsWith("Hallo ")
    ? "Liebe Grüsse"
    : "Mit freundlichen Grüssen";
}

function makeDocument() {
  const recipientLines = trimmedLines(state.recipient).slice(0, 6);
  const senderLines = trimmedLines(state.sender);
  const suggestedSalutation = makeSalutation(recipientLines, state.sourceText);
  const salutation = state.salutationOverride.trim() || suggestedSalutation;
  const suggestedClosing = closingFor(salutation);
  const closing = state.closingOverride.trim() || suggestedClosing;
  const date = new Intl.DateTimeFormat(state.language === "en" ? "en-GB" : "de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return {
    recipientLines,
    senderLines,
    senderLine: senderLines.join(" * "),
    placeAndDate: state.city.trim() ? `${state.city.trim()}, ${date}` : date,
    subject: state.subject.trim(),
    suggestedSalutation,
    salutation,
    suggestedClosing,
    closing,
    paragraphs: makeParagraphs(state.sourceText),
    signatureName: senderLines[0] || "",
  };
}

function inlineEditorConfig(type, documentData) {
  if (type === "closing") {
    return {
      value: documentData.closing,
      isSuggestion: !state.closingOverride.trim(),
      label: t("closingEditLabel"),
      className: "closing",
    };
  }

  return {
    value: documentData.salutation,
    isSuggestion: !state.salutationOverride.trim(),
    label: t("salutationEditLabel"),
    className: "salutation",
  };
}

function renderInlineEditable(type, documentData, isInteractive = false) {
  const config = inlineEditorConfig(type, documentData);

  if (!isInteractive) {
    return `<p class="${config.className}">${escapeHtml(config.value)}</p>`;
  }

  if (state.editingInlineField === type) {
    return `
      <div class="${config.className} inline-editor">
        <input
          id="${type}-input"
          class="inline-input"
          type="text"
          value="${escapeHtml(config.value)}"
          aria-label="${config.label}"
        />
      </div>
    `;
  }

  return `
    <button
      class="${config.className} inline-action ${config.isSuggestion ? "is-suggestion" : ""}"
      type="button"
      data-edit-inline="${type}"
      title="${config.label}"
    >
      ${escapeHtml(config.value)}
    </button>
  `;
}

function renderLetter(documentData, isInteractive = false) {
  const logo = state.logoDataUrl ? `<img class="page-logo" src="${state.logoDataUrl}" alt="" />` : "";
  const signatureImage = state.signatureDataUrl
    ? `<img class="signature-image" src="${state.signatureDataUrl}" alt="" />`
    : "";
  const subject = documentData.subject
    ? `<p class="subject-line">${escapeHtml(documentData.subject)}</p>`
    : `<p class="subject-line">&nbsp;</p>`;

  return `
    <span class="fold-mark fold-one"></span>
    <span class="hole-mark"></span>
    <span class="fold-mark fold-two"></span>
    ${logo}
    <div class="sender-large">${escapeHtml(documentData.senderLines.join("\n"))}</div>
    <div class="sender-line">${escapeHtml(documentData.senderLine)}</div>
    <div class="recipient-block">${escapeHtml(documentData.recipientLines.join("\n"))}</div>
    <div class="date-line">${escapeHtml(documentData.placeAndDate)}</div>
    <div class="letter-body">
      ${subject}
      ${renderInlineEditable("salutation", documentData, isInteractive)}
      ${documentData.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${renderInlineEditable("closing", documentData, isInteractive)}
      ${signatureImage}
      <p class="signature-name">${escapeHtml(documentData.signatureName)}</p>
    </div>
  `;
}

function renderEnvelope(documentData) {
  return `
    <div class="envelope-sender">${escapeHtml(documentData.senderLines.join("\n"))}</div>
    <div class="envelope-recipient">${escapeHtml(documentData.recipientLines.join("\n"))}</div>
  `;
}

function selectedLabelIndexes() {
  const preset = labelPresets[state.labelPreset];
  const startIndex = Math.max(0, Math.min(state.labelStart - 1, preset.total - 1));
  if (state.labelAmount === "all") {
    return new Set(Array.from({ length: preset.total - startIndex }, (_, index) => startIndex + index));
  }

  return new Set([startIndex, Math.min(startIndex + 1, preset.total - 1)]);
}

function renderLabels(documentData) {
  const preset = labelPresets[state.labelPreset];
  const selected = selectedLabelIndexes();
  const addressLines = state.labelAddress === "sender" ? documentData.senderLines : documentData.recipientLines;
  const address = escapeHtml(addressLines.join("\n"));
  const cells = Array.from({ length: preset.total }, (_, index) => {
    const isSelected = selected.has(index);
    return `<button type="button" class="label-cell ${isSelected ? "selected" : ""}" data-label-index="${index}">${isSelected ? address : ""}</button>`;
  }).join("");

  return cells;
}

function plainText(documentData) {
  const parts = [];
  if (documentData.senderLines.length) parts.push(documentData.senderLines.join("\n"));
  parts.push(documentData.recipientLines.join("\n"));
  parts.push(documentData.placeAndDate);
  if (documentData.subject) parts.push(documentData.subject);
  parts.push([documentData.salutation, ...documentData.paragraphs, documentData.closing].join("\n\n"));
  if (documentData.signatureName) parts[parts.length - 1] += `\n\n\n${documentData.signatureName}`;
  return parts.join("\n\n");
}

function syncStateFromInputs() {
  state.recipient = fields.recipient.value;
  state.sender = fields.sender.value;
  state.city = fields.city.value;
  state.subject = fields.subject.value;
  state.sourceText = fields.sourceText.value;
  fields.generate.disabled = !(state.recipient.trim() && state.sourceText.trim());
}

function refreshDocument() {
  if (!state.document) return;

  fields.empty.hidden = true;
  fields.letterOutput.hidden = state.mode !== "letter";
  fields.labelOutput.hidden = state.mode !== "labels";
  fields.copy.disabled = false;

  fields.letterPreview.innerHTML = renderLetter(state.document, true);
  fields.envelopePreview.innerHTML = renderEnvelope(state.document);
  fields.labelPreview.className = `label-preview ${labelPresets[state.labelPreset].className}`;
  fields.labelPreview.innerHTML = renderLabels(state.document);

  fields.printLetterStage.innerHTML = `<article class="paper-preview letter-page">${renderLetter(state.document, false)}</article>`;
  fields.printEnvelopeStage.innerHTML = `<article class="envelope-preview">${renderEnvelope(state.document)}</article>`;
  fields.printLabelStage.innerHTML = `<article class="label-preview ${labelPresets[state.labelPreset].className}">${renderLabels(state.document)}</article>`;

  fields.labelStart.max = String(labelPresets[state.labelPreset].total);
  refreshEntitlementUI();
}

function readImageFile(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(String(reader.result || "")));
  reader.readAsDataURL(file);
}

function initialsFromSender(sender) {
  const firstLine = trimmedLines(sender)[0] || "";
  const words = firstLine
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  if (!words.length) return "LF";
  const meaningfulWords = words.filter((word) => !["frau", "herr", "dr", "prof"].includes(word.toLowerCase()));
  const sourceWords = meaningfulWords.length ? meaningfulWords : words;
  const initials = sourceWords.length === 1 ? sourceWords[0].slice(0, 2) : `${sourceWords[0][0]}${sourceWords.at(-1)[0]}`;
  return initials.toUpperCase();
}

function generatedLogoDataUrl(sender) {
  const initials = escapeHtml(initialsFromSender(sender));
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 180">
      <rect width="420" height="180" rx="42" fill="#ffffff"/>
      <text x="286" y="104" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" fill="#043b86">${initials}</text>
      <path d="M52 120 C106 70 160 70 214 120 S322 170 376 120" fill="none" stroke="#0868d8" stroke-width="16" stroke-linecap="round"/>
      <path d="M66 132 C116 94 166 94 216 132 S314 164 354 132" fill="none" stroke="#5cbeff" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function setPreview(image, dataUrl) {
  image.hidden = !dataUrl;
  image.src = dataUrl || "";
}

function printMode(mode) {
  if (!ensureOutputAllowed()) return;
  registerOutputUse();
  document.body.classList.add(mode);
  window.print();
}

window.addEventListener("afterprint", () => {
  document.body.classList.remove("print-letter", "print-envelope", "print-labels");
});

[fields.recipient, fields.sender, fields.city, fields.subject, fields.sourceText].forEach((field) => {
  field.addEventListener("input", syncStateFromInputs);
});

fields.languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language;
    if (!translations[language] || state.language === language) return;

    state.language = language;
    localStorage.setItem(languageStorageKey, language);
    state.salutationOverride = "";
    state.closingOverride = "";
    state.editingInlineField = "";
    applyLanguage();

    if (state.document) {
      syncStateFromInputs();
      state.document = makeDocument();
      refreshDocument();
    }
  });
});

fields.form.addEventListener("submit", (event) => {
  event.preventDefault();
  syncStateFromInputs();
  state.salutationOverride = "";
  state.closingOverride = "";
  state.editingInlineField = "";
  state.document = makeDocument();
  refreshDocument();
});

function focusInlineInput(type) {
  const input = fields.letterPreview.querySelector(`#${type}-input`);
  if (!input) return;
  input.focus();
  input.select();
}

function updateInlineField(type, value) {
  if (!state.document) return;

  if (type === "closing") {
    state.closingOverride = value.trim();
    state.document.closing = state.closingOverride || state.document.suggestedClosing;
    return;
  }

  state.salutationOverride = value.trim();
  state.document.salutation = state.salutationOverride || state.document.suggestedSalutation;
  state.document.suggestedClosing = closingFor(state.document.salutation);
  state.document.closing = state.closingOverride.trim() || state.document.suggestedClosing;
}

function finishInlineEdit(type, value) {
  updateInlineField(type, value);
  state.editingInlineField = "";
  refreshDocument();
}

fields.letterPreview.addEventListener("click", (event) => {
  const editButton = event.target.closest("[data-edit-inline]");
  if (!editButton || !state.document) return;
  const type = editButton.dataset.editInline;
  state.editingInlineField = type;
  refreshDocument();
  requestAnimationFrame(() => focusInlineInput(type));
});

fields.letterPreview.addEventListener("keydown", (event) => {
  if (!event.target.matches(".inline-input")) return;
  const type = event.target.id.replace("-input", "");

  if (event.key === "Enter") {
    event.preventDefault();
    finishInlineEdit(type, event.target.value);
  }

  if (event.key === "Escape") {
    state.editingInlineField = "";
    refreshDocument();
  }
});

fields.letterPreview.addEventListener(
  "blur",
  (event) => {
    if (!event.target.matches(".inline-input")) return;
    const type = event.target.id.replace("-input", "");
    finishInlineEdit(type, event.target.value);
  },
  true,
);

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode || "letter";
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
    refreshDocument();
  });
});

fields.copy.addEventListener("click", async () => {
  if (!state.document) return;
  if (!ensureOutputAllowed()) return;
  await navigator.clipboard.writeText(plainText(state.document));
  registerOutputUse();
  fields.copy.textContent = t("copied");
  setTimeout(() => {
    fields.copy.textContent = t("copy");
  }, 1200);
});

fields.reset.addEventListener("click", () => {
  fields.form.reset();
  state.logoDataUrl = "";
  state.signatureDataUrl = "";
  state.labelAddress = fields.labelAddress.value;
  state.salutationOverride = "";
  state.closingOverride = "";
  state.editingInlineField = "";
  state.document = null;
  setPreview(fields.logoPreview, "");
  setPreview(fields.signaturePreview, "");
  fields.empty.hidden = false;
  fields.letterOutput.hidden = true;
  fields.labelOutput.hidden = true;
  fields.copy.disabled = true;
  applyLanguage();
  syncStateFromInputs();
});

fields.logoInput.addEventListener("change", () => {
  readImageFile(fields.logoInput.files[0], (dataUrl) => {
    state.logoDataUrl = dataUrl;
    setPreview(fields.logoPreview, dataUrl);
    refreshDocument();
  });
});

fields.generateLogo.addEventListener("click", () => {
  syncStateFromInputs();
  state.logoDataUrl = generatedLogoDataUrl(state.sender);
  fields.logoInput.value = "";
  setPreview(fields.logoPreview, state.logoDataUrl);
  refreshDocument();
});

fields.signatureInput.addEventListener("change", () => {
  readImageFile(fields.signatureInput.files[0], (dataUrl) => {
    state.signatureDataUrl = dataUrl;
    setPreview(fields.signaturePreview, dataUrl);
    refreshDocument();
  });
});

fields.clearLogo.addEventListener("click", () => {
  state.logoDataUrl = "";
  fields.logoInput.value = "";
  setPreview(fields.logoPreview, "");
  refreshDocument();
});

fields.clearSignature.addEventListener("click", () => {
  state.signatureDataUrl = "";
  fields.signatureInput.value = "";
  setPreview(fields.signaturePreview, "");
  refreshDocument();
});

fields.labelPreset.addEventListener("change", () => {
  state.labelPreset = fields.labelPreset.value;
  state.labelStart = Math.min(state.labelStart, labelPresets[state.labelPreset].total);
  fields.labelStart.value = String(state.labelStart);
  refreshDocument();
});

fields.labelAmount.addEventListener("change", () => {
  state.labelAmount = fields.labelAmount.value;
  refreshDocument();
});

fields.labelAddress.addEventListener("change", () => {
  state.labelAddress = fields.labelAddress.value;
  refreshDocument();
});

fields.labelStart.addEventListener("input", () => {
  state.labelStart = Number(fields.labelStart.value) || 1;
  refreshDocument();
});

fields.labelPreview.addEventListener("click", (event) => {
  const cell = event.target.closest("[data-label-index]");
  if (!cell) return;
  state.labelStart = Number(cell.dataset.labelIndex) + 1;
  fields.labelStart.value = String(state.labelStart);
  refreshDocument();
});

loadEntitlement();
applyLanguage();

fields.printLetter.addEventListener("click", () => printMode("print-letter"));
fields.printEnvelope.addEventListener("click", () => printMode("print-envelope"));
fields.printLabels.addEventListener("click", () => printMode("print-labels"));

fields.openSignature.addEventListener("click", () => {
  signature.dialog.showModal();
  resizeSignatureCanvas();
  drawSignatureCanvas();
});

function canvasPoint(event) {
  const rect = signature.canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * signature.canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * signature.canvas.height,
  };
}

function resizeSignatureCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = signature.canvas.getBoundingClientRect();
  signature.canvas.width = Math.max(640, Math.round(rect.width * ratio));
  signature.canvas.height = Math.max(220, Math.round(rect.height * ratio));
}

function drawSignatureCanvas() {
  const context = signature.canvas.getContext("2d");
  context.clearRect(0, 0, signature.canvas.width, signature.canvas.height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, signature.canvas.width, signature.canvas.height);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.strokeStyle = "#061522";
  context.lineWidth = 4;

  signature.strokes.forEach((stroke) => {
    context.beginPath();
    stroke.forEach((point, index) => {
      if (index === 0) context.moveTo(point.x, point.y);
      else context.lineTo(point.x, point.y);
    });
    context.stroke();
  });
}

signature.canvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  signature.canvas.setPointerCapture(event.pointerId);
  const point = canvasPoint(event);

  if (event.pointerType === "mouse") {
    if (signature.mouseDrawing) {
      signature.activeStroke.push(point);
      signature.activeStroke = null;
      signature.mouseDrawing = false;
    } else {
      signature.activeStroke = [point];
      signature.strokes.push(signature.activeStroke);
      signature.mouseDrawing = true;
    }
  } else {
    signature.activeStroke = [point];
    signature.strokes.push(signature.activeStroke);
  }

  drawSignatureCanvas();
});

signature.canvas.addEventListener("pointermove", (event) => {
  if (!signature.activeStroke) return;
  if (event.pointerType !== "mouse" && event.pressure === 0) return;
  signature.activeStroke.push(canvasPoint(event));
  drawSignatureCanvas();
});

signature.canvas.addEventListener("pointerup", (event) => {
  if (event.pointerType === "mouse") return;
  signature.activeStroke = null;
  drawSignatureCanvas();
});

signature.undo.addEventListener("click", () => {
  signature.strokes.pop();
  signature.activeStroke = null;
  signature.mouseDrawing = false;
  drawSignatureCanvas();
});

signature.clear.addEventListener("click", () => {
  signature.strokes = [];
  signature.activeStroke = null;
  signature.mouseDrawing = false;
  drawSignatureCanvas();
});

signature.save.addEventListener("click", () => {
  state.signatureDataUrl = signature.canvas.toDataURL("image/png");
  setPreview(fields.signaturePreview, state.signatureDataUrl);
  signature.dialog.close();
  refreshDocument();
});

window.addEventListener("resize", () => {
  if (signature.dialog.open) {
    resizeSignatureCanvas();
    drawSignatureCanvas();
  }
});

syncStateFromInputs();
