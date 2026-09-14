export default interface SessionTypeResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      accessToken: string;
      full_name: string;
      email: string;
      id: string;
      ai_api_key: string;
      created_at: Date;
      updated_at: Date;
    };
  };
}
