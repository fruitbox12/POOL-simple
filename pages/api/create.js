// import { useLogin } from "../../context/UserContext";

export default function handler(req, res) {
    if (req.method === 'POST') {
        // console.log("one");
        var oooo = require("../../context/UserContext");
        // const login = useLogin();
        // console.log("two");
        oooo.useLogin(req.body.email);
        // console.log("three");
        res.status(200).json({"message": "Success", "email": req.body.email});
    } else {
        res.status(200).json({"message": "Please use a POST request7."});
    }
}