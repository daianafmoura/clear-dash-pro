import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const orders = [
  {
    id: "#1234",
    customer: "João Silva",
    product: "Produto A",
    date: "15/01/2024",
    amount: "R$ 1.250,00",
    status: "Concluído",
  },
  {
    id: "#1233",
    customer: "Maria Santos",
    product: "Produto B",
    date: "15/01/2024",
    amount: "R$ 890,00",
    status: "Pendente",
  },
  {
    id: "#1232",
    customer: "Pedro Costa",
    product: "Produto C",
    date: "14/01/2024",
    amount: "R$ 2.100,00",
    status: "Enviado",
  },
  {
    id: "#1231",
    customer: "Ana Oliveira",
    product: "Produto D",
    date: "14/01/2024",
    amount: "R$ 450,00",
    status: "Concluído",
  },
  {
    id: "#1230",
    customer: "Carlos Lima",
    product: "Produto E",
    date: "13/01/2024",
    amount: "R$ 3.200,00",
    status: "Concluído",
  },
];

const statusColors: Record<string, string> = {
  Concluído: "bg-green-100 text-green-800 hover:bg-green-100",
  Pendente: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Enviado: "bg-blue-100 text-blue-800 hover:bg-blue-100",
};

export function RecentOrders() {
  return (
    <div className="stat-card">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Pedidos Recentes
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell>
                <Badge className={statusColors[order.status]}>
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
