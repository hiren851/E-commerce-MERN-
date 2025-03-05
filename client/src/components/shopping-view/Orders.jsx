import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingViewOrdersDetails from "./Order-Details";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderByUser, getOrdersDetails, resetOrderDetails } from "@/Store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList,orderData } = useSelector((state) => state.shopOrder);


  function handleFetchOrderDetails(getId){
    dispatch(getOrdersDetails(getId))
  }

  useEffect(() => {
    dispatch(getAllOrderByUser(user?.id));
  }, [dispatch]);

  useEffect(()=>{
    if(orderData !== null) setOpenDetailsDialog(true)
  },[orderData])

  
  console.log(orderData, "orderData");



  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      {" "}
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={()=>{
                          setOpenDetailsDialog(false)
                          dispatch(resetOrderDetails())
                        }}
                      >
                        <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                          View Details
                        </Button>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <ShoppingViewOrdersDetails orderData={orderData}/>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
