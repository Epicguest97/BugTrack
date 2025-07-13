
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import ProjectLayout from "./pages/ProjectLayout";
import ProjectSummary from "./pages/ProjectSummary";
import ProjectBacklog from "./pages/ProjectBacklog";
import ProjectBoard from "./pages/ProjectBoard";
import ProjectTimeline from "./pages/ProjectTimeline";
import Settings from "./pages/Settings";
import ApiTest from "./pages/ApiTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex h-screen bg-background overflow-hidden">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<AllProjects />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/api-test" element={<ApiTest />} />
                  <Route path="/project/:projectId" element={<ProjectLayout />}>
                    <Route index element={<ProjectSummary />} />
                    <Route path="backlog" element={<ProjectBacklog />} />
                    <Route path="board" element={<ProjectBoard />} />
                    <Route path="timeline" element={<ProjectTimeline />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
