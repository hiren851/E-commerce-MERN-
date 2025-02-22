import ProductImageUpload from "@/components/admin-view/Image-upload";
import AdminProductTile from "@/components/admin-view/Product-tile";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/Store/admin/products-slice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: " ",
  brand: " ",
  price: " ",
  salePrice: "",
  totalStock: " ",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    currentEditingId !== null
      ? dispatch(
          editProduct({
            id: currentEditingId,
            formData,
          })
        ).then((data)=>{
          if(data?.payload?.success){
            dispatch(fetchAllProducts());
            setFormData("")
            setOpenCreateProductsDialog(false)
            setCurrentEditingId(null)
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageURL,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setUploadedImageURL("");
            setFormData(initialFormData);
            setCurrentEditingId(null);
            toast({
              title: "Product added successfully",
            });
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  function handleDelete(getCurrentProductId){
    console.log(getCurrentProductId)
    dispatch(deleteProduct(getCurrentProductId)).then(
      (data)=>{
        if(data?.payload?.success){
          dispatch(fetchAllProducts());
        }
      }
    )
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, uploadedImageURL);
  return (
    <Fragment>
      <div className="mb-5 flex   justify-end w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                setCurrentEditingId={setCurrentEditingId}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditingId(null);
          setFormData("");
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditingId !== null ? "Edit Product" : "Add new product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageURL={uploadedImageURL}
            setUploadedImageURL={setUploadedImageURL}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditedMode={currentEditingId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditingId !== null ? "Edit" : "Add"}
              formControls={addProductFormElements}
              isBtnDisabled = {!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
