import {
  CoinsIcon,
  LogOut,
  ReceiptPoundSterling,
  TowerControl,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/shadcn/sidebar";
import { NavLink } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/shadcn/avatar";
import { useGetUsersQuery } from "@/entities/auth/api/auth.api";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/providers/store/AppStore";

// Menu items.
const items = [
  {
    title: "Control panel",
    url: "control-panel",
    icon: TowerControl,
  },
  {
    title: "Cashbox",
    url: "cashbox",
    icon: CoinsIcon,
  },
  {
    title: "Reports",
    url: "reports",
    icon: ReceiptPoundSterling,
  },
];

export function AppSidebar() {
  const claims = useSelector((state: RootState) => state.auth.claims);
  const { data } = useGetUsersQuery(claims?.sub ?? "");
  // console.log(getUser.data);

  console.log("claims", data);

  const logOutHandler = () => {
    localStorage.removeItem("token");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupLabel className="flex flex-row font-bold text-sm items-center justify-start gap-2 mb-2">
          <img src="/src/shared/assets/logo.png" width={"10%"} alt="" />
          Cashflow app
        </SidebarGroupLabel>
        <SidebarGroup className="h-full p-0">
          <SidebarGroupLabel className="h-14 flex font-semibold  justify-start gap-2  mb-10 ">
            <Avatar className="w-13 h-13">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{data?.name?.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="text-[1rem]">{data?.name}</h1>
              <p>{data?.email}</p>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className="h-full p-0">
            <SidebarMenu className="flex justify-between flex-col h-full">
              <SidebarGroup className="flex h-full">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarGroup>
              <SidebarGroup className="mb-0">
                <SidebarMenuItem className="flex justify-self-end">
                  <SidebarMenuButton asChild>
                    <NavLink to="/login" onClick={logOutHandler}>
                      <LogOut />
                      <span>Logout</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarGroup>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
