import axios from "axios";
import { useRef } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router";
function SignUp() {
    <h1>hello world!</h1>
    const userFrom = useRef();
    //const navigate = useNavigate();
    function submitHandler(e) {
        const form = userFrom.current;
        e.preventDefault()
        const data = {
            email: form['email'].value,
            confirmEmail: form['confirmEmail'].value,
            password: form['password'].value,
            ConfirmPassword: form['ConfirmPassword'].value,
            phone: form['phone'].value,
        }

        if (data['email'].value !== '' && data['password'].value !== '') {
            alert(data['email'] + ', ' + data['confirmEmail'] + ', ' + data['password'] + ', ' + data['ConfirmPassword'] + ', ' + data['phone']);
            if (data['email'].value === data['confirmEmail'].value && data['password'].value === data['ConfirmPassword'].value) {
                axios.post("http://localhost:8080/api/v1/user", data)
                    .then(data => {
                        console.log(data)
                        //navigate('/homepage');
                        alert('Your data has been saved, please login your portal.');
                    }).catch(error => {
                        console.error(error);
                    })

            } else {
                alert('The email address or password you entered does not match. Please try again.');
            }
        } else {
            alert('All fields are required');
        }
    }

    return (
        <form ref={userFrom} className="form1">
            <fieldset>
                <legend>Create a professional account</legend>
                Email address
                <br />
                <input name="email" type="email" required="required" placeholder="Enter your email address" defaultValue='' />
                <br />
                Confirm email address
                <br />
                <input name="confirmEmail" required="required" type="email" placeholder="Confirm your email address" />
                <br />
                Password
                <br />
                <input name="password" required="required" type="password" placeholder="Enter your password" defaultValue='' />
                <br />
                Confirm password
                <br />
                <input name="ConfirmPassword" required="required" type="password" placeholder="Confirm your password" />
                <br />
                Phone number
                <br />
                <input name="phone" type="text" required="required" placeholder="Enter your phone number" />
                <br />
                <input type="submit" id="button" onClick={submitHandler} />
            </fieldset>
        </form>
    )
}
export default SignUp;