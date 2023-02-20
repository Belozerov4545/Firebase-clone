import { faFileAlt, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowItems.css';
import { useDispatch } from 'react-redux';
import { changeFolder } from '../../../redux/actionCreators/fileFoldersActionCreator';

function ShowItems({ title, items, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDoubleClick = (itemId) => {
    if (type === 'folder') {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  return (
    <div className="w-100">
      <h4 className="text-center border=bottom">{title}</h4>
      <div className="row gap-2 py-4 flex-wrap">
        {items.map((item, index) => (
          <p
            key={index * 55}
            className="col-md-2 py-3 text-center d-flex flex-column broder"
            onDoubleClick={() => handleDoubleClick(item.docId)}
          >
            {type === 'folder'
              ? (<FontAwesomeIcon icon={faFolder} size="4x" className="mb-3" />)
              : (<FontAwesomeIcon icon={faFileAlt} size="4x" className="mb-3" />)}
            {item.data?.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ShowItems;
