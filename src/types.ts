export interface SystemDesignResponse {
  system_overview: string;
  features: string[];
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    deployment: string;
    rationale: string;
  };
  database_schema: {
    table: string;
    fields: {
      name: string;
      type: string;
      relation?: string;
    }[];
  }[];
  api_endpoints: {
    method: string;
    endpoint: string;
    description: string;
    status_code: number;
    example_response?: string;
  }[];
  system_flow: string[];
  trade_offs: {
    decision: string;
    pros: string[];
    cons: string[];
  }[];
  challenges: string[];
  ai_insights: string;
}
