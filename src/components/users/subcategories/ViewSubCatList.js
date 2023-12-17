import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
import Header from "../../../layouts/Header";
import Footer from "../../../layouts/Footer";
export default function ViewSubCatList(){
    const [loading,setLoading]=useState(true)
    const [subcategory,setSubCategory]=useState()
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"3",
    }
    const param=useParams()
    const c_id=param.id
    useEffect(()=>{
        let data={
            categoryId:c_id
        }
        apiServices.getAllSubCategory(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                setSubCategory(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    },[c_id])
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
                                <h2>Sub Category</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5">
                <div className="row">
                    {subcategory?.map((element,index)=>(
                        <div className="col-md-3 my-3" key={index+1}>
                            <div className="card shadow-" style={{maxHeight:"400px"}}>
                                <img src={BASE_URL_Image+element?.image} className="card-img-top" style={{height:"250px"}}/>
                                <div className="card-body">
                                    <h4 className="card-heading text-danger">{element?.name}</h4>
                                </div>
                                <div className="card-footer bg-light">
                                    <Link to={`/view_products/${element?._id}`}>
                                        <button className="btn btn-danger mx-auto d-block">View Products</button>
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