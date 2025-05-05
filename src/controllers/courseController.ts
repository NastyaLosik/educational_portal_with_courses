import { Request, Response } from "express";
import { courseService } from "../services/courseService";

export const courseController = {
  createCourse: async (req: Request, res: Response) => {
    try {
      const courseData = req.body;
      const course = await courseService.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },

  getAllCourses: async (req: Request, res: Response) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getCourseById: async (req: Request, res: Response) => {
    try {
      const course = await courseService.getCourseById(req.params.id);
      res.status(200).json(course);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  updateCourse: async (req: Request, res: Response) => {
    try {
      const updatedCourse = await courseService.updateCourse(
        req.params.id,
        req.body,
      );
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },

  deleteCourse: async (req: Request, res: Response) => {
    try {
      await courseService.deleteCourse(req.params.id);
      res.status(200).json({ message: "Курс удален" });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  },
};
