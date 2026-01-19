import { Package, User, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface KanbanCardProps {
  order: {
    id: string;
    customer: string;
    address: string;
    items: number;
    date: string;
    priority?: "high" | "normal" | "low";
  };
}

const priorityColors = {
  high: "border-l-red-500",
  normal: "border-l-primary",
  low: "border-l-muted-foreground",
};

export function KanbanCard({ order }: KanbanCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-l-4 bg-card p-4 shadow-sm transition-all hover:shadow-md cursor-grab active:cursor-grabbing",
        priorityColors[order.priority || "normal"]
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-primary">{order.id}</span>
        {order.priority === "high" && (
          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
            Urgente
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-foreground">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{order.customer}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="truncate">{order.address}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Package className="h-4 w-4" />
            <span>{order.items} {order.items === 1 ? "item" : "itens"}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{order.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
