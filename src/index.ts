import "@k2oss/k2-broker-core";
import { fetch_get } from "./fetch";
import { ServiceObjectDefinitions } from "./Constants";

export {};

metadata = {
  systemName: "googledriveJSSPbroker",
  displayName: "Google Drive JSSP Broker",
  description: "JSSP Broker to utilize Google Drive functionality.",
};

ondescribe = async function ({ configuration }): Promise<void> {
  postSchema(ServiceObjectDefinitions);
};

onexecute = async function ({
  objectName,
  methodName,
  parameters,
  properties,
  configuration,
  schema,
}): Promise<void> {
  switch (objectName) {
    case "File":
      await onexecuteFile(methodName, properties, parameters);
      break;
    default:
      throw new Error("The object " + objectName + " is not supported.");
  }
};

async function onexecuteFile(
  methodName: string,
  properties: SingleRecord,
  parameters: SingleRecord
) {
  switch (methodName) {
    case "getInfo":
      let x = await fetch_get("https://jsonplaceholder.typicode.com/todos/192");
      console.log(x);
      let y = JSON.parse(x);
      postResult({
        id: y.id,
      });

      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}
