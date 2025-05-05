import { CourseModel, Course } from "../models/course";

const createCourse = async (courseData: Omit<Course, "slug" | "createdAt">) => {
  const course = new CourseModel({
    ...courseData,
    createdAt: new Date(),
  });

  await course.save();
  return course;
};

const getAllCourses = async () => {
  return await CourseModel.find();
};

const getCourseById = async (id: string) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new Error("Курс не найден");
  }
  return course;
};

const updateCourse = async (
  id: string,
  updatedData: Partial<Omit<Course, "slug" | "createdAt">>,
) => {
  const course = await CourseModel.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!course) {
    throw new Error("Курс не найден");
  }
  return course;
};

const deleteCourse = async (id: string) => {
  const course = await CourseModel.findByIdAndDelete(id);
  if (!course) {
    throw new Error("Курс не найден");
  }
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
