import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface StockMovementModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "entrada" | "saida";
  onSubmit: (data: MovementData) => void;
}

export interface MovementData {
  productId: string;
  quantity: number;
  reason: string;
  notes: string;
}

const products = [
  { id: "PRD001", name: "Produto Premium A" },
  { id: "PRD002", name: "Produto Standard B" },
  { id: "PRD003", name: "Produto Basic C" },
  { id: "PRD004", name: "Produto Economy D" },
  { id: "PRD005", name: "Produto Especial E" },
];

const entryReasons = ["Compra", "Devolução", "Ajuste de inventário", "Transferência"];
const exitReasons = ["Venda", "Perda", "Devolução ao fornecedor", "Ajuste de inventário"];

export function StockMovementModal({ open, onOpenChange, type, onSubmit }: StockMovementModalProps) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const reasons = type === "entrada" ? entryReasons : exitReasons;

  const handleSubmit = () => {
    onSubmit({
      productId,
      quantity: parseInt(quantity) || 0,
      reason,
      notes,
    });
    setProductId("");
    setQuantity("");
    setReason("");
    setNotes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {type === "entrada" ? (
              <>
                <ArrowDownCircle className="h-5 w-5 text-green-600" />
                <span>Registrar Entrada</span>
              </>
            ) : (
              <>
                <ArrowUpCircle className="h-5 w-5 text-red-600" />
                <span>Registrar Saída</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="product">Produto</Label>
            <Select value={productId} onValueChange={setProductId}>
              <SelectTrigger id="product">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.id} - {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Selecione o motivo" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              placeholder="Observações adicionais..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className={type === "entrada" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
          >
            Confirmar {type === "entrada" ? "Entrada" : "Saída"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
