import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { mockIssues, mockUsers } from '@/data/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, ChevronLeft, ChevronRight, Info } from 'lucide-react';

type ViewMode = 'Days' | 'Weeks' | 'Months' | 'Quarters';

export default function ProjectTimeline() {
  const { projectId } = useParams();
  const [viewMode, setViewMode] = useState<ViewMode>('Weeks');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const issues = mockIssues.filter(issue => issue.projectId === projectId);

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
    const startDate = issue.createdAt;
    const endDate = issue.dueDate || new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000);
    
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
      case 'done': return 'bg-green-500';
      case 'review': return 'bg-blue-500';
      case 'progress': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

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
          <h3 className="font-mono font-semibold text-foreground mb-4 uppercase tracking-wide">Sprints</h3>
          
          <div className="space-y-2">
            {issues.map((issue) => {
              const assignee = mockUsers.find(user => user.id === issue.assigneeId);
              
              return (
                <div key={issue.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <Checkbox />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs font-mono">
                        #{issue.id}
                      </Badge>
                      <span className="text-sm font-medium truncate">
                        {issue.title}
                      </span>
                      {issue.status === 'DONE' && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 font-mono">
                          DONE
                        </Badge>
                      )}
                    </div>
                    {issue.status !== 'TO_DO' && (
                      <div className="w-full bg-muted rounded-full h-1">
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

          <Button
            variant="ghost"
            className="w-full justify-start gap-2 mt-4 text-muted-foreground font-mono"
          >
            <Plus className="h-4 w-4" />
            Create Epic
          </Button>
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
                    title={`${issue.title} - ${issue.status}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
