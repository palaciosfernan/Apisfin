import User from "../models/User"

export const userExistsNoPassword = async (req, res, next) => {
    try {
        if (!req.params.userId) {
            return res.status(400).json({ message: "Please provide the user ID" });
        }

        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};