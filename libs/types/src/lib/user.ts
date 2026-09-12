import { NextNexusRole } from './roles';
import { ApplicationStatus } from './application-status';

export interface NextNexusUser {
  id: string;
  firstName: string;
  lastName: string;
  role: NextNexusRole;
  tag: string;
  email: string;
  applicationId?: string;
  applicationStatus: ApplicationStatus;
  applicationStatusLastChanged?: Date;
  teamId?: string;
  attendanceConfirmed?: boolean;
  points?: number;
}
