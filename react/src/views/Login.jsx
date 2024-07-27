
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login(){

    const emailRef = useRef();
    const passwordRef = useRef();
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);

    useEffect(()=> {
        document.title = "Login";
    }, [])

    const submit = (e) => {
        e.preventDefault();

        setErrors(null);
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login', payLoad).then(({data}) => {
            setToken(data.token);
            setUser(data.user);
        })
        .catch(err => {
            const response = err.response;
            
            if(response.data.errors){
                setErrors(response.data.errors);
            }
            else{
                setErrors({
                    email: [response.data.msg]
                })
                
            }
        });


    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={submit}>
                    <h1 className="title">
                        Login
                    </h1>

                    {/* {errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    } */}

                    <input ref={emailRef} type="email" placeholder="Email" />
                    {errors && errors.email && <div className="alert"><p>{errors.email}</p></div>}
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    {errors && errors.password && <div className="alert"><p>{errors.password}</p></div>}
                    <button type="submit" className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup" >Create An Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );

}

export default Login;