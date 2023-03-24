import { Goal } from "./Goal";

export class UserInfo {
  constructor(
    public infoId?: number,
    public height?: string,
    public weight?: string,
    public unit?: string,
    public birthday?: Date,
    public activity?: number,
    public medicalRisk?: string,
    public isReceiveTreatment?: boolean,
    public gender?: string,
    public goals?: Goal[]
  ) {}
}
