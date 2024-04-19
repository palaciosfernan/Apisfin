import User from "../models/User"

export const userExist = async (req, res, next) => {
    try {
        console.log("req.params.userId:", req.params.userId);
        console.log("req.body.passwordActuali:", req.body.passwordActuali);
        console.log("req.body.passwordNew:", req.body.passwordNew);

        if (!req.params.userId || !req.body.passwordActuali || !req.body.passwordNew) {
            return res.status(400).json({message: "Please provide all required data"});
        }

        const userExist = await User.findById(req.params.userId);
        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error Server" });
    }
};
