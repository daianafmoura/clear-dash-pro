import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Seg", vendas: 4200 },
  { name: "Ter", vendas: 3800 },
  { name: "Qua", vendas: 5100 },
  { name: "Qui", vendas: 4600 },
  { name: "Sex", vendas: 6200 },
  { name: "Sáb", vendas: 7500 },
  { name: "Dom", vendas: 3200 },
];

export function SalesBarChart() {
  return (
    <div className="stat-card">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Vendas por Período
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Vendas"]}
            />
            <Bar
              dataKey="vendas"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
