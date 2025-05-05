import { Router } from "express";
import { courseController } from "../controllers/courseController";

const router = Router();

router.post("/course", courseController.createCourse);
router.get("/courses", courseController.getAllCourses);
router.get("/courses/:id", courseController.getCourseById);
router.put("/courses/:id", courseController.updateCourse);
router.delete("/courses/:id", courseController.deleteCourse);

export const courseRoutes = router;
