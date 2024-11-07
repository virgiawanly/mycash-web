import {
  AudioWaveform,
  Box,
  Command,
  Contact,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  HandCoins,
  LineChart,
  Map,
  Monitor,
  PieChart,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Warehouse,
} from "lucide-react";

export const menu = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Monitor,
    },
    {
      title: "Sales",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "Overview",
          url: "/sales",
        },
        {
          title: "Invoices",
          url: "/sales/invoices",
        },
        {
          title: "Deliveries",
          url: "/sales/deliveries",
        },
        {
          title: "Orders",
          url: "/sales/orders",
        },
        {
          title: "Quotations",
          url: "/sales/quotations",
        },
      ],
    },
    {
      title: "Purchases",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Overview",
          url: "/purchases",
        },
        {
          title: "Invoices",
          url: "/purchases/invoices",
        },
        {
          title: "Deliveries",
          url: "/purchases/deliveries",
        },
        {
          title: "Orders",
          url: "/purchases/orders",
        },
        {
          title: "Quotations",
          url: "/purchases/quotations",
        },
      ],
    },
    {
      title: "Expenses",
      url: "/expenses",
      icon: HandCoins,
    },
    {
      title: "Products",
      url: "/products",
      icon: Box,
    },
    {
      title: "Inventory",
      url: "/inventory",
      icon: Warehouse,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: LineChart,
    },
    {
      title: "Cash & Bank",
      url: "/cash-and-bank",
      icon: CreditCard,
    },
    {
      title: "Contacts",
      url: "/contacts",
      icon: Contact,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
