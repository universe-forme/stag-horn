"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import Overview from "../../components/admin/Overview";
import RecentSales from "../../components/admin/RecentSales";
import DashboardStats from "../../components/admin/DashboardStats";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
        <p className="text-muted-foreground text-center">
          Welcome to your admin dashboard. Here&apos;s an overview of your business.
        </p>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
