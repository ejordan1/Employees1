import { db } from "../db.js";
import jwt from "jsonwebtoken"

export const getShifts = (req,res)=>{

    const q = "SELECT * FROM shifts";

    db.query(q, (err, data)=>{
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
}

export const getShift = (req,res)=>{
    const q = "SELECT `starttime`, `endtime` FROM employees1.employees e JOIN employees1.shifts s ON e.id=s.uid WHERE e.id = ?"

    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })

}

export const addShift = (req,res)=>{
    res.json("from controller shifts");
}

export const deleteShift = (req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, employeeInfo)=>{
        if(err) return res.status(403).json("token is not vaild!")

        const shiftId = req.params.id
        const q = "DELETE FROM shifts WHERE `id` = ? AND `uid` = ?"

        db.query(q, [shiftId, employeeInfo.id], (err,data)=>{
            if(err) return res.status(403).json("You can delete only your posts")

            return res.json("post has been deleted");
        })
    })
}

export const updateShift = (req,res)=>{
    res.json("from controller shifts");
}

