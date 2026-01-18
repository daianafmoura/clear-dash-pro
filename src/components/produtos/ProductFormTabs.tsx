import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Save, X, Upload, ImageIcon, Trash2 } from "lucide-react";

interface ProductFormTabsProps {
  onSave: () => void;
  onCancel: () => void;
  initialData?: ProductData;
}

interface ProductData {
  name: string;
  sku: string;
  category: string;
  status: boolean;
  description: string;
  images: string[];
  stockQuantity: number;
  minStock: number;
  weight: number;
  width: number;
  height: number;
  depth: number;
  shippingType: string;
}

const defaultProductData: ProductData = {
  name: "",
  sku: "",
  category: "",
  status: true,
  description: "",
  images: [],
  stockQuantity: 0,
  minStock: 5,
  weight: 0,
  width: 0,
  height: 0,
  depth: 0,
  shippingType: "normal",
};

const categories = ["Eletrônicos", "Acessórios", "Casa", "Moda", "Esportes"];
const shippingTypes = ["Normal", "Expresso", "Econômico", "Frete Grátis"];

export function ProductFormTabs({ onSave, onCancel, initialData }: ProductFormTabsProps) {
  const [formData, setFormData] = useState<ProductData>(initialData || defaultProductData);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (field: keyof ProductData, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs defaultValue="geral" className="flex-1">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="descricao">Descrição</TabsTrigger>
          <TabsTrigger value="imagens">Imagens</TabsTrigger>
          <TabsTrigger value="estoque">Estoque</TabsTrigger>
          <TabsTrigger value="distribuicao">Distribuição</TabsTrigger>
        </TabsList>

        {/* Aba Geral */}
        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    placeholder="Digite o nome do produto"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    placeholder="Ex: PRD001"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <div className="flex items-center gap-3 pt-2">
                    <Switch
                      id="status"
                      checked={formData.status}
                      onCheckedChange={(checked) => handleInputChange("status", checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      {formData.status ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Descrição */}
        <TabsContent value="descricao" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Produto</Label>
                <Textarea
                  id="description"
                  placeholder="Digite a descrição detalhada do produto..."
                  className="min-h-[300px] resize-none"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Descreva as características, benefícios e especificações do produto.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Imagens */}
        <TabsContent value="imagens" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Label>Imagens do Produto</Label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm font-medium text-foreground">
                      Clique para fazer upload
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG ou WEBP até 5MB
                    </p>
                  </label>
                </div>

                {/* Preview Grid */}
                {previewImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {previewImages.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-muted-foreground">
                    <ImageIcon className="w-6 h-6 mr-2" />
                    <span className="text-sm">Nenhuma imagem adicionada</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Estoque */}
        <TabsContent value="estoque" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="stockQuantity">Quantidade em Estoque</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange("stockQuantity", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Estoque Mínimo</Label>
                  <Input
                    id="minStock"
                    type="number"
                    min="0"
                    placeholder="5"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange("minStock", parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Alerta quando o estoque atingir este valor.
                  </p>
                </div>
              </div>

              {formData.stockQuantity <= formData.minStock && formData.stockQuantity > 0 && (
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-warning font-medium">
                    ⚠️ Estoque abaixo do mínimo recomendado
                  </p>
                </div>
              )}

              {formData.stockQuantity === 0 && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">
                    🚫 Produto sem estoque
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Distribuição */}
        <TabsContent value="distribuicao" className="space-y-6">
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <Label className="mb-3 block">Dimensões (cm)</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="width" className="text-xs text-muted-foreground">Largura</Label>
                    <Input
                      id="width"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={formData.width}
                      onChange={(e) => handleInputChange("width", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-xs text-muted-foreground">Altura</Label>
                    <Input
                      id="height"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="depth" className="text-xs text-muted-foreground">Profundidade</Label>
                    <Input
                      id="depth"
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="0"
                      value={formData.depth}
                      onChange={(e) => handleInputChange("depth", parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shippingType">Tipo de Envio</Label>
                <Select
                  value={formData.shippingType}
                  onValueChange={(value) => handleInputChange("shippingType", value)}
                >
                  <SelectTrigger id="shippingType">
                    <SelectValue placeholder="Selecione o tipo de envio" />
                  </SelectTrigger>
                  <SelectContent>
                    {shippingTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fixed Footer with Buttons */}
      <div className="sticky bottom-0 left-0 right-0 bg-background border-t border-border p-4 mt-6 -mx-6 -mb-6">
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={onSave}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Produto
          </Button>
        </div>
      </div>
    </div>
  );
}
