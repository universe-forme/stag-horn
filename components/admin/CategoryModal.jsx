"use client";

import { useState, useEffect, useRef } from "react";
import { useCreateCategory, useUpdateCategory } from "../../lib/hooks";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { X, Upload, Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function CategoryModal({ isOpen, onClose, category }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    slug: "",
    isActive: true,
    sortOrder: 0,
    imageUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const { createCategory, isLoading: isCreating } = useCreateCategory();
  const { updateCategory, isLoading: isUpdating } = useUpdateCategory();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        slug: category.slug || "",
        isActive: Boolean(category.is_active),
        sortOrder: category.sort_order || 0,
        imageUrl: category.image_url || ""
      });
      setImagePreview(category.image_url || "");
    } else {
      setFormData({
        name: "",
        description: "",
        slug: "",
        isActive: true,
        sortOrder: 0,
        imageUrl: ""
      });
      setImagePreview("");
    }
    setImageFile(null);
    setErrors({});
  }, [category, isOpen]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim("-");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === "name") {
      const slug = generateSlug(value);
      setFormData(prev => ({ ...prev, slug }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (handleImageValidation(file)) {
        setImageFile(file);
        setErrors(prev => ({ ...prev, image: "" }));
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageValidation = (file) => {
    try {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: "Please select a valid image file" }));
        return false;
      }
      if (file.size > 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: "Image size must be less than 1MB" }));
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
            setErrors(prev => ({ ...prev, image: "Image dimensions must be 800x800px, 1000x100px, or any square less than 2000px." }));
            resolve(false);
          } else {
            setErrors(prev => ({ ...prev, image: "" }));
            resolve(true);
          }
        };
        img.onerror = function () {
          setErrors(prev => ({ ...prev, image: "Could not read image dimensions." }));
          resolve(false);
        };
        img.src = URL.createObjectURL(file);
      });
    } catch (err) {
      setErrors(prev => ({ ...prev, image: "Image validation failed. Please try another image." }));
      return false;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (handleImageValidation(file)) {
        setImageFile(file);
        setErrors(prev => ({ ...prev, image: "" }));
        
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    setFormData(prev => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    if (formData.sortOrder < 0) {
      newErrors.sortOrder = "Sort order must be 0 or greater";
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
      const imageUrl = imagePreview || formData.imageUrl;

      if (category) {
        await updateCategory(category.id, {
          name: formData.name,
          description: formData.description,
          slug: formData.slug,
          image_url: imageUrl,
          is_active: formData.isActive,
          sort_order: formData.sortOrder,
        });
        toast.success('Category updated successfully!');
      } else {
        await createCategory({
          name: formData.name,
          description: formData.description,
          slug: formData.slug,
          image_url: imageUrl,
          is_active: formData.isActive,
          sort_order: formData.sortOrder,
        });
        toast.success('Category created successfully!');
      }

      onClose();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(category ? 'Failed to update category. Please try again.' : 'Failed to create category. Please try again.');
      setErrors(prev => ({ ...prev, submit: "Failed to save category. Please try again." }));
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
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#2C2C2C]">
            {category ? "Edit Category" : "Add New Category"}
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

        <form id="category-form" onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 space-y-6">
          {/* Category Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-[#2C2C2C]">
              Category Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              className={`mt-1 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-[#2C2C2C]">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter category description"
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Slug */}
          <div>
            <Label htmlFor="slug" className="text-sm font-medium text-[#2C2C2C]">
              Slug *
            </Label>
            <Input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange("slug", e.target.value)}
              placeholder="category-slug"
              className={`mt-1 ${errors.slug ? 'border-red-500' : ''}`}
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-sm font-medium text-[#2C2C2C]">
              Category Image
            </Label>
            <div className="mt-1">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Category preview"
                    className="w-full h-48 object-cover rounded-lg border border-[#C0C0C0]"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-[#C0C0C0] rounded-lg p-6 text-center hover:border-[#F27F0C] transition-colors cursor-pointer"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
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
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Allowed: 1000x100px, 800x800px, or any square &lt; 2000px. Max size: 1MB.
              </p>
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <Label htmlFor="sortOrder" className="text-sm font-medium text-[#2C2C2C]">
              Sort Order
            </Label>
            <Input
              id="sortOrder"
              type="number"
              value={formData.sortOrder}
              onChange={(e) => handleInputChange("sortOrder", parseInt(e.target.value) || 0)}
              placeholder="0"
              min="0"
              className={`mt-1 ${errors.sortOrder ? 'border-red-500' : ''}`}
            />
            {errors.sortOrder && (
              <p className="mt-1 text-sm text-red-600">{errors.sortOrder}</p>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isActive" className="text-sm font-medium text-[#2C2C2C]">
                Active Status
              </Label>
              <p className="text-xs text-[#2C2C2C] opacity-60 mt-1">
                Enable or disable this category
              </p>
            </div>
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
            />
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
                form="category-form"
                className="bg-[#F27F0C] hover:bg-[#C49F5A] text-white border border-[#F27F0C]"
                disabled={isLoading}
                >
                {isLoading ? (
                    <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                    </>
                ) : (
                    category ? "Update Category" : "Create Category"
                )}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
