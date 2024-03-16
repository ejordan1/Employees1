import React, { useState } from "react";
import "./AddShiftModal.module.scss";
import axios from "axios";
import styles from "./AddShiftModal.module.scss";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function AddShiftModal() {
  const [modal, setModal] = useState(false);

  const queryClient = useQueryClient(); // gets the queryclient

  const [createShiftInputs, setCreateShiftInputs] = useState({
    startdatetime: 0,
    enddatetime: 0,
    position: "",
    uid: null,
  });

  const addShift = async (bodyValues) => {
    const res = await axios.post(`/shifts/admin/add`, bodyValues);
    return res.data;
  };

  const {mutate: mutateAddShift, addShiftIsPending, addShiftIsError, addShiftIsSuccess} = useMutation({
    mutationFn: (bodyValues) => addShift(bodyValues),
    onSuccess: () => 
    {
      queryClient.invalidateQueries();
    }
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

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        // doing this later
        startdatetime: "2024-03-12 07:23:44",
        enddatetime: "2024-03-12 15:23:44",
        position: createShiftInputs.position,
        uid: createShiftInputs.uid,
      };
      mutateAddShift(bodyvalues);
      queryClient.invalidateQueries();
      toggleModal();
      // const res = await axios.post(`/shifts/admin/add`, bodyvalues);
      // queryClient.invalidateQueries();
      // toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={toggleModal} className={styles.btn - modal}>
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
                  placeholder="startdatetime, values will not be used"
                  name="startdatetime"
                  onChange={handleCreateShiftChange}
                />
                <input
                  required
                  type="number"
                  placeholder="enddatetime, values will not be used"
                  name="enddatetime"
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
