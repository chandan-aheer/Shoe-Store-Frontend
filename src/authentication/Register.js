import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import apiServices from "../Services/apiServices"
import { useState } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify"
import { ClipLoader } from "react-spinners"
export default function Register(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const [name, setName]=useState()
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            name:name,
            email:email,
            password:password
        }
        apiServices.register(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message + " Please login")
                sessionStorage.setItem("user_data", data.data.data)
                sessionStorage.setItem("user_type", data.data.data.userType)
                setTimeout(()=>{
                   navigate("/login")
                },1000)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    }
    return(
        <>
        <Header/>
        <div className={loading?"disabled-screen":""}>
            <div className="d-flex justify-content-center">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>
            <section class="breadcrumb-section set-bg" style={{ backgroundImage: "url('/assets/img/shoe.jpg')" }} >
                <div class="container">
                    <div class="row my-5">
                        <div class="col-lg-12 text-center">
                            <div class="breadcrumb__text">
                                <h2>Register</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container-fluid my-5">
                <div className="row">
                <div className="col-md-8 offset-md-2 border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-2">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Password</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className='col-md-5 offset-md-4'>
                                    <button className='form-control btn btn-danger'>Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </>
    )
}