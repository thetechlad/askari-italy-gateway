import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyStudent,
  getMyApplications,
  getMyDocuments,
  getMyProcessSteps,
  uploadDocument,
  requestDocumentHelp,
  getMyChecklistItems,
  replaceChecklistItem,
  requestChecklistHelp,
  updateMyProfile,
  uploadResume,
  runMatch,
  getMyMatchRuns,
  createApplication,
  moveApplication,
  type ProfileUpdate,
  type ApplicationStatus,
} from "@/lib/portal";
import { usePortalAuth } from "@/contexts/PortalAuthContext";

export const useMyStudent = () => {
  const { isAuthenticated } = usePortalAuth();
  return useQuery({ queryKey: ["portal-student"], queryFn: getMyStudent, enabled: isAuthenticated });
};

export const useMyApplications = () => {
  const { isAuthenticated } = usePortalAuth();
  return useQuery({ queryKey: ["portal-applications"], queryFn: getMyApplications, enabled: isAuthenticated });
};

export const useMyDocuments = () => {
  const { isAuthenticated } = usePortalAuth();
  return useQuery({ queryKey: ["portal-documents"], queryFn: getMyDocuments, enabled: isAuthenticated });
};

export const useMyProcessSteps = () => {
  const { isAuthenticated } = usePortalAuth();
  return useQuery({ queryKey: ["portal-process-steps"], queryFn: getMyProcessSteps, enabled: isAuthenticated });
};

export const useUploadDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, type }: { file: File; type: string }) => uploadDocument(file, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-documents"] });
    },
  });
};

export const useRequestDocumentHelp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ type, note }: { type: string; note: string }) => requestDocumentHelp(type, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-documents"] });
    },
  });
};

export const useMyChecklistItems = () => {
  const { isAuthenticated } = usePortalAuth();
  return useQuery({ queryKey: ["portal-checklist-items"], queryFn: getMyChecklistItems, enabled: isAuthenticated });
};

export const useReplaceChecklistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, file }: { itemId: number; file: File }) => replaceChecklistItem(itemId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-checklist-items"] });
    },
  });
};

export const useRequestChecklistHelp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ itemId, note }: { itemId: number; note: string }) => requestChecklistHelp(itemId, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-checklist-items"] });
    },
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (update: ProfileUpdate) => updateMyProfile(update),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-student"] });
    },
  });
};

export const useRunMatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: runMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-student"] }); // credit balance changed
      queryClient.invalidateQueries({ queryKey: ["portal-match-runs"] });
    },
  });
};

export const useMyMatchRuns = () => {
  const { isAuthenticated } = usePortalAuth();
  return useQuery({ queryKey: ["portal-match-runs"], queryFn: getMyMatchRuns, enabled: isAuthenticated });
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-student"] });
    },
  });
};

export const useCreateApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { universityId: number; mastersProgramId?: number; bachelorsProgramId?: number }) =>
      createApplication(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-applications"] });
    },
  });
};

export const useMoveApplication = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, applicationStatus }: { id: number; applicationStatus: ApplicationStatus }) =>
      moveApplication(id, applicationStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portal-applications"] });
    },
  });
};
