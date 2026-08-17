<?php
$sent = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string)($_POST['name'] ?? ''));
    $email = trim((string)($_POST['email'] ?? ''));
    $message = trim((string)($_POST['message'] ?? ''));
    $website = trim((string)($_POST['website'] ?? ''));

    if ($website !== '') {
        $sent = true;
    } elseif ($name === '' || $email === '' || $message === '') {
        $error = 'Bitte fülle alle Felder aus.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    } elseif (mb_strlen($name) > 120 || mb_strlen($email) > 180 || mb_strlen($message) > 5000) {
        $error = 'Deine Nachricht ist zu lang. Bitte kürze sie etwas.';
    } elseif (preg_match('/[\r\n]/', $email)) {
        $error = 'Die E-Mail-Adresse ist ungültig.';
    } else {
        $to = 'christine.kieslich@mail.ch';
        $subject = 'LetterFormer-Support';
        $safeName = str_replace(["\r", "\n"], ' ', $name);

        $body = "Neue Supportanfrage zu LetterFormer\n\n";
        $body .= "Name: {$safeName}\n";
        $body .= "E-Mail: {$email}\n\n";
        $body .= "Nachricht:\n{$message}\n";

        $headers = [
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'From: LetterFormer Support <support@christinekieslich.ch>',
            'Reply-To: ' . $email,
        ];

        if (@mail($to, $subject, $body, implode("\r\n", $headers))) {
            $sent = true;
        } else {
            $error = 'Die Nachricht konnte gerade nicht gesendet werden. Bitte versuche es später erneut.';
        }
    }
}
?>
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Support für LetterFormer" />
    <title>LetterFormer-Support</title>
    <link rel="stylesheet" href="/letterformer/styles.css" />
    <style>
      .support-shell { width: min(760px, calc(100% - 28px)); margin: 0 auto; padding: 34px 0 56px; }
      .support-back { display: inline-block; margin-bottom: 22px; color: var(--deep-blue); font-weight: 700; text-decoration: none; }
      .support-card { display: grid; gap: 18px; padding: 24px; border: 1.5px solid var(--deep-blue); border-radius: 28px; background: rgba(255,255,255,.9); box-shadow: 0 18px 38px rgba(4,59,134,.16); }
      .support-card h1 { font-size: clamp(2rem, 7vw, 3.4rem); }
      .support-card p { margin: 0; font-family: var(--doc-font); line-height: 1.55; }
      .support-form { display: grid; gap: 14px; }
      .support-form textarea { min-height: 180px; }
      .support-submit { min-height: 48px; padding: 0 22px; border: 0; border-radius: 999px; color: #fff; font-weight: 700; background: var(--deep-blue); cursor: pointer; }
      .support-status { padding: 14px 16px; border-radius: 16px; font-family: var(--doc-font); line-height: 1.45; background: rgba(234,246,255,.8); }
      .support-status.error { border: 1px solid rgba(140,30,30,.35); }
      .support-note { color: rgba(6,21,34,.72); font-size: .92rem; }
      .hp-field { position: absolute !important; left: -9999px !important; width: 1px !important; height: 1px !important; overflow: hidden !important; }
    </style>
  </head>
  <body>
    <main class="support-shell">
      <a class="support-back" href="/app-development.html">← Zurück zu LetterFormer</a>
      <section class="support-card" aria-labelledby="support-title">
        <div>
          <h1 id="support-title">LetterFormer-Support</h1>
          <div class="brand-wave" aria-hidden="true"></div>
        </div>
        <?php if ($sent): ?>
          <div class="support-status" role="status"><strong>Danke!</strong><br />Deine Nachricht wurde gesendet. Ich melde mich so bald wie möglich bei dir.</div>
        <?php else: ?>
          <p>Du hast eine Frage, einen Fehler gefunden oder möchtest Feedback zu LetterFormer senden? Schreib mir hier direkt über das Formular.</p>
          <?php if ($error !== ''): ?>
            <div class="support-status error" role="alert"><?php echo htmlspecialchars($error, ENT_QUOTES, 'UTF-8'); ?></div>
          <?php endif; ?>
          <form class="support-form" method="post" action="">
            <div class="field">
              <label for="name">Name</label>
              <input id="name" name="name" type="text" maxlength="120" autocomplete="name" required value="<?php echo htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" />
            </div>
            <div class="field">
              <label for="email">Deine E-Mail-Adresse</label>
              <input id="email" name="email" type="email" maxlength="180" autocomplete="email" required value="<?php echo htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" />
            </div>
            <div class="field">
              <label for="message">Nachricht</label>
              <textarea id="message" name="message" maxlength="5000" required><?php echo htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8'); ?></textarea>
            </div>
            <div class="hp-field" aria-hidden="true">
              <label for="website">Website</label>
              <input id="website" name="website" type="text" tabindex="-1" autocomplete="off" />
            </div>
            <button class="support-submit" type="submit">Nachricht senden</button>
          </form>
          <p class="support-note">Deine Angaben werden nur verwendet, um deine Supportanfrage zu beantworten. Bitte sende keine sensiblen Briefinhalte über dieses Formular.</p>
        <?php endif; ?>
      </section>
    </main>
  </body>
</html>
