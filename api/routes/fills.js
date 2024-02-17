import express from "express";
import {
   addFill,
   deleteFill,
//   editFill,
    getFills,
} from "../controllers/fill.js";

const router = express.Router();

 router.get("/get", getFills);
 router.post("/add", addFill);
// router.put("/", editFill);
 router.put("/delete", deleteFill);

export default router;
