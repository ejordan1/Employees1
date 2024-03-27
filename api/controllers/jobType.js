import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAllJobTypes = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
      if (err || data[0].role != "admin") {
        return res
          .status(401)
          .json("error:" + err + " , You don't have admin privlages");
      } else {
        const q = `SELECT * FROM employees1.jobTypes`;

        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json(data);
        });
      }
    });
  });
};

// not yet tested
export const addJobType = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
      if (err || data[0].role != "admin") {
        return res
          .status(401)
          .json("error:" + err + " , You don't have admin privlages");
      } else {
        // error handling here for body values
        // This error is not reaching the console for some reason
        if (!req.body.jobTypes_title) {
          // had  || !req.body.shifts_uid
          return res
            .status(500)
            .json("not all required body fields were included, requires title");
        }

        const q =
          "INSERT INTO jobtypes(`jobtypes_title`, `jobtypes_description`) VALUES (?)";

        const values = [req.body.jobTypes_title, req.body.jobTypes_details];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("job has been created");
        });
      }
    });
  });
};

// not yet tested
export const editJobType = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not valid!");

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
      if (err || data[0].role != "admin") {
        return res
          .status(401)
          .json("error:" + err + " , You don't have admin privlages");
      } else {
        const q =
          "UPDATE jobTypes SET `jobtypes_title`=?, `jobtypes_description`=?, `shifts_position`=?, `shifts_uid`=? WHERE `jobTypes_id`=?";

        const shifts_uid =
          req.body.shifts_uid === "-1" ? null : req.body.shifts_uid;

        const values = [
          req.body.jobTypes_title,
          req.body.jobTypes_description,
          req.body.jobTypes_id,
        ];

        db.query(q, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Shift has been updated");
        });
      }
    });
  });
};

// make delete later
