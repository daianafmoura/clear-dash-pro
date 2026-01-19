import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Printer, Mail } from "lucide-react";
import { OrderTimeline } from "@/components/vendas/OrderTimeline";

// Mock order data
const orderData = {
  id: "PED-001",
  date: "15/01/2024",
  status: "Enviado" as const,
  customer: {
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
  },
  address: {
    street: "Rua das Flores, 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  },
  payment: {
    method: "Cartão de Crédito",
    installments: "3x de R$ 166,33",
    cardLast4: "1234",
  },
  products: [
    { id: 1, name: "Produto Premium A", sku: "SKU001", quantity: 2, unitPrice: 149.90, total: 299.80 },
    { id: 2, name: "Produto Standard B", sku: "SKU002", quantity: 1, unitPrice: 89.90, total: 89.90 },
    { id: 3, name: "Acessório C", sku: "SKU003", quantity: 3, unitPrice: 29.90, total: 89.70 },
  ],
  subtotal: 479.40,
  shipping: 19.60,
  total: 499.00,
};

const statusColors: Record<string, string> = {
  "Pendente": "bg-amber-100 text-amber-800 border-amber-200",
  "Pago": "bg-blue-100 text-blue-800 border-blue-200",
  "Enviado": "bg-purple-100 text-purple-800 border-purple-200",
  "Concluído": "bg-emerald-100 text-emerald-800 border-emerald-200",
};

const PedidoDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/vendas")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">
                  Pedido {orderData.id}
                </h1>
                <Badge className={statusColors[orderData.status]}>
                  {orderData.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Realizado em {orderData.date}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Enviar Email
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div className="stat-card p-6">
          <h2 className="mb-6 text-lg font-semibold text-foreground">
            Status do Pedido
          </h2>
          <OrderTimeline currentStatus={orderData.status} />
        </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Customer Info */}
          <div className="stat-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Informações do Cliente
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Nome:</span>
                <p className="font-medium text-foreground">{orderData.customer.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium text-foreground">{orderData.customer.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Telefone:</span>
                <p className="font-medium text-foreground">{orderData.customer.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">CPF:</span>
                <p className="font-medium text-foreground">{orderData.customer.cpf}</p>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="stat-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Endereço de Entrega
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Logradouro:</span>
                <p className="font-medium text-foreground">{orderData.address.street}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Bairro:</span>
                <p className="font-medium text-foreground">{orderData.address.neighborhood}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Cidade/Estado:</span>
                <p className="font-medium text-foreground">
                  {orderData.address.city} - {orderData.address.state}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">CEP:</span>
                <p className="font-medium text-foreground">{orderData.address.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="stat-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Forma de Pagamento
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted-foreground">Método:</span>
                <p className="font-medium text-foreground">{orderData.payment.method}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Parcelamento:</span>
                <p className="font-medium text-foreground">{orderData.payment.installments}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Cartão:</span>
                <p className="font-medium text-foreground">**** **** **** {orderData.payment.cardLast4}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="stat-card p-6">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Produtos do Pedido
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Qtd</TableHead>
                <TableHead className="text-right">Preço Unit.</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell className="text-center">{product.quantity}</TableCell>
                  <TableCell className="text-right">
                    R$ {product.unitPrice.toFixed(2).replace(".", ",")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {product.total.toFixed(2).replace(".", ",")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Order Summary */}
          <div className="mt-6 flex justify-end">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">
                  R$ {orderData.subtotal.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete:</span>
                <span className="font-medium">
                  R$ {orderData.shipping.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-primary">
                  R$ {orderData.total.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PedidoDetalhes;
