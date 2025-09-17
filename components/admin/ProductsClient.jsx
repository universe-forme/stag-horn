"use client";

import { useState } from "react";
import { useAllProducts, useAllCategories, useDeleteProduct, useUpdateProduct } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import ProductModal from "@/components/admin/ProductModal";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ProductsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const [reloadToken, setReloadToken] = useState(0);
  const { data: products, isLoading: productsLoading } = useAllProducts(reloadToken);
  const { data: categories, isLoading: categoriesLoading } = useAllCategories();
  const { deleteProduct, isLoading: isDeleting } = useDeleteProduct();
  const { updateProduct, isLoading: isUpdating } = useUpdateProduct();

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && product.is_active) ||
                         (filterStatus === "inactive" && !product.is_active);
    const matchesCategory = filterCategory === "all" || 
                           product.category_id === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  }) || [];

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        setReloadToken((t) => t + 1);
        toast.success('Product deleted successfully!');
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error('Failed to delete product. Please try again.');
      }
    }
  };

  const toggleActive = async (product) => {
    try {
      await updateProduct(product.id, { is_active: !product.is_active });
      setReloadToken((t) => t + 1);
      toast.success(`Product ${!product.is_active ? 'activated' : 'deactivated'} successfully!`);
    } catch (e) {
      console.error('Failed to update status', e);
      toast.error('Failed to update product status. Please try again.');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const getCategoryName = (categoryId) => {
    const category = categories?.find(cat => cat.id === categoryId);
    return category?.name || "Unknown Category";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#2C2C2C] mb-4">Products</h2>
          <p className="text-[#2C2C2C] opacity-80">
            Manage your product catalog and inventory.
          </p>
        </div>
        <Button 
          className="bg-[#F27F0C] hover:bg-[#C49F5A] text-white"
          onClick={handleAddProduct}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2C2C2C]">Product Search & Filter</CardTitle>
          <CardDescription className="text-[#2C2C2C] opacity-80">
            Search and filter your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-[#C0C0C0] rounded-lg focus:ring-2 focus:ring-[#F27F0C] focus:border-[#F27F0C] bg-white text-[#2C2C2C]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-[#C0C0C0] rounded-lg focus:ring-2 focus:ring-[#F27F0C] focus:border-[#F27F0C] bg-white text-[#2C2C2C]"
            >
              <option value="all">All Categories</option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#2C2C2C]">All Products</CardTitle>
          <CardDescription className="text-[#2C2C2C] opacity-80">
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
                <TableHead>Featured</TableHead>
                <TableHead>Best Selling</TableHead>
                <TableHead>Trending</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.main_image}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryName(product.category_id)}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stock_quantity}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleActive(product)} className="inline-flex items-center">
                      <Badge variant={product.is_active ? 'default' : 'secondary'}>
                        {product.is_active ? (
                          <>
                            <Eye className="mr-1 h-3 w-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="mr-1 h-3 w-3" />
                            Inactive
                          </>
                        )}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.is_featured ? 'default' : 'secondary'}>
                      {product.is_featured ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.is_best_selling ? 'default' : 'secondary'}>
                      {product.is_best_selling ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={(product.is_trending || product.is_top_rated) ? 'default' : 'secondary'}>
                      {(product.is_trending || product.is_top_rated) ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="bg-white text-[#2C2C2C] border border-[#C0C0C0] hover:bg-gray-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white text-red-600 hover:text-red-700 border border-[#C0C0C0] hover:bg-gray-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
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

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={editingProduct}
      />
    </div>
  );
}
