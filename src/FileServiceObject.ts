import "@k2oss/k2-broker-core";
import { fetch_get, fetch_patch, fetch_delete } from "./fetch";
import { FileProperties, FileMethods } from "./ServiceObjects";
import { URLs } from "./URLs";

export async function executeFile(
  methodName: string,
  properties: SingleRecord,
  parameters: SingleRecord
) {
  switch (methodName) {
    case FileMethods.getInfo:
      await OnExecuteGetInfo(properties, parameters);
      break;
    case FileMethods.delete:
      await OnExecuteDeleteFile(properties, parameters);
      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}

async function OnExecuteGetInfo(
  properties: SingleRecord,
  parameters: SingleRecord
) {
  let qs = {
    fields:
      "id,name,description,properties,trashed,mimeType,modifiedTime,createdTime,webViewLink,parents",
    supportsAllDrives: true,
  };

  let res = await fetch_get(
    URLs.Files + "/" + properties[FileProperties.id],
    qs
  );
  let FileDetails = JSON.parse(res);
  postResult({
    [FileProperties.id]: FileDetails.id,
    [FileProperties.name]: FileDetails.name,
    [FileProperties.parentId]: FileDetails.parents[0],
    [FileProperties.tags]: FileDetails.mimeType,
    [FileProperties.modifiedDate]: new Date(FileDetails.modifiedTime),
    [FileProperties.createdDate]: new Date(FileDetails.createdTime),
    [FileProperties.totrash]: FileDetails.trashed,
    [FileProperties.url]: FileDetails.webViewLink,
  });
}

async function OnExecuteDeleteFile(
  properties: SingleRecord,
  parameters: SingleRecord
) {
  let res;
  var requestBody = JSON.stringify({
    trashed: properties[FileProperties.totrash],
  });

  if (
    properties[FileProperties.totrash] == true &&
    properties[FileProperties.totrash] != null
  ) {
    res = await fetch_patch(
      URLs.Files + "/" + properties[FileProperties.id],
      requestBody
    );
  } else {
    res = await fetch_delete(URLs.Files + "/" + properties[FileProperties.id]);
  }
}
