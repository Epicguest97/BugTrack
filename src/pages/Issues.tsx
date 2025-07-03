
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { FilterBar } from '@/components/FilterBar';
import { DashboardStats } from '@/components/DashboardStats';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { SavedSearches } from '@/components/SavedSearches';
import { IssuesTable } from '@/components/IssuesTable';
import { Plus, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Issue, SavedSearch } from '@/types/Issue';
import { mockIssues } from '@/data/mockIssues';

const Issues = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all',
    project: 'all',
    search: ''
  });
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([
    { 
      id: 1, 
      name: 'High Priority Bugs', 
      filters: { status: 'open', priority: 'high' } 
    },
    { 
      id: 2, 
      name: 'My Open Issues', 
      filters: { assignee: 'Alex Bennett', status: 'open' } 
    }
  ]);
  const navigate = useNavigate();

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = filters.search === '' || 
      issue.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      issue.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || issue.status === filters.status;
    const matchesPriority = filters.priority === 'all' || issue.priority === filters.priority;
    const matchesAssignee = filters.assignee === 'all' || issue.assignee === filters.assignee;
    const matchesProject = filters.project === 'all' || issue.project === filters.project;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee && matchesProject;
  });

  const handleIssueClick = (issueId: string) => {
    navigate(`/issues/${issueId}`);
  };

  const saveCurrentSearch = () => {
    const searchName = prompt('Enter name for saved search:');
    if (searchName) {
      setSavedSearches([...savedSearches, {
        id: Date.now(),
        name: searchName,
        filters: { ...filters }
      }]);
    }
  };

  const applySavedSearch = (savedFilters: SavedSearch['filters']) => {
    const newFilters = {
      status: savedFilters.status || 'all',
      priority: savedFilters.priority || 'all',
      assignee: savedFilters.assignee || 'all',
      project: savedFilters.project || 'all',
      search: savedFilters.search || ''
    };
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Issues</h1>
            <p className="text-gray-600 mt-1">Manage and track issues for your projects.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate('/issues/new')} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Issue
            </Button>
          </div>
        </div>

        <Tabs defaultValue="issues" className="space-y-6">
          <TabsList>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="issues" className="space-y-6">
            {/* Dashboard Stats */}
            <DashboardStats issues={mockIssues} />

            {/* Advanced Filters */}
            <FilterBar onFilter={handleFilter} issues={mockIssues} />

            {/* Saved Searches */}
            <SavedSearches 
              savedSearches={savedSearches}
              onSaveCurrentSearch={saveCurrentSearch}
              onApplySavedSearch={applySavedSearch}
            />

            {/* Issues Table */}
            <IssuesTable 
              issues={filteredIssues}
              onIssueClick={handleIssueClick}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard issues={mockIssues} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Issues;
