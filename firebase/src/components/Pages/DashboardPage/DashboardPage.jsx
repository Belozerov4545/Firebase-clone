import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Route, Routes, useNavigate, useLocation,
} from 'react-router-dom';
import { getFiles, getFolders } from '../../../redux/actionCreators/fileFoldersActionCreator';

import CreateFile from '../../DashboardComponents/CreateFile/CreateFile';
import CreateFolder from '../../DashboardComponents/CreateFolder/CreateFolder';
import FileComponent from '../../DashboardComponents/FileComponent/FileComponent';
import FolderComponent from '../../DashboardComponents/FolderComponent/FolderComponent';
import HomeComponent from '../../DashboardComponents/HomeComponent/HomeComponent';

import Navbar from '../../DashboardComponents/Navbar/Navbar';
import Subbar from '../../DashboardComponents/Subbar/Subbar';
import UploadFile from '../../DashboardComponents/UploadFile/UploadFile.jsx';

function DashboardPage() {
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isFileUploadModalOpen, setIsFileUploadModalOpen] = useState(false);
  const [showSubbar, setShowSubbar] = useState(true);

  const { isLoggedIn, isLoading, userId } = useSelector((state) => ({
    isLoggedIn: state.auth.isAuthenticated,
    isLoading: state.filefolders.isLoading,
    userId: state.auth.user.uid,
  }), shallowEqual);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (isLoading && userId) {
      dispatch(getFolders(userId));
      dispatch(getFiles(userId));
    }
  }, [isLoading, userId, dispatch]);

  useEffect(() => {
    if (pathname.includes('/file/')) {
      setShowSubbar(false);
    }
  }, [pathname]);

  return (
    <>
      {
      isCreateFolderModalOpen && (
        <CreateFolder setIsCreateFolderModalOpen={setIsCreateFolderModalOpen} />
      )
}
      {
      isCreateFileModalOpen && (
        <CreateFile setIsCreateFileModalOpen={setIsCreateFileModalOpen} />
      )
}
      {
      isFileUploadModalOpen && (
        <UploadFile setIsFileUploadModalOpen={setIsFileUploadModalOpen} />
      )
}
      <Navbar />
      {
        showSubbar && (
          <Subbar
            setIsCreateFolderModalOpen={setIsCreateFolderModalOpen}
            setIsCreateFileModalOpen={setIsCreateFileModalOpen}
            setIsFileUploadModalOpen={setIsFileUploadModalOpen}
          />
        )
      }
      <Routes>
        <Route path="" element={<HomeComponent />} />
        <Route path="folder/:folderId" element={<FolderComponent />} />
        <Route path="file/:fileId" element={<FileComponent />} />
      </Routes>
    </>
  );
}

export default DashboardPage;
