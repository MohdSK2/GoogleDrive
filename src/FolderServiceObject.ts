import "@k2oss/k2-broker-core";
import { fetch_get } from "./fetch";
import { getBoolean } from "./helpers";
import { FolderProperties, FolderMethods } from "./ServiceObjects";
import { URLs } from "./URLs";
import { isFolder } from "./GoogleMimeTypes";

export async function executeFolder(
  methodName: string,
  properties: SingleRecord,
  configuration: SingleRecord
) {
  switch (methodName) {
    case FolderMethods.getList:
      await executeGetList(properties, configuration);
      break;
    case FolderMethods.getInfo:
      await executeGetInfo(properties);
      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}

async function executeGetList(
  properties: SingleRecord,
  configuration: SingleRecord
) {
  if (typeof properties[FolderProperties.id] !== "string") {
    throw new Error(`properties[${FolderProperties.id}] is not of type number`);
  }
  const showTrashed = await getBoolean(configuration["ShowTrashed"]);
  const folderId = properties[FolderProperties.id] as string;

  const allItems = await GetFolderContent(folderId, showTrashed);
  postResult(
    allItems.map((x) => {
      return {
        [FolderProperties.id]: x.id,
        [FolderProperties.name]: x.name,
        [FolderProperties.description]: x.description ? x.description : "",
        [FolderProperties.tags]: JSON.stringify(x.properties),
        [FolderProperties.size]: x.size ? x.size : 0,
        [FolderProperties.istrashed]: x.trashed,
        [FolderProperties.isdirectory]: isFolder(x.mimeType),
        [FolderProperties.mimetype]: x.mimeType,
        [FolderProperties.modifiedDate]: new Date(x.modifiedTime),
        [FolderProperties.createdDate]: new Date(x.createdTime),
        [FolderProperties.url]: x.webViewLink,
      };
    })
  );
}

async function GetFolderContent(
  folderId: string,
  showTrashed: boolean,
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
  if (!showTrashed) {
    qs.q = qs.q + " and trashed = false";
  }
  const res = await fetch_get(URLs.Files, qs);
  const jsonRes = JSON.parse(res);
  current.push(...jsonRes.files);
  const token = jsonRes.nextPageToken;
  if (token) {
    return await GetFolderContent(folderId, showTrashed, token, current);
  }
  return current;
}

async function executeGetInfo(properties: SingleRecord) {
  if (typeof properties[FolderProperties.id] !== "string") {
    throw new Error(`properties[${FolderProperties.id}] is not of type number`);
  }
  const folderId = properties[FolderProperties.id] as string;

  const x = await GetFolderInfo(folderId);
  postResult({
    [FolderProperties.id]: x.id,
    [FolderProperties.name]: x.name,
    [FolderProperties.parentId]: JSON.stringify(x.parents),
    [FolderProperties.tags]: JSON.stringify(x.properties),
    [FolderProperties.modifiedDate]: new Date(x.modifiedTime),
    [FolderProperties.createdDate]: new Date(x.createdTime),
    [FolderProperties.url]: x.webViewLink,
    [FolderProperties.description]: x.description ? x.description : "",
    [FolderProperties.istrashed]: x.trashed,
  });
}

async function GetFolderInfo(folderId: string) {
  let qs = {
    fields:
      "id,name,description,properties,trashed,mimeType,modifiedTime,createdTime,webViewLink,parents",
    supportsAllDrives: true,
  };
  const url = URLs.Files + "/" + folderId;
  const res = await fetch_get(url, qs);
  return JSON.parse(res);
}
