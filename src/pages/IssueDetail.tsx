
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileImage, Code } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
}

interface IssueDetailData {
  id: string;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  assignee: string;
  reporter: string;
  labels: string[];
  milestone: string;
  created: string;
  updated: string;
  comments: Comment[];
}

// Mock data for the issue
const mockIssue: IssueDetailData = {
  id: '123',
  title: 'Bug: Application crashes on startup',
  description: 'The application unexpectedly terminates upon launch, preventing users from accessing its features. This issue has been observed across multiple operating systems and hardware configurations. Further investigation is required to identify the root cause and implement a fix.',
  status: 'Open',
  priority: 'High',
  assignee: 'Sarah Lee',
  reporter: 'Alex Chen',
  labels: ['Bug', 'Critical'],
  milestone: 'Version 1.0',
  created: '2023-08-15',
  updated: '2023-08-16',
  comments: [
    {
      id: '1',
      author: 'Alex Chen',
      avatar: '/placeholder.svg',
      timestamp: '2023-08-15',
      content: 'Initial report of the application crash. Please investigate and resolve as soon as possible.'
    },
    {
      id: '2',
      author: 'Sarah Lee',
      avatar: '/placeholder.svg',
      timestamp: '2023-08-16',
      content: "I've reproduced the crash on my machine. It seems to be related to a memory allocation error. I'll look into it further."
    }
  ]
};

const getStatusColor = (status: string) => {
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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'High':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getLabelColor = (label: string) => {
  const colors = {
    'Bug': 'bg-red-100 text-red-800',
    'Critical': 'bg-red-100 text-red-800',
    'Feature': 'bg-blue-100 text-blue-800',
    'Enhancement': 'bg-green-100 text-green-800',
  };
  return colors[label] || 'bg-gray-100 text-gray-800';
};

const IssueDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [newComment, setNewComment] = useState('');
  
  const issue = mockIssue;

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-4">
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Project Alpha</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 hover:text-blue-800 cursor-pointer">Issues</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Issue #{issue.id}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Issue Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{issue.title}</h1>
              <p className="text-gray-600">
                Reported by <span className="text-blue-600 hover:text-blue-800 cursor-pointer">{issue.reporter}</span> on {issue.created}
              </p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                {['Overview', 'Comments', 'History'].map((tab) => (
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

            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{issue.description}</p>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
                  
                  {/* Hardcoded Comments */}
                  <div className="space-y-4 mb-6">
                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AC</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Alex Chen</span>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <div className="text-gray-700 bg-gray-50 rounded-lg p-3">
                          I've been able to reproduce this issue consistently. It seems to happen when the user tries to load more than 100 items at once.
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>SL</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">Sarah Lee</span>
                          <span className="text-sm text-gray-500">1 hour ago</span>
                        </div>
                        <div className="text-gray-700 bg-gray-50 rounded-lg p-3">
                          Thanks for the report. I'm looking into this now. Could you provide the browser console logs when this happens?
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>DJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">David Johnson</span>
                          <span className="text-sm text-gray-500">30 minutes ago</span>
                        </div>
                        <div className="text-gray-700 bg-gray-50 rounded-lg p-3">
                          I found a potential fix for this. The issue is in the pagination logic. I'll submit a PR shortly.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add Comment */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <Textarea
                          placeholder="Add a comment"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <FileImage className="h-4 w-4 mr-2" />
                              Attach files
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Code className="h-4 w-4 mr-2" />
                              Insert code
                            </Button>
                          </div>
                          <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                            Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Comments' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
                
                {/* Comments List */}
                <div className="space-y-4">
                  {issue.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">{comment.timestamp}</span>
                        </div>
                        <div className="text-gray-700">{comment.content}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        placeholder="Add a comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px]"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <FileImage className="h-4 w-4 mr-2" />
                            Attach files
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Code className="h-4 w-4 mr-2" />
                            Insert code
                          </Button>
                        </div>
                        <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'History' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">History</h2>
                <p className="text-gray-600">Issue history will be displayed here.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant="secondary" className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Priority</span>
                  <Badge variant="secondary" className={getPriorityColor(issue.priority)}>
                    {issue.priority}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Assignee</span>
                  <span className="text-sm text-gray-900">{issue.assignee}</span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-500">Labels</span>
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
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Milestone</span>
                  <span className="text-sm text-gray-900">{issue.milestone}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Created</span>
                  <span className="text-sm text-gray-900">{issue.created}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Updated</span>
                  <span className="text-sm text-gray-900">{issue.updated}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="sm">
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IssueDetail;
