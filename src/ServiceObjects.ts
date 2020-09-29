// Because we want to seperate out this content into a seperate file, we need to redefine the simple things like PropertyType.
// The K2-OSS lib doesn't expose them in a way that we can just use them anywhere.

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

export const FileProperties = {
  id: "id",
  name: "filename",
  size: "size",
  url: "URL",
  modifiedDate: "modifiedDateTime",
  createdDate: "CreatedDateTime",
  parentId: "ParentId",
  tags: "tags",
  fileContent: "File",
  tagName: "tagName",
  tagValue: "tagValue",
  sourceId: "sourceid",
  targetid: "targetid",
  totrash: "totrash",
};

export const FolderMethods = {
  getInfo: "getinfo",
  getList: "getlist",
};

export const FileMethods = {
  getInfo: "getinfo",
  download: "download",
  copy: "copy",
  delete: "delete",
  move: "move",
  upload: "upload",
  updateTag: "updateTag",
  deleteTag: "deleteTag",
};

export const DriveMethods = {
  getDrives: "GetDrives",
};

export const DriveProperties = {
  id: "id",
  name: "name",
};

export const FolderProperties = {
  id: "id",
  name: "foldername",
  url: "URL",
  modifiedDate: "modifiedDateTime",
  createdDate: "CreatedDateTime",
  parentId: "ParentId",
  tags: "tags",
  size: "size",
  tagName: "tagName",
  tagValue: "tagValue",
  sourceId: "sourceid",
  targetid: "targetid",
  istrashed: "trashed",
  description: "desc",
  isdirectory: "dir",
  mimetype: "mimetype",
  totrash: "totrash",
};

export const ServiceObjectDefinitions = {
  objects: {
    Drive: {
      displayName: "Drive",
      description: "Operations related to a Google (Shared) Drive",
      properties: {
        [DriveProperties.id]: {
          displayName: "Drive Id",
          description:
            "The ID of this shared drive which is also the ID of the top level folder of this shared drive.",
          type: PropertyTypes.STRING,
        },
        [DriveProperties.name]: {
          displayName: "Name",
          description: "The name of this shared drive.",
          type: PropertyTypes.STRING,
        },
      },
      methods: {
        [DriveMethods.getDrives]: {
          displayName: "Get Drives",
          description: "Get all Google (shared) drives.",
          type: MethodTypes.LIST,
          outputs: [DriveProperties.id, DriveProperties.name],
        },
      },
    },
    Folder: {
      displayName: "Folder",
      description: "Operations related to a folder in Google Drive",
      // Because the folder has the 'getlist' method it will be hshowing files and folders. This makes the properties a bit more generic.
      properties: {
        [FolderProperties.id]: {
          displayName: "Id",
          description: "The unique ID of a folder (or drive).",
          type: PropertyTypes.STRING,
        },
        [FolderProperties.name]: {
          displayName: "Name",
          description: "The name of the item.",
          type: PropertyTypes.STRING,
        },
        [FolderProperties.description]: {
          displayName: "Description",
          description: "The description of the item.",
          type: PropertyTypes.MEMO,
        },
        [FolderProperties.url]: {
          displayName: "URL",
          description: "Direct URL to the item.",
          type: PropertyTypes.HYPERLINK, // TODO: does that work?
        },
        [FolderProperties.modifiedDate]: {
          displayName: "Modified DateTime",
          description: "Date/Time on which the item was last modified.",
          type: PropertyTypes.DATETIME,
        },
        [FolderProperties.createdDate]: {
          displayName: "Created DateTime",
          description: "Date on which the tiem was created Date",
          type: PropertyTypes.DATETIME,
        },
        [FolderProperties.parentId]: {
          displayName: "Parent ID",
          description: "ID of the parent object/folder.",
          type: PropertyTypes.STRING,
        },
        [FolderProperties.tags]: {
          displayName: "Tags",
          description: "JSON of all tags associated with the folder.",
          type: PropertyTypes.STRING,
        },
        [FolderProperties.mimetype]: {
          displayName: "MimeType",
          description: "The mimetype of the item.",
          type: PropertyTypes.STRING,
        },
        [FolderProperties.size]: {
          displayName: "Size",
          description: "Size of the item in google drive (bytes).",
          type: PropertyTypes.NUMBER,
        },
        [FolderProperties.istrashed]: {
          displayName: "Trashed",
          description: "Weather the item is in the trash or not.",
          type: PropertyTypes.BOOL,
        },
        [FolderProperties.isdirectory]: {
          displayName: "Directory",
          description: "Weather the item is a directory or not.",
          type: PropertyTypes.BOOL,
        },
      },
      methods: {
        [FileMethods.getInfo]: {
          displayName: "Get Info",
          description: "Get info for the folder by it's ID.",
          type: MethodTypes.READ,
          inputs: [FolderProperties.id],
          requiredInputs: [FolderProperties.id],
          outputs: [
            FolderProperties.id,
            FolderProperties.name,
            FolderProperties.parentId,
            FolderProperties.tags,
            FolderProperties.size,
            FolderProperties.modifiedDate,
            FolderProperties.createdDate,
            FolderProperties.url,
          ],
        },
        [FolderMethods.getList]: {
          displayName: "Get List",
          description: "Get List of all items in a folder.",
          type: MethodTypes.LIST,
          inputs: [FolderProperties.id],
          requiredInputs: [FolderProperties.id],
          outputs: [
            FolderProperties.id,
            FolderProperties.name,
            FolderProperties.description,
            FolderProperties.tags,
            FolderProperties.size,
            FolderProperties.istrashed,
            FolderProperties.isdirectory,
            FolderProperties.mimetype,
            FolderProperties.modifiedDate,
            FolderProperties.createdDate,
            FolderProperties.url,
          ],
        },
      },
    },
    File: {
      displayName: "File",
      description: "Operations related to a single file in Google Drive",
      properties: {
        [FileProperties.id]: {
          displayName: "File Id",
          description: "The unique id of the file.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.name]: {
          displayName: "File Name",
          description: "The File Name.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.url]: {
          displayName: "URL",
          description: "Direct URL to the file.",
          type: PropertyTypes.HYPERLINK, //TODO: does that work?
        },
        [FileProperties.fileContent]: {
          displayName: "File",
          description: "The content of the file.",
          type: PropertyTypes.FILE,
        },
        [FileProperties.size]: {
          displayName: "File Size",
          description: "Size of the file in Google Drive in bytes.",
          type: PropertyTypes.NUMBER,
        },
        [FileProperties.modifiedDate]: {
          displayName: "Modified DateTime",
          description: "Date/Time on which the file was last modified.",
          type: PropertyTypes.DATETIME,
        },
        [FileProperties.createdDate]: {
          displayName: "Created DateTime",
          description: "Date on which teh file was created Date",
          type: PropertyTypes.DATETIME,
        },
        [FileProperties.parentId]: {
          displayName: "Parent ID",
          description: "ID of the parent object/folder.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.tags]: {
          displayName: "Tags",
          description: "JSON of all tags associated with the file.",
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
        [FileProperties.sourceId]: {
          displayName: "Source File Id",
          description:
            "The unique Id of the file that should be used as the source of the operation.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.sourceId]: {
          displayName: "Target Folder Id",
          description:
            "The unique Id of the folder to which the file should be copied/moved/uploaded.",
          type: PropertyTypes.STRING,
        },
        [FileProperties.totrash]: {
          displayName: "Delete to Trash",
          description:
            "Indicate if the file should go to the trash folder or be deleted permanently.",
          type: PropertyTypes.BOOL,
        },
      },
      methods: {
        [FileMethods.getInfo]: {
          displayName: "Get Info",
          description: "Get info for the file by a given ID.",
          type: MethodTypes.READ,
          inputs: [FileProperties.id],
          requiredInputs: [FileProperties.id],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
          ],
        },

        [FileMethods.download]: {
          displayName: "Download",
          type: MethodTypes.READ,
          inputs: [FileProperties.id],
          requiredInputs: [FileProperties.id],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
            FileProperties.fileContent,
          ],
        },
        /*[FileMethods.copy]: {
          displayName: "Copy File",
          description: "Copy a file to a folder. Returns the new file details.",
          inputs: [FileProperties.sourceId, FileProperties.targetid],
          requiredInputs: [FileProperties.sourceId, FileProperties.targetid],
          type: MethodTypes.CREATE,
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
          ],
        },*/
        [FileMethods.delete]: {
          displayName: "Delete File",
          description: "Delete a file.",

          type: MethodTypes.DELETE,
          inputs: [FileProperties.id, FileProperties.totrash],
          requiredInputs: [FileProperties.id],
          outputs: [],
        },
        /* [FileMethods.move]: {
          displayName: "Move File",
          description: "Move a file to the specified folder id.",

          type: MethodTypes.EXECUTE,
          inputs: [FileProperties.sourceId, FileProperties.targetid],
          requiredInputs: [FileProperties.sourceId, FileProperties.targetid],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
          ],
        },*/
        [FileMethods.upload]: {
          displayName: "Upload File",
          description: "Upload a File",

          type: MethodTypes.CREATE,
          inputs: [FileProperties.fileContent, FileProperties.targetid],
          requiredInputs: [FileProperties.fileContent, FileProperties.targetid],
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
          ],
        },
        /* [FileMethods.updateTag]: {
          displayName: "Update Tag",
          description: "Update/add a tag to a file.",
          inputs: [
            FileProperties.id,
            FileProperties.tagName,
            FileProperties.tagValue,
          ],
          requiredInputs: [
            FileProperties.id,
            FileProperties.tagName,
            FileProperties.tagValue,
          ],
          type: MethodTypes.UPDATE,
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
          ],
        },

        [FileMethods.deleteTag]: {
          displayName: "Delete Tag",
          description:
            "Delete one specific tag from a file. Does not provide an error message if the tag does not exist.",
          inputs: [FileProperties.id, FileProperties.tagName],
          requiredInputs: [FileProperties.id, FileProperties.tagName],
          type: MethodTypes.DELETE,
          outputs: [
            FileProperties.id,
            FileProperties.name,
            FileProperties.parentId,
            FileProperties.tags,
            FileProperties.size,
            FileProperties.modifiedDate,
            FileProperties.createdDate,
            FileProperties.url,
          ],
        },*/
      },
    },
  },
};
