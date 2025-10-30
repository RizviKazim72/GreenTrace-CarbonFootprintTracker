export { api, default as apiClient } from './client';
export { authService } from './auth.service';
export {
  carbonService,
  leaderboardService,
  greenPointsService,
  companyService,
  reportsService,
  comparisonService,
  dashboardService,
} from './services';

// Backward compatibility alias
export { greenPointsService as pointsService } from './services';
