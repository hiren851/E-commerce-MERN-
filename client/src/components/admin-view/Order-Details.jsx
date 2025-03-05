import { useState } from "react";
import CommonForm from "../common/Form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, updateOrderStatus } from "@/Store/admin/products-slice/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
    status : '',
}

function AdminViewOrdersDetails({orderData}) {

    const [formData , setFormData] = useState(initialFormData);
    const {user} = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const {toast} = useToast()


    function handleUpdateStatus(e){
        e.preventDefault();
        console.log(formData)
        const {status} = formData;

        dispatch(updateOrderStatus({
          id: orderData?._id,
          orderStatus : status
        })).then(data => {
          console.log(data, "hki")
          dispatch(getOrdersDetailsForAdmin(orderData?._id));
          dispatch(getAllOrdersForAdmin());
          setFormData(initialFormData);
          toast({
            title: "Order Status Updated Successfully",
          })
        })
    }


  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-2">
      <div className="grid  gap-1">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Id</p>
            <Label>{orderData?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderData?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₹{orderData?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderData?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{orderData?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderData?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderData?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderData?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderData?.cartItems && orderData?.cartItems.length > 0
                ? orderData.cartItems.map((item) => (
                    <li className="flex items-center justify-between" key={item._id}>
                      <span>Title : {item.title}</span>
                      <span>Quantity : {item.quantity}</span>
                      <span>Price : ₹{item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Details</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{orderData?.addressInfo?.address}</span>
              <span>{orderData?.addressInfo?.city}</span>
              <span>{orderData?.addressInfo?.state}</span>
              <span>{orderData?.addressInfo?.country}</span>
              <span>{orderData?.addressInfo?.pincode}</span>
              <span>{orderData?.addressInfo?.phone}</span>
              <span>{orderData?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div className="">
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inprocess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminViewOrdersDetails;
