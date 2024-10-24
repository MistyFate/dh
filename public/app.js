// Wenn das DOM (Document Object Model) vollständig geladen ist, wird der Code innerhalb der Callback-Funktion ausgeführt.
document.addEventListener('DOMContentLoaded', () => {
    // Hole eine Referenz auf das HTML-Formular mit der ID "fahrtenForm".
    const fahrtenForm = document.getElementById('fahrtenForm');
  
    // Hole eine Referenz auf das `<tbody>`-Element innerhalb der Tabelle mit der ID "fahrtenTabelle".
    // Hier werden die neuen Tabellenzeilen eingefügt.
    const fahrtenTabelle = document
      .getElementById('fahrtenTabelle')
      .getElementsByTagName('tbody')[0];
  
    // Füge einen Event-Listener zum `submit`-Event des Formulars hinzu.
    // Wenn das Formular abgeschickt wird, wird der Code innerhalb der Callback-Funktion ausgeführt.
    fahrtenForm.addEventListener('submit', async (event) => {
      // Verhindere das Standardverhalten des Formulars, das normalerweise die Seite neu lädt.
      event.preventDefault();
  
      // Hole die Werte aus den Eingabefeldern.
      const datum = new Date().toLocaleDateString("de-DE"); // Datum der Fahrt
      const fahrzeug = document.getElementById('fahrzeug').value; // Fahrzeug, das genutzt wurde
      const kilometer = document.getElementById('kilometer').value; // Gefahrene Kilometer
      const ort = document.getElementById('ort').value; // Ziel der Fahrt
      const anmerkung = document.getElementById('anmerkung').value; // Grund für die Fahrt
      const fahrer = document.getElementById('fahrer').value; // Fahrer der Fahrt
  
      // Verwende einen `try...catch`-Block, um potenzielle Fehler während der AJAX-Anfrage abzufangen.
      try {
        // Sende eine asynchrone POST-Anfrage an den Server-Endpoint `/save_data`.
        // Die Anfrage enthält die gesammelten Formulardaten als JSON im Anfrage-Body.
        const response = await fetch('/save_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            datum,
            fahrzeug,
            fahrer,
            kilometer,
            ort,
            anmerkung,
          }),
        });
  
        // Überprüfe den Antwortstatus vom Server.
        if (response.ok) {
          // Behandle erfolgreiche Datenspeicherung (z.B. aktualisiere die Tabelle).
          console.log('Daten erfolgreich gespeichert!');
  
          // Füge den neuen Eintrag zur Tabelle hinzu.
          const newRow = fahrtenTabelle.insertRow();
          newRow.insertCell().textContent = datum;
          newRow.insertCell().textContent = fahrzeug;
          newRow.insertCell().textContent = fahrer;
          newRow.insertCell().textContent = kilometer;
          newRow.insertCell().textContent = ort;
          newRow.insertCell().textContent = anmerkung;
        } else {
          // Behandle Fehler während der Datenspeicherung.
          console.error('Fehler beim Speichern der Daten:', response.status);
        }
      } catch (error) {
        // Behandle allgemeine Fehler, die während der AJAX-Anfrage auftreten können.
        console.error('Fehler beim Speichern der Daten:', error);
      }
    });
  });