
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { Project } from '@/types';

interface ProjectDialogProps {
  project?: Project;
  trigger?: React.ReactNode;
  onSave?: (project: Partial<Project>) => void;
}

interface ProjectFormData {
  name: string;
  description: string;
  key: string;
}

export function ProjectDialog({ project, trigger, onSave }: ProjectDialogProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<ProjectFormData>({
    defaultValues: {
      name: project?.name || '',
      description: project?.description || '',
      key: project?.key || '',
    },
  });

  const handleSubmit = (data: ProjectFormData) => {
    const projectData: Partial<Project> = {
      ...data,
      ...(project ? { id: project.id } : { 
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
      }),
    };
    
    onSave?.(projectData);
    setOpen(false);
    form.reset();
  };

  const defaultTrigger = (
    <Button className="font-mono">
      <Plus className="h-4 w-4 mr-2" />
      Create Project
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">
            {project ? 'Edit Project' : 'Create Project'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project name" className="font-mono" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-mono">Key</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="PROJECT" className="font-mono uppercase" />
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
                    <Textarea {...field} placeholder="Describe the project..." className="font-mono min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="font-mono">
                Cancel
              </Button>
              <Button type="submit" className="font-mono">
                {project ? 'Save Changes' : 'Create Project'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
