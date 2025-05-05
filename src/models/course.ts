import { CallbackError, model, Model, Schema } from "mongoose";
import slugify from "slugify";

export interface Course {
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  published: boolean;
  author: string;
  createdAt: Date;
}

type CourseModel = Model<Course, object>;

const courseSchema = new Schema<Course, CourseModel>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
    default: "beginner",
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const CourseModel = model<Course, CourseModel>("Course", courseSchema);
