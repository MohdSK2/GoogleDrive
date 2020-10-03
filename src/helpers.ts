// General easy functions/methods to have.
import { MimeTypes } from "./GoogleMimeTypes";

export function getBoolean(value) {
  switch (value) {
    case true:
    case "true":
    case 1:
    case "1":
    case "on":
    case "yes":
      return true;
    default:
      return false;
  }
}

export function isFolder(mimeType: string) {
  if (mimeType === undefined) {
    return false;
  }
  if (mimeType === MimeTypes.GoogleDriveFolder) {
    return true;
  }
  return false;
}

export function getSingleParent(parent: [string]) {
  if (parent === undefined) {
    return undefined;
  }
  if (!Array.isArray(parent)) {
    return undefined;
  }

  return parent[0];
}
