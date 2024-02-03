import { db } from "../db.js";

export const getShifts = (req,res)=>{

    const q = "SELECT * FROM shifts";

    db.query(q, (err, data)=>{
        if (err) return res.send(err);

        return res.status(200).json(data);
    })
}

export const getShift = (req,res)=>{
    res.json("from controller shifts");
}

export const addShift = (req,res)=>{
    res.json("from controller shifts");
}

export const deleteShift = (req,res)=>{
    res.json("from controller shifts");
}

export const updateShift = (req,res)=>{
    res.json("from controller shifts");
}

