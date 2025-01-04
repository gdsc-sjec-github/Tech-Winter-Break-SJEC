// src/redux/selectors.js
import { createSelector } from 'reselect';

// Select the filefolders state from the store
const selectFileFolders = (state) => state.filefolders;

// Memoized selector for userFolders
export const selectUserFolders = createSelector(
  [selectFileFolders],
  (filefolders) => filefolders.userFolders.filter(
    (folder) => folder.data && folder.data.parent === "root"
  )
);

// Memoized selector for userFiles
export const selectUserFiles = createSelector(
  [selectFileFolders],
  (filefolders) => filefolders.userFiles.filter(
    (file) => file.data && file.data.parent === "root"
  )
);
