import type { PostResponse } from "@/types/Post";

export const dummyPostResponses: PostResponse[] = [
  {
    id: 1,
    postId: 1001,
    version: 1,
    title: "Improving ICU Patient Monitoring",
    content: "This post discusses potential improvements in ICU patient monitoring using real-time data analytics.",
    status: "PENDING",
    userId: 10,
    firstName: "Charles",
    lastName: "Argawanon",
    departmentId: 3,
    departmentName: "Computer Science",
    postTags: "healthcare",
    rejectionReason: null,
    isLatestVersion: true,
    createdAt: "2025-01-15T08:30:00Z",
    updatedAt: "2025-01-15T08:30:00Z",
    upvoteCount: 42,
    downvoteCount: 3,
    files: [
      {
        id: 1,
        fileName: "icu-monitoring-proposal",
        fileType: "pdf",
        fileSize: 845312,
        downloadUrl: "/api/files/1/download"
      },
      {
        id: 2,
        fileName: "system-architecture",
        fileType: "png",
        fileSize: 342198,
        downloadUrl: "/api/files/2/download"
      }
    ]
  },
  {
    id: 2,
    postId: 1002,
    version: 2,
    title: "Web Security Best Practices",
    content: "An overview of modern web security practices including authentication, authorization, and encryption.",
    status: "PENDING",
    userId: 12,
    firstName: "Maria",
    lastName: "Santos",
    departmentId: 5,
    departmentName: "Information Technology",
    postTags: "web-dev",
    rejectionReason: null,
    isLatestVersion: true,
    createdAt: "2025-02-01T10:15:00Z",
    updatedAt: "2025-02-05T14:45:00Z",
    upvoteCount: 18,
    downvoteCount: 1,
    files: [
      {
        id: 3,
        fileName: "security-guidelines",
        fileType: "pdf",
        fileSize: 512000,
        downloadUrl: "/api/files/3/download"
      }
    ]
  },
  {
    id: 3,
    postId: 1003,
    version: 1,
    title: "Why This Proposal Was Rejected",
    content: "This post explains an idea that did not meet the current project requirements.",
    status: "REJECTED",
    userId: 15,
    firstName: "Juan",
    lastName: "Dela Cruz",
    departmentId: 2,
    departmentName: "Engineering",
    postTags: "review",
    rejectionReason: "The proposal lacks sufficient technical detail and feasibility analysis.",
    isLatestVersion: false,
    createdAt: "2025-01-20T09:00:00Z",
    updatedAt: "2025-01-22T11:20:00Z",
    upvoteCount: 5,
    downvoteCount: 12,
    files: [
      {
        id: 4,
        fileName: "initial-proposal",
        fileType: "pdf",
        fileSize: 298734,
        downloadUrl: "/api/files/4/download"
      }
    ]
  }
];
