import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminViewOrdersDetails from "./Order-Details";
import { Dialog, DialogDescription, DialogTitle } from "../ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrdersDetailsForAdmin, resetOrderDetails } from "@/Store/admin/products-slice/order-slice";
import { Badge } from "../ui/badge";

function AdminViewOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderData } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId){
    dispatch(getOrdersDetailsForAdmin(getId))
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);
  console.log(orderData, "orderList");

  useEffect(()=>{
    if(orderData !== null ) setOpenDetailsDialog(true)

  },[orderData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
                        <Button
                          onClick={() =>
                            handleFetchOrderDetails(orderItem?._id)
                          }
                        >
                          View Details
                        </Button>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                        <AdminViewOrdersDetails orderData={orderData} />
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

export default AdminViewOrders;
