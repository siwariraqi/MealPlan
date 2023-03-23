import { Goal } from "./Goal";

export class UserInfo {
  constructor(
    public infoId?: number,
    public height?: string,
    public weight?: string,
    public unit?: string,
    public birthday?: string,
    public activity?: string,
    public medicalRisk?: string,
    public isReceiveTreatment?: boolean,
    public gender?: string,
    public goals?: Goal[]
  ) {}
}
