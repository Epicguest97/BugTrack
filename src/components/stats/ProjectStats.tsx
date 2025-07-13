import { CheckCircle, Edit, Plus, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ProjectStats as ProjectStatsType } from '@/types';

interface ProjectStatsProps {
  stats: ProjectStatsType;
}

export function ProjectStats({ stats }: ProjectStatsProps) {
  const statItems = [
    {
      label: 'completed',
      value: stats.completed,
      subtitle: 'in the last 7 days',
      icon: CheckCircle,
      color: 'text-status-done'
    },
    {
      label: 'updated',
      value: stats.updated,
      subtitle: 'in the last 7 days',
      icon: Edit,
      color: 'text-status-review'
    },
    {
      label: 'created',
      value: stats.created,
      subtitle: 'in the last 7 days',
      icon: Plus,
      color: 'text-foreground'
    },
    {
      label: 'due soon',
      value: stats.dueSoon,
      subtitle: 'in the next 7 days',
      icon: Clock,
      color: 'text-muted-foreground'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item) => (
        <Card key={item.label} className="p-4 bg-muted/30 border border-border/50 hover:border-primary/20 transition-all duration-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <item.icon className={`h-5 w-5 ${item.color}`} />
              {item.value > 0 && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-mono font-bold text-foreground">
                  {item.value.toString().padStart(2, '0')}
                </span>
                <span className="text-sm font-mono font-medium text-foreground uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{item.subtitle}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}