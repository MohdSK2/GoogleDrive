import "@k2oss/k2-broker-core";
import { onexecuteFile } from "./FileServiceObject";
import { ServiceObjectDefinitions } from "./ServiceObjects";

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
