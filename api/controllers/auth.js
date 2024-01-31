import {db} from "../db.js"
export const register = (req,res)=>{
    res.json("from register shifts");
    // //CHECK existing user
    // const q = "SELECT * FROM employees1.shifts;"
    // console.log("Connected!");
    // db.query(q, (err,data)=>{
    //     if (err) return res.json(err)
    //     console.log(data)
    // })
}

export const login = (req,res)=>{

}

export const logout = (req,res)=>{

}