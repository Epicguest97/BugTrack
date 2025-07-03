
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Issues from "./pages/Issues";
import IssueDetail from "./pages/IssueDetail";
import CreateIssue from "./pages/CreateIssue";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import PullRequests from "./pages/PullRequests";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="/issues/new" element={<CreateIssue />} />
          <Route path="/issues/:id" element={<IssueDetail />} />
          <Route path="/pull-requests" element={<PullRequests />} />
          <Route path="/integrations" element={<Integrations />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
