// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import {
//     useQuery,
//     useQueryClient,
//   } from "@tanstack/react-query";

//   const fetchAllShifts = async () => {
//     const res = await axios.get(`/employees/all`);
//     return res.data;
//   };

//  export const {
//     data: allEmployeesData,
//     error: allEmployeesError, // not tested
//     isLoading: allEmployeesIsLoading, // not tested
//   } = useQuery({
//     queryKey: ["allshifts"],
//     queryFn: fetchAllShifts,
//   });