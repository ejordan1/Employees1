import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPerm_User = (req, res) => {
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
        const q = "SELECT * FROM perms_users";

        db.query(q, (err, data) => {
          if (err) return res.status(500).send(err);

          return res.status(200).json(data);
        });
      }
    });
  });
};

export const addPerm_User = (req, res) => {
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
        const q = "INSERT INTO perms_users(`perms_users_permid`, `perms_users_uid`) VALUES (?)";

        // here I had to use truthy, but in add shift I used true... why?
        const perms_users_uid = req.body.perms_users_uid == -1 ? null : req.body.perms_users_uid;

        const values = [req.body.perms_users_permid, perms_users_uid];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.affectedrows === 0){ // suggested affectedRows?
            return res.status(404).json("Did not affect any rows");
          }

          // need to implement this and account for null too
          let nameQ = "SELECT firstname, lastname FROM employees1.users WHERE id = 5;"
          db.query(nameQ, req.body.id, (err, dataName) => {
            if (err) return res.status(500).send(err);
            if (dataName.length === 0) {
              return res.status(404).json("User not found");
            }
            return res.status(200).json(dataName);
          })
        });
      }
    });
  });
};

export const deletePerm_User = (req, res) => {
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
        const perms_users_id = req.body.perms_users_id;
        if (!perms_users_id)
          return res.status(500).json("did not have perms_users_id in body");
        const q = "DELETE FROM perms_users WHERE `perms_users_id`=?";

        db.query(q, perms_users_id, (err, data) => {
          if (err) return res.status(500).send(err);

          if (data.affectedRows === 0)
            return res.status(404).json("Did not affect any rows");

          return res
            .status(200)
            .json("perms_users: " + perms_users_id + " has been deleted by admin");
        });
      }
    });
  });
};
