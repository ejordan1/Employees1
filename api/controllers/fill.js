import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getFills = (req, res) => {
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
        const q = "SELECT * FROM fills";

        db.query(q, (err, data) => {
          if (err) return res.status(500).send(err);
    
          return res.status(200).json(data);
        });
      }
    });
  });
};

export const addFill = (req, res) => {
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
            const q = "INSERT INTO fills(`permid`, `uid`) VALUES (?)";

            const values = [req.body.permid, req.body.uid];
  
          db.query(q, [values], (err, data) => {
            if (err) return res.status(500).send(err);
            if (data.affectedrows === 0) return res.status(404).json("Did not affect any rows");
            return res.status(200).json("fill has been added");
          });
        }
      });
    });
  };

  export const deleteFill = (req, res) => {
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

            const fillId = req.body.fillid;
            if (!fillId) return res.status(500).json("did not have fillid in body");
            const q = "DELETE FROM fills WHERE `fillid`=?";
  
          db.query(q, fillId, (err, data) => {
            if (err) return res.status(500).send(err);

            if (data.affectedRows === 0) return res.status(404).json("Did not affect any rows");
      
            return res.status(200).json("fill: " + fillId +  " has been deleted by admin");
          });
        }
      });
    });
  };



