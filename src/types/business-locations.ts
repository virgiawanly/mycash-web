import { BusinessEntity } from './business-entities';

export interface BusinessLocation {
  id: number;
  business_id: number;
  business_entity_id: number;
  name: string;
  code: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipcode: string | null;
  pic_id: number | null;
  pic_name: string | null;
  pic_phone: string | null;
  pic_email: string | null;
  created_at?: string | null;
  update_at?: string | null;
  deleted_at?: string | null;
  business_entity?: BusinessEntity | null;
  option_label?: string;
}
