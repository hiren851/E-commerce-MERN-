import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadedImageURL,
  setUploadedImageURL,
  imageLoadingState, 
  isEditedMode,
  setImageLoadingState, 
  isCustomStyling = false
}) {
  const inputRef = useRef();

  function handleImageFileChange(e) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    if (!imageFile) return;

    setImageLoadingState(true); 

    const data = new FormData();
    data.append("my_file", imageFile);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
        data
      );

      if (response?.data?.success) {
        setUploadedImageURL(response.data.result.url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageLoadingState(false); 
    }
  }

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full ${isCustomStyling ? '' : 'max-w-md mx-auto mt-4'}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={` ${
          isEditedMode ? "opacity-50" : ""
        } border-2 border-dashed rounded-lg p-4`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          id="image-upload"
          ref={inputRef}
          onChange={handleImageFileChange}
          className="hidden"
          disabled={isEditedMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditedMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? ( 
          <Skeleton className="h-10 bg-gray-200" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
