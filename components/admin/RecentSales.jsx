"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function RecentSales() {
  const recentSales = [
    {
      name: "Ahmed Khan",
      email: "ahmed@example.com",
      amount: "+$299.99",
      avatar: "/testimonial-profile-img.jpg"
    },
    {
      name: "Fatima Ali",
      email: "fatima@example.com",
      amount: "+$49.99",
      avatar: "/testimonial-profile-img.jpg"
    },
    {
      name: "Omar Hassan",
      email: "omar@example.com",
      amount: "+$249.98",
      avatar: "/testimonial-profile-img.jpg"
    },
    {
      name: "Aisha Rahman",
      email: "aisha@example.com",
      amount: "+$299.99",
      avatar: "/testimonial-profile-img.jpg"
    },
    {
      name: "Zainab Malik",
      email: "zainab@example.com",
      amount: "+$89.99",
      avatar: "/testimonial-profile-img.jpg"
    }
  ];

  return (
    <div className="space-y-8">
      {recentSales.map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt={sale.name} />
            <AvatarFallback>{sale.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium text-green-600">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
