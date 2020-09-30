import "@k2oss/k2-broker-core";
import { executeFile } from "./FileServiceObject";
import { executeDrive } from "./DriveServiceObject";
import { executeFolder } from "./FolderServiceObject";
import { ServiceObjectDefinitions } from "./ServiceObjects";

metadata = {
  systemName: "googledriveJSSPbroker",
  displayName: "Google Drive JSSP Broker",
  description: "JSSP Broker to utilize Google Drive functionality.",
  configuration: {
    ShowTrashed: {
      displayName: "Show trashed items in return set.",
      type: "boolean",
      value: "false",
      required: true,
    },
  },
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
      await executeFile(methodName, properties, parameters);
      break;
    case "Drive":
      await executeDrive(methodName);
      break;
    case "Folder":
      await executeFolder(methodName, properties, configuration);
      break;
    default:
      throw new Error("The object " + objectName + " is not supported.");
  }
};
