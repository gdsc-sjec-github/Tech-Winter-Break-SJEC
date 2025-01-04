import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import ShowItems from "../ShowItems/ShowItems";
import PropTypes from 'prop-types';

const FolderComponent = ({ selectedItems, setSelectedItems }) => {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const [currentFolderName, setCurrentFolderName] = useState("Root");
  const [loading, setLoading] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState([]);

  const { userFolders, userFiles } = useSelector((state) => state.filefolders);

  useEffect(() => {
    if (folderId) {
      const currentFolder = userFolders.find(folder => folder.docId === folderId);
      if (currentFolder) {
        dispatch(changeFolder(folderId));
        setCurrentFolderName(currentFolder.data.name);
      }
    }
  }, [folderId, dispatch, userFolders]);

  useEffect(() => {
    if (userFolders.length > 0) {
      setLoading(false);
      if (folderId) {
        const currentFolder = userFolders.find(folder => folder.docId === folderId);
        if (currentFolder) {
          // Generate breadcrumb
          const path = [];
          let current = currentFolder;
          while (current && current.data.parent !== "root") {
            path.unshift({
              name: current.data.name,
              id: current.docId
            });
            current = userFolders.find(f => f.docId === current.data.parent);
          }
          if (current) {
            path.unshift({
              name: current.data.name,
              id: current.docId
            });
          }
          setBreadcrumb(path);
        }
      } else {
        setBreadcrumb([]);
      }
    }
  }, [folderId, userFolders]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Get only the folders that belong to the current folder
  const childFolders = userFolders.filter(folder => 
    folder.data && folder.data.parent === folderId
  );

  // Get only the files that belong to the current folder
  const childFiles = Array.isArray(userFiles) 
    ? userFiles.filter(file => 
        file.data && file.data.parent === folderId
      )
    : [];

  return (
    <div className="col-md-12 w-100">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/dashboard">Root</Link>
          </li>
          {breadcrumb.map((crumb, index) => (
            <li key={index} className="breadcrumb-item">
              <Link to={`/dashboard/folder/${crumb.id}`}>{crumb.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
      <h4 className="text-center border-bottom py-2">{currentFolderName}</h4>
      <ShowItems
        title={"Folders"}
        type={"folder"}
        items={childFolders}
        selectedItems={selectedItems || []}
        setSelectedItems={setSelectedItems}
      />
      {childFiles.length > 0 && (
        <ShowItems
          title={"Files"}
          type={"file"}
          items={childFiles}
          selectedItems={selectedItems || []}
          setSelectedItems={setSelectedItems}
        />
      )}
    </div>
  );
};

FolderComponent.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default FolderComponent;
