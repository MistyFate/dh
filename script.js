const express = require('express');
const fs = require('fs');
const serveStatic = require('serve-static'); // Import serve-static

// Express-App initialisieren
const app = express();
const port = 3000; 

// Middleware zum Parsen von JSON-Daten aus dem Request Body
app.use(express.json()); 

// Statische Dateien aus dem Ordner "public" bereitstellen
app.use(express.static('public')); 

// Zusätzliches Middleware für CSS-Dateitypen (optional)
app.use(serveStatic('public', { 
  // Header für CSS-Dateien setzen
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) { // Wenn die Dateiendung ".css" ist
      res.setHeader('Content-Type', 'text/css'); 
    }
  }
}));

// GET-Route-Handler für die Startseite ("/")
app.get('/', (req, res) => {
  res.send('Willkommen auf der Startseite!'); 
});

// POST-Route-Handler zum Speichern von Daten ("/save_data")
app.post('/save_data', (req, res) => {
  // Daten aus dem Request Body extrahieren
  const data = req.body;

  // Daten aus der Datei "fahrten.json" lesen
  fs.readFile('fahrten.json', 'utf8', (err, fileData) => {
    if (err) {
      console.error("Fehler beim Lesen der Daten aus der Datei:", err);
      return res.status(500).send("Fehler beim Speichern der Daten");
    }

    let jsonData = [];
    try {
      // Versuch, die gelesenen Daten als JSON zu parsen
      jsonData = JSON.parse(fileData);
    } catch (parseError) {
      console.error("Fehler beim Parsen der JSON-Daten:", parseError);
    }

    // Neue Daten an das bestehende JSON-Array anhängen
    jsonData.push(data);

    // Geänderte Daten in die Datei "fahrten.json" schreiben
    fs.writeFile('fahrten.json', JSON.stringify(jsonData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Fehler beim Schreiben der Daten in die Datei:", writeErr);
        return res.status(500).send("Fehler beim Speichern der Daten");
      }

      console.log("Daten erfolgreich in die Datei gespeichert!");
      res.send("Daten erfolgreich gespeichert!");
    });
  });
});

// Server starten und auf Port 3000 lauschen
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});