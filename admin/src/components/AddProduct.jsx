import upload_area from '../assets/upload_area.svg'
import { useState} from "react"
const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails]= useState({
    name: "",
    image:"",
    category:"cam", 
    new_price:"",
    old_price:""
  })
  const imageHandler =(e) => {
      setImage(e.target.files[0])
  }
  const changeHandler =(e) => {
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }
  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;
    let formData = new FormData();
    formData.append('product',image);

    await fetch('http://localhost:4000/upload',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => {responseData = data})
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product)
      await fetch('http://localhost:4000/addproduct',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success?alert("Đã thêm sản phẩm"):alert("Tải lên không thành công")
      })
    }

  }
  return (
    <div className="p-8 box-border bg-white w-full rounded-sm mt-4
    lg:m-7">
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Tên sản phẩm:</h4>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4
        rounded-md'/>
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Giá cũ:</h4>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4
        rounded-md'/>
      </div>
      <div className="mb-3">
        <h4 className="bold-18 pb-2">Giá mới:</h4>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here..' className='bg-primary outline-none max-w-80 w-full py-3 px-4
        rounded-md'/>
      </div>
      <div className='mb-3 flex items-center gap-x-4'>
        <h4 className='bold-18 pb-2'>Loại sản phẩm:</h4>
        <select value={productDetails.category} onChange={changeHandler}  name="category" id="" className="bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none">
          <option value="cam">Cám</option>
          <option value="giong">Con Giống</option>
        </select>
      </div>
      <div>
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} alt="" className='w-20 rounded-sm inline-block'/>
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden className='bg-primary
        max-w-80 w-full py-3 px-4' />
      </div>
        <button onClick={() => Add_Product()} className="mt-4 flexCenter gap-x-1 bg-gray-500 text-white rounded-full px-4 py-2">
        Thêm Sản Phẩm
        </button>
       </div>
  )
}

export default AddProduct