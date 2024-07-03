import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loaderImg from '../assets/loader.gif';
import login from '../assets/login2.png'


function Signup() {
    const [loader, setLoader] = useState(false);
    document.title = "Signup";

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);

    async function handleSignin(e) {
        e.preventDefault();
        setLoader(true);
        const form = e.target;
        const formData = new FormData(form);
        const dataToSend = Object.fromEntries(formData);

        if (dataToSend.Email && dataToSend.Password) {
            try {
                const response = await axios.post('/api/Auth/Signup', dataToSend, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (response.status === 200) {
                    const messageElement = document.querySelector(".messageSuccess");
                    const msg = response.data.message;
                    messageElement.innerHTML = msg;
                    document.location = "/";
                } else {
                    const messageElement = document.querySelector(".message");
                    messageElement.innerHTML = response.data.message || "Something went wrong! Please try again.";
                }
            } catch (error) {
                const messageElement = document.querySelector(".message");
                if (error.response && error.response.data && error.response.data.errors) {
                    let errorMessages = '';
                    for (const key in error.response.data.errors) {
                        if (error.response.data.errors.hasOwnProperty(key)) {
                            const errorArray = error.response.data.errors[key];
                            errorMessages += errorArray.map(err => `<p>${err}</p>`).join('');
                        }
                    }
                    messageElement.innerHTML = `Error: ${errorMessages}`;
                } else {
                    messageElement.innerHTML = `Error: ${error.message}`;
                }
            } finally    {
                setLoader(false);
            }
        } else {
            const messageElement = document.querySelector(".message");
            messageElement.innerHTML = "Error: Email address or Password cannot be blank.";
            setLoader(false);
        }
    }

    return (
        <section className='signup_Section'>
            <img className="signup_img mb-1" src={login}/>
            <h1 className="h4 mb-1 font-weight-normal">Please Register yourself in</h1>
            <p className='message text-danger'></p>
            <p className='messageSuccess text-primary'></p>
            <form action='#' className="Signup" onSubmit={handleSignin}>
                <div className="m-2 p-2">
                    <input type='text' name='FirstName' className="form-control" placeholder="FirstName" required autoFocus />
                </div>
                <div className="m-2 p-2">
                    <input type='text' name='LastName' className="form-control" placeholder="LastName" required />
                </div>
                <div className="m-2 p-2">
                    <input type='text' name='Username' className="form-control" placeholder="Username" required />
                </div>
                <div className="m-2 p-2">
                    <input type='email' name='Email' className="form-control" placeholder="Email address" required />
                </div>
                <p>
                    {loader ? <img src={loaderImg} alt="loading" className="overlay-image" /> : ''}
                </p>
                <div className="m-2 p-2">
                    <input type='password' name='Password' className="form-control" placeholder="Password" required />
                </div>
                <div className="m-2 p-2">
                    <input type='password' name='ConfirmPassword' className="form-control" placeholder="Confirm Password" required />
                </div>
                <div className="m-2 p-2">
                    <input type='submit' value="Signup" className="btn btn-lg btn-primary btn-block" />
                </div>
            </form>
        </section>
    );
}

export default Signup;
