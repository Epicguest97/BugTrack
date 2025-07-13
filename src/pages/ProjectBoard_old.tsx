
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

const columns: { status: IssueStatus; title: string; color: string }[] = [
  { status: 'TO_DO', title: 'To Do', color: 'bg-status-todo' },
  { status: 'IN_PROGRESS', title: 'In Progress', color: 'bg-status-progress' },
  { status: 'IN_REVIEW', title: 'In Review', color: 'bg-status-review' },
  { status: 'DONE', title: 'Done', color: 'bg-status-done' }
];

export default function ProjectBoard() {
  const { projectId } = useParams();
  const { issues: allIssues, loading, error, createIssue, updateIssue } = useIssues();
  const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);
  const { toast } = useToast();

  // Filter issues for this project
  const issues = allIssues.filter(issue => issue.projectId === projectId);

  const handleDragStart = (e: React.DragEvent, issue: Issue) => {
    setDraggedIssue(issue);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, newStatus: IssueStatus) => {
    e.preventDefault();
    if (draggedIssue && draggedIssue.status !== newStatus) {
      try {
        await updateIssue(draggedIssue.id, { status: newStatus });
        toast({
          title: "Success",
          description: `Issue moved to ${newStatus.replace('_', ' ').toLowerCase()}`,
        });
      } catch (error) {
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
    await createIssue(projectId, data);
  };

  const handleUpdateIssue = async (id: string, data: Partial<Issue>) => {
    await updateIssue(id, data);
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
          <Button onClick={() => window.location.reload()}>
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
          onUpdate={handleUpdateIssue}
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
                  const assignee = null; // Remove mockUsers reference
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
                            #{issue.id}
                          </Badge>
                          <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
                            {issue.title}
                          </h4>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant={issue.priority === 'critical' ? 'destructive' : 'outline'}
                            className="text-xs font-mono"
                          >
                            {issue.priority.toUpperCase()}
                          </Badge>
                          
                          <div className="flex items-center gap-2">
                            {assignee && (
                              <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-bold border border-primary/20">
                                {assignee.avatar}
                              </div>
                            )}
                            <IssueDialog 
                              issue={issue} 
                              projectId={projectId!}
                              onCreate={handleCreateIssue}
                              onUpdate={handleUpdateIssue}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                {columnIssues.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-muted-foreground text-sm font-mono">
                    DROP ISSUES HERE
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
