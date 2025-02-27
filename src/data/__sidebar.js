import {
  House,
  Workflow,
  Settings,
  CircleHelp,
  MessageSquare,
} from "lucide-react";

export const sidebarOptions = [
  {
    index: 1,
    title: "Home",
    key: "home",
    icon: House,
    link: "/dashboard",
  },
  {
    index: 2,
    title: "Integrations",
    key: "integrations",
    icon: Workflow,
    link: "/dashboard/integrations",
  },
  {
    index: 3,
    title: "Analytics",
    key: "analytics",
    icon: Workflow,
    link: "/dashboard/analytics",
  },
  {
    index: 4,
    title: "Chats",
    key: "chats",
    icon: MessageSquare,
    link: "/dashboard/chats",
  },
  {
    index: 5,
    title: "Settings",
    key: "settings",
    icon: Settings,
    link: "/dashboard/settings",
  },
  {
    index: 6,
    title: "Help and Support",
    key: "help",
    icon: CircleHelp,
    link: "/dashboard/help",
  },
];
