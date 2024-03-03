import React, { useState, useEffect } from "react";
import styles from "./EditPermModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditPermModal(props) {
  //const [modal, setModal] = useState(false);

  const navigate = useNavigate();

  const editPermDefaultValues = {
    starttime: 0,
    endtime: 0,
    slots: 0,
    position: "",
    permUsers: {},
  };
  const [editPermInputs, setEditPermInputs] = useState({
    editPermDefaultValues,
  });

  useEffect(() => {
    if (props.isVisible) {
      setEditPermInputs({
        id: props.perm.id,
        position: props.perm.position,
        starttime: props.perm.starttime,
        endtime: props.perm.endtime,
        slots: props.perm.slots,
        permUsers: props.perm.permUsers,
      });
    }
  }, [props.isVisible]);

  const handleEditPermChange = (e) => {
    setEditPermInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateUserPermChange = (e) => {
    setCreateUserPermInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [createUserPermInputs, setCreateUserPermInputs] = useState({
    uid: 0,
  });

  const handleSubmitCreateUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        permid: props.id,
        uid: createUserPermInputs.uid,
      };
      const res = await axios.post(`/perms_users/add`, bodyvalues);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDeleteUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        perm_userid: e.target.id,
      };
      const res = await axios.put(`/perms_users/delete`, bodyvalues);
      toggleModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.perm.id,
        starttime: editPermInputs.starttime,
        endtime: editPermInputs.endtime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };

      const res = await axios.put(`/perms/edit`, bodyvalues);
      toggleModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.perm.id,
        starttime: editPermInputs.starttime,
        endtime: editPermInputs.endtime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };
      const res = await axios.put(`/perms/delete`, bodyvalues);
      toggleModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => {
    setEditPermInputs(editPermDefaultValues);
    props.closeModal();
  };

  return (
    <div>
      {props.isVisible && (
        <>
          <button onClick={toggleModal} className={styles.btnModal}>
            Open
          </button>
          {
            <div className={styles.modal}>
              <div onClick={toggleModal} className={styles.overlay}></div>
              <div className={styles.modalContent}>
                <p>id: {props.perm.id} </p>
                <p>starttime: {props.perm.starttime} </p>
                <p>endtime: {props.perm.endtime} </p>
                <p>position: {props.perm.position} </p>
                <p>slots: {props.perm.slots} </p>
                {editPermInputs.permUsers &&
                  Object.entries(editPermInputs.permUsers).map((keyvalue) => (
                    <div>
                      <p>
                        {"perm_userid: " +
                          keyvalue[0] +
                          ", uid: " +
                          keyvalue[1].uid +
                          ", " +
                          keyvalue[1].firstname +
                          ", " +
                          keyvalue[1].lastname}
                      </p>
                      <button
                        id={keyvalue[0]}
                        onClick={handleSubmitDeleteUserPerm}
                      >
                        Delete User Perm
                      </button>
                    </div>
                  ))}

                <div className="createUserPermForm">
                  <h1>Create UserPerm</h1>
                  <form>
                    <input
                      required
                      type="number"
                      placeholder="uid"
                      name="uid"
                      onChange={handleCreateUserPermChange}
                    />
                    <button onClick={handleSubmitCreateUserPerm}>
                      Create User Perm
                    </button>
                  </form>
                </div>

                {/* initial values */}
                <div className="editPermForm">
                  <h1>Edit Perm</h1>
                  <form>
                    <input
                      required
                      type="number"
                      defaultValue={props.starttime}
                      name="starttime"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.endtime}
                      name="endtime"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.slots}
                      name="slots"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="text"
                      defaultValue={props.position}
                      name="position"
                      onChange={handleEditPermChange}
                    />
                    <button onClick={handleSubmitEdit}>Edit Perm</button>
                    <button onClick={handleSubmitDelete}>Delete Perm</button>
                  </form>
                </div>

                <button className="close-modal" onClick={toggleModal}>
                  CLOSE
                </button>
              </div>
            </div>
          }
        </>
      )}
    </div>
  );
}

EditPermModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  perm: PropTypes.object.isRequired,
  // id: PropTypes.number.isRequired,
  // position: PropTypes.string.isRequired,
  // starttime: PropTypes.number.isRequired,
  // endtime: PropTypes.number.isRequired,
  // slots: PropTypes.number.isRequired,
  // permUsers: PropTypes.object.isRequired,
};
