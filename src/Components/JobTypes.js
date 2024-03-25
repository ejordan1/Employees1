import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleMyShift from "./SingleMyShift.js";
import SingleAvailableShift from "./SingleAvailableShift.js";
import PickupShiftModal from "./PickupShiftModal.js";
import DropShiftModal from "./DropShiftModal.js";
import {
  mapObjectsToDate,
  thisWeekDates,
} from "../Libraries/DateOperations.js";
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import styles from "./JobTypes.module.scss";
import SingleJobType from "./SingleJobType.js";


// it says its calling just localhost:3000/jobtypes, (missing api) but maybe it is actually including api?
function JobTypes() {

  const fetchJobs = async () => {
    const res = await axios.get(`/jobtypes`);
    return res.data;
  };

  const {
    data: jobsData,
    error: jobsError, // not tested
    isLoading: jobsIsLoading, // not tested
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

  return (
    <div className={styles.container}>
      <div className="jobsBox">
      <p>hello job types</p>
      {jobsData &&
        jobsData.map((job) => (
          <div>
            {job.jobtypes_id}
            {job.jobtypes_title}
            <SingleJobType title={job.jobtypes_title} description={job.jobtypes_description}></SingleJobType>
          </div>
        ))}
        </div>
    </div>
  );
}

export default JobTypes;
