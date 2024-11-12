export interface BusinessEntity {
  id: number;
  business_id: number;
  name: string;
  code: string;
  created_at?: string | null;
  update_at?: string | null;
  deleted_at?: string | null;
  option_label?: string;
}
