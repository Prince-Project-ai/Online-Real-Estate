import React, { useRef, useState } from "react";

const MediaUpload = ({ formData, handleChange }) => {

    const fileInputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);

    // Function to trigger file input
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleChooseMultipleFile = (e) => {
        const { files } = e.target;
        // console.log("Files : ", files[0]);
        // console.log(typeof files);
        if (files) {
            Object.entries(files).map(([key, fileObject]) => {
                console.log("File Object : ", fileObject);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImages((prevImages) => ([...prevImages, reader.result]));
                }
                reader.readAsDataURL(fileObject);
            })
        }
        // if (files) {
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         console.log(reader.result);
        //     }
        //     reader.readAsDataURL(files[0]);
        // }
    }

    return (
        <div>
            <h2 className="text-xl font-description font-semibold">Photos and videos</h2>
            <p className="pb-1 text-zinc-500">The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first.</p>
            <hr />
            <div className="border rounded-lg p-4 mt-4">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {
                        previewImages.map((image, index) => {
                            return (
                                <div key={index} className="relative rounded-lg overflow-hidden main-cover-block w-full h-[200px] group">
                                    <img src={image} className="z-0 w-full h-full object-cover rounded-lg border" alt="" />
                                    <div className="z-[2] absolute rounded-lg inset-0 bg-dark/30 flex items-center justify-center -translate-x-full group-hover:translate-x-0 transition-transform duration-200">
                                        <button className="w-10 h-10 bg-white rounded-md">
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {/* <div className="main-cover-block w-full">
                        <img src="https://media.istockphoto.com/id/1469440047/photo/modern-living-interior.jpg?s=2048x2048&w=is&k=20&c=AaPtJ3VxixNlEEoqYMDAPSrnG2Wx5fwzfJyTC7uMyO0=" className="w-full h-full object-cover rounded-lg border" alt="" />
                    </div>
                    <div className="main-cover-block w-full">
                        <img src="https://finder-asp.vercel.app/layouts-2/assets/img/add-item/property/02.jpg" className="w-full h-full object-cover rounded-lg border" alt="" />
                    </div>
                    <div className="main-cover-block w-full">
                        <img src="https://finder-asp.vercel.app/layouts-2/assets/img/add-item/property/02.jpg" className="w-full h-full object-cover rounded-lg border" alt="" />
                    </div>
                    <div className="main-cover-block w-full">
                        <img src="https://finder-asp.vercel.app/layouts-2/assets/img/add-item/property/02.jpg" className="w-full h-full object-cover rounded-lg border" alt="" />
                    </div> */}
                    <div className="file-choose-block w-full h-[200px]">
                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleChooseMultipleFile} // Handle file selection
                            multiple
                        />

                        {/* Upload Button */}
                        <button
                            className="bg-secondary h-full w-full rounded-lg border-dashed border border-dark cursor-pointer flex flex-col justify-center items-center"
                            onClick={handleButtonClick}
                        >
                            <i className="ri-upload-2-fill text-3xl"></i>
                            Upload photos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MediaUpload);