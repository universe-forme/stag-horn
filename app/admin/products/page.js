"use client";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: "Damascus Steel Knife",
      category: "Knives",
      price: 299.99,
      stock: 15,
      status: "active",
      image: "/knife-img.jpg"
    },
    {
      id: 2,
      name: "Brass Knuckle",
      category: "Accessories",
      price: 89.99,
      stock: 8,
      status: "active",
      image: "/knuckle-brass.jpg"
    },
    {
      id: 3,
      name: "Forged Axe",
      category: "Tools",
      price: 199.99,
      stock: 0,
      status: "out-of-stock",
      image: "/axe.jpg"
    },
    {
      id: 4,
      name: "Steel Spoon",
      category: "Utensils",
      price: 49.99,
      stock: 25,
      status: "active",
      image: "/spoon-product.jpg"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory.
          </p>
        </div>
        <Button className="bg-[#D6AF66] hover:bg-[#C49F5A] text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Search</CardTitle>
          <CardDescription>
            Search and filter your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
          <CardDescription>
            A list of all your products with their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                      {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
