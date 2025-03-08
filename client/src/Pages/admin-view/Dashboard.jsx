import ProductImageUpload from "@/components/admin-view/Image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/Store/common-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageURL)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageURL("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "features");
  return (
    <div>
      {/* <h1>Uplaod Feature Images</h1> */}
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageURL={uploadedImageURL}
        setUploadedImageURL={setUploadedImageURL}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
        // isEditedMode={currentEditingId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
      {featureImageList && featureImageList.length > 0
        ? featureImageList.map((featureImg) => (
            <div className="relative">
              <img
                src={featureImg?.image}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))
        : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
