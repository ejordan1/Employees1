import express from "express";
import {
   addFill,
   deleteFill,
//   editFill,
    getFills,
} from "../controllers/fill.js";

const router = express.Router();

 router.get("/", getFills);
 router.post("/", addFill);
// router.put("/", editFill);
 router.delete("/", deleteFill);

export default router;
