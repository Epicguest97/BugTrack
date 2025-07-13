import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface PriorityChartProps {
  data: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export function PriorityChart({ data }: PriorityChartProps) {
  const chartData = [
    { name: 'Low', value: data.low, fill: 'hsl(var(--chart-1))' },
    { name: 'Medium', value: data.medium, fill: 'hsl(var(--chart-2))' },
    { name: 'High', value: data.high, fill: 'hsl(var(--chart-3))' },
    { name: 'Critical', value: data.critical, fill: 'hsl(var(--chart-4))' },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-xs fill-muted-foreground"
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
                    <p className="text-sm font-medium">{`${label}: ${payload[0].value}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}