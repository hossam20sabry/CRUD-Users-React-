import { useEffect, useState } from "react"
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function Users(){

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext();

    useEffect( () => {
        getUsers();
        document.title = "Dashbord . Users"
    }, [])

    const onDelete = (u) => {
        
        if(!window.confirm("Are you sure you want to delete this user?")){
            return;
        }

        axiosClient.delete(`/users/${u.id}`)
        .then(() => {
            setNotification("User was successfuly deleted.")
            getUsers();
        })
        
    }

    const getUsers = () => {
        setLoading(true);
        axiosClient.get('users')
        .then(({data}) => {
            setLoading(false);
            setUsers(data.data);
        })
        .catch(() => {
            setLoading(false);
        })
    }

    return (
        <>
        <div className="flex-between-center">
            <h2>Users</h2> 
            <Link to="/users/create" className="btn-add">New User</Link>       
        </div>
        <div className="card animated fadeInDown">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            {
                loading && 
                <tbody>
                    <tr>
                        <td colSpan={5} className="text-center">Loading...</td>
                    </tr>
                </tbody>
            }
            {!loading &&
            <tbody>
                {
                    users.map( u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.created_at}</td>
                            <td >
                                <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                                &nbsp;
                                <button onClick={e => onDelete(u)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            }
        </table>
        </div>
        </>
    )
}
export default Users