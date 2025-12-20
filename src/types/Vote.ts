export interface VoteRequest {
    post_id: number;
    vote_type: "UPVOTE" | "DOWNVOTE";
}

export interface VoteResponse {
    id: number;
    post_id: number;
    user_id: number;
    vote_type: "UPVOTE" | "DOWNVOTE";
}
