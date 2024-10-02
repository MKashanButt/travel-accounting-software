"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  CalendarDays,
  CreditCard,
  DollarSign,
  Users,
  Briefcase,
  Plane,
  MapPin,
  Menu,
  ChevronDown,
  ChevronRight,
  Settings,
  User,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 2000 },
  { name: "Apr", value: 2780 },
  { name: "May", value: 1890 },
  { name: "Jun", value: 2390 },
  { name: "Jul", value: 3490 },
];

const transactionData = [
  {
    id: 1,
    type: "Flight",
    icon: Plane,
    description: "New York to London",
    client: "John Doe",
    amount: 1200.0,
    date: "2023-05-15",
  },
  {
    id: 2,
    type: "Package",
    icon: MapPin,
    description: "Europe Tour Package",
    client: "Jane Smith",
    amount: 3500.0,
    date: "2023-05-14",
  },
  {
    id: 3,
    type: "Flight",
    icon: Plane,
    description: "Tokyo to Sydney",
    client: "Mike Johnson",
    amount: 1800.0,
    date: "2023-05-13",
  },
  {
    id: 4,
    type: "Package",
    icon: MapPin,
    description: "Caribbean Cruise",
    client: "Emily Brown",
    amount: 2500.0,
    date: "2023-05-12",
  },
  {
    id: 5,
    type: "Flight",
    icon: Plane,
    description: "Paris to Rome",
    client: "David Lee",
    amount: 500.0,
    date: "2023-05-11",
  },
  {
    id: 6,
    type: "Package",
    icon: MapPin,
    description: "African Safari",
    client: "Sarah Wilson",
    amount: 4500.0,
    date: "2023-05-10",
  },
  {
    id: 7,
    type: "Flight",
    icon: Plane,
    description: "Los Angeles to Bali",
    client: "Tom Harris",
    amount: 2200.0,
    date: "2023-05-09",
  },
  {
    id: 8,
    type: "Package",
    icon: MapPin,
    description: "Amazon Rainforest Tour",
    client: "Lisa Garcia",
    amount: 3000.0,
    date: "2023-05-08",
  },
  {
    id: 9,
    type: "Flight",
    icon: Plane,
    description: "London to Dubai",
    client: "Alex Turner",
    amount: 1500.0,
    date: "2023-05-07",
  },
  {
    id: 10,
    type: "Package",
    icon: MapPin,
    description: "Greek Islands Cruise",
    client: "Olivia Martinez",
    amount: 2800.0,
    date: "2023-05-06",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [openAccounts, setOpenAccounts] = useState(false);
  const [openSale, setOpenSale] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const SidebarContent = () => (
    <>
      <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          TravelAccountPro
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
              onClick={() => setActiveTab("home")}
            >
              Home
            </Button>
          </li>
          <li>
            <Collapsible open={openAccounts} onOpenChange={setOpenAccounts}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal"
                >
                  Accounts
                  {openAccounts ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("company-accounts")}
                >
                  Company Accounts
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("client-accounts")}
                >
                  Client Accounts
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </li>
          <li>
            <Collapsible open={openSale} onOpenChange={setOpenSale}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left font-normal"
                >
                  Sale
                  {openSale ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("clients")}
                >
                  Clients
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("client-accounts")}
                >
                  Client Accounts
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("tickets")}
                >
                  Tickets
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("umrah-hajj")}
                >
                  Umrah & Hajj
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start pl-6 text-left font-normal"
                  onClick={() => setActiveTab("payments")}
                >
                  Payments
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </li>
          <li>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal"
              onClick={() => setActiveTab("packages")}
            >
              Packages
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-left font-normal"
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </>
  );

  const SimpleLineChart = ({ data }: { data: any }) => (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data}>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactionData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div
      className={`flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-white dark:bg-gray-800 shadow-md lg:flex flex-col transition-colors duration-300">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-20 items-center justify-between border-b bg-white dark:bg-gray-800 px-6 transition-colors duration-300">
          <div className="flex items-center">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Dashboard
            </h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href="/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center justify-between w-full">
                  <span className="mr-4">Dark Mode</span>
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={data} />
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={data} />
                <div className="text-2xl font-bold">+2350</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Clients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={data} />
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Payments
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={data} />
                <div className="text-2xl font-bold">$6,354</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="flights">Flights</TabsTrigger>
                    <TabsTrigger value="packages">Packages</TabsTrigger>
                    <TabsTrigger value="umrah">Umrah & Hajj</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all">
                    <div className="space-y-4">
                      {/*... (filters remain unchanged) */}

                      {/* Transactions Table */}
                      <div className="rounded-md border">
                        <div className="py-3 px-4 text-sm font-medium bg-gray-50 dark:bg-gray-800">
                          <div className="grid grid-cols-4 gap-4">
                            <div>Transaction</div>
                            <div>Client</div>
                            <div>Amount</div>
                            <div>Date</div>
                          </div>
                        </div>
                        <div className="divide-y dark:divide-gray-700">
                          {currentItems.map((transaction) => (
                            <div key={transaction.id} className="py-3 px-4">
                              <div className="grid grid-cols-4 gap-4">
                                <div className="flex items-center">
                                  <transaction.icon className="mr-2 h-4 w-4" />
                                  <span>{transaction.description}</span>
                                </div>
                                <div>{transaction.client}</div>
                                <div>${transaction.amount.toFixed(2)}</div>
                                <div>{transaction.date}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pagination */}
                      <div className="flex justify-end mt-4">
                        <nav className="inline-flex">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          {Array.from({
                            length: Math.ceil(
                              transactionData.length / itemsPerPage
                            ),
                          }).map((_, index) => (
                            <Button
                              key={index}
                              variant={
                                currentPage === index + 1
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() => paginate(index + 1)}
                            >
                              {index + 1}
                            </Button>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                              currentPage ===
                              Math.ceil(transactionData.length / itemsPerPage)
                            }
                          >
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </nav>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
