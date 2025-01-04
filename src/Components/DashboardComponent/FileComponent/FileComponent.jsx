import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit, faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import { updateFileContent } from '../../../redux/actionCreators/filefolderActionCreator';
import './FileComponent.css';

const FileComponent = () => {
  const { fileId } = useParams();
  const { userFiles } = useSelector((state) => state.filefolders);
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const dispatch = useDispatch();

  const currentFile = userFiles.find(file => file.docId === fileId);

  // Load content when component mounts or file changes
  useEffect(() => {
    if (currentFile?.data) {
      setContent(currentFile.data.content || '');
      setUnsavedChanges(false);
    }
  }, [currentFile]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      await dispatch(updateFileContent(fileId, content));
      setIsEditing(false);
      setUnsavedChanges(false);
      alert('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save changes');
    }
  };

  const handleCancelEdit = () => {
    if (unsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        setIsEditing(false);
        setContent(currentFile.data.content || '');
        setUnsavedChanges(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    if (isTextFile) {
      // Create a blob with the current content
      const blob = new Blob([content], { type: 'text/plain' });
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } else {
      // For non-text files, use the original URL
      window.open(fileUrl, '_blank');
    }
  };

  if (!currentFile?.data) {
    return <div className="text-center mt-5">File not found</div>;
  }

  const fileUrl = currentFile.data.url;
  const fileType = currentFile.data.type || '';
  const fileName = currentFile.data.name || '';

  const isTextFile = 
    fileType.includes('text') || 
    fileType.includes('application/json') ||
    fileType.includes('application/javascript') ||
    fileType.includes('application/xml') ||
    fileName.match(/\.(txt|json|js|jsx|ts|tsx|md|css|scss|html|xml|yml|yaml|ini|conf|sh|bat|py|java|cpp|c|h|cs|php|rb|pl|sql)$/i);

  return (
    <div className="col-md-12 px-3 py-2">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>{fileName}</h3>
          <div className="btn-group">
            {isTextFile && (
              <>
                {isEditing ? (
                  <>
                    <button 
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save
                    </button>
                    <button 
                      className="btn btn-secondary me-2"
                      onClick={handleCancelEdit}
                    >
                      <FontAwesomeIcon icon={faTimes} className="me-2" />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn btn-primary me-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="me-2" />
                    Edit
                  </button>
                )}
              </>
            )}
            <button 
              onClick={handleDownload}
              className="btn btn-secondary"
            >
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Download
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="file-content">
            {fileType.includes('image') ? (
              <img src={fileUrl} alt={fileName} style={{ maxWidth: '100%' }} />
            ) : isTextFile ? (
              <div className="form-group">
                <textarea
                  className={`form-control editor ${isEditing ? 'editing' : ''}`}
                  value={content}
                  onChange={handleContentChange}
                  disabled={!isEditing}
                  style={{ 
                    minHeight: '400px',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    padding: '15px'
                  }}
                />
                {unsavedChanges && (
                  <div className="text-warning mt-2">
                    <small>* You have unsaved changes</small>
                  </div>
                )}
              </div>
            ) : fileType.includes('pdf') ? (
              <embed
                src={fileUrl}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            ) : (
              <div className="text-center">
                <p>This file type cannot be previewed.</p>
                <button 
                  onClick={handleDownload}
                  className="btn btn-primary"
                >
                  Download {fileName}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileComponent;
