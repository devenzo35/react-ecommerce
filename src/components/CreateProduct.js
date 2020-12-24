import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fileUploader } from "../helper/stripeFileUploader";
import { useForm } from "../hooks/useForm";
import { createProduct } from "../store/actions/home";
import image from '../assets/default-img.gif'

export const CreateProduct = ({ setCreateForm }) => {
    
    const [fileUploaded, setFileUploaded] = useState(null);
    const dispatch = useDispatch();
  
    const [FormValue, handleOnChange] = useForm({
        name: "",
        description: "",
        price: "",
    });

    const { name, description, price } = FormValue;
    
    const handleStartUpload = () => {
        document.querySelector('input[type="file"]').click();
    };
    
    const handleFile = async (e) => {
        const { imgUrl, error } = await fileUploader(e);
        setFileUploaded({ imgUrl, error });
    };
        
    const { imgUrl, error}=fileUploaded || '';

    const handleAddProduct = async (e) => {
        e.preventDefault();
        dispatch(createProduct(name, description, price +'00', fileUploaded));
        setCreateForm(false);
    };

    const handleCloseForm=()=>{
      setCreateForm(false)
    }


  return (
    <div className="bg-gray-300 bg-opacity-70 h-screen w-full grid place-items-center fixed z-10">
      <form
        className="flex flex-col items-center justify-evenly bg-white rounded-md w-10/12 h-4/6 relative"
        onSubmit={handleAddProduct}
      >
        <button
          onClick={ handleCloseForm }
          type="button"
          className="rounded-full position w-6 h-6 grid place-items-center border-2 border-gray-900 absolute -top-2 -right-2 bg-white hover:bg-red-400"
        >
          <i className="fas fa-times"></i>
        </button>

        <input
          type="text"
          name="name"
          className="border w-9/12 p-1"
          placeholder="Product name"
          required={true}
          value={name}
          onChange={handleOnChange}
        ></input>

        <textarea
          name="description"
          placeholder="Description"
          className="resize-none border w-9/12 p-1"
          value={description}
          onChange={handleOnChange}
        ></textarea>

        <input
          type="text"
          name="price"
          placeholder="Price"
          value={price}
          onChange={handleOnChange}
          className="border w-8/12 p-1"
        ></input>

        <input
          type="file"
          onChange={handleFile}
          placeholder="upload an image"
          className="hidden"
        ></input>
        
        
        {
            (imgUrl) 
                ?(<img src={imgUrl} className="w-8/12 h-2/6" alt="productImage"></img>) 
                :(<img src={image} className="w-6/12 h-1/5 border-2" alt="default"></img>)
        }

        <button
          type="button"
          className="border w-9/12 p-1"
          onClick={handleStartUpload}
          >
          Upload an img <i className="fas fa-long-arrow-alt-up text-xl"></i>
        </button>
        
        {
            (error)&& <p>{error.message}</p>
        }

        <button className="border w-7/12 h-12 shadow-lg bg-gray-800 text-white" type="submit">
          Add product
        </button>
      </form>
    </div>
  );
};
