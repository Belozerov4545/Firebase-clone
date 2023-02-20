import React from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import ShowItems from '../ShowItems/ShowItems';

function FolderComponent() {
  const { folderId } = useParams();

  const { currentFolderData, childFolders, childFiles } = useSelector((state) => ({
    currentFolderData: state.filefolders.userFolders.find(
      (folder) => folder.docId === folderId,
    )?.data,
    childFolders: state.filefolders.userFolders.filter(
      (folder) => folder.data.parent === folderId,
    ),
    childFiles: state.filefolders.userFiles.filter(
      (file) => file.data?.parent === folderId,
    ),
  }), shallowEqual);

  const createdFiles = childFiles && childFiles.filter((file) => file.data.url === null);
  const uploadedFiles = childFiles && childFiles.filter((file) => file.data.data === null);

  return (
    <div>
      {
      childFolders.length > 0 ? (
        <>
          {
          childFolders.length > 0 && (
            <ShowItems title="Created folders" type="folder" items={childFolders} />
          )
        }
          {
            createdFiles && createdFiles.length > 0 && (
              <ShowItems title="Created files" type="file" items={createdFiles} />
            )
          }
          {
            uploadedFiles && uploadedFiles.length > 0 && (
              <ShowItems title="Uploaded files" type="file" items={uploadedFiles} />
            )
          }
        </>
      ) : (
        <h1 className="text-center my-5">Empty Folder</h1>
      )
    }
    </div>
  );
}

export default FolderComponent;
