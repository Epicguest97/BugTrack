
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mockUsers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, MoreHorizontal, MessageSquare, ChevronRight, Bug, Settings, Plus, Loader2 } from 'lucide-react';
import { IssueDialog } from '@/components/issues/IssueDialog';
import { Issue, IssueStatus } from '@/types';
import { useIssues } from '@/hooks/useApi';
import { useToast } from '@/hooks/use-toast';

const issueTypeIcons = {
  bug: Bug,
  task: Settings,
  story: ChevronRight,
};

const statusColors = {
  TO_DO: 'bg-slate-100 text-slate-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  IN_REVIEW: 'bg-yellow-100 text-yellow-800',
  DONE: 'bg-green-100 text-green-800'
};

const statusLabels = {
  TO_DO: 'TO DO',
  IN_PROGRESS: 'IN PROGRESS',
  IN_REVIEW: 'IN REVIEW',
  DONE: 'DONE'
};

export default function ProjectBacklog() {
  const { projectId } = useParams();
  const { issues: allIssues, loading, error, createIssue, updateIssue, refetch } = useIssues();
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Additional useEffect to ensure fresh data when projectId changes
  useEffect(() => {
    console.log('ProjectBacklog: Project changed or component mounted, ensuring fresh data...');
    refetch();
  }, [projectId, refetch]);

  console.log('ProjectBacklog - All issues:', allIssues);
  console.log('ProjectBacklog - Current projectId:', projectId);

  // Filter issues for this project
  const issues = allIssues.filter(issue => issue.projectId === projectId);
  console.log('ProjectBacklog - Filtered issues for project:', issues);

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (issue.description && issue.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateIssue = async (projectId: string, data: { title: string; description?: string; status?: IssueStatus }) => {
    try {
      console.log('ProjectBacklog: Creating issue for project via API:', projectId, 'with data:', data);
      await createIssue(projectId, data);
      toast({
        title: "Success",
        description: "Issue created successfully",
      });
      // Refetch to ensure we have the latest data
      await refetch();
    } catch (error) {
      console.error('ProjectBacklog: Error creating issue:', error);
      toast({
        title: "Error",
        description: "Failed to create issue",
        variant: "destructive",
      });
    }
  };

  const handleUpdateIssue = async (id: string, data: Partial<Issue>) => {
    try {
      console.log('ProjectBacklog: Updating issue via API:', id, 'with data:', data);
      await updateIssue(id, data);
      toast({
        title: "Success",
        description: "Issue updated successfully",
      });
    } catch (error) {
      console.error('ProjectBacklog: Error updating issue:', error);
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
    <div className="p-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search list"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 font-mono"
            />
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <Avatar className="h-6 w-6 bg-green-600">
              <AvatarFallback className="text-xs text-white font-bold">M</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 bg-orange-600 -ml-2">
              <AvatarFallback className="text-xs text-white font-bold">J</AvatarFallback>
            </Avatar>
          </div>
          
          <Button variant="outline" size="sm" className="font-mono">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="font-mono">
            Group
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-mono font-semibold text-foreground">Type</TableHead>
              <TableHead className="font-mono font-semibold text-foreground">Key</TableHead>
              <TableHead className="font-mono font-semibold text-foreground">Summary</TableHead>
              <TableHead className="font-mono font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-mono font-semibold text-foreground">Comments</TableHead>
              <TableHead className="font-mono font-semibold text-foreground">Assignee</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIssues.map((issue) => {
              const assignee = mockUsers.find(user => user.id === issue.assigneeId);
              const IssueIcon = issueTypeIcons.bug; // Default to bug for now
              
              return (
                <TableRow key={issue.id} className="hover:bg-muted/30">
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    <IssueIcon className="h-4 w-4 text-purple-600" />
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm font-medium">
                      BTS-{issue.id.slice(-6)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-medium text-foreground cursor-pointer hover:text-primary">
                      {issue.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={`font-mono text-xs font-semibold ${statusColors[issue.status]}`}
                    >
                      {statusLabels[issue.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Add comment
                    </Button>
                  </TableCell>
                  <TableCell>
                    {assignee && (
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {assignee.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{assignee.name}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <IssueDialog 
                      issue={issue} 
                      projectId={projectId!}
                      onUpdate={handleUpdateIssue}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Create button */}
      <div className="mt-4">
        <IssueDialog 
          projectId={projectId!} 
          onCreate={handleCreateIssue}
          trigger={
            <Button variant="ghost" className="text-muted-foreground font-mono">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          }
        />
      </div>
    </div>
  );
}
