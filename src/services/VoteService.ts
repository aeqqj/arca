import { api } from "@/services/Api";
import type { VoteRequest, VoteResponse } from "@/types/Vote";

const API_URL = "/votes";

export const VoteService = {
    async vote(request: VoteRequest): Promise<VoteResponse | null> {
        const response = await api.post<VoteResponse>(API_URL, request);
        return response.data;
    },

    async removeVote(post_id: number): Promise<void> {
        await api.delete(`${API_URL}/${post_id}`);
    },

    async getMyVote(post_id: number): Promise<VoteResponse> {
        const response = await api.get<VoteResponse>(`${API_URL}/${post_id}/my-vote`);
        return response.data;
    },

    async getUpvoteCount(post_id: number): Promise<number> {
        const response = await api.get<number>(`${API_URL}/${post_id}/upvotes`);
        return response.data;
    },

    async getDownvoteCount(post_id: number): Promise<number> {
        const response = await api.get<number>(`${API_URL}/${post_id}/downvotes`);
        return response.data;
    }
};
