// import { useLogin } from "../../context/UserContext";

export default function handler(req, res) {
    // Get data from your database
    res.status(200).json({"message": "Success", "email": req.body.email});
}