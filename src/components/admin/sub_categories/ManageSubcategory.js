import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
export default function ManageSubCategory(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    useEffect(()=>{
        apiServices.getAllSubCategory().then((data)=>{
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
                                <h2>Manage SubCategory</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container my-5 table-responsive">
            <Link to="/admin/add_subcategory" className="btn btn-danger mb-2 float-end">Add SubCategory</Link>
                <table className="table table-bordered ">
                    <tr className="table-danger">
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Sub-Category Name</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                    </tr>
                    {subcategory?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>
                                <img src={BASE_URL_Image+element?.image} style={{height:"100px"}}/>
                            </td>
                            <td>{element?.name}</td>
                            <td>{element?.categoryId?.name}</td>
                            <td>
                                <Link to={`/admin/update_subcat/${element._id}`}>
                                    <i className="fa fa-edit text-success fa-2x"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
        </>
    )
}