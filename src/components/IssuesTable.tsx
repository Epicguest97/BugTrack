
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Issue } from '@/types/Issue';
import { getStatusBadgeColor, getPriorityBadgeColor } from '@/utils/badgeColors';

interface IssuesTableProps {
  issues: Issue[];
  onIssueClick: (issueId: string) => void;
}

export const IssuesTable = ({ issues, onIssueClick }: IssuesTableProps) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">No issues found</div>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="font-semibold text-gray-900">Issue</TableHead>
            <TableHead className="font-semibold text-gray-900">Project</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
            <TableHead className="font-semibold text-gray-900">Priority</TableHead>
            <TableHead className="font-semibold text-gray-900">Assignee</TableHead>
            <TableHead className="font-semibold text-gray-900">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id} className="hover:bg-gray-50">
              <TableCell>
                <div 
                  className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                  onClick={() => onIssueClick(issue.id)}
                >
                  {issue.type}: {issue.title}
                </div>
                <div className="text-sm text-gray-500 mt-1">{issue.description}</div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600">{issue.project}</span>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusBadgeColor(issue.status)}>
                  {issue.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className={getPriorityBadgeColor(issue.priority)}>
                  {issue.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="text-blue-600 hover:text-blue-800 cursor-pointer">
                  {issue.assignee}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-gray-500 text-sm">{issue.created}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
