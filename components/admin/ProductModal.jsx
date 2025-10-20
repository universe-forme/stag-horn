"use client";

import { useState, useEffect, useRef } from "react";
import { useAllCategories, useCreateProduct, useUpdateProduct } from "../../lib/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { X, Upload, Image as ImageIcon, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductModal({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shortDescription: "",
    price: 0,
    comparePrice: 0,
    categoryId: "",
    sku: "",
    stockQuantity: 0,
    weight: "",
    productSize: "",
    delivery_date: "",
    isActive: true,
    isFeatured: false,
    isTrending: false,
    isBestSelling: false,
    tags: []
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const mainImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  const { data: categories } = useAllCategories();
  const { createProduct, isLoading: isCreating } = useCreateProduct();
  const { updateProduct, isLoading: isUpdating } = useUpdateProduct();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        shortDescription: product.short_description || "",
        price: product.price || 0,
        comparePrice: product.compare_price || 0,
        categoryId: product.category_id || "",
        sku: product.sku || "",
        stockQuantity: product.stock_quantity || 0,
        weight: product.weight || "",
        productSize: product.product_size || "",
        delivery_date: product.delivery_date || "",
        isActive: Boolean(product.is_active),
        isFeatured: Boolean(product.is_featured),
        isTrending: Boolean(product.is_trending || product.is_top_rated),
        isBestSelling: Boolean(product.is_best_selling),
        tags: product.tags || []
      });
      setMainImagePreview(product.main_image || "");
      setAdditionalImages(product.images || []);
    } else {
      setFormData({
        name: "",
        description: "",
        shortDescription: "",
        price: 0,
        comparePrice: 0,
        categoryId: "",
        sku: "",
        stockQuantity: 0,
        weight: "",
        productSize: "",
        delivery_date: "",
        isActive: true,
        isFeatured: false,
        isTrending: false,
        isBestSelling: false,
        tags: []
      });
      setMainImagePreview("");
      setAdditionalImages([]);
    }
    setMainImageFile(null);
    setAdditionalImageFiles([]);
    setErrors({});
  }, [product, isOpen]);

  const generateSku = (name) => {
    return name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .substring(0, 8) + Math.random().toString(36).substring(2, 6).toUpperCase();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "name") {
      const sku = generateSku(value);
      setFormData(prev => ({ ...prev, sku }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (handleImageValidation(file, "mainImage")) {
        setMainImageFile(file);
        setErrors(prev => ({ ...prev, mainImage: "" }));
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setMainImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Replace the old handleImageValidation with robust validation for both main and additional images
  const handleImageValidation = (file, type) => {
    try {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [type]: "Please select a valid image file" }));
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [type]: "Image size must be less than 1MB" }));
        return false;
      }
      return new Promise((resolve) => {
        const img = new window.Image();
        img.onload = function () {
          const { width, height } = img;
          const isAllowed = (
            (width === 1000 && height === 100) ||
            (width === 800 && height === 800) ||
            (width === height && width < 2000)
          );
          if (!isAllowed) {
            setErrors(prev => ({ ...prev, [type]: "Image dimensions must be 800x800px, 1000x100px, or any square less than 2000px." }));
            resolve(false);
          } else {
            setErrors(prev => ({ ...prev, [type]: "" }));
            resolve(true);
          }
        };
        img.onerror = function () {
          setErrors(prev => ({ ...prev, [type]: "Could not read image dimensions." }));
          resolve(false);
        };
        img.src = URL.createObjectURL(file);
      });
    } catch (err) {
      setErrors(prev => ({ ...prev, [type]: "Image validation failed. Please try another image." }));
      return false;
    }
  };

  const handleMainImageDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (handleImageValidation(file, "mainImage")) {
        setMainImageFile(file);
        setErrors(prev => ({ ...prev, mainImage: "" }));
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setMainImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleMainImageDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleMainImageDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleAdditionalImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    handleAdditionalImagesValidation(files);
  };

  const handleAdditionalImagesValidation = (files) => {
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, additionalImages: "Please select valid image files" }));
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, additionalImages: "Image size must be less than 5MB" }));
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setAdditionalImageFiles(prev => [...prev, ...validFiles]);
      setErrors(prev => ({ ...prev, additionalImages: "" }));

      validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAdditionalImages(prev => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleAdditionalImagesDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = Array.from(e.dataTransfer.files);
    handleAdditionalImagesValidation(files);
  };

  const handleAdditionalImagesDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleAdditionalImagesDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const removeMainImage = () => {
    setMainImageFile(null);
    setMainImagePreview("");
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = "";
    }
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
    setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (formData.stockQuantity < 0) {
      newErrors.stockQuantity = "Stock quantity cannot be negative";
    }

    if (!mainImagePreview) {
      newErrors.mainImage = "Main image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const mainImage = mainImagePreview;
      const images = additionalImages;

      if (product) {
        await updateProduct(product.id, {
          name: formData.name,
          description: formData.description,
          short_description: formData.shortDescription,
          price: formData.price,
          compare_price: formData.comparePrice,
          category_id: formData.categoryId,
          main_image: mainImage,
          images,
          sku: formData.sku,
          stock_quantity: formData.stockQuantity,
          weight: formData.weight,
          product_size: formData.productSize,
          delivery_date: formData.delivery_date,
          is_active: formData.isActive,
          is_featured: formData.isFeatured,
          is_trending: formData.isTrending,
          is_top_rated: formData.isTrending,
          is_best_selling: formData.isBestSelling,
          tags: formData.tags,
        });
        toast.success('Product updated successfully!');
      } else {
        await createProduct({
          name: formData.name,
          description: formData.description,
          short_description: formData.shortDescription,
          price: formData.price,
          compare_price: formData.comparePrice,
          category_id: formData.categoryId,
          main_image: mainImage,
          images,
          sku: formData.sku,
          stock_quantity: formData.stockQuantity,
          weight: formData.weight,
          product_size: formData.productSize,
          delivery_date: formData.delivery_date,
          is_active: formData.isActive,
          is_featured: formData.isFeatured,
          is_trending: formData.isTrending,
          is_top_rated: formData.isTrending,
          is_best_selling: formData.isBestSelling,
          tags: formData.tags,
        });
        toast.success('Product created successfully!');
      }

      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(product ? 'Failed to update product. Please try again.' : 'Failed to create product. Please try again.');
      setErrors(prev => ({ ...prev, submit: "Failed to save product. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-100 bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <div 
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2C2C2C]">
            {product ? "Edit Product" : "Add New Product"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[#2C2C2C] hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form id="product-form" onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-[#2C2C2C]">
                Product Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="categoryId" className="text-sm font-medium text-[#2C2C2C]">
                Category *
              </Label>
              <select
                id="categoryId"
                value={formData.categoryId}
                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                className={`mt-1 w-full px-3 py-2 border border-[#C0C0C0] rounded-lg focus:ring-2 focus:ring-[#F27F0C] focus:border-[#F27F0C] bg-white text-[#2C2C2C] ${errors.categoryId ? 'border-red-500' : ''}`}
              >
                <option value="">Select a category</option>
                {categories?.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-[#2C2C2C]">
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                className={`mt-1 ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Compare Price */}
            <div>
              <Label htmlFor="comparePrice" className="text-sm font-medium text-[#2C2C2C]">
                Compare Price
              </Label>
              <Input
                id="comparePrice"
                type="number"
                step="0.01"
                value={formData.comparePrice}
                onChange={(e) => handleInputChange("comparePrice", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                className="mt-1"
              />
            </div>

            {/* SKU */}
            <div>
              <Label htmlFor="sku" className="text-sm font-medium text-[#2C2C2C]">
                SKU *
              </Label>
              <Input
                id="sku"
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange("sku", e.target.value)}
                placeholder="Product SKU"
                className={`mt-1 ${errors.sku ? 'border-red-500' : ''}`}
              />
              {errors.sku && (
                <p className="mt-1 text-sm text-red-600">{errors.sku}</p>
              )}
            </div>

            {/* Stock Quantity */}
            <div>
              <Label htmlFor="stockQuantity" className="text-sm font-medium text-[#2C2C2C]">
                Stock Quantity *
              </Label>
              <Input
                id="stockQuantity"
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => handleInputChange("stockQuantity", parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                className={`mt-1 ${errors.stockQuantity ? 'border-red-500' : ''}`}
              />
              {errors.stockQuantity && (
                <p className="mt-1 text-sm text-red-600">{errors.stockQuantity}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-[#2C2C2C]">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={4}
              className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <Label htmlFor="shortDescription" className="text-sm font-medium text-[#2C2C2C]">
              Short Description
            </Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={(e) => handleInputChange("shortDescription", e.target.value)}
              placeholder="Enter short description"
              rows={2}
              className="mt-1"
            />
          </div>

          {/* Main Image Upload */}
          <div>
            <Label className="text-sm font-medium text-[#2C2C2C]">
              Main Image *
            </Label>
            <div className="mt-1">
              {mainImagePreview ? (
                <div className="relative">
                  <img
                    src={mainImagePreview}
                    alt="Main product image"
                    className="w-full h-48 object-cover rounded-lg border border-[#C0C0C0]"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeMainImage}
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-[#C0C0C0] rounded-lg p-6 text-center hover:border-[#F27F0C] transition-colors cursor-pointer"
                  onClick={() => mainImageInputRef.current?.click()}
                  onDragOver={handleMainImageDragOver}
                  onDragLeave={handleMainImageDragLeave}
                  onDrop={handleMainImageDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-[#2C2C2C] opacity-40" />
                  <div className="mt-4">
                    <p className="text-sm font-medium text-[#2C2C2C]">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[#2C2C2C] opacity-60 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              )}
              <input
                ref={mainImageInputRef}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                className="hidden"
              />
              {errors.mainImage && (
                <p className="mt-1 text-sm text-red-600">{errors.mainImage}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Allowed: 800x800px, 1000x100px, or any square &lt; 2000px. Max size: 1MB.
              </p>
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <Label className="text-sm font-medium text-[#2C2C2C]">
              Additional Images
            </Label>
            <div className="mt-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {additionalImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Additional image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-[#C0C0C0]"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {additionalImages.length < 8 && (
                  <div
                    className="border-2 border-dashed border-[#C0C0C0] rounded-lg p-4 text-center hover:border-[#F27F0C] transition-colors cursor-pointer flex items-center justify-center"
                    onClick={() => additionalImagesInputRef.current?.click()}
                    onDragOver={handleAdditionalImagesDragOver}
                    onDragLeave={handleAdditionalImagesDragLeave}
                    onDrop={handleAdditionalImagesDrop}
                  >
                    <Plus className="h-8 w-8 text-[#2C2C2C] opacity-40" />
                  </div>
                )}
              </div>
              <input
                ref={additionalImagesInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesUpload}
                className="hidden"
              />
              {errors.additionalImages && (
                <p className="mt-1 text-sm text-red-600">{errors.additionalImages}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium text-[#2C2C2C]">
              Tags
            </Label>
            <div className="mt-1 flex gap-2">
              <Input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline" className="bg-white text-[#2C2C2C] border border-[#C0C0C0] hover:bg-gray-50">
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium text-[#2C2C2C]">
                Weight
              </Label>
              <Input
                id="weight"
                type="text"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="e.g., 250gr, 1kg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="productSize" className="text-sm font-medium text-[#2C2C2C]">
                Product Size
              </Label>
              <Input
                id="productSize"
                type="text"
                value={formData.productSize}
                onChange={(e) => handleInputChange("productSize", e.target.value)}
                placeholder="e.g., 18.5 inches Overall length"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="delivery_date" className="text-sm font-medium text-[#2C2C2C]">
                Delivery Date
              </Label>
              <Input
                id="delivery_date"
                type="text"
                value={formData.delivery_date}
                onChange={(e) => handleInputChange("delivery_date", e.target.value)}
                placeholder="e.g., 2-3 business days"
                className="mt-1"
              />
            </div>
          </div>

          {/* Product Flags */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[#2C2C2C]">Product Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isActive" className="text-sm font-medium text-[#2C2C2C]">
                    Active Status
                  </Label>
                  <p className="text-xs text-[#2C2C2C] opacity-60 mt-1">
                    Enable or disable this product
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isFeatured" className="text-sm font-medium text-[#2C2C2C]">
                    Featured Product
                  </Label>
                  <p className="text-xs text-[#2C2C2C] opacity-60 mt-1">
                    Show on featured products section
                  </p>
                </div>
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isTrending" className="text-sm font-medium text-[#2C2C2C]">
                    Trending
                  </Label>
                  <p className="text-xs text-[#2C2C2C] opacity-60 mt-1">
                    Mark as trending product
                  </p>
                </div>
                <Switch
                  id="isTrending"
                  checked={formData.isTrending}
                  onCheckedChange={(checked) => handleInputChange("isTrending", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="isBestSelling" className="text-sm font-medium text-[#2C2C2C]">
                    Best Selling
                  </Label>
                  <p className="text-xs text-[#2C2C2C] opacity-60 mt-1">
                    Mark as best selling product
                  </p>
                </div>
                <Switch
                  id="isBestSelling"
                  checked={formData.isBestSelling}
                  onCheckedChange={(checked) => handleInputChange("isBestSelling", checked)}
                />
              </div>
            </div>
          </div>
        </form>
        
        <div className="p-6 border-t border-gray-200">
            {/* Submit Error */}
            {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
                <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="bg-white text-[#2C2C2C] border border-[#C0C0C0] hover:bg-gray-50"
                >
                Cancel
                </Button>
                <Button
                type="submit"
                form="product-form"
                className="bg-[#F27F0C] hover:bg-[#C49F5A] text-white border border-[#F27F0C]"
                disabled={isLoading}
                >
                {isLoading ? (
                    <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                    </>
                ) : (
                    product ? "Update Product" : "Create Product"
                )}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
