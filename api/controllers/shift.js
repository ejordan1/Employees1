import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getShifts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM shifts";

    db.query(q, (err, data) => {
      if (err) return res.status(500).send(err);

      return res.status(200).json(data);
    });
  });
};

export const getShift = (req, res) => {
  const q =
    "SELECT `starttime`, `endtime` FROM employees1.users e JOIN employees1.shifts s ON e.id=s.uid WHERE e.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
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
          "INSERT INTO shifts(`starttime`, `endtime`, `uid`) VALUES (?)";

        const values = [req.body.starttime, req.body.endtime, req.body.uid];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.json("shift has been created");
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
        const shiftId = req.body.shiftid;
        const q = "DELETE FROM shifts WHERE `id` = ?";
        // AND `uid` = ?" deleted from before

        //doesn't give an error even if the employee number is not correct, just doesn't delete
        db.query(q, [shiftId, employeeInfo.id], (err, data) => {
          if (err)
            return res.status(403).json("You can delete only your posts");

          return res.json("post has been deleted");
        });
      }
    });
  });
};

export const pickupShift = (req,res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not valid!");
  const q =
          "SELECT `starttime`, `endtime` FROM employees1.shifts s WHERE s.id = ?"; // 
        db.query(
          q,
         [req.body.shiftid],
          (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0)
              return res.status(500).json("no shift was found");

            if (
              data[0].starttime == req.body.starttime &&
              data[0].endtime == req.body.endtime
            ) {
              // shift matches up, allow the change to take place
              const q =
                "UPDATE `employees1`.`shifts` SET `uid` = ? WHERE (`id` = '?')";

              db.query(q, [employeeInfo.id, req.body.shiftid], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Shift has been picked up by: " + employeeInfo.id);
              });
            } else {
              return res.status(500).json("Shift data doesn't match");
            }
          }
        );
  });
}

export const dropShift = (req,res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not valid!");
  const q =
          "SELECT `starttime`, `endtime` FROM employees1.shifts s WHERE s.id = 5 AND s.uid = 8"; // sid = get from body, and s.uid = employeeInfo.id
        db.query(
          q,
         //  [req.body.eid, req.body.shiftid],
          (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0)
              return res.status(500).json("no shift was found");

            if (
              data[0].starttime == req.body.starttime &&
              data[0].endtime == req.body.endtime
            ) {
              // shift matches up, allow the change to take place
              const q =
                "UPDATE `employees1`.`shifts` SET `uid` = NULL WHERE (`id` = '?')";

              db.query(q, [req.body.shiftid], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Shift has been dropped");
              });
            } else {
              return res.status(500).json("Shift data doesn't match");
            }
          }
        );
  });
}

export const updateShift = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, "jwtkey", (err, employeeInfo) => {
    if (err) return res.status(403).json("token is not valid!");

        const q =
          "SELECT `starttime`, `endtime` FROM employees1.shifts s WHERE s.id = 5";
        db.query(
          q,
         //  [req.body.eid, req.body.shiftid],
          (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0)
              return res.status(500).json("no shift was found");

            if (
              data[0].starttime == req.body.starttime &&
              data[0].endtime == req.body.endtime
            ) {
              // shift matches up, allow the change to take place
              const q =
                "UPDATE `employees1`.`shifts` SET `uid` = NULL WHERE (`id` = '?')";

              db.query(q, [req.body.shiftid], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.json("Shift has been dropped");
              });
            } else {
              return res.status(500).json("Shift data doesn't match");
            }
          }
        );

    // NEXT: ADD THIS TO THE SWITCH STATEMENT

    // employee dropping the shift section
    const getUserShiftQuery =
      "SELECT `starttime`, `endtime` FROM employees1.users e JOIN employees1.shifts s ON e.id=s.uid WHERE e.id = ? AND s.id = ?"; //
    db.query(
      getUserShiftQuery,
      [req.body.eid, req.body.shiftid],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0)
          return res.status(500).json("no shift was found");

        if (
          
          data[0].starttime == req.body.starttime &&
          data[0].endtime == req.body.endtime
        ) {
          // shift matches up, allow the change to take place
          const q =
            "UPDATE `employees1`.`shifts` SET `uid` = NULL WHERE (`id` = '?')";

          db.query(q, [req.body.shiftid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Shift has been dropped");
          });
        } else {
          return res.status(500).json("Shift data doesn't match");
        }
      }
    );

    // admin changing the shift section
    // const getRoleQuery = "SELECT role FROM employees1.users WHERE id = ?";
    // db.query(getRoleQuery, [employeeInfo.id], (err, data) => {
    //   if (err || data[0].role != "admin") {
    //     return res
    //       .status(401)
    //       .json("error:" + err + " , You don't have admin privlages");
    //   } else {
    //     //const shiftId = req.params.id;
    //     const q = "UPDATE shifts SET `starttime`=?, `endtime`=? WHERE `id` = ?";
    //     const values = [req.body.starttime, req.body.endtime, req.body.id];

    //     db.query(q, values, (err, data) => {
    //       if (err) return res.status(500).json(err);
    //       return res.json("Shift has been updated");
    //     });
    //   };
    // });
  });
};
