import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Warehouse, ShoppingCart, Truck, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
const menuItems = [{
  icon: LayoutDashboard,
  label: "Dashboard",
  path: "/"
}, {
  icon: Package,
  label: "Produtos",
  path: "/produtos"
}, {
  icon: Warehouse,
  label: "Estoque",
  path: "/estoque"
}, {
  icon: ShoppingCart,
  label: "Vendas/Pedidos",
  path: "/vendas"
}, {
  icon: Truck,
  label: "Distribuição",
  path: "/distribuicao"
}, {
  icon: BarChart3,
  label: "Relatórios",
  path: "/relatorios"
}, {
  icon: Settings,
  label: "Configurações",
  path: "/configuracoes"
}];
export function Sidebar({
  collapsed,
  onToggle
}: SidebarProps) {
  const location = useLocation();
  return <aside className={cn("fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300", collapsed ? "w-16" : "w-64")}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {!collapsed && <span className="text-xl font-bold text-sidebar-foreground">
              do Frei 
            </span>}
          <Button variant="ghost" size="icon" onClick={onToggle} className="text-sidebar-foreground hover:bg-sidebar-accent">
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {menuItems.map(item => {
          const isActive = location.pathname === item.path;
          return <NavLink key={item.path} to={item.path} className={cn("nav-item", isActive ? "nav-item-active" : "nav-item-inactive", collapsed && "justify-center px-2")} title={collapsed ? item.label : undefined}>
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>;
        })}
        </nav>

        {/* Footer */}
        {!collapsed && <div className="border-t border-sidebar-border p-4">
            <p className="text-xs text-sidebar-foreground/50">
              © 2024 AdminPro
            </p>
          </div>}
      </div>
    </aside>;
}