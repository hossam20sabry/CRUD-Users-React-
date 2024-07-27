import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";


function UserForm(){

    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate()
    const {setNotification} = useStateContext()

    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault()
        if(user.id){
            axiosClient.put(`/users/${user.id}`, user)
            .then(()=>{
                setNotification("User was successfuly updated.")
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                }
            })
        }
        else{
            axiosClient.post(`/users`, user)
            .then(()=>{
                setNotification("User was successfuly created.")
                navigate('/users')
            })
            .catch(err => {
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors);
                }
            })
        }
    }


    if(id){
        useEffect(() => {
            setLoading(true)
            document.title =  'Dashboard . User: ' + user.name;
            axiosClient.get(`/users/${id}`)
            .then(({data}) => {
                setUser(data)
                setLoading(false)
            })
            .catch(
                setLoading(false)
            )
        }, [])
    }
    else{
        useEffect(()=>{
            document.title = "Dashboard: Create User"
        }, [])
    }


    return (
        <>
        {user.id &&  <h1>Upate User: {user.name}</h1>}
        {!user.id &&  <h1>Create User</h1>}
        <div className="card animated fadeInDown">
            {loading && (
                <div className="text-center">loading...</div>
            ) }
            {errors && 
                <div className="alert">
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            }

            {!loading && 
                <form onSubmit={submit}>
                    <input onChange={ e => setUser({...user, name: e.target.value}) } value={user.name} type="text" placeholder="Full Name" />
                    <input onChange={ e => setUser({...user, email: e.target.value}) } value={user.email} type="email" placeholder="Email" />
                    <input onChange={ e => setUser({...user, password: e.target.value}) } type="password" placeholder="Password" />
                    <input onChange={ e => setUser({...user, password_confirmation: e.target.value}) } type="password" placeholder="Password Confirmation" />
                    <button className="btn">Save</button>
                </form>
            }
        </div>
        </>
    )
}

export default UserForm;