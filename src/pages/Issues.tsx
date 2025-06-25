import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Issue {
  id: string;
  title: string;
  type: 'Bug' | 'Feature' | 'Task';
  status: 'Open' | 'In Progress' | 'Closed';
  assignee: string;
  labels: string[];
  created: string;
  priority?: 'High Priority' | 'Low Priority';
}

const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Login failure',
    type: 'Bug',
    status: 'Open',
    assignee: 'Alex Bennett',
    labels: ['Bug', 'High Priority'],
    created: '2024-01-15',
  },
  {
    id: '2',
    title: 'Implement user roles',
    type: 'Feature',
    status: 'In Progress',
    assignee: 'Sophia Clark',
    labels: ['Feature', 'Enhancement'],
    created: '2024-01-10',
  },
  {
    id: '3',
    title: 'Update documentation',
    type: 'Task',
    status: 'Open',
    assignee: 'Ethan Davis',
    labels: ['Documentation'],
    created: '2024-01-05',
  },
  {
    id: '4',
    title: 'Incorrect data display',
    type: 'Bug',
    status: 'Closed',
    assignee: 'Olivia Foster',
    labels: ['Bug', 'Low Priority'],
    created: '2023-12-20',
  },
  {
    id: '5',
    title: 'Add new API endpoint',
    type: 'Feature',
    status: 'Open',
    assignee: 'Liam Green',
    labels: ['Feature', 'API'],
    created: '2023-12-15',
  },
  {
    id: '6',
    title: 'Refactor code',
    type: 'Task',
    status: 'In Progress',
    assignee: 'Ava Harris',
    labels: ['Refactoring'],
    created: '2023-12-10',
  },
  {
    id: '7',
    title: 'Performance issue',
    type: 'Bug',
    status: 'Open',
    assignee: 'Noah Ingram',
    labels: ['Bug', 'Performance'],
    created: '2023-12-05',
  },
  {
    id: '8',
    title: 'Improve UI/UX',
    type: 'Feature',
    status: 'Closed',
    assignee: 'Isabella Jones',
    labels: ['Feature', 'UI/UX'],
    created: '2023-11-20',
  },
  {
    id: '9',
    title: 'Write unit tests',
    type: 'Task',
    status: 'Open',
    assignee: 'Jackson King',
    labels: ['Testing'],
    created: '2023-11-15',
  },
  {
    id: '10',
    title: 'Security vulnerability',
    type: 'Bug',
    status: 'In Progress',
    assignee: 'Mia Lewis',
    labels: ['Bug', 'Security'],
    created: '2023-11-10',
  },
];

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Open':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Closed':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getLabelColor = (label: string) => {
  const colors = {
    'Bug': 'bg-red-100 text-red-800',
    'Feature': 'bg-blue-100 text-blue-800',
    'Enhancement': 'bg-green-100 text-green-800',
    'Documentation': 'bg-yellow-100 text-yellow-800',
    'API': 'bg-indigo-100 text-indigo-800',
    'Refactoring': 'bg-orange-100 text-orange-800',
    'Performance': 'bg-red-100 text-red-800',
    'UI/UX': 'bg-pink-100 text-pink-800',
    'Testing': 'bg-teal-100 text-teal-800',
    'Security': 'bg-red-100 text-red-800',
    'High Priority': 'bg-red-100 text-red-800',
    'Low Priority': 'bg-gray-100 text-gray-800',
  };
  return colors[label] || 'bg-gray-100 text-gray-800';
};

const Issues = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Open');
  const navigate = useNavigate();

  const filteredIssues = mockIssues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.assignee.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'Open' ? issue.status !== 'Closed' : 
                      activeTab === 'Closed' ? issue.status === 'Closed' :
                      issue.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleIssueClick = (issueId: string) => {
    navigate(`/issues/${issueId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Issues</h1>
          <p className="text-gray-600 mt-1">Manage and track issues for your project.</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search issues"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* Status Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['Open', 'In Progress', 'Closed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="font-semibold text-gray-900">Issue</TableHead>
                <TableHead className="font-semibold text-gray-900">Status</TableHead>
                <TableHead className="font-semibold text-gray-900">Assignee</TableHead>
                <TableHead className="font-semibold text-gray-900">Labels</TableHead>
                <TableHead className="font-semibold text-gray-900">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow key={issue.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div 
                      className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                      onClick={() => handleIssueClick(issue.id)}
                    >
                      {issue.type}: {issue.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusBadgeColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      {issue.assignee}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {issue.labels.map((label, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`text-xs ${getLabelColor(label)}`}
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-500 text-sm">{issue.created}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No issues found</div>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Issues;
