
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { SavedSearch } from '@/types/Issue';

interface SavedSearchesProps {
  savedSearches: SavedSearch[];
  onSaveCurrentSearch: () => void;
  onApplySavedSearch: (filters: SavedSearch['filters']) => void;
}

export const SavedSearches = ({ 
  savedSearches, 
  onSaveCurrentSearch, 
  onApplySavedSearch 
}: SavedSearchesProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Saved Searches</CardTitle>
          <Button onClick={onSaveCurrentSearch} variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Current Search
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {savedSearches.map((search) => (
            <Button
              key={search.id}
              variant="outline"
              size="sm"
              onClick={() => onApplySavedSearch(search.filters)}
              className="text-sm"
            >
              {search.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
