
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { StatusDistribution } from '@/types';

interface StatusPieChartProps {
  data: StatusDistribution;
}

const COLORS = {
  todo: 'hsl(var(--chart-1))',
  progress: 'hsl(var(--chart-2))',
  review: 'hsl(var(--chart-3))',
  done: 'hsl(var(--chart-4))'
};

const STATUS_LABELS = {
  todo: 'To Do',
  progress: 'In Progress',
  review: 'In Review',
  done: 'Done'
};

export function StatusPieChart({ data }: StatusPieChartProps) {
  const chartData = Object.entries(data).map(([status, count]) => ({
    name: STATUS_LABELS[status as keyof typeof STATUS_LABELS],
    value: count,
    color: COLORS[status as keyof typeof COLORS]
  }));

  const total = Object.values(data).reduce((sum, count) => sum + count, 0);

  return (
    <div className="w-full h-80 flex flex-col items-center">
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
              animationBegin={0}
              animationDuration={0}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center mt-2">
        <div className="text-3xl font-bold text-foreground font-mono">
          {total}
        </div>
        <div className="text-sm text-muted-foreground font-mono uppercase tracking-wide">
          Total work items
        </div>
      </div>
    </div>
  );
}
