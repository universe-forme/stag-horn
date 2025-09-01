import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

// Admin authentication hooks
export const useVerifyAdminLogin = () => {
  return useMutation(api.admin.verifyAdminLogin);
};

export const useGetAdminLoginHistory = (limit?: number) => {
  return useQuery(api.admin.getAdminLoginHistory, { limit });
};

export const useGetAdminLoginHistoryByUsername = (username: string, limit?: number) => {
  return useQuery(api.admin.getAdminLoginHistoryByUsername, { username, limit });
};

// User hooks
export const useUserByClerkId = (clerkId: string | null) => {
  return useQuery(api.users.getUserByClerkId, clerkId ? { clerkId } : "skip");
};

export const useAllUsers = () => {
  return useQuery(api.users.getAllUsers);
};

export const useUserById = (userId: Id<"users"> | null) => {
  return useQuery(api.users.getUserById, userId ? { userId } : "skip");
};

export const useCreateUser = () => {
  return useMutation(api.users.createUser);
};

export const useUpdateUser = () => {
  return useMutation(api.users.updateUser);
};

export const useDeleteUser = () => {
  return useMutation(api.users.deleteUser);
};

// Product hooks
export const useActiveProducts = () => {
  return useQuery(api.products.getActiveProducts);
};

export const useFeaturedProducts = () => {
  return useQuery(api.products.getFeaturedProducts);
};

export const useProductById = (productId: Id<"products"> | null) => {
  return useQuery(api.products.getProductById, productId ? { productId } : "skip");
};

export const useProductsByCategory = (categoryId: Id<"categories"> | null) => {
  return useQuery(api.products.getProductsByCategory, categoryId ? { categoryId } : "skip");
};

export const useSearchProducts = (searchTerm: string) => {
  return useQuery(api.products.searchProducts, { searchTerm });
};

export const useTopRatedProducts = (limit?: number) => {
  return useQuery(api.products.getTopRatedProducts, { limit });
};

export const useBestSellingProducts = (limit?: number) => {
  return useQuery(api.products.getBestSellingProducts, { limit });
};

// Category hooks
export const useActiveCategories = () => {
  return useQuery(api.categories.getActiveCategories);
};

export const useAllCategories = () => {
  return useQuery(api.categories.getAllCategories);
};

export const useCategoryById = (categoryId: Id<"categories"> | null) => {
  return useQuery(api.categories.getCategoryById, categoryId ? { categoryId } : "skip");
};

export const useCategoryBySlug = (slug: string | null) => {
  return useQuery(api.categories.getCategoryBySlug, slug ? { slug } : "skip");
};

export const useCategoriesWithProductCounts = () => {
  return useQuery(api.categories.getCategoriesWithProductCounts);
};

// Contact form hooks
export const useSubmitContactForm = () => {
  return useMutation(api.contact.submitContactForm);
};

export const useAllContactSubmissions = () => {
  return useQuery(api.contact.getAllContactSubmissions);
};

export const useContactSubmissionsByStatus = (status: "new" | "in_progress" | "completed" | "cancelled") => {
  return useQuery(api.contact.getContactSubmissionsByStatus, { status });
};

export const useUpdateContactSubmissionStatus = () => {
  return useMutation(api.contact.updateContactSubmissionStatus);
};

// Order hooks
export const useAllOrders = () => {
  return useQuery(api.orders.getAllOrders);
};

export const useOrdersByUser = (userId: Id<"users"> | null) => {
  return useQuery(api.orders.getOrdersByUser, userId ? { userId } : "skip");
};

export const useOrderById = (orderId: Id<"orders"> | null) => {
  return useQuery(api.orders.getOrderById, orderId ? { orderId } : "skip");
};

export const useCreateOrder = () => {
  return useMutation(api.orders.createOrder);
};

export const useUpdateOrderStatus = () => {
  return useMutation(api.orders.updateOrderStatus);
};

export const useUpdatePaymentStatus = () => {
  return useMutation(api.orders.updatePaymentStatus);
};
