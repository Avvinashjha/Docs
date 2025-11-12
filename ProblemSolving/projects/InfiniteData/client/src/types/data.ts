export interface Data {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
    number: number

}

export interface ApiResponse {
  data: Data[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextOffset: number | null;
    prevOffset: number | null;
  };
}