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
        const q = "INSERT INTO perms_users(`permid`, `uid`) VALUES (?)";

        const values = [req.body.permid, req.body.uid];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).send(err);
          if (data.affectedrows === 0)
            return res.status(404).json("Did not affect any rows");
          return res.status(200).json("perm_user has been added");
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
        const perm_userid = req.body.perm_userid;
        if (!perm_userid)
          return res.status(500).json("did not have perm_userid in body");
        const q = "DELETE FROM perms_users WHERE `perm_userid`=?";

        db.query(q, perm_userid, (err, data) => {
          if (err) return res.status(500).send(err);

          if (data.affectedRows === 0)
            return res.status(404).json("Did not affect any rows");

          return res
            .status(200)
            .json("perms_users: " + perm_userid + " has been deleted by admin");
        });
      }
    });
  });
};
