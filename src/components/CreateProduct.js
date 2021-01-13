import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fileUploader } from "../helper/stripeFileUploader";
import { createProduct } from "../store/actions/home";
import image from "../assets/default-img.gif";
import spinLoader from "../assets/tail-spin.svg";
import { useForm } from "react-hook-form";

export const CreateProduct = ({ setCreateForm }) => {
  const [fileUploaded, setFileUploaded] = useState({
    imgUrl: null,
    error: null,
    loader: false,
  });

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const handleStartUpload = () => {
    document.querySelector('input[type="file"]').click();
  };

  const handleFile = async (e) => {
    setFileUploaded((state) => ({
      ...state,
      loader: true,
    }));

    const { imgUrl, error } = await fileUploader(e);

    setFileUploaded({
      imgUrl,
      error,
      loader: false,
    });
  };

  const { imgUrl, error, loader } = fileUploaded || "";

  const handleAddProduct = async (data, e) => {
    const { name, description, price } = data;
    e.preventDefault();
    dispatch(createProduct(name, description, price + "00", fileUploaded));
    setCreateForm(false);
  };

  const handleCloseForm = () => {
    setCreateForm(false);
  };

  return (
    <div className="bg-gray-300 bg-opacity-70 h-screen w-full grid place-items-center fixed z-10 top-0">
      <form
        className="flex flex-col items-center justify-evenly bg-white rounded-md w-10/12 h-4/6 relative sm:w-6/12 sm:h-5/6"
        onSubmit={handleSubmit(handleAddProduct)}
      >
        <button
          onClick={handleCloseForm}
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
          ref={register({ required: true })}
        ></input>

        {errors.name && <span className="border-red-700 border-b-4 text-xs rounded-md w-9/12 -mt-4 "></span>}

        <textarea
          name="description"
          placeholder="Description"
          className="resize-none border w-9/12 p-1"
          ref={register({ required: true })}
        ></textarea>

        {errors.description && <span className="border-red-700 border-b-4 text-xs rounded-md w-9/12 -mt-4"></span>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="border w-8/12 p-1"
          ref={register({ required: true })}
        ></input>

        {errors.price && <span className="border-red-700 border-b-4 text-xs rounded-md w-8/12 -mt-4 "></span>}

        <input
          type="file"
          name="file"
          onChange={handleFile}
          placeholder="upload an image"
          className="hidden"
          ref={register({ required: true })}
        ></input>


        {imgUrl ? (
          <img
          src={imgUrl}
          className="w-8/12 h-2/6 md:w-6/12"
          alt="productImage"
          ></img>
          ) : (
            <img
            src={image}
            className="w-6/12 h-1/5 border-2 md:h-2/6"
            alt="default"
            ></img>
            )}

          {errors.file && <span className="border-red-700 border-b-2 text-xs p-1 rounded-md">Please upload an image of your product</span>}
        
        <button
          type="button"
          className="border w-9/12 p-1"
          onClick={handleStartUpload}
        >
          {!loader ? (
            <span>
              Upload an img <i className="fas fa-long-arrow-alt-up text-xl"></i>
            </span>
          ) : (
            <img className="m-auto" src={spinLoader} alt="loader"></img>
          )}
        </button>

        {error && (
          <p className="text-center">
            <i className="fas fa-exclamation-circle text-red-400"></i>{" "}
            {error.message}
          </p>
        )}

        <button
          className="border w-7/12 h-12 shadow-lg bg-gray-800 text-white disabled:bg-opacity-20"
          type="submit"
        >
          Add product
        </button>
      </form>
    </div>
  );
};
