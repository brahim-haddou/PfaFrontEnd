export class LoginResponse {
  authenticationToken: string | undefined;
  refreshToken: string | undefined;
  expiresAt: Date | undefined;
  username: string | undefined;
}
