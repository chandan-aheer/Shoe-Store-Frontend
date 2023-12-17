import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function UpdateCategory(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"1",
    }
    const param=useParams()
    const cat_id=param.id
    const [category,setCategory]=useState()
    const [image,setImage]=useState()
    useEffect(()=>{
        let data={
            _id:cat_id
        }
        apiServices.getSingleCategory(data).then((data)=>{
            setCategory(data.data.data.name)
            setImage(data.data.data.image)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    },[])
    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("_id",cat_id)
        data.append("name", category)
        data.append("category_image", image)
        // console.log(data)
        apiServices.updateCategory(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                setTimeout(()=>{
                    navigate("/admin/manage_category")
                },2000)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    }
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
                                <h2>Update Category</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Link to="/admin/manage_category" className="btn btn-danger m-2 float-end">View List</Link>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-md-8 offset-md-2 border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-2">
                                    <label>Image</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="file" onChange={handleImage} />
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className='col-md-5 offset-md-4'>
                                    <button className='form-control btn btn-danger'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}