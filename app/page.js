import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
export default function Home() {
  return (
    <div>
      {/* Main Page layout */}
      <section>
        <h1 className="gradient-title text-3xl sm:text-6xl text-center pt-4 sm:pt-6">
          Steps To Start Planning Your Feature.
        </h1>
        <div className="sm:flex sm:items-center sm:justify-around sm:pt-5 gap-4 pb-6">
          {/* Step 01 */}
          <div className="flex items-center space-x-2 space-y-2 mt-5 p-3 sm:p-0">
            <h2 className="text-2xl gradient-subTitle">Step 01:- </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <StepsCard title="1" className="container mx-auto" />
                <Link
                  href="/income"
                  className="hover:underline hover:cursor-pointer hover:text-blue-500"
                >
                  <h2>Add Income Category</h2>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <StepsCard title="2" className="container mx-auto" />
                <Link
                  href="/expense"
                  className="hover:underline hover:cursor-pointer hover:text-blue-500"
                >
                  <h2>Add Expense Category</h2>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <StepsCard title="3" className="container mx-auto" />
                <Link
                  href="/bank-account"
                  className="hover:underline hover:cursor-pointer hover:text-blue-500"
                >
                  <h2>Add Bank Accounts</h2>
                </Link>
              </div>
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex items-center space-x-2 space-y-2 mt-5">
            <h2 className="text-2xl gradient-subTitle p-2">Step 02:- </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <StepsCard title="1" className="container mx-auto" />
                <h2 className="text-green-500 font-semibold">Add Income</h2>
              </div>
              <div className="flex items-center space-x-2">
                <StepsCard title="2" className="container mx-auto" />
                <h2 className="text-red-500 font-semibold">Add Expense</h2>
              </div>
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex items-center space-x-2 space-y-2 mt-5">
            <h2 className="text-2xl gradient-subTitle p-2">Step 03:- </h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <StepsCard title="1" className="container mx-auto" />
                <h2>Monthly Dashboard</h2>
              </div>
              <div className="flex items-center space-x-2">
                <StepsCard title="2" className="container mx-auto" />
                <h2>Annual Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5 border min-h-20">Render page</section>
    </div>
  );
}

const StepsCard = ({ title }) => {
  return (
    <Card className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
      <CardContent className="p-0">
        <p className="text-center">{title}</p>
      </CardContent>
    </Card>
  );
};
