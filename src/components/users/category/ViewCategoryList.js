import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
import Header from "../../../layouts/Header"
import Footer from "../../../layouts/Footer"
export default function ViewCategoryList(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const param=useParams()
    const id=param.id
    const [category,setCategory]=useState()
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            setLoading(false)
            if(data.data.success){
                setCategory(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            setLoading(false)

            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
        })
    },[])
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
                                <h2>Category</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5">
                <div className="row">
                    {category?.map((element,index)=>(
                        <div className="col-md-4 my-3" key={index+1}>
                            <div className="card" style={{maxHeight:"400px"}}>
                                <Link to={`/view_subcat/${element?._id}`}>
                                    <img src={BASE_URL_Image+element?.image} className="card-img-top" style={{height:"250px"}}/>
                                </Link>
                                <div className="card-body">
                                    <Link to={`/view_subcat/${element?._id}`}>
                                        <h4 className="card-heading text-danger">{element?.name}</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer/>
        <ToastContainer
            position="top-right"
            autoClose={2000}
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