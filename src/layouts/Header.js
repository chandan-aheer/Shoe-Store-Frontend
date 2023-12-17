import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiServices from "../Services/apiServices";
export default function Header(){
    const [category,setCategory]=useState()
    const user_type=sessionStorage.getItem('user_type')
    const authenticate=sessionStorage.getItem('authenticate')
    const navigate=useNavigate()
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            if(data.data.success){
                setCategory(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
        })
    },[])
    const logout=()=>{
        sessionStorage.clear()
        setTimeout(()=>{
            sessionStorage.setItem("message","Logout Successfully")
            navigate("/login")
        },500)
    }
    // const [cart_item,setCartItem]=useState(0)
    // useEffect(()=>{
        
    // },[cart_item])
    return(
        <>
        {/* <!-- Header Section Begin --> */}
            {/* <header className="header-section">
                <div className="container">
                    <div className="logo">
                        <a href="./index.html">
                            <img src="assets/img/logo.png" alt=""/>
                        </a>
                    </div>
                    <div className="nav-menu pt-4">
                        <nav className="mainmenu mobile-menu">
                            <ul>
                                <Link to="/">
                                    <li className="active">
                                        <a>Home</a>
                                    </li>
                                </Link>
                                {authenticate && user_type==1  ?
                                <>
                                 <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Category</a>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/add_category" >
                                                <li className="dropdown-item">
                                                    Add
                                                </li>
                                            </Link>
                                            <Link to="/admin/manage_category" >
                                                <li className="dropdown-item">
                                                    Manage
                                                </li>
                                            </Link>
                                        </ul>
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Sub-Category</a>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/add_subcategory" >
                                                <li className="dropdown-item">
                                                    Add
                                                </li>
                                            </Link>
                                            <Link to="/admin/manage_subcategory" >
                                                <li className="dropdown-item">
                                                    Manage
                                                </li>
                                            </Link>
                                        </ul>
                                    </span>
                                </li>
                                <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Product</a>
                                        <ul className="dropdown-menu">
                                            <Link to="/admin/add_product" >
                                                <li className="dropdown-item">
                                                    Add
                                                </li>
                                            </Link>
                                            <Link to="/admin/manage_product" >
                                                <li className="dropdown-item">
                                                    Manage
                                                </li>
                                            </Link>
                                        </ul>
                                    </span>
                                </li>
                                </>:""}
                                {authenticate?
                                <Link to="/all_orders">
                                <li>
                                    <a>Orders</a>
                                </li>
                                </Link>
                                :""}
                                {!authenticate || user_type==2?
                                <>
                                <li>
                                    <span className="dropdown">
                                        <a data-bs-toggle="dropdown" aria-expanded="true">Category</a>
                                        <ul className="dropdown-menu">
                                           {category?.map((element,index)=>(
                                            <Link to={`/view_subcat/${element?._id}`}>
                                                <li className="dropdown-item" key={index+1}>
                                                    {element?.name}
                                                </li>
                                             </Link>
                                           ))}
                                        </ul>
                                    </span>
                                </li>
                                <Link to="/view_product_list">
                                    <li>
                                        <a>Product</a>
                                    </li>
                                </Link>
                                </>:""}
                                {!authenticate?
                                <Link to="/login">
                                <li>
                                    <a>Login</a>
                                </li>
                                </Link>:
                                <li onClick={logout}>
                                    <a>Logout</a>
                                </li>
                                }
                            </ul>
                        </nav>
                        {!authenticate?<Link to="/register"><a className="primary-btn signup-btn">Sign Up Today</a></Link>:""}
                       
                    </div>
                    <div id="mobile-menu-wrap"></div>
                </div>
            </header> */}
        {/* <!-- Header End --> */}

        {/* <!-- Header Section Begin --> */}
        <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <li><i className="fa fa-envelope"></i> chandanaheer22@gmail.com</li>
                                        <li>Free Shipping for all Order of &#8377;999</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <a href="https://www.facebook.com/" target={"_blank"}><i className="fa fa-facebook"></i></a>
                                        <a href="https://twitter.com/?lang=en" target={"_blank"}><i className="fa fa-twitter"></i></a>
                                        <a href="https://www.linkedin.com/" target={"_blank"}><i className="fa fa-linkedin"></i></a>
                                        <a href="https://in.pinterest.com/" target={"_blank"}><i className="fa fa-pinterest-p"></i></a>
                                    </div>
                                    {/* <div className="header__top__right__language">
                                        <img src="assets/img/language.png" alt="" />
                                        <div>English</div>
                                        <span className="arrow_carrot-down"></span>
                                        <ul>
                                            <li><a href="#">Hindi</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div> */}
                                    <div className="header__top__right__auth">
                                        <Link to='/login'>
                                            <i className="fa fa-user"></i> Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <a href="./index.html"><img src="assets/img/logo2.png" alt="" /></a>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <nav className="header__menu">
                                <ul>
                                <Link to="/">
                                    <li className="text-dark pe-5">
                                        <a>Home</a>
                                    </li>
                                </Link>
                                {authenticate && user_type==1  ?
                                <>
                                <Link to="/admin/manage_category">
                                    <li className="text-dark pe-5">
                                        <a>Category</a>
                                    </li>
                                </Link>
                                <Link to="/admin/manage_subcategory">
                                    <li className="text-dark pe-5">
                                        <a>Sub Category</a>
                                    </li>
                                </Link>
                                <Link to="/admin/manage_product">
                                    <li className="text-dark pe-5">
                                        <a>Product</a>
                                    </li>
                                </Link>
                                
                                </>:""}
                                {authenticate?
                                <Link to="/all_orders">
                                <li className="text-dark pe-5">
                                    <a>Orders</a>
                                </li>
                                </Link>
                                :""}
                                {!authenticate || user_type==2?
                                <>
                                <Link to="/view_category_list">
                                    <li className="text-dark pe-5">
                                        <a>Category</a>
                                    </li>
                                </Link>
                                <Link to="/view_product_list">
                                    <li className="text-dark pe-5">
                                        <a>Product</a>
                                    </li>
                                </Link>
                                </>:""}
                                {!authenticate?
                                <Link to="/login">
                                <li className="text-dark pe-5">
                                    <a>Login</a>
                                </li>
                                </Link>:
                                <li onClick={logout}>
                                    <a>Logout</a>
                                </li>
                                }
                                <li className="float-end">
                                    {!authenticate?<Link to="/register"><a className="btn-danger text-white p-2 rounded">Sign Up Today</a></Link>:""}
                                </li>
                                </ul>
                            </nav>
                        </div>
                        
                    </div>
                    <div className="humberger__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>
            {/* <!-- Header Section End --> */}
        </>
    )
}