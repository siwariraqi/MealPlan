export class ChangePasswordRequest {
    constructor(
      public userId: number,
      public currentPassword: string,
      public newPassword: string,
      public confirmPassword: string
    ) {}
  }