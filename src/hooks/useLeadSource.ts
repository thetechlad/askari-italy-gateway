import { useSearchParams } from "react-router-dom";

/**
 * Resolves the value to send as a lead's `source` field: the page's own
 * default (e.g. "home", "contact") unless the visitor arrived via a tagged
 * campaign link (?utm_campaign=...), in which case that tag takes over —
 * letting the social team trace which post/campaign a lead came from via
 * social-post.campaignTag.
 */
export function useLeadSource(defaultSource: string): string {
  const [searchParams] = useSearchParams();
  return searchParams.get("utm_campaign") || defaultSource;
}
