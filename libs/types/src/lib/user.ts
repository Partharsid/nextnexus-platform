import { Next Nexus PlatformRole } from './roles';
import { ApplicationStatus } from './application-status';

export interface Next Nexus PlatformUser {
  id: string;
  firstName: string;
  lastName: string;
  role: Next Nexus PlatformRole;
  tag: string;
  email: string;
  applicationId?: string;
  applicationStatus: ApplicationStatus;
  applicationStatusLastChanged?: Date;
  teamId?: string;
  attendanceConfirmed?: boolean;
  points?: number;
}
