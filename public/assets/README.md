# 🎵 DJ Chezzy Assets Ordner

Diese Ordnerstruktur wurde erstellt, um alle Ihre echten Bilder und Musikdateien zu organisieren.

## 📁 Ordnerstruktur

```
public/assets/
├── images/
│   ├── hero/           # Hero-Section Slideshow Bilder
│   ├── gallery/        # Galerie Fotos
│   ├── about/          # About-Section Bilder
│   └── testimonials/   # Kundenbewertung Fotos
└── music/              # Musik-Dateien für Player
```

## 🖼️ Bilder hinzufügen

### Hero-Section (3 Bilder benötigt):
Legen Sie diese Dateien in `public/assets/images/hero/`:
- `hero1.jpg` oder `hero1.png` - Hauptbild DJ Chezzy
- `hero2.jpg` oder `hero2.png` - Event/Performance Bild  
- `hero3.jpg` oder `hero3.png` - Latin/Urban Vibes Bild

**Empfohlene Größe:** 1920x1080px (Full HD, 16:9 Format)

### Galerie (beliebig viele Bilder):
Legen Sie Ihre Event-Fotos in `public/assets/images/gallery/`:
- `gallery1.jpg`, `gallery2.jpg`, etc.
- Oder verwenden Sie beschreibende Namen: `hochzeit-2024.jpg`, `geburtstag-party.jpg`

**Empfohlene Größe:** Mindestens 800x600px, verschiedene Formate möglich

### About-Section:
Legen Sie Ihr DJ-Profilbild in `public/assets/images/about/`:
- `profile.jpg` oder `about-dj.jpg`

**Empfohlene Größe:** 500x500px (quadratisch)

### Testimonials:
Legen Sie Kundenfotos in `public/assets/images/testimonials/`:
- `kunde1.jpg`, `kunde2.jpg`, etc.

**Empfohlene Größe:** 150x150px (kleine Profilbilder)

## 🎵 Musik hinzufügen

Legen Sie Ihre Musik-Samples in `public/assets/music/`:

### Unterstützte Formate:
- `.mp3` (empfohlen)
- `.wav`
- `.ogg`

### Beispiel-Dateien:
- `salsa-caliente.mp3`
- `bachata-romance.mp3`
- `reggaeton-fire.mp3`
- `latin-hits.mp3`

**Wichtig:** Halten Sie die Dateien klein (max. 5MB pro Song) für bessere Ladezeiten.

## 🔧 Verwendung in der App

Nach dem Hinzufügen Ihrer Dateien werden die Components automatisch aktualisiert, um die lokalen Assets zu verwenden:

### Bilder verwenden:
```javascript
// Beispiel für Hero-Bild
src="/assets/images/hero/hero1.jpg"

// Beispiel für Galerie-Bild  
src="/assets/images/gallery/party-2024.jpg"
```

### Musik verwenden:
```javascript
// Beispiel für Musik-Player
src="/assets/music/salsa-caliente.mp3"
```

## 📝 Tipps

1. **Dateinamen:** Verwenden Sie keine Leerzeichen oder Sonderzeichen
   - ✅ Gut: `dj-chezzy-performance.jpg`
   - ❌ Schlecht: `DJ Chezzy Performance!.jpg`

2. **Bildoptimierung:** Komprimieren Sie Ihre Bilder für bessere Performance
   - Online-Tools: TinyPNG, Squoosh.app

3. **Musikqualität:** Verwenden Sie gute Qualität, aber nicht zu große Dateien
   - Empfohlen: 128-192 kbps MP3

4. **Backup:** Behalten Sie immer Kopien Ihrer Original-Dateien

## 🚀 Nächste Schritte

1. Fügen Sie Ihre Bilder und Musik in die entsprechenden Ordner hinzu
2. Die App wird automatisch die neuen Assets erkennen
3. Testen Sie die Website, um sicherzustellen, dass alles korrekt lädt

Bei Fragen zur Implementierung, lassen Sie es mich wissen! 🎧 