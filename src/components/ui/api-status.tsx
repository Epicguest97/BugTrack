import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { healthCheck } from '@/services/api';
import { RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

type ConnectionStatus = 'connecting' | 'connected' | 'error';

export function ApiStatus() {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkConnection = async () => {
    try {
      setStatus('connecting');
      setError(null);
      await healthCheck();
      setStatus('connected');
      setLastChecked(new Date());
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = () => {
    switch (status) {
      case 'connecting':
        return <Clock className="h-3 w-3 animate-pulse" />;
      case 'connected':
        return <CheckCircle className="h-3 w-3" />;
      case 'error':
        return <XCircle className="h-3 w-3" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connecting':
        return 'bg-yellow-500';
      case 'connected':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connecting':
        return 'Connecting...';
      case 'connected':
        return 'API Connected';
      case 'error':
        return 'API Error';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="gap-2">
        {getStatusIcon()}
        <span className="text-xs font-mono">{getStatusText()}</span>
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
      </Badge>
      
      {lastChecked && (
        <span className="text-xs text-muted-foreground">
          {lastChecked.toLocaleTimeString()}
        </span>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={checkConnection}
        disabled={status === 'connecting'}
        className="h-6 w-6 p-0"
      >
        <RefreshCw className={`h-3 w-3 ${status === 'connecting' ? 'animate-spin' : ''}`} />
      </Button>
      
      {error && (
        <div className="text-xs text-red-500 max-w-xs truncate" title={error}>
          {error}
        </div>
      )}
    </div>
  );
}
