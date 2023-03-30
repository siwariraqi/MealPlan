export interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
  user: {
    userId: number;
    email: string;
    password: null;
    userRole: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userInfo: {
      infoId: number;
      height: number;
      weight: number;
      unit: string;
      activity: number;
      medicalRisk: string;
      isReceiveTreatment: boolean;
      gender: string;
      goals: {
        goalId: number;
        text: string;
      }[];
    };
    plan: {
      planId: number;
      planName: string;
      length: string;
      price: number;
      includes: string;
      benefits: string;
    };
    registerDate: number;
    payments: any[];
    changes: any[];
  };
}
