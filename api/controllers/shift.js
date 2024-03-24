import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAllShifts = (req, res) => {
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
        const q = `SELECT * FROM employees1.shifts LEFT JOIN employees1.users    ON employees1.shifts.shifts_uid =  users.id`;

        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json(data);
        });
      }
    });
  });
};

// assume this is the two weeks range for now
export const getMyShifts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "SELECT * FROM shifts WHERE shifts_uid = ? AND shifts_startdatetime >= '2014-01-01' AND shifts_startdatetime <= '2024-04-01';";

    db.query(q, employeeInfo.id, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const getAvailableShifts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM shifts WHERE shifts_uid IS NULL";

    db.query(q, employeeInfo.id, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const addShift = (req, res) => {
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
        if (!req.body.shifts_startdatetime || !req.body.shifts_enddatetime) // had  || !req.body.shifts_uid
        {
          return res.status(500).json("not all required body fields were included, requires st, et, uid");
        }

        const q =
          "INSERT INTO shifts(`shifts_startdatetime`, `shifts_enddatetime`, `shifts_position`, `shifts_uid`) VALUES (?)";

        const values = [
          req.body.shifts_startdatetime,
          req.body.shifts_enddatetime,
          req.body.shifts_position,
          req.body.shifts_uid ? req.body.shifts_uid : null,
        ];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("shift has been created");
        });
      }
    });
  });
};

export const editShift = (req, res) => {
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
          "UPDATE shifts SET `shifts_startdatetime`=?, `shifts_enddatetime`=?, `shifts_position`=?, `shifts_uid`=? WHERE `shifts_id`=?";

         const shifts_uid = req.body.shifts_uid === '-1' ? null : req.body.shifts_uid;

        const values = [
          req.body.shifts_startdatetime,
          req.body.shifts_enddatetime,
          req.body.shifts_position,
          shifts_uid,
          req.body.shifts_id,
        ];

        db.query(q, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Shift has been updated");
        });
      }
    });
  });
};

export const deleteShift = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not vaild!");

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
      if (err || data[0].role != "admin") {
        return res
          .status(401)
          .json("error:" + err + " , You don't have admin privlages");
      } else {
        const shifts_shiftId = req.body.shifts_id;
        const q = "DELETE FROM shifts WHERE `id` = ?";

        db.query(q, [shifts_shiftId, employeeInfo.id], (err, data) => {
          if (err)
            return res.status(403).json("You can delete only your shifts");

          return res.json("shift has been deleted");
        });
      }
    });
  });
};

export const pickupShift = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not valid!");
    const q =
      "SELECT `shifts_startdatetime`, `shifts_enddatetime` FROM employees1.shifts s WHERE s.shifts_id = ?"; //
    db.query(q, [req.body.shifts_id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(500).json("no shift was found");

      if (
        true
        // data[0].starttime == req.body.starttime &&
        // data[0].enddatetime == req.body.enddatetime
      ) {
        const q =
          "UPDATE `employees1`.`shifts` SET `shifts_uid` = ? WHERE (`shifts_id` = '?')";

        db.query(q, [employeeInfo.id, req.body.shifts_id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Shift has been picked up by: " + employeeInfo.id);
        });
      } else {
        return res.status(500).json("Shift data doesn't match");
      }
    });
  });
};

export const dropShift = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not valid!");

    const q =
      "SELECT `shifts_startdatetime`, `shifts_enddatetime` FROM employees1.shifts s WHERE s.shifts_id=? AND s.shifts_uid=?"; // sid = get from body, and s.uid = employeeInfo.id

    // changed from req.body.uid to employeeInfo.id, verify still works
    const values = [req.body.shifts_id, employeeInfo.id];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(500).json("no shift was found");

      if (
        true
        // data[0].starttime == req.body.starttime &&
        // data[0].enddatetime == req.body.enddatetime
      ) {
        const q =
          "UPDATE `employees1`.`shifts` SET `shifts_uid` = NULL WHERE (`shifts_id` = '?')";

        db.query(q, [req.body.shifts_id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Shift has been dropped");
        });
      } else {
        return res.status(500).json("Shift data doesn't match");
      }
    });
  });
};
