import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Package, Palette, Save, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

const Configuracoes = () => {
  // Company Data State
  const [companyData, setCompanyData] = useState({
    name: "Minha Empresa LTDA",
    cnpj: "12.345.678/0001-90",
    phone: "(11) 99999-9999",
    email: "contato@minhaempresa.com",
    address: "Rua Exemplo, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    website: "www.minhaempresa.com",
  });

  // Stock Parameters State
  const [stockParams, setStockParams] = useState({
    minStockAlert: "10",
    criticalStockAlert: "5",
    autoReorderEnabled: false,
    reorderQuantity: "50",
    defaultSupplierLeadTime: "7",
    stockCountFrequency: "mensal",
  });

  // Appearance State
  const [appearance, setAppearance] = useState({
    theme: "light",
    compactMode: false,
    showAnimations: true,
    sidebarCollapsed: false,
  });

  // Notifications State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    lowStockAlerts: true,
    orderUpdates: true,
    systemUpdates: false,
    dailyReports: true,
  });

  // Security State
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30",
    passwordExpiration: "90",
  });

  const handleSaveCompany = () => {
    toast.success("Dados da empresa salvos com sucesso!");
  };

  const handleSaveStock = () => {
    toast.success("Parâmetros de estoque salvos com sucesso!");
  };

  const handleSaveAppearance = () => {
    if (appearance.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    toast.success("Preferências de aparência salvas com sucesso!");
  };

  const handleSaveNotifications = () => {
    toast.success("Configurações de notificações salvas com sucesso!");
  };

  const handleSaveSecurity = () => {
    toast.success("Configurações de segurança salvas com sucesso!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Personalize as configurações do sistema conforme suas necessidades.
          </p>
        </div>

        <Tabs defaultValue="empresa" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
            <TabsTrigger value="empresa" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Empresa</span>
            </TabsTrigger>
            <TabsTrigger value="estoque" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Estoque</span>
            </TabsTrigger>
            <TabsTrigger value="aparencia" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Aparência</span>
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notificações</span>
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Segurança</span>
            </TabsTrigger>
          </TabsList>

          {/* Dados da Empresa */}
          <TabsContent value="empresa">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Dados da Empresa
                </CardTitle>
                <CardDescription>
                  Informações básicas da sua empresa exibidas em documentos e relatórios.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Razão Social</Label>
                    <Input
                      id="companyName"
                      value={companyData.name}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={companyData.cnpj}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, cnpj: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={companyData.phone}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyData.email}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={companyData.website}
                      onChange={(e) =>
                        setCompanyData({ ...companyData, website: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="mb-4 font-medium">Endereço</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Logradouro</Label>
                      <Input
                        id="address"
                        value={companyData.address}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={companyData.city}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, city: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={companyData.state}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, state: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input
                        id="zipCode"
                        value={companyData.zipCode}
                        onChange={(e) =>
                          setCompanyData({ ...companyData, zipCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveCompany} className="gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Dados da Empresa
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Parâmetros de Estoque */}
          <TabsContent value="estoque">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Parâmetros de Estoque
                </CardTitle>
                <CardDescription>
                  Configure os parâmetros de alerta e reposição automática de estoque.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="minStock">Alerta de Estoque Mínimo</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={stockParams.minStockAlert}
                      onChange={(e) =>
                        setStockParams({ ...stockParams, minStockAlert: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Quantidade mínima antes de gerar alerta
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="criticalStock">Alerta de Estoque Crítico</Label>
                    <Input
                      id="criticalStock"
                      type="number"
                      value={stockParams.criticalStockAlert}
                      onChange={(e) =>
                        setStockParams({ ...stockParams, criticalStockAlert: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Quantidade crítica para alerta urgente
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leadTime">Tempo de Entrega do Fornecedor (dias)</Label>
                    <Input
                      id="leadTime"
                      type="number"
                      value={stockParams.defaultSupplierLeadTime}
                      onChange={(e) =>
                        setStockParams({ ...stockParams, defaultSupplierLeadTime: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countFrequency">Frequência de Contagem</Label>
                    <Select
                      value={stockParams.stockCountFrequency}
                      onValueChange={(value) =>
                        setStockParams({ ...stockParams, stockCountFrequency: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="quinzenal">Quinzenal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="trimestral">Trimestral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="mb-4 font-medium">Reposição Automática</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label>Ativar Reposição Automática</Label>
                        <p className="text-sm text-muted-foreground">
                          Gerar pedidos de compra automaticamente quando o estoque atingir o mínimo
                        </p>
                      </div>
                      <Switch
                        checked={stockParams.autoReorderEnabled}
                        onCheckedChange={(checked) =>
                          setStockParams({ ...stockParams, autoReorderEnabled: checked })
                        }
                      />
                    </div>
                    {stockParams.autoReorderEnabled && (
                      <div className="space-y-2">
                        <Label htmlFor="reorderQty">Quantidade Padrão de Reposição</Label>
                        <Input
                          id="reorderQty"
                          type="number"
                          value={stockParams.reorderQuantity}
                          onChange={(e) =>
                            setStockParams({ ...stockParams, reorderQuantity: e.target.value })
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveStock} className="gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Parâmetros de Estoque
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Aparência */}
          <TabsContent value="aparencia">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Aparência
                </CardTitle>
                <CardDescription>
                  Personalize a aparência do sistema conforme sua preferência.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tema</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          appearance.theme === "light"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setAppearance({ ...appearance, theme: "light" })}
                      >
                        <div className="mb-3 flex h-20 items-center justify-center rounded-md bg-background border">
                          <div className="space-y-1">
                            <div className="h-2 w-16 rounded bg-foreground/20" />
                            <div className="h-2 w-12 rounded bg-foreground/10" />
                          </div>
                        </div>
                        <p className="text-center text-sm font-medium">Modo Claro</p>
                      </div>
                      <div
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          appearance.theme === "dark"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setAppearance({ ...appearance, theme: "dark" })}
                      >
                        <div className="mb-3 flex h-20 items-center justify-center rounded-md bg-slate-900 border">
                          <div className="space-y-1">
                            <div className="h-2 w-16 rounded bg-white/20" />
                            <div className="h-2 w-12 rounded bg-white/10" />
                          </div>
                        </div>
                        <p className="text-center text-sm font-medium">Modo Escuro</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="mb-4 font-medium">Preferências de Interface</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Modo Compacto</Label>
                          <p className="text-sm text-muted-foreground">
                            Reduzir espaçamentos para mostrar mais conteúdo
                          </p>
                        </div>
                        <Switch
                          checked={appearance.compactMode}
                          onCheckedChange={(checked) =>
                            setAppearance({ ...appearance, compactMode: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Animações</Label>
                          <p className="text-sm text-muted-foreground">
                            Ativar animações e transições na interface
                          </p>
                        </div>
                        <Switch
                          checked={appearance.showAnimations}
                          onCheckedChange={(checked) =>
                            setAppearance({ ...appearance, showAnimations: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <Label>Menu Lateral Recolhido</Label>
                          <p className="text-sm text-muted-foreground">
                            Iniciar com o menu lateral recolhido por padrão
                          </p>
                        </div>
                        <Switch
                          checked={appearance.sidebarCollapsed}
                          onCheckedChange={(checked) =>
                            setAppearance({ ...appearance, sidebarCollapsed: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveAppearance} className="gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notificações
                </CardTitle>
                <CardDescription>
                  Configure quais notificações você deseja receber.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações importantes por e-mail
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, emailNotifications: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Alertas de Estoque Baixo</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar quando produtos atingirem estoque mínimo
                      </p>
                    </div>
                    <Switch
                      checked={notifications.lowStockAlerts}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, lowStockAlerts: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Atualizações de Pedidos</Label>
                      <p className="text-sm text-muted-foreground">
                        Notificar sobre mudanças de status nos pedidos
                      </p>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, orderUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Atualizações do Sistema</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber avisos sobre novas funcionalidades e manutenções
                      </p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, systemUpdates: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Relatórios Diários</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber resumo diário de vendas e estoque por e-mail
                      </p>
                    </div>
                    <Switch
                      checked={notifications.dailyReports}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, dailyReports: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveNotifications} className="gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Notificações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segurança */}
          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Segurança
                </CardTitle>
                <CardDescription>
                  Configure as opções de segurança da sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label>Autenticação em Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Adicionar uma camada extra de segurança ao login
                      </p>
                    </div>
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSecurity({ ...security, twoFactorEnabled: checked })
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Tempo de Sessão (minutos)</Label>
                      <Select
                        value={security.sessionTimeout}
                        onValueChange={(value) =>
                          setSecurity({ ...security, sessionTimeout: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="120">2 horas</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Tempo de inatividade antes do logout automático
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passwordExp">Expiração de Senha (dias)</Label>
                      <Select
                        value={security.passwordExpiration}
                        onValueChange={(value) =>
                          setSecurity({ ...security, passwordExpiration: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 dias</SelectItem>
                          <SelectItem value="60">60 dias</SelectItem>
                          <SelectItem value="90">90 dias</SelectItem>
                          <SelectItem value="never">Nunca expirar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="mb-4 font-medium">Ações de Segurança</h4>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline">
                        Alterar Senha
                      </Button>
                      <Button variant="outline">
                        Ver Histórico de Acessos
                      </Button>
                      <Button variant="destructive" className="gap-2">
                        Encerrar Todas as Sessões
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveSecurity} className="gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Configurações de Segurança
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Configuracoes;
