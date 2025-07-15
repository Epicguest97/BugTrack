
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IssueStatus, Issue } from '@/types';
import { IssueDialog } from '@/components/issues/IssueDialog';
import { Plus, Loader2 } from 'lucide-react';
import { useIssues } from '@/hooks/useApi';
import { useToast } from '@/hooks/use-toast';
import { mockUsers } from '@/data/mockData';

const columns: { status: IssueStatus; title: string; color: string }[] = [
  { status: 'TO_DO', title: 'To Do', color: 'bg-status-todo' },
  { status: 'IN_PROGRESS', title: 'In Progress', color: 'bg-status-progress' },
  { status: 'IN_REVIEW', title: 'In Review', color: 'bg-status-review' },
  { status: 'DONE', title: 'Done', color: 'bg-status-done' }
];

export default function ProjectBoard() {
  const { projectId } = useParams();
  const { issues: allIssues, loading, error, createIssue, updateIssue, refetch } = useIssues();
  const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);
  const { toast } = useToast();

  // useEffect to ensure fresh data when projectId changes
  useEffect(() => {
    console.log('ProjectBoard: Project changed or component mounted, refetching data...');
    if (projectId) {
      refetch();
    }
  }, [projectId, refetch]);

  // useEffect to log current issues state
  useEffect(() => {
    console.log('ProjectBoard - All issues updated:', allIssues);
    console.log('ProjectBoard - Current projectId:', projectId);
  }, [allIssues, projectId]);

  // Filter issues for this project
  const issues = allIssues.filter(issue => issue.projectId === projectId);
  console.log('ProjectBoard - Filtered issues for project:', issues);

  const handleDragStart = (e: React.DragEvent, issue: Issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.effectAllowed = 'move';
    console.log('ProjectBoard: Starting drag for issue:', issue.id, 'current status:', issue.status);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, newStatus: IssueStatus) => {
    e.preventDefault();
    if (draggedIssue && draggedIssue.status !== newStatus) {
      try {
        console.log('ProjectBoard: Making PUT request to update issue status:', draggedIssue.id, 'from', draggedIssue.status, 'to', newStatus);
        
        // Make PUT request to update issue status
        const updatedIssue = await updateIssue(draggedIssue.id, { status: newStatus });
        console.log('ProjectBoard: Issue status updated successfully:', updatedIssue);
        
        toast({
          title: "Success",
          description: `Issue moved to ${newStatus.replace('_', ' ').toLowerCase()}`,
        });
        
        // Refetch to ensure we have the latest data from backend
        setTimeout(() => {
          console.log('ProjectBoard: Refetching data after status update...');
          refetch();
        }, 500);
        
      } catch (error) {
        console.error('ProjectBoard: Error updating issue status:', error);
        toast({
          title: "Error",
          description: "Failed to update issue status",
          variant: "destructive",
        });
      }
    }
    setDraggedIssue(null);
  };

  const handleCreateIssue = async (projectId: string, data: { title: string; description?: string; status?: IssueStatus }) => {
    try {
      console.log('ProjectBoard: Creating issue for project via POST API:', projectId, 'with data:', data);
      const newIssue = await createIssue(projectId, data);
      console.log('ProjectBoard: Issue created successfully:', newIssue);
      
      toast({
        title: "Success", 
        description: "Issue created successfully",
      });
      
      // Refetch to ensure we have the latest data
      setTimeout(() => {
        console.log('ProjectBoard: Refetching data after issue creation...');
        refetch();
      }, 500);
      
    } catch (error) {
      console.error('ProjectBoard: Error creating issue:', error);
      toast({
        title: "Error",
        description: "Failed to create issue",
        variant: "destructive",
      });
    }
  };

  const handleUpdateIssue = async (id: string, data: Partial<Issue>) => {
    try {
      console.log('ProjectBoard: Updating issue via PUT API:', id, 'with data:', data);
      await updateIssue(id, data);
      toast({
        title: "Success",
        description: "Issue updated successfully", 
      });
      
      // Refetch to ensure we have the latest data
      setTimeout(() => {
        console.log('ProjectBoard: Refetching data after issue update...');
        refetch();
      }, 500);
      
    } catch (error) {
      console.error('ProjectBoard: Error updating issue:', error);
      toast({
        title: "Error",
        description: "Failed to update issue",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading issues...</span>
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground font-mono">BOARD</h2>
        <IssueDialog 
          projectId={projectId!} 
          onCreate={handleCreateIssue}
          trigger={
            <Button className="font-mono">
              <Plus className="h-4 w-4 mr-2" />
              CREATE ISSUE
            </Button>
          }
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {columns.map((column) => {
          const columnIssues = issues.filter(issue => issue.status === column.status);
          
          return (
            <div 
              key={column.status} 
              className="flex flex-col min-h-[600px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.status)}
            >
              <div className="flex items-center gap-2 mb-4 p-3 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
                <div className={`w-3 h-3 rounded-full ${column.color}`} />
                <h3 className="font-mono font-medium text-foreground uppercase tracking-wide text-sm">{column.title}</h3>
                <Badge variant="secondary" className="text-xs font-mono bg-muted text-muted-foreground">
                  {columnIssues.length}
                </Badge>
              </div>
              
              <div className="space-y-3 flex-1 min-h-[500px] p-2 bg-muted/10 rounded-lg border border-dashed border-muted-foreground/10">
                {columnIssues.map((issue) => {
                  const assignee = mockUsers.find(user => user.id === issue.assigneeId);
                  const isDragging = draggedIssue?.id === issue.id;
                  
                  return (
                    <Card 
                      key={issue.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, issue)}
                      className={`p-3 transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-lg hover:scale-[1.02] border border-border/50 bg-card/95 backdrop-blur-sm ${
                        isDragging ? 'opacity-50 rotate-2 scale-95' : ''
                      }`}
                    >
                      <div className="space-y-3">
                        <div>
                          <Badge variant="outline" className="text-xs mb-2 font-mono bg-muted/50 border-primary/20">
                            #{issue.id.slice(-6)}
                          </Badge>
                          <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                            {issue.title}
                          </h4>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={issue.priority === 'critical' ? 'destructive' : 
                                   issue.priority === 'high' ? 'default' : 'secondary'} 
                            className="text-xs font-mono"
                          >
                            {issue.priority || 'medium'}
                          </Badge>
                          
                          {assignee && (
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-mono">
                                {assignee.avatar}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="font-mono">
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </span>
                          <IssueDialog 
                            issue={issue} 
                            projectId={projectId!} 
                            onUpdate={handleUpdateIssue}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })}
                
                {/* Empty state for columns */}
                {columnIssues.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <div className="text-center">
                      <div className="w-8 h-8 rounded-full bg-muted/50 mx-auto mb-2 flex items-center justify-center">
                        <Plus className="h-4 w-4" />
                      </div>
                      <p className="text-xs font-mono">No issues</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
