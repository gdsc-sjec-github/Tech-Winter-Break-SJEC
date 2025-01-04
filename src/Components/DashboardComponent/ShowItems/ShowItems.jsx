
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { changeFolder, moveFolder, moveFile, copyFile, copyFolder } from "../../../redux/actionCreators/filefolderActionCreator";
import { useDispatch, useSelector } from "react-redux";
const ShowItems = ({ items, type, selectedItems, setSelectedItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentFolder } = useSelector(state => state.filefolders);
  


  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
          case 'c':
            if (selectedItems.length > 0) {
              localStorage.setItem('clipboardItems', JSON.stringify({
                items: selectedItems,
                operation: 'copy'
              }));
              e.preventDefault();
              alert('Items copied to clipboard');
            }
            break;

          case 'x':
            if (selectedItems.length > 0) {
              localStorage.setItem('clipboardItems', JSON.stringify({
                items: selectedItems,
                operation: 'cut'
              }));
              e.preventDefault();
              alert('Items cut to clipboard');
            }
            break;

          case 'v':
            const clipboardData = JSON.parse(localStorage.getItem('clipboardItems') || '{}');
            const { items: clipboardItems, operation } = clipboardData;

            if (clipboardItems?.length > 0) {
              e.preventDefault();
              const targetFolder = currentFolder || null;

              try {
                for (const item of clipboardItems) {
                  if (operation === 'copy') {
                    if (item.type === 'folder') {
                      await dispatch(copyFolder(item.docId, targetFolder));
                    } else {
                      await dispatch(copyFile(item.docId, targetFolder));
                    }
                  } else if (operation === 'cut') {
                    if (item.type === 'folder') {
                      await dispatch(moveFolder(item.docId, targetFolder));
                    } else {
                      await dispatch(moveFile(item.docId, targetFolder));
                    }
                  }
                }

                if (operation === 'cut') {
                  localStorage.removeItem('clipboardItems');
                }
                setSelectedItems([]);
                alert(`Items ${operation}ed successfully`);
              } catch (error) {
                console.error('Error during paste operation:', error);
                alert('Failed to paste items. Please try again.');
              }
            }
            break;

          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItems, currentFolder, dispatch, setSelectedItems]);

  const handleDbClick = (item) => {
    if (type === "folder") {
      dispatch(changeFolder(item.docId));
      navigate(`/dashboard/folder/${item.docId}`);
    } else {
      navigate(`/dashboard/file/${item.docId}`);
    }
  };

  const handleSelect = (e, item) => {
    e.stopPropagation();
    if (selectedItems.find(i => i.docId === item.docId)) {
      setSelectedItems(selectedItems.filter(i => i.docId !== item.docId));
    } else {
      setSelectedItems([...selectedItems, { ...item, type }]);
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("itemId", item.docId);
    e.dataTransfer.setData("itemType", type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (type === "folder") {
      e.currentTarget.style.backgroundColor = "#e9ecef";
    }
  };

  const handleDragLeave = (e) => {
    if (type === "folder") {
      e.currentTarget.style.backgroundColor = "";
    }
  };

  const handleDrop = (e, targetFolder) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "";

    const itemId = e.dataTransfer.getData("itemId");
    const itemType = e.dataTransfer.getData("itemType");

    if (type === "folder" && targetFolder.docId !== itemId) {
      if (itemType === "folder") {
        dispatch(moveFolder(itemId, targetFolder.docId));
      } else if (itemType === "file") {
        dispatch(moveFile(itemId, targetFolder.docId));
      }
    }
  };

  return (
    <div className="w-100">
      <div className="row gap-2 p-4 flex-wrap">
        {items.map((item) => {
          const itemName = item.data?.name || "Unnamed";
          const itemId = item.docId;
          const isSelected = selectedItems.some(i => i.docId === itemId);

          return (
            <div
              key={itemId}
              className={`col-md-2 py-3 text-center border rounded position-relative ${isSelected ? 'bg-light' : ''}`}
              onDoubleClick={() => handleDbClick(item)}
              onClick={(e) => handleSelect(e, item)}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, item)}
              style={{ cursor: "pointer" }}
            >
              {isSelected && (
                <div className="position-absolute top-0 end-0 p-2">
                  <FontAwesomeIcon 
                    icon={faCheck} 
                    className="text-success"
                  />
                </div>
              )}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}>
                {type === "folder" ? (
                  <FontAwesomeIcon 
                    icon={faFolder} 
                    size="4x" 
                    className={`text-warning ${isSelected ? 'opacity-75' : ''}`}
                  />
                ) : (
                  <FontAwesomeIcon 
                    icon={faFileAlt} 
                    size="4x" 
                    className={`text-primary ${isSelected ? 'opacity-75' : ''}`}
                  />
                )}
                <span className="mt-2">{itemName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowItems;
