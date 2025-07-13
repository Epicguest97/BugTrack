
import { User } from 'lucide-react';

interface TeamWorkloadChartProps {
  data: Record<string, number>;
}

export function TeamWorkloadChart({ data }: TeamWorkloadChartProps) {
  const total = Object.values(data).reduce((sum, count) => sum + count, 0);
  
  const workloadData = Object.entries(data).map(([name, count]) => ({
    name,
    avatar: name.charAt(0).toUpperCase(),
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex justify-between font-medium">
          <span>Assignee</span>
          <span>Work distribution</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {workloadData.map((user) => (
          <div key={user.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                {user.avatar}
              </div>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{user.percentage}%</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${user.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
        
        {workloadData.length === 0 && (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            No team workload data available
          </div>
        )}
      </div>
    </div>
  );
}
