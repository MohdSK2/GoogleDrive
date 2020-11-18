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
  let res = await fetch_get(
    URLs.Files + "/" + properties[FileProperties.id] + "?fields=*"
  );
  let FileDetails = JSON.parse(res);
  var URL = GetFileURL(FileDetails);
  postResult({
    [FileProperties.id]: FileDetails.id,
    [FileProperties.name]: FileDetails.name,
    [FileProperties.parentId]: FileDetails.parents[0],
    [FileProperties.tags]: FileDetails.mimeType,
    [FileProperties.modifiedDate]: new Date(FileDetails.modifiedTime),
    [FileProperties.createdDate]: new Date(FileDetails.createdTime),
    [FileProperties.totrash]: FileDetails.trashed,
    [FileProperties.url]: URL,
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

function GetFileURL(FileDetails) {
  var wordDocTypeKey =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  var keyValue = "";
  var fileMimeType = FileDetails.mimeType;

  switch (GetFileType(fileMimeType)) {
    case "Word": {
      Object.keys(FileDetails.exportLinks).forEach(function (key) {
        if (key == wordDocTypeKey) {
          keyValue = FileDetails.exportLinks[key];
        }
      });
      break;
    }
    case "Excel": {
      keyValue = FileDetails.webContentLink;
      break;
    }
    case "Invalid": {
      keyValue = "Sorry, This file type is not configured yet!";
      break;
    }
    default: {
      keyValue = "";
      break;
    }
  }

  return keyValue;
}

function GetFileType(fileMimeType: string) {
  var fileType = "";
  if (fileMimeType.indexOf("vnd.google-apps.document") > 0) {
    fileType = "Word";
  } else if (
    fileMimeType.indexOf(
      "vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) > 0
  ) {
    fileType = "Excel";
    console.log("Inside excel condition");
  } else {
    fileType = "Invalid";
  }
  return fileType;
}
