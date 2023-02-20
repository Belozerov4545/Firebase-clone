import { faArrowLeftLong, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateFileData } from '../../../redux/actionCreators/fileFoldersActionCreator';

function Header({
  fileName, fileData, prevFileData, fileId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg mt-1 navbar-ligth bg-white shadow-sm">
      <p className="navbar-brand my-2 fw-bold ms-5">{fileName}</p>
      {
        fileData !== prevFileData && (
        <h5 className="my-0 fw-bold ms-2 text-danger">modefied</h5>
        )
      }
      <ul className="navbar-nav ms-auto me-5">
        <li className="navbar-item">
          <button
            className="btn btn-success"
            disabled={fileData === prevFileData}
            onClick={() => {
              dispatch(updateFileData(fileId, fileData));
            }}
          >
            <FontAwesomeIcon icon={faSave} />
            {' '}
            Save
          </button>
        </li>
        <li className="navbar-item">
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeftLong} />
            {' '}
            Go Back
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Header;
