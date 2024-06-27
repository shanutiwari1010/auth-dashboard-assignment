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
    link: "/integrations",
  },
  {
    index: 3,
    title: "Analytics",
    key: "analytics",
    icon: Workflow,
    link: "/analytics",
  },
  {
    index: 4,
    title: "Chats",
    key: "chats",
    icon: MessageSquare,
    link: "/chats",
  },
  {
    index: 5,
    title: "Settings",
    key: "settings",
    icon: Settings,
    link: "/settings",
  },
  {
    index: 6,
    title: "Help and Support",
    key: "help",
    icon: CircleHelp,
    link: "/help",
  },
];
