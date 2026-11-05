import { useMutation, useQuery } from "@tanstack/react-query";
import * as strapi from "@/lib/strapi";

export const useServices = () => useQuery({ queryKey: ["services"], queryFn: strapi.getServices });

export const useServiceBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: ["service", slug],
    queryFn: () => strapi.getServiceBySlug(slug as string),
    enabled: !!slug,
  });

export const usePricingPackages = () =>
  useQuery({ queryKey: ["pricing-packages"], queryFn: strapi.getPricingPackages });

export const useAlaCarteItems = () =>
  useQuery({ queryKey: ["ala-carte-items"], queryFn: strapi.getAlaCarteItems });

export const useTestimonials = () =>
  useQuery({ queryKey: ["testimonials"], queryFn: strapi.getTestimonials });

export const useVisaApprovals = () =>
  useQuery({ queryKey: ["visa-approvals"], queryFn: strapi.getVisaApprovals });

export const useFaqs = () => useQuery({ queryKey: ["faqs"], queryFn: strapi.getFaqs });

export const useBlogPosts = () => useQuery({ queryKey: ["blog-posts"], queryFn: strapi.getBlogPosts });

export const useBlogPostBySlug = (slug: string | undefined) =>
  useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => strapi.getBlogPostBySlug(slug as string),
    enabled: !!slug,
  });

export const useSiteSetting = () => useQuery({ queryKey: ["site-setting"], queryFn: strapi.getSiteSetting });

export const useUniversities = (params: strapi.PagedParams) =>
  useQuery({ queryKey: ["universities", params], queryFn: () => strapi.getUniversities(params) });

export const useMastersPrograms = (params: strapi.PagedParams) =>
  useQuery({ queryKey: ["masters-programs", params], queryFn: () => strapi.getMastersPrograms(params) });

export const useBachelorsPrograms = (params: strapi.PagedParams) =>
  useQuery({ queryKey: ["bachelors-programs", params], queryFn: () => strapi.getBachelorsPrograms(params) });

export const useRegionalScholarships = (params: strapi.PagedParams) =>
  useQuery({
    queryKey: ["regional-scholarships", params],
    queryFn: () => strapi.getRegionalScholarships(params),
  });

export const useGlossaryTerms = () =>
  useQuery({ queryKey: ["glossary-terms"], queryFn: strapi.getGlossaryTerms });

export const useSubmitLead = () =>
  useMutation({ mutationFn: strapi.submitLead });

export const useSubmitVerifiedLead = () =>
  useMutation({ mutationFn: strapi.submitLeadAndRequestCode });

export const useVerifyLeadCode = () =>
  useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) => strapi.verifyLeadCode(email, code),
  });
