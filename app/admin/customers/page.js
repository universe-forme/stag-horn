"use client";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Search, Eye, Mail, Phone } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      phone: "+92 300 1234567",
      orders: 5,
      totalSpent: 1249.95,
      status: "active",
      joinDate: "2023-06-15"
    },
    {
      id: 2,
      name: "Fatima Ali",
      email: "fatima@example.com",
      phone: "+92 301 2345678",
      orders: 3,
      totalSpent: 449.97,
      status: "active",
      joinDate: "2023-08-22"
    },
    {
      id: 3,
      name: "Omar Hassan",
      email: "omar@example.com",
      phone: "+92 302 3456789",
      orders: 7,
      totalSpent: 1899.93,
      status: "active",
      joinDate: "2023-05-10"
    },
    {
      id: 4,
      name: "Aisha Rahman",
      email: "aisha@example.com",
      phone: "+92 303 4567890",
      orders: 2,
      totalSpent: 599.98,
      status: "inactive",
      joinDate: "2023-09-05"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Customers</h2>
          <p className="text-muted-foreground">
            Manage your customer database and view customer information.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Search</CardTitle>
          <CardDescription>
            Search and filter your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers by name, email, or phone..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            A list of all your customers with their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {customer.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="h-3 w-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>${customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === 'active' ? 'default' : 'secondary'}>
                      {customer.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
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
