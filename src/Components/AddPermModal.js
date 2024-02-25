import React, { useState } from "react";
import axios from "axios";
import styles from "./AddPermModal.module.scss"

export default function AddPermModal() {
  const [modal, setModal] = useState(false);

  const [createPermInputs, setCreatePermInputs] = useState({
    starttime: 0,
    endtime: 0,
    position: "",
    slots: null,
  });

  const handleCreatePermChange = (e) => {
    setCreatePermInputs((prev) => ({
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
        starttime: createPermInputs.starttime,
        endtime: createPermInputs.endtime,
        position: createPermInputs.position,
        slots: createPermInputs.slots,
      };
      const res = await axios.post(`/perms`, bodyvalues);
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
            
          <div className="createPermForm">
        <h1>Add Perm</h1>
        <form>
          <input
            required
            type="number"
            placeholder="starttime"
            name="starttime"
            onChange={handleCreatePermChange}
          />
          <input
            required
            type="number"
            placeholder="endtime"
            name="endtime"
            onChange={handleCreatePermChange}
          />
          <input
            required
            type="number"
            placeholder="slots"
            name="slots"
            onChange={handleCreatePermChange}
          />
          <input
            required
            type="text"
            placeholder="position"
            name="position"
            onChange={handleCreatePermChange}
          />
          <button onClick={handleSubmitCreate}>Create Perm</button>
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
