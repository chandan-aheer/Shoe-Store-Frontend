import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
export default function ManageCategory(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
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
            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    },[])
    return(
        <>
        <div className={loading?"disabled-screen":""}>
            <div className="d-flex justify-content-center">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>
            <section class="breadcrumb-section set-bg" style={{ backgroundImage: "url('/assets/img/shoe.jpg')" }} >
                <div class="container">
                    <div class="row my-5">
                        <div class="col-lg-12 text-center">
                            <div class="breadcrumb__text">
                                <h2>Manage Category</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5 table-responsive">
                <Link to="/admin/add_category" className="btn btn-danger mb-2 float-end">Add Category</Link>
                <table className="table table-bordered ">
                    <tr className="table-danger">
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    {category?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>
                                <img src={BASE_URL_Image+element?.image} className="img-fluid" style={{height:"100px"}}/>
                            </td>
                            <td>{element?.name}</td>
                            <td>
                                <Link to={`/admin/update_category/${element?._id}`}>
                                    <i className="fa fa-edit text-success fa-2x"></i>
                                </Link>
                            </td>
                            {/* <td>
                                <button className="btn btn-danger" >Delete</button>
                            </td> */}
                        </tr>
                    ))}
                </table>
            </div>
        </div>
        </>
    )
}