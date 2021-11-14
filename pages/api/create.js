import { useLogin } from "../../context/UserContext";

export default function handler(req, res) {
    // Get data from your database
    login(req.body.email);
    res.status(200).json({"message": "Success", "req": req});
}