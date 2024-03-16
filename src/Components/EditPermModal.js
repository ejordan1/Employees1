import React, { useState, useEffect } from "react";
import styles from "./EditPermModal.module.scss";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function EditPermModal(props) {

  const queryClient = useQueryClient();
  

  const editPermDefaultValues = {
    startdatetime: 0,
    enddatetime: 0,
    slots: 0,
    position: "",
    permUsers: {},
  };

  const [editPermInputs, setEditPermInputs] = useState({
    editPermDefaultValues,
  });

  const [createUserPermInputs, setCreateUserPermInputs] = useState({
    uid: 0,
  });


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


  const addPermUser = async (bodyValues) => {
    const res = await axios.post(`/perms_users/add`, bodyValues);
    return res.data;
  };

  const deletePermUser = async (bodyValues) => {
    const res = await axios.put(`/perms_users/delete`, bodyValues);
    return res.data;
  };

  const deletePerm = async (bodyValues) => {
    const res = await axios.put(`/perms/delete`, bodyValues);
    return res.data;
  };

  const editPerm = async (bodyValues) => {
    const res = await axios.put(`/perms/edit`, bodyValues);
    return res.data;
  };

  const {mutate: mutateAddPU, addPUIsPending, addPIIsError, addPUIsSuccess} = useMutation({
    mutationFn: (bodyValues) => addPermUser(bodyValues),
    onSuccess: () => 
    {
      queryClient.invalidateQueries();
    }
  });

  const {mutate: mutateDeletePerm, deletePermIsPending, deletePermIsError, deletePermIsSuccess} = useMutation({
    mutationFn: (bodyValues) => deletePerm(bodyValues),
    onSuccess: () => 
    {
      queryClient.invalidateQueries();
    }
  });

  const {mutate: mutateDeletePU, deletePUIsPending, deletePUisError, deletePUisSuccess} = useMutation({
    mutationFn: (bodyValues) => deletePermUser(bodyValues),
    onSuccess: () => 
    {
      queryClient.invalidateQueries();
    }
  });

  const {mutate: mutateEditPerm, editPermIsPending, editPermIsError, editPermIsSuccess} = useMutation({
    mutationFn: (bodyValues) => editPerm(bodyValues),
    onSuccess: () => 
    {
      queryClient.invalidateQueries();
    }
  });

  useEffect(() => {
    if (props.isVisible) {
      setEditPermInputs({
        id: props.perm.id,
        position: props.perm.position,
        startdatetime: props.perm.startdatetime,
        enddatetime: props.perm.enddatetime,
        slots: props.perm.slots,
        permUsers: props.perm.permUsers,
      });
    }
  }, [props.isVisible]);


  const handleSubmitCreateUserPerm = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        permid: props.perm.id,
        uid: createUserPermInputs.uid,
      };
      mutateAddPU(bodyvalues);
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
      mutateDeletePU(bodyvalues);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.perm.id,
        startdatetime: "0997-01-04 07:23:44", // editPermInputs.startdatetime,
        enddatetime: "0997-01-04 07:23:44", // editPermInputs.enddatetime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };

      mutateEditPerm(bodyvalues);
      queryClient.invalidateQueries();
      // toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        id: props.perm.id,
        startdatetime: "0997-01-04 07:23:44", //editShiftInputs.startdatetime,
        enddatetime: "0997-01-04 07:23:44", //editShiftInputs.enddatetime,
        position: editPermInputs.position,
        slots: editPermInputs.slots,
      };
      mutateDeletePerm(bodyvalues);
      queryClient.invalidateQueries();
      toggleModal();
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
                <p>
                  startdatetime: {format(props.perm.startdatetime, "HHmm")}{" "}
                </p>
                <p>enddatetime: {format(props.perm.enddatetime, "HHmm")} </p>
                <p>position: {props.perm.position} </p>
                <p>slots: {props.perm.slots} </p>
                {props.perm.permUsers &&
                  Object.entries(props.perm.permUsers).map((keyvalue) => (
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
                      defaultValue={format(props.perm.startdatetime, "HHmm")}
                      name="startdatetime"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={format(props.perm.enddatetime, "HHmm")}
                      name="enddatetime"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="number"
                      defaultValue={props.perm.slots}
                      name="slots"
                      onChange={handleEditPermChange}
                    />
                    <input
                      required
                      type="text"
                      defaultValue={props.perm.position}
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
};
