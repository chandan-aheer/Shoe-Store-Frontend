import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
import Header from "../../../layouts/Header"
import Footer from "../../../layouts/Footer"
export default function ViewProductList(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const param=useParams()
    const id=param.id
    const [product,setProduct]=useState()
    useEffect(()=>{
        let data={
            subcategoryId:id
        }
        apiServices.getAllProduct(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                setProduct(data.data.data)
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
    },[id])
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
                                <h2>Product</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5">
                <div className="row">
                    {product?.map((element,index)=>(
                        <div className="col-md-3 my-3" key={index+1}>
                            <div className="card" style={{maxHeight:"400px"}}>
                                <img src={BASE_URL_Image+element?.image} className="card-img-top" style={{height:"250px"}}/>
                                <div className="card-body">
                                    <h4 className="card-heading">{element?.name}</h4>
                                </div>
                                <div className="card-footer d-flex justify-content-between bg-light">
                                    <p className="card-text mt-2 text-dark">Rs. {element.price}</p>
                                    <Link to={`/view_single_product/${element?._id}`}>
                                        <button className="btn btn-danger ">View</button>
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