"use client";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Search, Eye, Package, Truck, CheckCircle } from "lucide-react";

export default function OrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      customer: "Ahmed Khan",
      email: "ahmed@example.com",
      products: ["Damascus Steel Knife", "Brass Knuckle"],
      total: 389.98,
      status: "pending",
      date: "2024-01-15",
      payment: "Credit Card"
    },
    {
      id: "ORD-002",
      customer: "Fatima Ali",
      email: "fatima@example.com",
      products: ["Steel Spoon"],
      total: 49.99,
      status: "shipped",
      date: "2024-01-14",
      payment: "PayPal"
    },
    {
      id: "ORD-003",
      customer: "Omar Hassan",
      email: "omar@example.com",
      products: ["Forged Axe", "Steel Spoon"],
      total: 249.98,
      status: "delivered",
      date: "2024-01-13",
      payment: "Cash on Delivery"
    },
    {
      id: "ORD-004",
      customer: "Aisha Rahman",
      email: "aisha@example.com",
      products: ["Damascus Steel Knife"],
      total: 299.99,
      status: "processing",
      date: "2024-01-12",
      payment: "Credit Card"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Package className="h-4 w-4 text-yellow-600" />;
      case 'processing':
        return <Package className="h-4 w-4 text-blue-600" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-purple-600" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'secondary',
      processing: 'default',
      shipped: 'default',
      delivered: 'default'
    };
    
    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Orders</h1>
          <p className="text-muted-foreground">
            Manage customer orders and track their status.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Search</CardTitle>
          <CardDescription>
            Search and filter your orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or email..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            A list of all customer orders with their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {order.products.map((product, index) => (
                        <div key={index} className="text-sm">
                          {product}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${order.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
