import express from "express";
import {
  addPerm,
  deletePerm,
  editPerm,
  getPerms,
  getPermsByUserId,
} from "../controllers/perms.js";

const router = express.Router();

router.get("/", getPerms);
router.get("/:id", getPermsByUserId)
router.post("/", addPerm);
router.put("/edit", editPerm);
router.delete("/delete", deletePerm);

export default router;
