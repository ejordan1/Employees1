import React, { useState } from "react";
import "./AddShiftModal.module.scss";
import axios from "axios";
import styles from "./AddShiftModal.module.scss"

export default function AddShiftModal() {
  const [modal, setModal] = useState(false);

  const [createShiftInputs, setCreateShiftInputs] = useState({
    starttime: 0,
    endtime: 0,
    position: "",
    uid: null,
  });

  const handleCreateShiftChange = (e) => {
    setCreateShiftInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        starttime: createShiftInputs.starttime,
        endtime: createShiftInputs.endtime,
        position: createShiftInputs.position,
        uid: createShiftInputs.uid,
      };
      const res = await axios.post(`/shifts/admin/add`, bodyvalues);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.btn-modal}>
        Open add
      </button>

      {modal && (
        <div className={styles.modal}>
          <div onClick={toggleModal} className={styles.overlay}></div>
          <div className={styles.modalContent}>
            
          <div className="createShiftForm">
        <h1>Add Shift</h1>
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
      </div>

            <button className="close-modal" onClick={toggleModal}>
              CLOSE add
            </button>
          </div>
        </div>
      )}
      
    </>
  );
}
