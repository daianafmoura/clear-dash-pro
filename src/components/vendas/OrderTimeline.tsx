import { Check, Clock, CreditCard, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  status: string;
  label: string;
  date: string;
  completed: boolean;
  current: boolean;
}

interface OrderTimelineProps {
  currentStatus: "Pendente" | "Pago" | "Enviado" | "Concluído";
}

const statusSteps = [
  { status: "Pendente", label: "Pedido Recebido", icon: Clock },
  { status: "Pago", label: "Pagamento Confirmado", icon: CreditCard },
  { status: "Enviado", label: "Enviado", icon: Truck },
  { status: "Concluído", label: "Entregue", icon: Package },
];

const statusOrder = ["Pendente", "Pago", "Enviado", "Concluído"];

export function OrderTimeline({ currentStatus }: OrderTimelineProps) {
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.status} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-colors",
                  isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  !isCompleted && !isCurrent && "border-muted-foreground/30 bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Icon className="h-6 w-6" />
                )}
              </div>
              <span
                className={cn(
                  "mt-2 text-sm font-medium text-center max-w-[100px]",
                  (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress line */}
      <div className="absolute top-6 left-6 right-6 h-0.5 bg-muted-foreground/30 -z-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-500"
          style={{
            width: `${(currentIndex / (statusSteps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
