import axios from "axios";
import { useRef, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router";
function SignUp() {
    const userFrom = useRef();
    const navigate = useNavigate();
    const [emailState, setEmailState] = useState('');
    const [confirmEmailState, setConfirmEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [confirmPasswordState, setConfirmPasswordState] = useState('');
    const [phoneState, setPhoneState] = useState('');
    function submitHandler(e) {
        const form = userFrom.current;
        e.preventDefault();
        //console.log('length=' + emailState.length);
        if (emailState.length !== 0 && confirmEmailState.length !== 0 && passwordState.length !== 0
            && confirmPasswordState.length !== 0 && phoneState.length !== 0) {
            //alert(data['email'] + ', ' + data['confirmEmail'] + ', ' + data['password'] + ', ' + data['ConfirmPassword'] + ', ' + data['phone']);
            if (emailState === confirmEmailState && passwordState === confirmPasswordState) {
                let data = {
                    email: form['email'].value,
                    confirmEmail: form['confirmEmail'].value,
                    password: form['password'].value,
                    ConfirmPassword: form['ConfirmPassword'].value,
                    phone: form['phone'].value,
                }
                axios.post("http://localhost:8080/api/v1/user", data)
                    .then(data => {
                        console.log(data)
                        navigate('/');
                    }).catch(error => {
                        console.error(error);
                    })

            } else {
                alert('The email address or password you entered does not match. Please try again.');
            }
        } else {
            alert('All fields are required');
        }
        navigate('/');
    }

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
                Confirm email address
                <br />
                <input className="input1" name="confirmEmail" required="required" type="email" placeholder="Confirm your email address"
                    onChange={e => setConfirmEmailState(e.target.value)}
                />
                <br />
                Password
                <br />
                <input className="input1" name="password" required="required" type="password" placeholder="Enter your password" defaultValue=''
                    onChange={e => setPasswordState(e.target.value)}
                />
                <br />
                Confirm password
                <br />
                <input className="input1" name="ConfirmPassword" required="required" type="password" placeholder="Confirm your password"
                    onChange={e => setConfirmPasswordState(e.target.value)}
                />
                <br />
                Phone number
                <br />
                <input className="input1" name="phone" type="text" required="required" placeholder="Enter your phone number"
                    onChange={e => setPhoneState(e.target.value)}
                />
                <br />
                <input type="submit" id="button" onClick={submitHandler} />
            </fieldset>
        </form>
    )
}
export default SignUp;