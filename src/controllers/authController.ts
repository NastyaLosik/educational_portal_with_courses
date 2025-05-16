import { Request, Response } from "express";
import { authService } from "../services/authService";

const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, password, role } = req.body;
    const user = await authService.registerUser(
      firstName,
      lastName,
      username,
      password,
      role,
    );
    const token = authService.generateToken(user._id.toString());
    res.status(201).json({ token });
  } catch (err) {
    const error = err as Error;
    res.status(400).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await authService.loginUser(username, password);
    const token = authService.generateToken(user._id.toString());
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getUserData = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const userData = await authService.getUserData(username);

    res.status(200).json({
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      username: userData.username,
      role: userData.role,
    });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    await authService.deleteUser(username);
    res.status(200).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
};

export const authController = {
  register,
  login,
  getUserData,
  deleteUser,
};
