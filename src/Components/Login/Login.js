import axios from "axios";
import { useRef, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
const Login = () => {
    const userFrom = useRef();
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');

    function submitHandler(e) {
        const form = userFrom.current;
        e.preventDefault();
        if (emailState.length !== 0 && passwordState.length !== 0) {
            let data = {
                email: form['email'].value,
                password: form['password'].value,
            }
            axios.get("http://localhost:8080/api/v1/user", data)
                .then(data => {
                    console.log(data)
                    //navigate('/'); to user or admin or seller page 
                }).catch(error => {
                    console.error(error);
                })
        } else {
            alert('All fields are required');
        }
    }//end of submitHandler function

    return (
        <form ref={userFrom} className="form1">
            <fieldset>
                <legend>Create a professional account</legend>
                Email address
                <br />
                <input className="input1" name="email" type="email" required="required" placeholder="Enter your email address"
                    onChange={e => setEmailState(e.target.value)}
                />
                <br />
                Password
                <br />
                <input className="input1" name="password" required="required" type="password" placeholder="Enter your password" defaultValue=''
                    onChange={e => setPasswordState(e.target.value)}
                />
                <br />
                <input type="submit" id="button" onClick={submitHandler} />
            </fieldset>
        </form>
    )
}
export default Login;