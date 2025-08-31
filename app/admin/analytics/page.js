"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import Overview from "../../../components/admin/Overview";
import DashboardStats from "../../../components/admin/DashboardStats";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="text-muted-foreground">
          View detailed analytics and insights about your business performance.
        </p>
      </div>
      
      <DashboardStats />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue trends for the current year
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best performing products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#D6AF66] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    1
                  </div>
                  <span className="text-sm font-medium">Damascus Steel Knife</span>
                </div>
                <span className="text-sm text-green-600">+23%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                    2
                  </div>
                  <span className="text-sm font-medium">Brass Knuckle</span>
                </div>
                <span className="text-sm text-green-600">+18%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-xs font-bold">
                    3
                  </div>
                  <span className="text-sm font-medium">Forged Axe</span>
                </div>
                <span className="text-sm text-green-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Demographics</CardTitle>
            <CardDescription>
              Age and location distribution of your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>18-25 years</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#D6AF66] h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>26-35 years</span>
                  <span>40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#D6AF66] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>36-50 years</span>
                  <span>25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#D6AF66] h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>50+ years</span>
                  <span>10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#D6AF66] h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Channels</CardTitle>
            <CardDescription>
              Performance across different sales channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Website</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Amazon</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Etsy</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Direct Sales</span>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
