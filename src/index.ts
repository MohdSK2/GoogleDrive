import "@k2oss/k2-broker-core";

const PropertyTypes = {
  STRING: "string",
  BOOL: "boolean",
  DATETIME: "dateTime",
  FILE: "attachment",
  NUMBER: "number",
  DECIMAL: "decimal",
  DATE: "extendedDateTime",
  GUID: "guid",
  AUTOGUID: "guid",
  HYPERLINK: "object",
  IMAGE: "image",
  MEMO: "extendedString",
  MULTIVALUE: "object",
  TIME: "extendedDateTime",
  AUTONUMBER: "extendedNumber",
  XML: "extendedString",
};

const MethodTypes = {
  LIST: "list",
  READ: "read",
  CREATE: "create",
  EXECUTE: "execute",
  UPDATE: "update",
  DELETE: "delete",
};

const FileProperties = {
  id: "id",
  name: "filename",
  path: "path",
  shareUrl: "shareUrl",
  size: "size",
  sourcePath: "sourcePath",
  destinationPath: "destinationPath",
  modifiedDate: "modifiedDate",
  directory: "IsDirectory",
  parentId: "ParentId",
  tags: "tags",
  file: "File",
  tagName: "tagName",
  tagValue: "tagValue",
};

const FileMethods = {
  getInfo: "getInfo",
  getInfoById: "getInfoById",
  getShareUrl: "getShareUrl",
  getShareUrlById: "getShareUrlById",
  download: "download",
  copy: "copy",
  delete: "delete",
  move: "move",
  upload: "upload",
  updateTags: "updateTags",
  updateSingleTag: "updateSingleTag",
};

const ServiceObjectDefinitions = {
  objects: {
    File: {
      displayName: "File",
      description: "Operations related to files in Google Drive",
      properties: {
        [FileProperties.id]: {
          displayName: "File Id",
          description: "The unique id of the file.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.name]: {
          displayName: "File Name",
          description: "File Name",
          type: PropertyTypes.STRING,
        },
        [FileProperties.path]: {
          displayName: "Path",
          description: "Path",
          type: PropertyTypes.STRING,
        },
        [FileProperties.shareUrl]: {
          displayName: "Share URL",
          description: "Share URL",
          type: PropertyTypes.STRING,
        },
        [FileProperties.file]: {
          displayName: "File",
          description: "Input/Output file property",
          type: PropertyTypes.FILE,
        },
        [FileProperties.size]: {
          displayName: "File Size",
          description: "Size of the file in Google Drive.",
          type: PropertyTypes.NUMBER,
        },
        [FileProperties.sourcePath]: {
          displayName: "Source Path",
          description: "Source Path",
          type: PropertyTypes.STRING,
        },
        [FileProperties.destinationPath]: {
          displayName: "Destination Path",
          description: "Destination Path",
          type: PropertyTypes.STRING,
        },
        [FileProperties.modifiedDate]: {
          displayName: "Modified Date",
          description: "Modified Date",
          type: PropertyTypes.DATETIME,
        },
        [FileProperties.directory]: {
          displayName: "Is Directory",
          description: "Indicates if the item is a directory",
          type: PropertyTypes.BOOL,
        },
        [FileProperties.parentId]: {
          displayName: "Parent ID",
          description: "ID of the parent object.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.tags]: {
          displayName: "Tags",
          description: "Tags",
          type: PropertyTypes.STRING,
        },
        [FileProperties.tagName]: {
          displayName: "Tag Name",
          description: "Tag Name",
          type: PropertyTypes.STRING,
        },
        [FileProperties.tagValue]: {
          displayName: "Tag Value",
          description: "Tag Value",
          type: PropertyTypes.STRING,
        },
      },
      methods: {
        [FileMethods.getInfo]: {
          displayName: "Get Info",
          description: "Get info for the file by a given path.",
          type: MethodTypes.READ,
          inputs: [FileProperties.path],
          requiredInputs: [FileProperties.path],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
          ],
        },
        [FileMethods.getInfoById]: {
          displayName: "Get Info From Id",
          description: "Get metadata for a given file.",
          type: MethodTypes.READ,
          inputs: [FileProperties.id],
          requiredInputs: [FileProperties.id],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
          ],
        },
        [FileMethods.getShareUrl]: {
          displayName: "Get File Share URL",
          description: "Gets a basic share URL for a file.",
          type: MethodTypes.CREATE,
          inputs: [FileProperties.path],
          requiredInputs: [FileProperties.path],
          outputs: [FileProperties.shareUrl],
        },
        [FileMethods.getShareUrlById]: {
          displayName: "Get File Share URL by Id",
          description: "Gets a basic share URL for a file with an Id.",
          type: MethodTypes.CREATE,
          inputs: [FileProperties.id],
          requiredInputs: [FileProperties.id],
          outputs: [FileProperties.shareUrl],
        },
        [FileMethods.download]: {
          displayName: "Download",
          type: MethodTypes.READ,
          inputs: [FileProperties.path],
          requiredInputs: [FileProperties.path],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.file,
          ],
        },
        [FileMethods.copy]: {
          displayName: "Copy File",
          description: "Copy a file into a given folder.",
          inputs: [FileProperties.sourcePath, FileProperties.destinationPath],
          requiredInputs: [
            FileProperties.sourcePath,
            FileProperties.destinationPath,
          ],
          type: MethodTypes.CREATE,
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
          ],
        },
        [FileMethods.delete]: {
          displayName: "Delete File",
          description: "Delete File",

          type: MethodTypes.DELETE,
          inputs: [FileProperties.path],
          requiredInputs: [FileProperties.path],
          outputs: [],
        },
        [FileMethods.move]: {
          displayName: "Move File",
          description: "Move File",

          type: MethodTypes.EXECUTE,
          inputs: [FileProperties.sourcePath, FileProperties.destinationPath],
          requiredInputs: [
            FileProperties.sourcePath,
            FileProperties.destinationPath,
          ],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
          ],
        },
        [FileMethods.upload]: {
          displayName: "Upload File",
          description: "Upload a File",

          type: MethodTypes.CREATE,
          inputs: [FileProperties.path, FileProperties.file],
          requiredInputs: [FileProperties.path, FileProperties.file],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.path,
            //TODO: Should we just return the full info for a ID?
          ],
        },
        [FileMethods.updateTags]: {
          displayName: "Update Tags",
          description: "Update tags for a given file.",
          inputs: [FileProperties.path, FileProperties.tags],
          requiredInputs: [FileProperties.path, FileProperties.tags],
          type: MethodTypes.UPDATE,
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
          ],
        },
        [FileMethods.updateSingleTag]: {
          displayName: "Update Single File Tag",
          description: "Update an individual metadata Tag of a File",
          type: MethodTypes.UPDATE,
          inputs: [
            FileProperties.path,
            FileProperties.tagName,
            FileProperties.tagValue,
          ],
          requiredInputs: [
            FileProperties.path,
            FileProperties.tagName,
            FileProperties.tagValue,
          ],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.directory,
            FileProperties.tags,
            FileProperties.path,
            FileProperties.size,
            FileProperties.modifiedDate,
          ],
        },
      },
    },
  },
};

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
      let x = await fetch_get("https://jsonplaceholder.typicode.com/todos/198");
      console.log(x);
      let y = JSON.parse(x);
      postResult({
        path: y.id,
      });

      break;
    default:
      throw new Error(`The method ${methodName} is not supported.`);
  }
}

async function fetch_get(url: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      try {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          throw new Error(
            `Failed with status ${xhr.status}; statustext: ${xhr.statusText}`
          );
        }

        console.log(`executexhr2 xhr responseText: ${xhr.responseText}`);

        resolve(xhr.responseText);
      } catch (e) {
        console.log(
          `executexhr2 error: ${e}; ResponseText: ${xhr.responseText}`
        );
        reject(e);
      }
    };
    xhr.onerror = function () {
      throw new Error(`Failed with status ${xhr.status}`);
    };

    xhr.open("GET", url);
    xhr.withCredentials = true;
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
    xhr.send();
  });
}
