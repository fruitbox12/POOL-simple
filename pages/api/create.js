// import { useLogin } from "../../context/UserContext";

export default function handler(req, res) {
    if (req.method === 'POST') {
        res.status(200).json({"message": "Success", "email": req.body.email});
    } else {
        res.status(200).json({"message": "Please use a POST request."});
    }
}