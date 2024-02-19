import express from "express";
import {
  addPerm_User as addPerms_Users,
  deletePerm_User as deletePerms_Users,
  getPerm_User as getPerms_Users,
} from "../controllers/perm_user.js";

const router = express.Router();

router.get("/get", getPerms_Users);
router.post("/add", addPerms_Users);
router.put("/delete", deletePerms_Users);

export default router;
