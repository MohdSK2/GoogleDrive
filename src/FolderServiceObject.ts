import { fetch_get } from "./fetch";
import "@k2oss/k2-broker-core";
import { FolderProperties, FolderMethods } from "./ServiceObjects";
import { URLs } from "./URLs";
import { MimeTypes } from "./GoogleMimeTypes";

export async function executeFolder(
  methodName: string,
  properties: SingleRecord,
  parameters: SingleRecord
) {
  switch (methodName) {
    case FolderMethods.getList:
      await executeGetList(properties);
      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}

async function executeGetList(properties: SingleRecord) {
  if (typeof properties[FolderProperties.id] !== "string") {
    throw new Error(`properties[${FolderProperties.id}] is not of type number`);
  }

  var folderId = properties[FolderProperties.id] as string;

  const allItems = await GetFolderContent(folderId);
  postResult(
    allItems.map((x) => {
      return {
        [FolderProperties.id]: x.id,
        [FolderProperties.name]: x.name,
        [FolderProperties.description]: x.description ? x.description : "",
        [FolderProperties.tags]: x.properties,
        [FolderProperties.size]: x.size ? x.size : 0,
        [FolderProperties.istrashed]: x.trashed,
        [FolderProperties.isdirectory]:
          x.mimeType == MimeTypes.GoogleDriveFolder,
        [FolderProperties.mimetype]: x.mimeType,
        [FolderProperties.modifiedDate]: x.modifiedTime,
        [FolderProperties.createdDate]: x.createdTime,
        [FolderProperties.url]: x.webViewLink,
      };
    })
  );
}

async function GetFolderContent(
  folderId: string,
  nextPageToken?: string,
  current = []
) {
  let qs = {
    pageToken: nextPageToken ? nextPageToken : "",
    fields:
      "nextPageToken,files(id,name,description,properties,size,trashed,mimeType,modifiedTime,createdTime,webViewLink)",
    q: `'${folderId}' in parents`,
    pageSize: 5,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  };
  const res = await fetch_get(URLs.Files, qs);
  const jsonRes = JSON.parse(res);
  current.push(...jsonRes.files);
  const token = jsonRes.nextPageToken;
  if (token) {
    return await GetFolderContent(folderId, token, current);
  }
  return current;
}
