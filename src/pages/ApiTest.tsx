import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { healthCheck, issueApi, projectApi } from '@/services/api';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

interface ApiTest {
  name: string;
  status: 'pending' | 'success' | 'error';
  result?: any;
  error?: string;
}

export default function ApiTestPage() {
  const [tests, setTests] = useState<ApiTest[]>([
    { name: 'Health Check', status: 'pending' },
    { name: 'Get Projects', status: 'pending' },
    { name: 'Get Issues', status: 'pending' },
  ]);

  const runTests = async () => {
    setTests(prev => prev.map(test => ({ ...test, status: 'pending' })));

    const testFunctions = [
      {
        name: 'Health Check',
        fn: () => healthCheck(),
      },
      {
        name: 'Get Projects',
        fn: () => projectApi.getAll(),
      },
      {
        name: 'Get Issues',
        fn: () => issueApi.getAll(),
      },
    ];

    for (let i = 0; i < testFunctions.length; i++) {
      const test = testFunctions[i];
      try {
        const result = await test.fn();
        setTests(prev => prev.map((t, index) => 
          index === i 
            ? { ...t, status: 'success', result, error: undefined }
            : t
        ));
      } catch (error) {
        setTests(prev => prev.map((t, index) => 
          index === i 
            ? { 
                ...t, 
                status: 'error', 
                error: error instanceof Error ? error.message : 'Unknown error',
                result: undefined
              }
            : t
        ));
      }
    }
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 animate-pulse text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground font-mono">API CONNECTION TEST</h1>
            <p className="text-muted-foreground">Testing connection to backend API</p>
          </div>
          <Button onClick={runTests} className="font-mono">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Tests
          </Button>
        </div>

        <div className="space-y-4">
          {tests.map((test, index) => (
            <Card key={index} className={`p-4 ${getStatusColor(test.status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(test.status)}
                  <h3 className="font-mono font-medium">{test.name}</h3>
                </div>
                <Badge variant={test.status === 'success' ? 'default' : test.status === 'error' ? 'destructive' : 'secondary'}>
                  {test.status}
                </Badge>
              </div>

              {test.error && (
                <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
                  <strong>Error:</strong> {test.error}
                </div>
              )}

              {test.result && (
                <div className="mt-2">
                  <details className="cursor-pointer">
                    <summary className="text-sm font-mono text-muted-foreground hover:text-foreground">
                      View Response Data ({Array.isArray(test.result) ? `${test.result.length} items` : 'object'})
                    </summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto max-h-32">
                      {JSON.stringify(test.result, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-mono font-medium mb-2">API Configuration</h3>
          <div className="space-y-1 text-sm font-mono">
            <div><strong>Base URL:</strong> https://scrummy-bug-tracker.onrender.com/api</div>
            <div><strong>Frontend:</strong> http://localhost:8080</div>
            <div><strong>Backend:</strong> http://localhost:3001 (local)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
