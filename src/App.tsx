import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/layout/Layout";
import { PortalAuthProvider } from "@/contexts/PortalAuthContext";
import { ProtectedRoute } from "@/portal/ProtectedRoute";
import { PortalLayout } from "@/portal/PortalLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Pricing from "./pages/Pricing";
import Approvals from "./pages/Approvals";
import Guide from "./pages/Guide";
import Stories from "./pages/Stories";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Universities from "./pages/Universities";
import Glossary from "./pages/Glossary";
import Checklist from "./pages/Checklist";
import NotFound from "./pages/NotFound";
import PortalLogin from "./pages/portal/Login";
import PortalDashboard from "./pages/portal/Dashboard";
import PortalApplications from "./pages/portal/Applications";
import PortalDocuments from "./pages/portal/Documents";
import PortalProcess from "./pages/portal/Process";
import PortalProfile from "./pages/portal/Profile";
import PortalResults from "./pages/portal/Results";
import MatchDetail from "./pages/portal/MatchDetail";
import PortalScholarships from "./pages/portal/Scholarships";
import VerifyLead from "./pages/VerifyLead";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PortalAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Student portal — its own layout, no public marketing header/footer */}
            <Route path="/portal/login" element={<PortalLogin />} />
            <Route path="/start" element={<VerifyLead />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<PortalLayout />}>
                <Route path="/portal" element={<PortalDashboard />} />
                <Route path="/portal/process" element={<PortalProcess />} />
                <Route path="/portal/applications" element={<PortalApplications />} />
                <Route path="/portal/documents" element={<PortalDocuments />} />
                <Route path="/portal/profile" element={<PortalProfile />} />
                <Route path="/portal/results" element={<PortalResults />} />
                <Route path="/portal/matches/:programType/:programId" element={<MatchDetail />} />
                <Route path="/portal/scholarships" element={<PortalScholarships />} />
              </Route>
            </Route>

            {/* Public marketing site */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/approvals" element={<Approvals />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </PortalAuthProvider>
  </QueryClientProvider>
);

export default App;
