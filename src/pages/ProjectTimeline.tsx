
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useIssues } from '@/hooks/useApi';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'Days' | 'Weeks' | 'Months' | 'Quarters';

export default function ProjectTimeline() {
  const { projectId } = useParams();
  const { issues: allIssues, loading, error, refetch } = useIssues();
  const [viewMode, setViewMode] = useState<ViewMode>('Weeks');
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();

  // Additional useEffect to ensure fresh data when projectId changes
  useEffect(() => {
    console.log('ProjectTimeline: Project changed or component mounted, ensuring fresh data...');
    refetch();
  }, [projectId, refetch]);

  console.log('ProjectTimeline - All issues:', allIssues);
  console.log('ProjectTimeline - Current projectId:', projectId);

  // Filter issues for this project
  const issues = allIssues.filter(issue => issue.projectId === projectId);
  console.log('ProjectTimeline - Filtered issues for project:', issues);

  // Generate calendar dates based on view mode
  const generateCalendarDates = () => {
    const dates = [];
    const startDate = new Date(currentDate);
    
    let daysToShow = 60;
    let daysBefore = 30;
    
    switch (viewMode) {
      case 'Days':
        daysToShow = 14;
        daysBefore = 7;
        break;
      case 'Weeks':
        daysToShow = 60;
        daysBefore = 30;
        break;
      case 'Months':
        daysToShow = 180;
        daysBefore = 90;
        break;
      case 'Quarters':
        daysToShow = 365;
        daysBefore = 180;
        break;
    }
    
    startDate.setDate(startDate.getDate() - daysBefore);
    
    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const calendarDates = generateCalendarDates();
  
  // Group dates by month/week based on view mode
  const getTimeGroups = () => {
    if (viewMode === 'Days') {
      return calendarDates.reduce((groups, date) => {
        const dayKey = date.toDateString();
        if (!groups[dayKey]) {
          groups[dayKey] = [];
        }
        groups[dayKey].push(date);
        return groups;
      }, {} as Record<string, Date[]>);
    } else {
      return calendarDates.reduce((groups, date) => {
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
        if (!groups[monthKey]) {
          groups[monthKey] = [];
        }
        groups[monthKey].push(date);
        return groups;
      }, {} as Record<string, Date[]>);
    }
  };

  const timeGroups = getTimeGroups();

  // Navigation functions
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'Days':
        newDate.setDate(newDate.getDate() - 7);
        break;
      case 'Weeks':
        newDate.setDate(newDate.getDate() - 14);
        break;
      case 'Months':
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case 'Quarters':
        newDate.setMonth(newDate.getMonth() - 3);
        break;
    }
    setCurrentDate(newDate);
  };

  const navigateNext = () => {
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case 'Days':
        newDate.setDate(newDate.getDate() + 7);
        break;
      case 'Weeks':
        newDate.setDate(newDate.getDate() + 14);
        break;
      case 'Months':
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 'Quarters':
        newDate.setMonth(newDate.getMonth() + 3);
        break;
    }
    setCurrentDate(newDate);
  };

  const getIssueBarStyle = (issue: any) => {
    // Use createdAt as start date and calculate end date based on status
    const startDate = new Date(issue.createdAt);
    let endDate: Date;
    
    if (issue.dueDate) {
      endDate = new Date(issue.dueDate);
    } else {
      // Calculate estimated end date based on status
      const daysSinceCreated = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      let estimatedDuration = 14; // default 2 weeks
      
      switch (issue.status) {
        case 'DONE':
          estimatedDuration = Math.max(daysSinceCreated, 1);
          break;
        case 'IN_REVIEW':
          estimatedDuration = Math.max(daysSinceCreated + 2, 7);
          break;
        case 'IN_PROGRESS':
          estimatedDuration = Math.max(daysSinceCreated + 5, 10);
          break;
        case 'TO_DO':
          estimatedDuration = 14;
          break;
      }
      
      endDate = new Date(startDate.getTime() + estimatedDuration * 24 * 60 * 60 * 1000);
    }
    
    const timelineStart = calendarDates[0];
    const timelineEnd = calendarDates[calendarDates.length - 1];
    
    const startPosition = Math.max(0, (startDate.getTime() - timelineStart.getTime()) / (timelineEnd.getTime() - timelineStart.getTime()) * 100);
    const endPosition = Math.min(100, (endDate.getTime() - timelineStart.getTime()) / (timelineEnd.getTime() - timelineStart.getTime()) * 100);
    
    return {
      left: `${startPosition}%`,
      width: `${Math.max(2, endPosition - startPosition)}%`,
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE': return 'bg-green-500';
      case 'IN_REVIEW': return 'bg-blue-500';
      case 'IN_PROGRESS': return 'bg-yellow-500';
      case 'TO_DO': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading timeline...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {error}</p>
          <Button onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-mono font-bold text-foreground">TIMELINE</h2>
        <div className="flex items-center gap-2">
          {/* Time scale selector */}
          <div className="flex items-center gap-1 mr-4">
            {(['Days', 'Weeks', 'Months', 'Quarters'] as ViewMode[]).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode(mode)}
                className="font-mono text-xs"
              >
                {mode}
              </Button>
            ))}
          </div>
          
          {/* Navigation controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={navigatePrevious}
            className="p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={navigateNext}
            className="p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Left sidebar */}
        <div className="w-80 pr-4 border-r border-border">
          <h3 className="font-mono font-semibold text-foreground mb-4 uppercase tracking-wide">Issues</h3>
          
          <div className="space-y-2">
            {issues.map((issue) => {
              const assignee = mockUsers.find(user => user.id === issue.assigneeId);
              
              return (
                <div key={issue.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Checkbox />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs font-mono">
                        #{issue.id.slice(-6)}
                      </Badge>
                      <span className="text-sm font-medium truncate">
                        {issue.title}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs font-mono ${
                          issue.status === 'DONE' ? 'bg-green-100 text-green-800' :
                          issue.status === 'IN_REVIEW' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'IN_PROGRESS' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {issue.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      Started: {new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                    {issue.status !== 'TO_DO' && (
                      <div className="w-full bg-muted rounded-full h-1 mt-1">
                        <div 
                          className={`h-1 rounded-full ${getStatusColor(issue.status)}`}
                          style={{ 
                            width: issue.status === 'DONE' ? '100%' : 
                                   issue.status === 'IN_REVIEW' ? '80%' : '50%'
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {assignee && (
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono">
                      {assignee.avatar}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {issues.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="font-mono text-sm">No issues found for this project</p>
            </div>
          )}
        </div>

        {/* Timeline view */}
        <div className="flex-1 pl-4">
          {/* Calendar header */}
          <div className="mb-4">
            <div className="flex border-b border-border">
              {Object.entries(timeGroups).map(([timeKey, dates]) => {
                const firstDate = dates[0];
                let displayText = '';
                
                if (viewMode === 'Days') {
                  displayText = firstDate.toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  });
                } else {
                  const monthName = firstDate.toLocaleDateString('en-US', { month: 'long' });
                  const year = firstDate.getFullYear();
                  displayText = `${monthName} ${year}`;
                }
                
                return (
                  <div 
                    key={timeKey} 
                    className="flex-1 text-center py-2 bg-muted/30 border-r border-border last:border-r-0"
                  >
                    <span className="font-mono font-medium text-sm text-muted-foreground">
                      {displayText}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {viewMode !== 'Days' && (
              <div className="flex">
                {calendarDates.map((date, index) => (
                  <div 
                    key={index}
                    className="flex-1 text-center py-1 text-xs text-muted-foreground border-r border-border/50 last:border-r-0 font-mono"
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Issue timeline bars */}
          <div className="relative space-y-3">
            {issues.map((issue) => {
              const style = getIssueBarStyle(issue);
              
              return (
                <div key={issue.id} className="relative h-8">
                  <div
                    className={`absolute h-6 rounded ${getStatusColor(issue.status)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                    style={style}
                    title={`${issue.title} - ${issue.status} (Started: ${new Date(issue.createdAt).toLocaleDateString()})`}
                  />
                </div>
              );
            })}
            
            {issues.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <p className="font-mono text-sm">No issues to display in timeline</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
