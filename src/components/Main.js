import { useEffect, useState } from "react"
import apiServices, { BASE_URL_Image } from "../Services/apiServices"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from "react-spinners"
import { Link, useParams } from "react-router-dom"

export default function Main(){
    const [category,setCategory]=useState()
    const [product,setProduct]=useState()
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
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
    useEffect(()=>{
        // let data={
        //     subcategoryId:id
        // }
        apiServices.getAllProduct({}).then((data)=>{
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
    },[])
    return(
    <>
        <section class="hero">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="hero__categories">
                            <div class="hero__categories__all">
                                <i class="fa fa-bars"></i>
                                <span>All Categories</span>
                            </div>
                            <ul>
                            {category?.map((element,index)=>(
                                <li className=""><Link to={`/view_subcat/${element?._id}`}>{element?.name}</Link></li>
                            ))}
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div class="hero__search">
                            <div class="hero__search__phone">
                                <div class="hero__search__phone__icon">
                                    <i class="fa fa-phone"></i>
                                </div>
                                <div class="hero__search__phone__text">
                                    <h5>+91 8725954868</h5>
                                    <span>support 24/7 time</span>
                                </div>
                            </div>
                        </div>
                        <div class="hero__item set-bg" style={{ backgroundImage: "url('/assets/img/hero/banner.png')" }}>
                            <div class="hero__text">
                                <span>Shoes</span>
                                <h2>Best Material  <br />Shoe</h2>
                                <p>Free Pickup and Delivery Available</p>
                                <Link to={'/view_product_list'} class="primary-btn">SHOP NOW</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="featured spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="section-title">
                            <h2>Featured Product</h2>
                        </div>
                    </div>
                </div>
                <div class="row featured__filter">
                {product?.map((element,index)=>(
                    <div class="col-lg-3 col-md-4 col-sm-6 ">
                        <div class="featured__item">
                        <Link to={`/view_single_product/${element?._id}`}>
                            <div class="featured__item__pic set-bg" style={{ backgroundImage: "url("+`${BASE_URL_Image + element?.image}`+")" }}>
                            </div>
                            <div class="featured__item__text">
                                <h6><a href="#">{element?.name}</a></h6>
                                <h5>Rs. {element.price}</h5>
                            </div>
                        </Link>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
        <div class="banner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="banner__pic">
                            <img src="/assets/img/banner/banner-1.jpg" alt="" />
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="banner__pic">
                            <img src="/assets/img/banner/banner-2.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}