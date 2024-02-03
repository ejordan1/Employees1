import {db} from "../db.js"
import bcrypt from "bcryptjs"

export const register = (req,res)=>{
     //res.json("from register shifts");
    // //CHECK existing user


    // //with the following code it appears in the console
    // const q = "SELECT * FROM employees1.shifts;"
    // console.log("Connected!");

    const q = "SELECT * FROM employees1.employees WHERE id = ?"
    db.query(q, [req.body.id], (err,data)=>{
        if (err) return res.json(err)
        // in javascript it gives true for checking if length is not 0
        if(data.length) return res.status(409).json("User already exists");

        //Hash the password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO employees(`firstname`,`lastname`,`password`) VALUES (?)"
        const values = [
            req.body.firstname,
            req.body.lastname,
            hash,
        ]

        // const values = [
        //     req.body.firstname,
        //     req.body.lastname,
        //     hash,
        // ]

        db.query(q,[values], (err,data)=>{
            if(err) return res.json(err)
            return res.status(200).json("user has been created")
        })
    
    })
}

export const login = (req,res)=>{
    res.json("from register shifts");
}

export const logout = (req,res)=>{

}