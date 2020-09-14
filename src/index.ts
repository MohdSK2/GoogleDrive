import "@k2oss/k2-broker-core";
import * as CONST from "./Constants.ts";
import axios from "axios";

metadata = {
  systemName: "googledriveJSSPbroker",
  displayName: "Google Drive JSSP Broker",
  description: "JSSP Broker to utilize Google Drive functionality.",
};

ondescribe = async function ({ configuration }): Promise<void> {
  postSchema(CONST.ServiceObjectDefinitions);
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
): Promise<void> {
  switch (methodName) {
    case "getInfo":
      return new Promise<void>((resolve, reject) => {
        axios({
          url: "https://www.google.com",
          method: "get",
        }).then(function (x) {
          postResult({
            path: x.data,
          });
          resolve();
        });
      });

      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}
