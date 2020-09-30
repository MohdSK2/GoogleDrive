import "@k2oss/k2-broker-core";
import { fetch_get } from "./fetch";
import { DriveMethods, DriveProperties } from "./ServiceObjects";
import { URLs } from "./URLs";

export async function executeDrive(methodName: string) {
  switch (methodName) {
    case DriveMethods.getDrives:
      await executeGetDrives();
      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}

async function executeGetDrives() {
  const allDrives = await GetDrives();
  postResult(
    allDrives.map((x) => {
      return {
        [DriveProperties.id]: x.id,
        [DriveProperties.name]: x.name,
      };
    })
  );
}

async function GetDrives(nextPageToken?: string, current = []) {
  let qs = {
    pageToken: nextPageToken ? nextPageToken : "",
    fields: "nextPageToken,drives(id,name)",
    pageSize: 50,
  };
  const res = await fetch_get(URLs.Drives, qs);
  const jsonRes = JSON.parse(res);
  current.push(...jsonRes.drives);
  const token = jsonRes.nextPageToken;
  if (token) {
    return await GetDrives(token, current);
  }
  current.push({ name: "MyDrive", id: "root" }); // push in the MyDrive that everybody has.
  return current;
}
