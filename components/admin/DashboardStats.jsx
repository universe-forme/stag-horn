"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown } from "lucide-react";

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
      trend: "up",
      color: "text-green-600"
    },
    {
      title: "Products Sold",
      value: "2,350",
      description: "+180.1% from last month",
      icon: Package,
      trend: "up",
      color: "text-blue-600"
    },
    {
      title: "Active Orders",
      value: "12,234",
      description: "+19% from last month",
      icon: ShoppingCart,
      trend: "up",
      color: "text-purple-600"
    },
    {
      title: "Total Customers",
      value: "1,234",
      description: "+201 since last month",
      icon: Users,
      trend: "up",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
              )}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
