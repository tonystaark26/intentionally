# Intentionally

Offline Mass book and personal accounts for priests. Plain HTML, CSS and JavaScript, no server.

- `src/app.html` is the whole app. `build.sh` wraps it into `docs/`, adding the manifest, service worker and icons.
- Data is saved on the device (browser localStorage). Backups: a JSON file, or the user's own Google Drive app folder.
- Mass book columns are editable in Settings; defaults live in `DEFAULT_TYPES` in `src/app.html`.

## Try it
Live at https://tonystaark26.github.io/intentionally/ (GitHub Pages serves `docs/` on `main`). After editing `src/app.html`, run `./build.sh` and commit `docs/`.

Locally: `python3 -m http.server -d docs`, then open it on a phone. Use "Add to Home screen" to install. It works offline after the first load.

## Google Drive backup
1. In Google Cloud Console create a project, enable the Google Drive API, set up the OAuth consent screen.
2. Create an OAuth Client ID of type "Web application" and add the site address (for example `https://yourname.github.io`) as an authorized JavaScript origin.
3. Paste the client ID into `GOOGLE_CLIENT_ID` in `src/app.html` and run `./build.sh`.
The app only asks for the `drive.appdata` scope, so it can see only its own backup file.

## Later: Android and iPhone
Wrap `docs/` with Capacitor, or publish the PWA to the Play Store with a Trusted Web Activity.
