"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Menu, User, Plus, Edit, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface CompanyAccount {
  id: number;
  company: string;
  opening: number;
  tickets: number;
  visa: number;
  hotel: number;
  transport: number;
  received: number;
  outstanding: number;
}

export default function Accounts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [accounts, setAccounts] = useState<CompanyAccount[]>([
    {
      id: 1,
      company: "Company A",
      opening: 10000,
      tickets: 5000,
      visa: 1000,
      hotel: 2000,
      transport: 500,
      received: 15000,
      outstanding: 3500,
    },
    {
      id: 2,
      company: "Company B",
      opening: 15000,
      tickets: 7000,
      visa: 1500,
      hotel: 3000,
      transport: 800,
      received: 20000,
      outstanding: 7300,
    },
    {
      id: 3,
      company: "Company C",
      opening: 8000,
      tickets: 4000,
      visa: 800,
      hotel: 1500,
      transport: 400,
      received: 12000,
      outstanding: 2700,
    },
    {
      id: 4,
      company: "Company D",
      opening: 12000,
      tickets: 6000,
      visa: 1200,
      hotel: 2500,
      transport: 600,
      received: 18000,
      outstanding: 4300,
    },
  ]);

  const [newAccount, setNewAccount] = useState<CompanyAccount>({
    id: 0,
    company: "",
    opening: 0,
    tickets: 0,
    visa: 0,
    hotel: 0,
    transport: 0,
    received: 0,
    outstanding: 0,
  });

  const [editingAccount, setEditingAccount] = useState<CompanyAccount | null>(
    null
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const calculateTotal = (category: keyof CompanyAccount) => {
    return accounts
      .reduce((total, account) => total + Number(account[category]), 0)
      .toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedAccount = editingAccount || newAccount;
    const updatedValue = name === "company" ? value : Number(value);

    if (editingAccount) {
      setEditingAccount({ ...editingAccount, [name]: updatedValue });
    } else {
      setNewAccount({ ...newAccount, [name]: updatedValue });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAccount) {
      setAccounts(
        accounts.map((account) =>
          account.id === editingAccount.id ? editingAccount : account
        )
      );
      setEditingAccount(null);
    } else {
      const newId = Math.max(...accounts.map((account) => account.id)) + 1;
      setAccounts([...accounts, { ...newAccount, id: newId }]);
      setNewAccount({
        id: 0,
        company: "",
        opening: 0,
        tickets: 0,
        visa: 0,
        hotel: 0,
        transport: 0,
        received: 0,
        outstanding: 0,
      });
    }
  };

  const handleEdit = (account: CompanyAccount) => {
    setEditingAccount(account);
  };

  const handleDelete = (id: number) => {
    setAccounts(accounts.filter((account) => account.id !== id));
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
              Company Accounts
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Add to Company Account
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingAccount
                        ? "Edit Company Account"
                        : "Add New Company Account"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={
                            editingAccount
                              ? editingAccount.company
                              : newAccount.company
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="opening">Opening</Label>
                        <Input
                          id="opening"
                          name="opening"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.opening
                              : newAccount.opening
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tickets">Tickets</Label>
                        <Input
                          id="tickets"
                          name="tickets"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.tickets
                              : newAccount.tickets
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="visa">Visa</Label>
                        <Input
                          id="visa"
                          name="visa"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.visa
                              : newAccount.visa
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hotel">Hotel</Label>
                        <Input
                          id="hotel"
                          name="hotel"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.hotel
                              : newAccount.hotel
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transport">Transport</Label>
                        <Input
                          id="transport"
                          name="transport"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.transport
                              : newAccount.transport
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="received">Received</Label>
                        <Input
                          id="received"
                          name="received"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.received
                              : newAccount.received
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="outstanding">Outstanding</Label>
                        <Input
                          id="outstanding"
                          name="outstanding"
                          type="number"
                          value={
                            editingAccount
                              ? editingAccount.outstanding
                              : newAccount.outstanding
                          }
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">
                      {editingAccount ? "Update Account" : "Add Account"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Opening
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tickets
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Visa
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Hotel
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Transport
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Received
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Outstanding
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                        {account.company}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${account.opening.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${account.tickets.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${account.visa.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${account.hotel.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        ${account.transport.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                        ${account.received.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">
                        ${account.outstanding.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(account)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Company Account</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="company">Company</Label>
                                  <Input
                                    id="company"
                                    name="company"
                                    value={editingAccount?.company}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="opening">Opening</Label>
                                  <Input
                                    id="opening"
                                    name="opening"
                                    type="number"
                                    value={editingAccount?.opening}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="tickets">Tickets</Label>
                                  <Input
                                    id="tickets"
                                    name="tickets"
                                    type="number"
                                    value={editingAccount?.tickets}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="visa">Visa</Label>
                                  <Input
                                    id="visa"
                                    name="visa"
                                    type="number"
                                    value={editingAccount?.visa}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="hotel">Hotel</Label>
                                  <Input
                                    id="hotel"
                                    name="hotel"
                                    type="number"
                                    value={editingAccount?.hotel}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="transport">Transport</Label>
                                  <Input
                                    id="transport"
                                    name="transport"
                                    type="number"
                                    value={editingAccount?.transport}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="received">Received</Label>
                                  <Input
                                    id="received"
                                    name="received"
                                    type="number"
                                    value={editingAccount?.received}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="outstanding">
                                    Outstanding
                                  </Label>
                                  <Input
                                    id="outstanding"
                                    name="outstanding"
                                    type="number"
                                    value={editingAccount?.outstanding}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <Button type="submit" className="w-full">
                                Update Account
                              </Button>
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
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the account.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(account.id)}
                              >
                                Delete
                              </Button>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
                  Total
                </h3>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Tickets
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                      ${calculateTotal("tickets")}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Visa
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                      ${calculateTotal("visa")}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Hotel
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                      ${calculateTotal("hotel")}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Transport
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2">
                      ${calculateTotal("transport")}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Received
                    </dt>
                    <dd className="mt-1 text-sm text-green-600 dark:text-green-400 sm:mt-0 sm:col-span-2">
                      ${calculateTotal("received")}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Outstanding
                    </dt>
                    <dd className="mt-1 text-sm text-red-600 dark:text-red-400 sm:mt-0 sm:col-span-2">
                      ${calculateTotal("outstanding")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
