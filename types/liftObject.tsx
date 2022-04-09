import { CompanyInterface } from './Company';

export interface LiftObjectInterface {
 title: string;
 address: string;
 id: string;
 model: string;
 MAC?: string;
 service: CompanyInterface;
}
