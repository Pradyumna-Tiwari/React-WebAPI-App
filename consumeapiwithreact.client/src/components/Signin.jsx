import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loaderImg from '../assets/loader.gif'
import login from '../assets/login2.png'

function Signin() {
    const[loader,setloader]=useState(false);
    document.title = "Login";
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);     
    return (

        <section className='loginSection'>
            <img className="login_img mb-4" src={login}/>
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <p className='message text-danger'></p>
            <p className='messageSuccess text-primary'></p>
            <form action='#' className="Signin" onSubmit={handleSignin}>
                <div className="m-2 p-2">
                    {/* <label for="inputEmail" className="sr-only">Email address</label> */}
                    <input type='email' name='Email' id='email' className="form-control" placeholder="Email address" required="" autofocus="" />
                </div>
                <p>
                {loader?
                <img src={loaderImg} alt="overlay" className="overlay-image" />:''
                }
                </p>
                <div className="m-2 p-2">
                    {/* <label for="inputPassword" className="sr-only">Password</label> */}
                    <input type='password' name='Password' id='password' className="form-control" placeholder="Password" required="" />
                </div>
                <div className="m-2 p-2">
                    <input type='submit' value="Signin" className="btn btn-lg btn-primary btn-block" />
                    
                </div>
            </form>
        </section >


    );
    async function handleSignin(e) {
        e.preventDefault();
        setloader(true);
        const _form = e.target, submitter = document.querySelector('input.Signin');
        const formData = new FormData(_form, submitter), dataToSend = {};
        for (const [Key, value] of formData) {
            dataToSend[Key] = value
        }
if(dataToSend.Email!='' && dataToSend.Password!=''){
        try {

            const response = await axios.post('/api/Auth/Signin', dataToSend, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            const data = response.data;
            if (response.status === 200) {
                const messageElement = document.querySelector(".messageSuccess");
                const msg=response.data.message;
                messageElement.innerHTML =msg;
                localStorage.setItem("user", data.email);
                document.location = "/";
                setloader(false);
            } else {
                const messageElement = document.querySelector(".message");
                if (data.message) {
                    messageElement.innerHTML = data.message;
                } else {
                    messageElement.innerHTML = "Something went wrong! Please try again.";
                }
                setloader(false);
            }
        } catch (error) {
            const messageElement = document.querySelector(".message");
            messageElement.innerHTML = `Error: ${error.response ? error.response.data.message : error.message}`;
            setloader(false);
        }
    }else{
        const messageElement = document.querySelector(".message");
        messageElement.innerHTML = `Error: Email addrees or Password can not blank.`;
        setloader(false);
    }
}
}

export default Signin;