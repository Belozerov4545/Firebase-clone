import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../redux/actionCreators/fileFoldersActionCreator';

function UploadFile({ setIsFileUploadModalOpen }) {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    userFiles, user, currentFolder, currentFolderData,
  } = useSelector((state) => ({
    userFiles: state.filefolders.userFiles,
    user: state.auth.user,
    currentFolder: state.filefolders.currentFolder,
    currentFolderData: state
      .filefolders
      .userFolders
      .find((folder) => folder.docId === state.filefolders.currentFolder),
  }), shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFile('');
      setSuccess(false);
      setIsFileUploadModalOpen(false);
    }
  }, [success]);

  const checkFileAlreadyPresent = (name) => {
    const filePresent = userFiles
      .filter((file) => file.data?.parent === currentFolder)
      .find((fldr) => fldr.data.name === name);
    if (filePresent) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      if (!checkFileAlreadyPresent(file.name)) {
        const data = {
          createdAt: new Date(),
          name: file.name,
          userId: user.uid,
          createdBy: user.name,
          path: currentFolder === 'root' ? [] : [...currentFolderData?.data.path, currentFolder],
          parent: currentFolder,
          lastAccessed: null,
          updatedAt: new Date(),
          extention: file.name.split('.')[1],
          data: null,
          url: '',
        };
        dispatch(uploadFile(file, data, setSuccess));
        setIsFileUploadModalOpen(false);
      } else {
        toast.error('File already present');
      }
    } else {
      toast.error('File name cannot be empty');
    }
  };

  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: 'rgba(0, 0, 0, 0.4', zIndex: 999 }}
    >
      <div className="row aling-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Upload File</h4>
            <button className="btn" onClick={() => setIsFileUploadModalOpen(false)}>
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column align-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-5 form-control">Upload File</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
