import { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

function ShoppingViewOrdersDetails({ orderData }) {

  const {user} = useSelector(state => state.auth)
  function handleUpdateStatus(e) {}

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid  gap-2">
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
              {orderData?.cartItem && orderData?.cartItem.length > 0
                ? orderData.cartItem.map((item) => (
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
      </div>
    </DialogContent>
  );
}

export default ShoppingViewOrdersDetails;
