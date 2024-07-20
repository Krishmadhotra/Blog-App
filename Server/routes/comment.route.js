import express from 'express'
const router=express.Router();
import {createComment,getPostComments,likeComment,editComment} from "../controllers/comment.controller.js"
import {verifyToken} from "../utils/verifyUser.js"

router.post("/create",verifyToken,createComment)
router.get("/getPostComments/:postID",getPostComments)
router.put("/likeComment/:commentId",verifyToken,likeComment)
router.put("/editComment/:commentId",verifyToken,editComment)

export default  router;