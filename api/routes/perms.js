import express from "express";
import {
  addPerm,
  deletePerm,
  editPerm,
  getPerms,
} from "../controllers/perms.js";

const router = express.Router();

router.get("/", getPerms);
router.post("/", addPerm);
router.put("/", editPerm);
router.delete("/", deletePerm);

export default router;
