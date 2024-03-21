import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getAllEmployees = (req, res) => {
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
        const q = "SELECT * FROM users";

        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json(data);
        });
      }
    });
  });
};
