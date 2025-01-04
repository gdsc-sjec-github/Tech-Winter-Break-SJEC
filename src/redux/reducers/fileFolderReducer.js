import * as types from "../actionsTypes/filefolderActionTypes";

const initialState = {
  isLoading: false,
  userFiles: [],
  userFolders: [],
  currentFolder: "root",
};

const fileFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };

    case types.ADD_FILE:
      return {
        ...state,
        userFiles: action.payload,
      };

    case types.CREATE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };

    case types.GET_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };

    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };

    case types.DELETE_FOLDER:
      return {
        ...state,
        userFolders: state.userFolders.filter(
          (folder) => folder.docId !== action.payload
        ),
      };

    case types.DELETE_FILE:
      return {
        ...state,
        userFiles: state.userFiles.filter(
          (file) => file.docId !== action.payload
        ),
      };

    case types.MOVE_FOLDER:
      return {
        ...state,
        userFolders: state.userFolders.map((folder) =>
          folder.docId === action.payload.folderId
            ? { ...folder, data: { ...folder.data, parent: action.payload.targetParentId } }
            : folder
        ),
      };

    case types.MOVE_FILE:
      return {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.docId === action.payload.fileId
            ? { ...file, data: { ...file.data, parent: action.payload.targetFolderId } }
            : file
        ),
      };

    default:
      return state;
  }
};

export default fileFolderReducer;
