import { db } from "../db.js";
import jwt from "jsonwebtoken";


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
        employees1.perms.id, 
        employees1.perms.starttime, 
        employees1.perms.endtime, 
        employees1.perms.position,
        employees1.perms_users.perm_userid,
        employees1.perms_users.permid,
        employees1.perms_users.uid,
        employees1.users.firstname,
        employees1.users.lastname,
        employees1.perms.slots
        FROM employees1.perms LEFT JOIN employees1.perms_users    ON employees1.perms.id =  perms_users.permid
        LEFT JOIN employees1.users ON employees1.users.id =  employees1.perms_users.uid`;

        db.query(getAllPermsQuery, (err, data) => {
          if (err) return res.status(500).send(err);

          return res.status(200).json(data);
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
        SELECT employees1.perms.starttime, 
        employees1.perms.endtime, 
        employees1.perms.position, 
        employees1.perms_users.permid,
        employees1.perms_users.uid,
        employees1.users.firstname,
        employees1.users.lastname 
        FROM employees1.perms JOIN employees1.perms_users    ON employees1.perms.id =  perms_users.permid
        JOIN employees1.users ON employees1.users.id =  employees1.perms_users.uid
        WHERE employees1.users.id = ?`;

    const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
      if (err || data[0].role != "admin") {
          db.query(getPermsByIdQuery, [employeeInfo.id], (err, data) => {
            if (err) return res.status(500).send(err);

            return res.status(200).json(data);
          });
      } else {
        if (!req.body.id)
        {
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
          "INSERT INTO perms(`position`, `starttime`, `endtime`, `slots`) VALUES (?)";

        const values = [
          req.body.position,
          req.body.starttime,
          req.body.endtime,
          req.body.slots,
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
          "UPDATE employees1.perms SET `position`=?, `starttime`=?, `endtime`=?, `slots`=? WHERE `id`=?";
        const values = [
          req.body.position,
          req.body.starttime,
          req.body.endtime,
          req.body.slots,
          req.body.id,
        ];
        if (!req.body.id)
          return res.status(500).json("did not have id in body");
        db.query(q, values, (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.affectedRows === 0)
            return res.status(404).json("Did not affect any row, id probably didn't match");
          return res.status(200).json("perm has been edited by admin");
        });
      }
    });
  });
};

// still need to verify that the starttime and endtime match what the user client sent
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
        const id = req.body.id;
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
