"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Building,
  Users,
  DollarSign,
  CreditCard,
  Menu,
  User,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const accountData = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 12 },
  { name: "Apr", value: 18 },
  { name: "May", value: 20 },
  { name: "Jun", value: 22 },
  { name: "Jul", value: 25 },
];

const clientAccountsData = [
  {
    id: 1,
    company: "Acme Corp",
    opening: 10000,
    received: 5000,
    outstanding: 5000,
  },
  {
    id: 2,
    company: "TechSolutions Inc",
    opening: 15000,
    received: 10000,
    outstanding: 5000,
  },
  // ... more client accounts ...
];

const accountDetailsData = [
  {
    date: "2023-07-01",
    invoiceNo: "INV001",
    pnr: "ABC123",
    passengerName: "John Doe",
    sector: "NYC-LON",
    ticketNumber: "1234567890",
    fare: 500,
    taxes: 50,
    gross: 550,
    net: 500,
  },
  {
    date: "2023-07-02",
    invoiceNo: "INV002",
    pnr: "DEF456",
    passengerName: "Jane Smith",
    sector: "LAX-PAR",
    ticketNumber: "2345678901",
    fare: 750,
    taxes: 75,
    gross: 825,
    net: 750,
  },
  {
    date: "2023-07-03",
    invoiceNo: "INV003",
    pnr: "GHI789",
    passengerName: "Bob Johnson",
    sector: "SYD-TOK",
    ticketNumber: "3456789012",
    fare: 1000,
    taxes: 100,
    gross: 1100,
    net: 1000,
  },
  {
    date: "2023-07-04",
    invoiceNo: "INV004",
    pnr: "JKL012",
    passengerName: "Alice Brown",
    sector: "DUB-NYC",
    ticketNumber: "4567890123",
    fare: 600,
    taxes: 60,
    gross: 660,
    net: 600,
  },
  {
    date: "2023-07-05",
    invoiceNo: "INV005",
    pnr: "MNO345",
    passengerName: "Charlie Davis",
    sector: "HKG-SIN",
    ticketNumber: "5678901234",
    fare: 400,
    taxes: 40,
    gross: 440,
    net: 400,
  },
  // ... more account details ...
];

interface Account {
  id: number;
  company: string;
  opening: number;
  received: number;
  outstanding: number;
}

export default function ClientAccounts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [newCompany, setNewCompany] = useState("");
  const [newOpening, setNewOpening] = useState("");
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
  const currentItems = clientAccountsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to create a new client account
    console.log("New account:", { company: newCompany, opening: newOpening });
    setNewCompany("");
    setNewOpening("");
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
  };

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to update the account
    console.log("Updated account:", editingAccount);
    setEditingAccount(null);
  };

  const handleDeleteAccount = (id: number) => {
    // Add logic to delete the account
    console.log("Deleting account with id:", id);
  };

  return (
    <div
      className={`flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-20 items-center justify-between border-b bg-white dark:bg-gray-800 px-6 transition-colors duration-300">
          <div className="flex items-center">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden mr-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <Sidebar />
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Client Accounts
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

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Accounts
                </CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={accountData} />
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +10% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Balance
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={accountData} />
                <div className="text-2xl font-bold">$10,567,890</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Received
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={accountData} />
                <div className="text-2xl font-bold">$8,234,567</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Outstanding
                </CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <SimpleLineChart data={accountData} />
                <div className="text-2xl font-bold">$2,333,323</div>
                <p className="text-xs text-muted-foreground">
                  -3% since last week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Client Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAccount} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        value={newCompany}
                        onChange={(e) => setNewCompany(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opening">Opening Balance</Label>
                      <Input
                        id="opening"
                        type="number"
                        value={newOpening}
                        onChange={(e) => setNewOpening(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" /> Add Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="py-3 px-4 text-sm font-medium bg-gray-50 dark:bg-gray-800">
                    <div className="grid grid-cols-6 gap-4">
                      <div>Company</div>
                      <div>Opening</div>
                      <div>Received</div>
                      <div>Outstanding</div>
                      <div>Actions</div>
                    </div>
                  </div>
                  <div className="divide-y dark:divide-gray-700">
                    {currentItems.map((account) => (
                      <div key={account.id} className="py-3 px-4">
                        <div className="grid grid-cols-6 gap-4">
                          <div>{account.company}</div>
                          <div>${account.opening.toLocaleString()}</div>
                          <div>${account.received.toLocaleString()}</div>
                          <div>${account.outstanding.toLocaleString()}</div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View Account
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh] flex flex-col">
                                <DialogHeader>
                                  <DialogTitle>Account Details</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 flex-grow overflow-auto">
                                  <div className="rounded-md border">
                                    <div className="py-3 px-4 text-sm font-medium bg-gray-50 dark:bg-gray-800">
                                      <div className="grid grid-cols-10 gap-4 text-center">
                                        <div>Date</div>
                                        <div>Invoice No</div>
                                        <div>PNR</div>
                                        <div>Passenger Name</div>
                                        <div>Sector</div>
                                        <div>Ticket Number</div>
                                        <div>Fare</div>
                                        <div>Taxes</div>
                                        <div>Gross</div>
                                        <div>Net</div>
                                      </div>
                                    </div>
                                    <div className="divide-y dark:divide-gray-700">
                                      {accountDetailsData.map(
                                        (detail, index) => (
                                          <div
                                            key={index}
                                            className="py-3 px-4"
                                          >
                                            <div className="grid grid-cols-10 gap-4 text-center">
                                              <div>{detail.date}</div>
                                              <div>{detail.invoiceNo}</div>
                                              <div>{detail.pnr}</div>
                                              <div>{detail.passengerName}</div>
                                              <div>{detail.sector}</div>
                                              <div>{detail.ticketNumber}</div>
                                              <div>
                                                ${detail.fare.toLocaleString()}
                                              </div>
                                              <div>
                                                ${detail.taxes.toLocaleString()}
                                              </div>
                                              <div>
                                                ${detail.gross.toLocaleString()}
                                              </div>
                                              <div>
                                                ${detail.net.toLocaleString()}
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAccount(account)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Account</DialogTitle>
                                </DialogHeader>
                                <form
                                  onSubmit={handleUpdateAccount}
                                  className="space-y-4"
                                >
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-company">
                                      Company Name
                                    </Label>
                                    <Input
                                      id="edit-company"
                                      value={editingAccount?.company}
                                      onChange={(e) =>
                                        setEditingAccount(
                                          editingAccount
                                            ? {
                                                ...editingAccount,
                                                company: e.target.value,
                                              }
                                            : null
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-opening">
                                      Opening Balance
                                    </Label>
                                    <Input
                                      id="edit-opening"
                                      type="number"
                                      value={editingAccount?.opening}
                                      onChange={(e) =>
                                        setEditingAccount(
                                          editingAccount
                                            ? {
                                                ...editingAccount,
                                                opening: Number(e.target.value),
                                              }
                                            : null
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-received">
                                      Received
                                    </Label>
                                    <Input
                                      id="edit-received"
                                      type="number"
                                      value={editingAccount?.received}
                                      onChange={(e) =>
                                        setEditingAccount(
                                          editingAccount
                                            ? {
                                                ...editingAccount,
                                                received: Number(
                                                  e.target.value
                                                ),
                                              }
                                            : null
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-outstanding">
                                      Outstanding
                                    </Label>
                                    <Input
                                      id="edit-outstanding"
                                      type="number"
                                      value={editingAccount?.outstanding}
                                      onChange={(e) =>
                                        setEditingAccount(
                                          editingAccount
                                            ? {
                                                ...editingAccount,
                                                outstanding: Number(
                                                  e.target.value
                                                ),
                                              }
                                            : null
                                        )
                                      }
                                      required
                                    />
                                  </div>
                                  <Button type="submit">Update Account</Button>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the account and remove
                                    the data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteAccount(account.id)
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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
                        clientAccountsData.length / itemsPerPage
                      ),
                    }).map((_, index) => (
                      <Button
                        key={index}
                        variant={
                          currentPage === index + 1 ? "default" : "outline"
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
                        Math.ceil(clientAccountsData.length / itemsPerPage)
                      }
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
