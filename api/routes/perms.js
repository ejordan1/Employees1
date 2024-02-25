import express from "express";
import {
  addPerm,
  deletePerm,
  editPerm,
  getPerms,
  getMyPerms,
  getPermsByUserId,
} from "../controllers/perms.js";

const router = express.Router();

router.get("/", getPerms);
router.get("/myperms", getMyPerms);
router.get("/byid", getPermsByUserId);
router.post("/", addPerm);
router.put("/edit", editPerm);
router.put("/delete", deletePerm);

export default router;
