
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Calendar, Loader2 } from 'lucide-react';
import { Issue, IssueStatus, IssuePriority } from '@/types';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface IssueDialogProps {
  issue?: Issue;
  projectId: string;
  trigger?: React.ReactNode;
  onSave?: (issue: Issue) => void;
  onUpdate?: (id: string, data: Partial<Issue>) => Promise<void>;
  onCreate?: (projectId: string, data: { title: string; description?: string; status?: IssueStatus }) => Promise<void>;
}

interface IssueFormData {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  assigneeId: string;
  startDate: string;
  dueDate: string;
}

export function IssueDialog({ issue, projectId, trigger, onSave, onUpdate, onCreate }: IssueDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<IssueFormData>({
    defaultValues: {
      title: issue?.title || '',
      description: issue?.description || '',
      status: issue?.status || 'TO_DO',
      priority: issue?.priority || 'medium',
      assigneeId: issue?.assigneeId || '',
      startDate: issue?.createdAt ? new Date(issue.createdAt).toISOString().split('T')[0] : '',
      dueDate: issue?.dueDate ? new Date(issue.dueDate).toISOString().split('T')[0] : '',
    },
  });

  const handleSubmit = async (data: IssueFormData) => {
    try {
      setLoading(true);
      
      if (issue && onUpdate) {
        // Update existing issue
        await onUpdate(issue.id, {
          title: data.title,
          description: data.description,
          status: data.status,
        });
        toast({
          title: "Success",
          description: "Issue updated successfully",
        });
      } else if (onCreate) {
        // Create new issue
        await onCreate(projectId, {
          title: data.title,
          description: data.description,
          status: data.status,
        });
        toast({
          title: "Success",
          description: "Issue created successfully",
        });
      }
      
      setOpen(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const defaultTrigger = issue ? (
    <Button variant="ghost" size="sm">
      <Edit className="h-4 w-4" />
    </Button>
  ) : (
    <Button className="font-mono">
      <Plus className="h-4 w-4 mr-2" />
      Create
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-mono">
            {issue ? 'Edit Issue' : 'Create Issue'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Issue title" className="font-mono" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Describe the issue..." className="font-mono min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TO_DO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="IN_REVIEW">In Review</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="font-mono">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="assigneeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono">Assignee</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="font-mono">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockUsers.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Timeline section */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="font-mono font-medium">Timeline</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono">Start Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" className="font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono">Due Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" className="font-mono" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="font-mono">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="font-mono">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {issue ? 'Save Changes' : 'Create Issue'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
