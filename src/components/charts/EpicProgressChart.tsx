
import { Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface EpicProgressChartProps {
  data: Record<string, { total: number; completed: number }>;
}

export function EpicProgressChart({ data }: EpicProgressChartProps) {
  const chartData = Object.entries(data).map(([epic, { completed, total }]) => ({
    epic,
    completed,
    total,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Done</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>In progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span>To do</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={item.epic} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-foreground">{item.epic}</span>
              </div>
              <span className="text-muted-foreground">
                {item.completed}/{item.total} ({item.progress}%)
              </span>
            </div>
            <Progress 
              value={item.progress} 
              className="h-2"
            />
          </div>
        ))}
        {chartData.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            No epic data available
          </div>
        )}
      </div>
    </div>
  );
}
