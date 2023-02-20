import { toast } from 'react-toastify';
import * as types from '../actionTypes/fileFoldersActionTypes';
import fire from '../../config/firebase';

// actions folders

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// action files

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

// action folders creators

export const createFolder = (data) => (dispatch) => {
  fire
    .firestore()
    .collection('folders')
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
      toast.success('Folder created successfully');
    });
};

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection('folders')
    .where('userId', '==', userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(addFolders(foldersData));
      dispatch(setLoading(false));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// action files creators

export const getFiles = (userId) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .where('userId', '==', userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));
      dispatch(addFiles(filesData));
    });
};

export const createFile = (data, setSuccess) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      toast.success('File created successfully!');
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
    })
    .catch(() => {
      setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fire
    .firestore()
    .collection('files')
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success('File saved successfully!');
    })
    .catch(() => {
      toast.error('Somesthing went wrong!');
    });
};

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  const uploadFileRef = fire.storage().ref(`files/${data.userId}/${data.name}`);
  uploadFileRef.put(file).on('state_changed', (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
    );
    toast.success(`uploading ${progress}%`);
  }, (error) => {
    toast.error(error);
  }, async () => {
    const fileUrl = await uploadFileRef.getDownloadURL();
    const fullData = { ...data, url: fileUrl };
    fire
      .firestore()
      .collection('files')
      .add(fullData)
      .then(async (file) => {
        const fileData = await (await file.get()).data();
        const fileId = file.id;
        dispatch(createFile({ data: fileData, docId: fileId }));
        toast.success('File uploaded successfully!');
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      });
  });
};