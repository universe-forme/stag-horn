"use client";

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Download, Calendar, FileText, BarChart3, TrendingUp, Users } from "lucide-react";
import { Badge } from "../../../components/ui/badge";

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      name: "Sales Report",
      description: "Monthly sales performance and revenue analysis",
      type: "Monthly",
      lastGenerated: "2024-01-15",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      id: 2,
      name: "Customer Report",
      description: "Customer demographics and behavior analysis",
      type: "Quarterly",
      lastGenerated: "2024-01-01",
      icon: Users,
      color: "text-blue-600"
    },
    {
      id: 3,
      name: "Inventory Report",
      description: "Stock levels and product performance metrics",
      type: "Weekly",
      lastGenerated: "2024-01-14",
      icon: BarChart3,
      color: "text-purple-600"
    },
    {
      id: 4,
      name: "Financial Report",
      description: "Profit and loss statements and financial metrics",
      type: "Monthly",
      lastGenerated: "2024-01-15",
      icon: FileText,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports</h1>
          <p className="text-muted-foreground">
            Generate and download business reports and analytics.
          </p>
        </div>
        <Button className="bg-[#D6AF66] hover:bg-[#C49F5A] text-white">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <report.icon className={`h-8 w-8 ${report.color}`} />
                <Badge variant="outline">{report.type}</Badge>
              </div>
              <CardTitle className="text-lg">{report.name}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Last generated: {report.lastGenerated}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Custom Report Builder</CardTitle>
          <CardDescription>
            Create custom reports with specific metrics and date ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Sales Report</option>
                <option>Customer Report</option>
                <option>Inventory Report</option>
                <option>Financial Report</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last 6 months</option>
                <option>Last year</option>
                <option>Custom range</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-[#D6AF66] hover:bg-[#C49F5A] text-white">
              <FileText className="mr-2 h-4 w-4" />
              Generate Custom Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>
            Recently generated reports and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Sales Report - January 2024</div>
                <div className="text-sm text-muted-foreground">Generated on 2024-01-15 at 10:30 AM</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Completed</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Customer Report - Q4 2023</div>
                <div className="text-sm text-muted-foreground">Generated on 2024-01-01 at 9:00 AM</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Completed</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">Inventory Report - Week 2</div>
                <div className="text-sm text-muted-foreground">Generated on 2024-01-14 at 11:45 AM</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Completed</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
