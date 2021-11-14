// import { useLogin } from "../../context/UserContext";

export default function handler(req, res) {
    // Get data from your database
    res.status(200).json({"message": "Success2"});
    // try {
    //     login(req.body.email);
    //     res.status(200).json({"message": "Success", "req": req});
    // } catch (error) {
    //     res.status(200).json({"message": "fail", "req": req});
    // }
}