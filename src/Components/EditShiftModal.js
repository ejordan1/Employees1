import React, { useState } from "react";
import "./EditShiftModal.module.scss";

export default function EditShiftModal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <p>edit shift modal</p>
          {/* <div className="createShiftForm">
        <h1>Edit Shift</h1>
        <form>
          <input
            required
            type="number"
            placeholder="starttime"
            name="starttime"
            onChange={handleCreateShiftChange}
          />
          <input
            required
            type="number"
            placeholder="endtime"
            name="endtime"
            onChange={handleCreateShiftChange}
          />
          <input
            required
            type="number"
            placeholder="uid (optional)"
            name="uid"
            onChange={handleCreateShiftChange}
          />
          <input
            required
            type="text"
            placeholder="position"
            name="position"
            onChange={handleCreateShiftChange}
          />
          <button onClick={handleSubmitCreate}>Create Shift</button>
        </form>
      </div> */}

            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}