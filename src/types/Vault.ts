export interface EditVaultLabelRequest {
    post_id: number;
    new_label: string;
}

export interface VaultRequest {
    post_id: number;
    label: string;
}

export interface Vault {
  id: number;
  post_id: number;
  user_id: number;
  label: string;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
}
