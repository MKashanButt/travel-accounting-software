import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import Link from "next/link";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [openAccounts, setOpenAccounts] = useState(false);
  const [openSale, setOpenSale] = useState(false);

  return (
    <aside className="hidden w-64 bg-white dark:bg-gray-800 shadow-md lg:flex flex-col transition-colors duration-300">
      <div className="flex h-20 items-center justify-center border-b">
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          TravelAccountPro
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <Link href="/">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start text-left font-normal"
                onClick={() => setActiveTab("home")}
              >
                Home
              </Button>
            </li>
          </Link>
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
                <Link href="/accounts/company-accounts">
                  <Button
                    variant="ghost"
                    className="w-full justify-start pl-6 text-left font-normal"
                    onClick={() => setActiveTab("company-accounts")}
                  >
                    Company Accounts
                  </Button>
                </Link>
                <Link href="/accounts/client-accounts">
                  <Button
                    variant="ghost"
                    className="w-full justify-start pl-6 text-left font-normal"
                    onClick={() => setActiveTab("client-accounts")}
                  >
                    Client Accounts
                  </Button>
                </Link>
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
    </aside>
  );
};

export default Sidebar;
