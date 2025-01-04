import { shallowEqual, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useMemo } from "react"; 
import ShowItems from "../ShowItems/ShowItems";
import PropTypes from 'prop-types';

// Memoized selector for folders and files
const selectFileFolders = (state) => state.filefolders;

const makeSelectDerivedData = createSelector(
  [selectFileFolders],
  (filefolders) => ({
    isLoading: filefolders.isLoading,
    userFolders: filefolders.userFolders.filter(
      (folder) => folder.data && folder.data.parent === "root"
    ),
    userFiles: Array.isArray(filefolders.userFiles) 
      ? filefolders.userFiles.filter(
          (file) => file.data && file.data.parent === "root"
        )
      : [],
  })
);

const HomeComponents = ({ selectedItems, setSelectedItems }) => {
  const { isLoading, userFolders, userFiles } = useSelector(
    makeSelectDerivedData,
    shallowEqual
  );

  // Mapping uniqueFolders, memoized to avoid recomputation
  const uniqueFolders = useMemo(
    () =>
      userFolders.map((folder) => ({
        docId: folder.docId,
        data: folder.data,
        name: folder.data.name,
        userId: folder.data.userId,
        createdAt: folder.data.createdAt,
        parent: folder.data.parent,
      })),
    [userFolders]
  );

  // Changed this to show all files in root
  const filteredFiles = useMemo(
    () => userFiles.filter((file) => file.data && file.data.parent === "root"),
    [userFiles]
  );

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center my-5">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      ) : (
        <>
          <ShowItems 
            title={"Created Folders"} 
            type={"folder"} 
            items={uniqueFolders}
            selectedItems={selectedItems || []}
            setSelectedItems={setSelectedItems}
          />
          <ShowItems 
            title={"Created Files"} 
            type={"file"} 
            items={filteredFiles}
            selectedItems={selectedItems || []}
            setSelectedItems={setSelectedItems}
          />
        </>
      )}
    </div>
  );
};

HomeComponents.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default HomeComponents;
