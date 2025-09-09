// personalized_pdf.js – erzeugt eine persönliche PDF mit den aktuell gewählten Namen
// nutzt jsPDF rein im Browser (GitHub Pages reicht vollkommen)

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("download-custom");
  const statusEl = document.getElementById("download-status");

  // IDs wie in customize.js
  const relSelect   = document.getElementById("rel-select");
  const relCustom   = document.getElementById("rel-custom");
  const childCustom = document.getElementById("child-custom");

  const DEFAULT_REL   = "Mama";
  const DEFAULT_CHILD = "Noël";

  // Hilfsfunktionen
  function currentNames() {
    const rel   = (relCustom.value || "").trim() || relSelect.value || DEFAULT_REL;
    const child = (childCustom.value || "").trim() || DEFAULT_CHILD;
    return { rel, child };
  }

  // jsPDF hat mit manchen Sonderzeichen (z. B. „ë“) je nach Font Probleme.
  // Wir sanitizen nur für die PDF (nicht auf der Seite):
  function sanitizeForPdf(text) {
    // Diakritika entfernen (NFD)
    let t = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    // Typografische Zeichen vereinfachen
    t = t
      .replace(/„|“/g, '"')
      .replace(/‚|’/g, "'")
      .replace(/–|—/g, "-")
      .replace(/…/g, "...");
    return t;
  }

  // ====== Vollständiger Geschichtstext (finale Version) mit Platzhaltern {{child}} / {{rel}} ======
  // Absätze durch \n\n trennen
  const STORY = `
{{child}} wusste schon beim Abendessen, dass {{child}} eigentlich wieder einmal keine Lust hatte, ins Bett zu gehen. Die Dunkelheit gefiel {{child}} nicht – und schlafen zu müssen sowieso nicht. Viel lieber wollte {{child}} spielen und noch mehr Abenteuer erleben.

Gleichzeitig war {{child}} aber so unendlich müde. {{child}} wusste selbst nicht, warum {{child}} sich nicht darauf freute, sich in das superweiche und warme Kinderbettchen zu kuscheln. Stattdessen dachte {{child}} darüber nach, wie {{child}} es anstellen könnte, noch etwas länger wach zu bleiben.

In Gedanken versunken betrachtete {{child}} die Kokosnuss, die {{rel}} extra gekauft hatte. {{rel}} hatte ein Loch in die harte Schale gebohrt, und so konnte {{child}} mit einem Röhrchen tatsächlich die süße Kokosmilch trinken. Es war faszinierend – {{child}} konnte es kaum glauben!

{{rel}} wollte die Kokosnuss nun ganz öffnen und verließ deshalb kurz die Küche, um den Hammer zu holen.

Da geschah etwas Seltsames: Die Kokosnuss bewegte sich plötzlich ganz leicht. Sie wippte von links nach rechts … dann blieb sie still.

{{child}} rieb sich die Augen. Hatte {{child}} das nur geträumt? Doch nach einer kleinen Pause wackelte die Kokosnuss noch einmal. {{child}} traute den eigenen Augen nicht! {{child}} beugte sich näher heran – und tatsächlich, sie bewegte sich schon wieder.

Dann, als {{child}} mit dem Gesicht ganz nah an der Kokosnuss war, machte es plötzlich plopp und die Kokosnuss zersprang in zwei Hälften. Heraus kam ein kleines, rundes Wesen mit leuchtenden Augen.

„Hallo, {{child}}“, sagte es mit einer sanften Stimme. „Ich bin Gipititi.“

{{child}} staunte. „Woher kennst du meinen Namen? Und … wer bist du überhaupt?“

Gipititi lächelte. „Du hast mich mit deinen Gedanken erschaffen. Und genau so, wie sie dir jeden Abend um den Kopf schwirren, wenn du schlafen willst, helfe ich dir jetzt, sie zu sortieren. Wir verwandeln sie in kleine Gedankenwölkchen, die eins nach dem anderen ganz leicht davonschweben. Ich puste sie sanft weg, damit sie auf die Reise gehen können und du sie loslassen darfst.“

{{child}} nickte langsam. „Das ist eine tolle Idee! Vielleicht kann ich dann leichter einschlafen. Denn eigentlich bin ich schon richtig müde, aber ich mag die Dunkelheit nicht … und die vielen Gedanken, die gleichzeitig um meinen Kopf herumschwirren …“

Gipititi nickte verständnisvoll. „Genau deshalb bin ich hier. Damit du dich beim Einschlafen wieder wohlfühlst und die Dunkelheit dir nichts mehr ausmacht – und du schon am Abend spüren kannst, dass die Nacht dir Ruhe schenkt und dich für den nächsten Tag voller Freude stärkt.“

Gipititi blickte zu der aufgesprungenen Kokosnuss. „Aber zuerst“, sagte es sanft, „lass uns darauf achten, dass deine Kokosnuss nicht mehr so traurig aussieht. Ich kenne ein Zauber-Rezept, mit dem wir etwas ganz Leckeres backen können.“

Zusammen begannen sie, die Kokosstückchen aus der harten Schale zu brechen. {{child}} zerdrückte die Banane mit einer Gabel – das konnte {{child}} schon richtig gut, denn {{rel}} hatte es {{child}} beigebracht.

Gipititi flatterte mit den kleinen Flügelchen aufgeregt durch die Küche, begleitet von glitzerndem Sternenstaub. Plötzlich begann es, einen Wirbel zu tanzen, der immer schneller wurde. Es schlug noch ein letztes Mal kräftig mit den Flügeln, drehte sich im Kreis und landete wieder auf dem Küchentisch.

Es duftete plötzlich herrlich nach süßen Muffins, die Gipititi {{child}} freudestrahlend präsentierte. {{child}} hatte keine Ahnung, wie das wundersame Wesen das gemacht hatte – doch die Muffins schmeckten traumhaft.

Sie erinnerten {{child}} an das Meer, an den Wind, der in einer leichten Brise durch die Haare strich, an einen Strand und an einen wunderschönen Sonnenuntergang.

Gipititi lächelte. „Es freut mich sehr, dass dir die Muffins geschmeckt haben, {{child}}. Aber jetzt ist Schlafenszeit – es ist schon sehr spät. Wir möchten, dass du morgen ausgeruht und fröhlich bist. Mach dir keine Sorgen, ich begleite dich.“

Gipititi setzte sich neben {{child}}, sah {{child}} freundlich an und sagte mit ruhiger, klarer Stimme: „Ich bleibe bei dir. Ich kuschle mich neben dich, begleite dich in deinen Gedanken und puste sie als kleine Wölkchen davon. So kannst du sicher und ruhig einschlafen … und dich schon jetzt auf den nächsten Tag freuen.“

{{child}} spürte noch den süßen Geschmack der Muffins im Mund. {{child}} erinnerte sich an das Meer, den Wind und den Sonnenuntergang – das Abenteuergefühl machte ganz ruhig und zufrieden.

In diesem Moment begann Gipititi sanft zu leuchten. Langsam verwandelten sich die Gedanken von {{child}} in kleine, helle Wölkchen, die nacheinander davon schwebten.

Und dann geschah etwas Wundervolles: {{child}} fühlte plötzlich eine Leichtigkeit, als würde {{child}} schweben. Es war, als ob eine vertraute und doch so wundersame Umarmung trüge – warm und sicher, ganz nah.

So schwebte {{child}} in dieser Umarmung in das Zimmer, bis sie sich senkte und {{child}} sanft in dem Bettchen ablegte. {{child}} kuschelte sich in das warme, weiche Bett, nahm das Glitzern um sich herum wahr und sah gerade noch, wie Gipititi vor den fast geschlossenen Augen zu einem wunderschönen, leuchtenden Stern wurde.

Der Stern schwebte über {{child}}, tauchte das Zimmer in ein warmes, friedliches Licht und hüllte {{child}} in Geborgenheit. {{child}} fühlte ein tiefes Vertrauen, Ruhe und Sicherheit – und schlief glücklich ein.

Von nun an war es so: Jedes Mal, wenn die Gedanken von {{child}} wieder wie kleine Fliegen um den Kopf schwirrten und vom Einschlafen abhalten wollten, erschien Gipititi. Sanft verwandelte es die Gedanken in kleine Wölkchen, schickte sie auf eine Traumreise und leuchtete {{child}} in der Dunkelheit.

Und weil {{child}} wusste, dass darauf Verlass ist, machte es {{child}} nie mehr etwas aus, abends im eigenen, kuscheligen Bettchen einzuschlafen.
  `.trim();

  // ====== PDF-Erzeugung ======
  btn.addEventListener("click", async () => {
    try {
      statusEl.textContent = "Erzeuge persönliche PDF …";
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: "pt", format: "a4" });

      const { rel, child } = currentNames();

      // Text mit Namen befüllen & für PDF sanitizen
      let story = STORY.replace(/{{rel}}/g, rel).replace(/{{child}}/g, child);
      story = sanitizeForPdf(story);

      // PDF-Meta
      doc.setProperties({
        title: "Gipititi und die Kokosnuss – persönliche Ausgabe",
        subject: "Kinder­geschichte",
        author: "Christine (mit ChatGPT als Werkzeug)",
        creator: "Website",
      });

      // Layout
      const margin = 56;               // 20 mm
      const lineHeight = 18;           // pt
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const contentW = pageW - margin * 2;
      let y = margin;

      // Titel
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Gipititi und die Kokosnuss", margin, y);
      y += 10;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(11);
      doc.text(`Persönliche Ausgabe für ${sanitizeForPdf(child)}`, margin, y);
      y += 22;

      // Absätze schreiben
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);

      const paragraphs = story.split(/\n\s*\n/);
      paragraphs.forEach((para, idx) => {
        const lines = doc.splitTextToSize(para, contentW);
        const blockH = lines.length * lineHeight;

        // bei Bedarf neue Seite
        if (y + blockH > pageH - margin) {
          doc.addPage();
          y = margin;
        }

        doc.text(lines, margin, y);
        y += blockH + lineHeight; // Absatzabstand
      });

      // Footer-Hinweis (klein)
      if (y > pageH - margin - 40) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        "Hinweis: Diese PDF wurde auf der Website mit deinen eingegebenen Namen erstellt – nur für privaten Gebrauch.",
        margin, pageH - margin
      );
      doc.setTextColor(0);

      // Download
      const filename = `Gipititi_${sanitizeForPdf(child)}.pdf`;
      doc.save(filename);
      statusEl.textContent = "Fertig! Die Datei wurde heruntergeladen.";
    } catch (e) {
      console.error(e);
      statusEl.textContent = "Uups – die PDF konnte nicht erzeugt werden.";
    }
  });
});