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
        SELECT employees1.perms.starttime, 
        employees1.perms.endtime, 
        employees1.perms.position, 
        employees1.fills.permid,
        employees1.fills.uid,
        employees1.users.firstname,
        employees1.users.lastname 
        FROM employees1.perms JOIN employees1.fills    ON employees1.perms.id =  fills.permid
        JOIN employees1.users ON employees1.users.id =  employees1.fills.uid`;

        db.query(getAllPermsQuery, (err, data) => {
          if (err) return res.status(500).send(err);
    
          return res.status(200).json(data);
        });
      }
    });
  });
};

export const getPermsByUserId = (req, res) => {
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

        const getPermsByIdQuery = `
        SELECT employees1.perms.starttime, 
        employees1.perms.endtime, 
        employees1.perms.position, 
        employees1.fills.permid,
        employees1.fills.uid,
        employees1.users.firstname,
        employees1.users.lastname 
        FROM employees1.perms JOIN employees1.fills    ON employees1.perms.id =  fills.permid
        JOIN employees1.users ON employees1.users.id =  employees1.fills.uid
        WHERE employees1.users.id = ?`;

        db.query(getPermsByIdQuery, [req.params.id], (err, data) => {
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
            const q = "INSERT INTO perms(`position`, `starttime`, `endtime`, `slots`) VALUES (?)";

            const values = [req.body.position, req.body.starttime, req.body.endtime, req.body.slots];
  
          db.query(q, [values], (err, data) => {
            if (err) return res.status(500).send(err);
            if (data.affectedRows === 0) return res.status(404).json("Did not affect any rows");
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
            const q = "UPDATE employees1.perms SET `position`=?, `starttime`=?, `endtime`=?, `slots`=? WHERE `id`=?";
            const values = [req.body.position, req.body.starttime, req.body.endtime, req.body.slots, req.body.permid];
            if (!req.body.permid) return res.status(500).json("did not have permid in body");
          db.query(q, values, (err, data) => {
            if (err) return res.status(500).send(err);
            if (data.affectedRows === 0) return res.status(404).json("Did not affect any rows");
            return res.status(200).json("perm has been edited by admin");
          });
        }
      });
    });
  };

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

            const permId = req.body.permid;
            if (!permId) return res.status(500).json("did not have permid in body");
            const q = "DELETE FROM perms WHERE `id`=?";
  
          db.query(q, [permId], (err, data) => {
            if (err) return res.status(500).send(err);

            if (data.affectedRows === 0) return res.status(404).json("Did not affect any rows");
      
            return res.status(200).json("perm: " + permId +  " has been deleted by admin");
          });
        }
      });
    });
  };



