
import { CheckSquare, Zap, GitBranch, Bug, Star } from 'lucide-react';

interface WorkTypesChartProps {
  data: {
    task: number;
    bug: number;
    feature: number;
    story: number;
    epic: number;
  };
}

export function WorkTypesChart({ data }: WorkTypesChartProps) {
  const total = data.task + data.bug + data.feature + data.story + data.epic;
  
  const types = [
    {
      name: 'Task',
      icon: CheckSquare,
      count: data.task,
      percentage: total > 0 ? Math.round((data.task / total) * 100) : 0,
      color: 'text-blue-600'
    },
    {
      name: 'Bug',
      icon: Bug,
      count: data.bug,
      percentage: total > 0 ? Math.round((data.bug / total) * 100) : 0,
      color: 'text-red-600'
    },
    {
      name: 'Feature',
      icon: Star,
      count: data.feature,
      percentage: total > 0 ? Math.round((data.feature / total) * 100) : 0,
      color: 'text-green-600'
    },
    {
      name: 'Story',
      icon: GitBranch,
      count: data.story,
      percentage: total > 0 ? Math.round((data.story / total) * 100) : 0,
      color: 'text-yellow-600'
    },
    {
      name: 'Epic',
      icon: Zap,
      count: data.epic,
      percentage: total > 0 ? Math.round((data.epic / total) * 100) : 0,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex justify-between font-medium">
          <span>Type</span>
          <span>Distribution</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {types.map((type) => (
          <div key={type.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <type.icon className={`h-4 w-4 ${type.color}`} />
              <span className="text-sm font-medium">{type.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{type.percentage}%</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${type.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
