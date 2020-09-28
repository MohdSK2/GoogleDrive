import { fetch_get } from "./fetch";
import "@k2oss/k2-broker-core";
import { FileProperties, FileMethods } from "./ServiceObjects";

export async function executeFile(
  methodName: string,
  properties: SingleRecord,
  parameters: SingleRecord
) {
  switch (methodName) {
    case FileMethods.getInfo:
      await getInfo();
      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}

async function getInfo() {
  let x = await fetch_get("https://jsonplaceholder.typicode.com/todos/192");
  let y = JSON.parse(x);
  postResult({
    id: y.id,
  });
}
