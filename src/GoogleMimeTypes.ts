// These mimeTypes are defined on https://developers.google.com/drive/api/v3/mime-types
// We list them here so we can refer to them as constants in our code.
export const MimeTypes = {
  Audio: "application/vnd.google-apps.audio",
  GoogleDoc: "application/vnd.google-apps.document",
  ThirdPartyShortcut: "application/vnd.google-apps.drive-sdk",
  GoogleDrawing: "application/vnd.google-apps.drawing",
  GoogleDriveFile: "application/vnd.google-apps.file",
  GoogleDriveFolder: "application/vnd.google-apps.folder",
  GoogleForm: "application/vnd.google-apps.form",
  GoogleFusionTables: "application/vnd.google-apps.fusiontable",
  GoogleMyMaps: "application/vnd.google-apps.map",
  GooglePhoto: "application/vnd.google-apps.photo",
  GoogleSlides: "application/vnd.google-apps.presentation",
  GoogleAppsScripts: "application/vnd.google-apps.script",
  Shortcut: "application/vnd.google-apps.shortcut",
  GoogleSite: "application/vnd.google-apps.site",
  GoogleSheet: "application/vnd.google-apps.spreadsheet",
  Unknown: "application/vnd.google-apps.unknown",
  Video: "application/vnd.google-apps.video",
};

export function isFolder(mimeType: string) {
  if (mimeType === undefined) {
    return false;
  }
  if (mimeType === MimeTypes.GoogleDriveFolder) {
    return true;
  }
  return false;
}
