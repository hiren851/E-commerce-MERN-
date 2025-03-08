import { useEffect, useState } from "react";
import CommonForm from "../common/Form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/Store/shop/address-slice";
import AddressCard from "./Address-card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  phone: "",
  notes: "",
};

function Address({setCurrentSelectedAddress , selectedId}) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { toast } = useToast();

  function handleManageAddress(e) {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      toast({
        title: "You can only add maximum 3 address",
        variant: "destructive",
      });

      return;
    }

    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddress(user?.id));
            setFormData(initialAddressFormData);
            setCurrentEditedId(null);
            toast({
              title: "Address Updated Successfully!",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          dispatch(fetchAllAddress(user?.id));
          setFormData(initialAddressFormData);
          toast({
            title: "Address Added Successfully!",
          });
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);

  function handleDeleteAddress(getCurrentAddress) {
    // console.log(getCurrentAddress)
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddress(user?.id));
        toast({
          title: "Address Deleted Successfully!",
        });
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      state: getCurrentAddress?.state,
      country: getCurrentAddress?.country,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  }

    // console.log(addressList);
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {/* {console.log(addressList)} */}
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (

              <AddressCard    
              selectedId = {selectedId}
              setCurrentSelectedAddress={setCurrentSelectedAddress }        
              key={singleAddressItem._id}
                addressInfo={singleAddressItem}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId == null ? "Add New Address" : "Edit Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId == null ? "Add" : "Edit"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
