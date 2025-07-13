
import { useParams } from 'react-router-dom';
import { useProjects } from '@/hooks/useApi';
import { ProjectStats } from '@/components/stats/ProjectStats';
import { StatusPieChart } from '@/components/charts/StatusPieChart';
import { PriorityChart } from '@/components/charts/PriorityChart';
import { WorkTypesChart } from '@/components/charts/WorkTypesChart';
import { TeamWorkloadChart } from '@/components/charts/TeamWorkloadChart';
import { EpicProgressChart } from '@/components/charts/EpicProgressChart';
import { ActivityFeed } from '@/components/activity/ActivityFeed';
import { Card } from '@/components/ui/card';
import { ProjectStats as ProjectStatsType, StatusDistribution } from '@/types';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function ProjectSummary() {
  const { projectId } = useParams();
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!projectId) return;
      
      try {
        setLoading(true);
        setError(null);
        const API_BASE_URL = process.env.NODE_ENV === 'production' 
          ? 'https://scrummy-bug-tracker.onrender.com/api'
          : 'http://localhost:3000/api';
        const data = await fetch(`${API_BASE_URL}/projects/${projectId}/statistics`);
        if (!data.ok) throw new Error('Failed to fetch statistics');
        const stats = await data.json();
        setStatistics(stats);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
        console.error('Error fetching project statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [projectId]);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading project statistics...</span>
      </div>
    );
  }

  if (error || !statistics) {
    return (
      <div className="p-6">
        <div className="text-center text-red-500">
          {error || 'Failed to load project statistics'}
        </div>
      </div>
    );
  }

  const { project, stats, statusDistribution, priorityDistribution, typeDistribution, teamWorkload, epicProgress } = statistics;

  return (
    <div className="p-6 space-y-6">
      {/* Stats Row */}
      <ProjectStats stats={stats} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Overview */}
        <Card className="lg:col-span-2 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground">Status overview</h3>
            <p className="text-sm text-muted-foreground">
              Get a snapshot of the status of your work items.{' '}
              <a href="#" className="text-primary hover:underline">
                View all work items
              </a>
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <StatusPieChart data={statusDistribution} />
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-1"></div>
                <span className="text-sm text-foreground">To Do: {statusDistribution.todo}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-2"></div>
                <span className="text-sm text-foreground">In Progress: {statusDistribution.progress}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-3"></div>
                <span className="text-sm text-foreground">In Review: {statusDistribution.review}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-chart-4"></div>
                <span className="text-sm text-foreground">Done: {statusDistribution.done}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="p-6">
          <ActivityFeed />
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Breakdown */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground">Priority breakdown</h3>
            <p className="text-sm text-muted-foreground">
              Get a holistic view of how work is being prioritized.{' '}
              <a href="#" className="text-primary hover:underline">
                See what your team's been focusing on
              </a>
            </p>
          </div>
          <PriorityChart data={priorityDistribution} />
        </Card>

        {/* Types of Work */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground">Types of work</h3>
            <p className="text-sm text-muted-foreground">
              Get a breakdown of work items by their types.{' '}
              <a href="#" className="text-primary hover:underline">
                View all items
              </a>
            </p>
          </div>
          <WorkTypesChart data={typeDistribution} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Workload */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground">Team workload</h3>
            <p className="text-sm text-muted-foreground">
              Monitor the capacity of your team.{' '}
              <a href="#" className="text-primary hover:underline">
                Reassign work items to get the right balance
              </a>
            </p>
          </div>
          <TeamWorkloadChart data={teamWorkload} />
        </Card>

        {/* Epic Progress */}
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground">Epic progress</h3>
            <p className="text-sm text-muted-foreground">
              See how your epics are progressing at a glance.{' '}
              <a href="#" className="text-primary hover:underline">
                View all epics
              </a>
            </p>
          </div>
          <EpicProgressChart data={epicProgress} />
        </Card>
      </div>
    </div>
  );
}
