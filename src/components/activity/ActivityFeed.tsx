import { mockActivities, mockUsers, mockIssues } from '@/data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-foreground">Recent activity</h3>
      <p className="text-sm text-muted-foreground">
        Stay up to date with what's happening across the project.
      </p>
      
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Today</p>
        
        {mockActivities.map((activity) => {
          const user = mockUsers.find(u => u.id === activity.userId);
          const issue = mockIssues.find(i => i.id === activity.issueId);
          
          if (!user || !issue) return null;
          
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                {user.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-foreground">{user.name}</span>
                  <span className="text-sm text-muted-foreground">{activity.action}</span>
                  {activity.field && (
                    <span className="text-sm text-muted-foreground">"{activity.field}"</span>
                  )}
                  <span className="text-sm text-muted-foreground">on</span>
                  <Badge variant="outline" className="text-xs">
                    SCRUM-{activity.issueId}: {issue.title}
                  </Badge>
                  {activity.newValue && (
                    <Badge 
                      variant={activity.newValue === 'IN REVIEW' ? 'secondary' : 'default'} 
                      className="text-xs"
                    >
                      {activity.newValue}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}