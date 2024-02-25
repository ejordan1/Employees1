import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AllShifts.module.scss";
import SingleAllShift from "./SingleAllShift";
import EditShiftModal from "./EditShiftModal";
import AddShiftModal from "./AddShiftModal";

function AllShifts() {
  const [allShifts, setAllShifts] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [modalEditShift, setModalEditShift] = useState({
    id: null,
    position: "",
    starttime: 0,
    endtime: 0,
    uid: 0,
  });

  function getShiftById(id) {
    for (let i = 0; i < allShifts.length; i++) {
      if (allShifts[i].id == id) {
        return allShifts[i];
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/shifts/admin/all`);
        setAllShifts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // might be a bad way to do this but works:
  // button id is set to the shift id, and is grabbed with e.target.id
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let shiftById = getShiftById(e.target.id);

      setModalEditShift({
        starttime: shiftById.starttime,
        endtime: shiftById.endtime,
        uid: shiftById.uid,
        id: shiftById.id,
        position: shiftById.position,
      });

      setEditModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setEditModalVisible(false);
  };

  return (
    <div className="AllShifts">
      <div>
        <h1 className={styles.pageTitle}>Admin Schedule</h1>
      </div>
      <p> next is add </p>
      <AddShiftModal></AddShiftModal>
      <h1 className={styles.weekOfTitle}>Feburary 9 - Feburary 23</h1>
      <div className={styles.shiftsContainer}>
        <div>
          <h1 className={styles.weekday}>Sunday 2/9</h1>{" "}
          <div>
            {" "}
            {allShifts.map((shift) => (
              <div>
                <SingleAllShift
                  id={shift.id}
                  position={shift.position}
                  starttime={shift.starttime}
                  endtime={shift.endtime}
                  uid={shift.uid}
                >
                  asdf
                </SingleAllShift>
                <button id={shift.id} onClick={handleEdit}>
                  Edit Shift
                </button>
              </div>
            ))}
          </div>{" "}
        </div>
      </div>
      
        <EditShiftModal
        isVisible={editModalVisible}
          closeModal={closeModal}
          id={modalEditShift.id}
          position={modalEditShift.position}
          starttime={modalEditShift.starttime}
          endtime={modalEditShift.endtime}
          uid={modalEditShift.uid}
        ></EditShiftModal>
    
    </div>
  );
}

export default AllShifts;
