import { toast } from 'react-toastify';
import * as types from '../actionTypes/authActionTypes';
import fire from '../../config/firebase';

const loginUser = (payload) => ({
  type: types.SIGN_IN,
  payload,
});

// const registerUser = (payload) => ({
//   type: types.REGISTER_USER,
//   payload,
// });

const logoutUser = () => ({
  type: types.SIGN_OUT,
});

// action creator

export const signInUser = (email, password, setSuccess) => (dispatch) => {
  fire.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(loginUser({
        uid: user.user.uid,
        email: user.user.email,
        name: user.user.displayName,
      }));
      setSuccess(true);
    })
    .catch((error) => toast.error('Invalid Email or Password!'));
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  fire.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    fire.auth().currentUser.updateProfile({
      displayName: name,
    })
      .then(() => {
        const { currentUser } = fire.auth();
        dispatch(loginUser({
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
        }));
        setSuccess(true);
      })
      .catch((error) => {
        toast.error(error);
      });
  })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use!');
      }
      if (error.code === 'auth/invalid-email') {
        toast.error('Invalid email!');
      }
      if (error.code === 'auth/week-password') {
        toast.error('Week password!');
      }
    });
};

export const signoutUser = () => (dispatch) => {
  fire.auth().signOut().then(() => {
    dispatch(logoutUser());
  });
};

export const checkIsLoggedIn = () => (dispatch) => {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(loginUser({
        uid: user.uid,
        email: user.email,
        name: user.displayName,
      }));
    }
  });
};
