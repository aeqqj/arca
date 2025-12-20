import axios from "axios";
import type { VaultRequest, EditVaultLabelRequest } from "@/types/Vault";
import type { Vault } from "@/types/Vault";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/vaults";

export const VaultService = {
  addToVault: async (request: VaultRequest): Promise<string> => {
    const res = await axios.post<string>(`${API_URL}/add`, request);
    return res.data;
  },

  removeFromVault: async (postId: number): Promise<string> => {
    const res = await axios.delete<string>(`${API_URL}/remove`, { params: { postId } });
    return res.data;
  },

  editLabel: async (request: EditVaultLabelRequest): Promise<Vault> => {
    const res = await axios.put<Vault>(`${API_URL}/edit-label`, request);
    return res.data;
  },

  getUserVault: async (): Promise<Vault[] | string> => {
    const res = await axios.get<Vault[] | string>(`${API_URL}/user`);
    return res.data;
  },

  isPostSaved: async (postId: number): Promise<boolean> => {
    const res = await axios.get<boolean>(`${API_URL}/check`, { data: postId });
    return res.data;
  },

  getVaultEntry: async (id: number): Promise<Vault | null> => {
    try {
      const res = await axios.get<Vault>(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      return null;
    }
  },
};
