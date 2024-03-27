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
  const queryClient = useQueryClient(); // gets the queryclient

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

  const addJobtype = async (bodyValues) => {
    const res = await axios.post(`/jobtypes/add`, bodyValues);
    return res.data;
  };

  const {
    mutate: mutateAddJobType,
    addJobTypeIsPending,
    addJobTypeIsError,
    addJobTypeIsSuccess,
  } = useMutation({
    mutationFn: (bodyValues) => addJobtype(bodyValues),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const [titleInput, setTitleInput] = useState("");
  const [detailsInput, setDetailsInput] = useState("");

  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const bodyvalues = {
        jobTypes_title: titleInput,
        jobTypes_details: detailsInput,
      };
      mutateAddJobType(bodyvalues);
      queryClient.invalidateQueries();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className="jobsBox">
        <h1>Create Job Types</h1>
        <p>Each shift can be assigned a job type. </p>

        <p>
          Here you can create job types that will be selectable when creating
          shifts or perms.{" "}
        </p>
        <form>
          <input
            required
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="details"
            name="details"
            onChange={(e) => setDetailsInput(e.target.value)}
          />
          <button onClick={handleSubmitCreate}>Create Shift</button>
        </form>

        {jobsData &&
          jobsData.map((job) => (
            <div>
              {job.jobtypes_id}
              {job.jobtypes_title}
              <SingleJobType
                title={job.jobtypes_title}
                description={job.jobtypes_description}
              ></SingleJobType>
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobTypes;
