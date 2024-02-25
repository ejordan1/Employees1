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
        const q = "SELECT * FROM shifts";

        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json(data);
        });
      }
    });
  });
};

export const getMyShifts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM shifts WHERE uid = ?";

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

    const q = "SELECT * FROM shifts WHERE uid IS NULL";

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
        const q =
          "INSERT INTO shifts(`starttime`, `endtime`, `position`, `uid`) VALUES (?)";

        const values = [req.body.starttime, req.body.endtime, req.body.position, req.body.uid];

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
          "UPDATE shifts SET `starttime`=?, `endtime`=?, `uid`=? WHERE `id`=?";
        const values = [
          req.body.starttime,
          req.body.endtime,
          req.body.uid,
          req.body.id
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
        const shiftId = req.body.id;
        const q = "DELETE FROM shifts WHERE `id` = ?";

        db.query(q, [shiftId, employeeInfo.id], (err, data) => {
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
      "SELECT `starttime`, `endtime` FROM employees1.shifts s WHERE s.id = ?"; //
    db.query(q, [req.body.shiftid], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(500).json("no shift was found");

      if (
        data[0].starttime == req.body.starttime &&
        data[0].endtime == req.body.endtime
      ) {
        const q =
          "UPDATE `employees1`.`shifts` SET `uid` = ? WHERE (`id` = '?')";

        db.query(q, [employeeInfo.id, req.body.shiftid], (err, data) => {
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
      "SELECT `starttime`, `endtime` FROM employees1.shifts s WHERE s.id=? AND s.uid=?"; // sid = get from body, and s.uid = employeeInfo.id

    const values = [req.body.shiftid, req.body.uid];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(500).json("no shift was found");

      if (
        data[0].starttime == req.body.starttime &&
        data[0].endtime == req.body.endtime
      ) {
        const q =
          "UPDATE `employees1`.`shifts` SET `uid` = NULL WHERE (`id` = '?')";

        db.query(q, [req.body.shiftid], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("Shift has been dropped");
        });
      } else {
        return res.status(500).json("Shift data doesn't match");
      }
    });
  });
};
