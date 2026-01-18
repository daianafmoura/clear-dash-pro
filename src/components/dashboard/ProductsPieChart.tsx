import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Produto A", value: 35, color: "hsl(217, 91%, 50%)" },
  { name: "Produto B", value: 25, color: "hsl(142, 76%, 36%)" },
  { name: "Produto C", value: 20, color: "hsl(38, 92%, 50%)" },
  { name: "Produto D", value: 12, color: "hsl(280, 65%, 60%)" },
  { name: "Outros", value: 8, color: "hsl(215, 16%, 70%)" },
];

export function ProductsPieChart() {
  return (
    <div className="stat-card">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Produtos Mais Vendidos
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`${value}%`, "Participação"]}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
