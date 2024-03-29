import { db } from "../db.js";
import jwt from "jsonwebtoken";
import { createPermDictFromData } from "../Libraries/PermOperations.js";

export const getPerms = (req, res) => {
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
        const getAllPermsQuery = `
        SELECT 
        employees1.perms.perms_id, 
        employees1.perms.perms_startdatetime, 
        employees1.perms.perms_enddatetime, 
        employees1.perms.perms_position,
        employees1.perms.perms_jobtype,
        employees1.perms_users.perms_users_id,
        employees1.perms_users.perms_users_permid,
        employees1.perms_users.perms_users_uid,
        employees1.users.firstname,
        employees1.users.lastname,
        employees1.perms.perms_slots
        FROM employees1.perms LEFT JOIN employees1.perms_users    ON employees1.perms.perms_id =  perms_users.perms_users_permid
        LEFT JOIN employees1.users ON employees1.users.id =  employees1.perms_users.perms_users_uid`;

        db.query(getAllPermsQuery, (err, data) => {
          if (err) return res.status(500).send(err);
          let PermsOrganizedById = createPermDictFromData(data);
          return res.status(200).json(PermsOrganizedById);
        });
      }
    });
  });
};

// both individual user and admin can access this:
export const getPermsByUserId = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const getPermsByIdQuery = `
        SELECT employees1.perms.perms_startdatetime, 
        employees1.perms.perms_enddatetime, 
        employees1.perms.perms_position, 
        employees1.perms_users.perms_users_permid,
        employees1.perms_users.perms_users_uid,
        employees1.users.firstname,
        employees1.users.lastname 
        FROM employees1.perms JOIN employees1.perms_users    ON employees1.perms.perms_id =  perms_users.perms_users_permid
        JOIN employees1.users ON employees1.users.id =  employees1.perms_users.perms_users_uid
        WHERE employees1.users.id = ?`;

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
      if (err || data[0].role != "admin") {
        db.query(getPermsByIdQuery, [employeeInfo.id], (err, data) => {
          if (err) return res.status(500).send(err);

          return res.status(200).json(data);
        });
      } else {
        if (!req.body.id) {
          res.status(500).send(err);
        }
        db.query(getPermsByIdQuery, [req.body.id], (err, data) => {
          if (err) return res.status(500).send(err);

          return res.status(200).json(data);
        });
      }
    });
  });
};

export const getMyPerms = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const getPermsByIdQuery = `
        SELECT employees1.perms.perms_startdatetime, 
        employees1.perms.perms_enddatetime, 
        employees1.perms.perms_position, 
        employees1.perms_users.perms_users_permid,
        employees1.perms_users.perms_users_uid,
        employees1.users.firstname,
        employees1.users.lastname 
        FROM employees1.perms JOIN employees1.perms_users    ON employees1.perms.perms_id =  perms_users.perms_users_permid
        JOIN employees1.users ON employees1.users.id =  employees1.perms_users.perms_users_uid
        WHERE employees1.users.id = ?`;

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";

    db.query(getPermsByIdQuery, [employeeInfo.id], (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const addPerm = (req, res) => {
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
          "INSERT INTO perms(`perms_position`, `perms_startdatetime`, `perms_enddatetime`, `perms_slots`, `perms_jobType`) VALUES (?)";

        const permsjobType =
          req.body.perms_jobType === -1 ? null : req.body.perms_jobType;

        const values = [
          req.body.perms_position,
          req.body.perms_startdatetime,
          req.body.perms_enddatetime,
          req.body.perms_slots,
          permsjobType,
        ];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.affectedRows === 0)
            return res.status(404).json("Did not affect any rows");
          return res.status(200).json("perm has been added by admin");
        });
      }
    });
  });
};

export const editPerm = (req, res) => {
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
          "UPDATE employees1.perms SET `perms_position`=?, `perms_startdatetime`=?, `perms_enddatetime`=?, `perms_slots`=?, `perms_jobtype`=? WHERE `perms_id`=?";

        const permsjobType =
          req.body.perms_jobType === -1 ? null : req.body.perms_jobType;

        const values = [
          req.body.perms_position,
          req.body.perms_startdatetime,
          req.body.perms_enddatetime,
          req.body.perms_slots,
          permsjobType,
          req.body.perms_id,
        ];
        if (!req.body.perms_id)
          return res.status(500).json("did not have id in body");
        db.query(q, values, (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.affectedRows === 0)
            return res
              .status(404)
              .json("Did not affect any row, id probably didn't match");
          return res.status(200).json("perm has been edited by admin");
        });
      }
    });
  });
};

// still need to verify that the startdatetime and enddatetime match what the user client sent
export const deletePerm = (req, res) => {
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
        const id = req.body.perms_id;
        if (!id) return res.status(500).json("did not have id in body");
        const q = "DELETE FROM perms WHERE `id`=?";

        db.query(q, [id], (err, data) => {
          if (err) return res.status(500).send(err);

          if (data.affectedRows === 0)
            return res.status(404).json("Did not affect any rows");

          return res
            .status(200)
            .json("perm: " + id + " has been deleted by admin");
        });
      }
    });
  });
};
