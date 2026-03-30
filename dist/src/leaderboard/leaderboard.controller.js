"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LeaderboardController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leaderboard_service_1 = require("./leaderboard.service");
const leaderboard_response_dto_1 = require("./dto/leaderboard-response.dto");
const optional_jwt_auth_guard_1 = require("../auth/optional-jwt-auth.guard");
let LeaderboardController = LeaderboardController_1 = class LeaderboardController {
    leaderboardService;
    logger = new common_1.Logger(LeaderboardController_1.name);
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    async getLeaderboard(level, limit, req) {
        const limitNumber = limit ? parseInt(limit, 10) : 20;
        const user = req.user;
        const userId = user?.id;
        this.logger.log(`Leaderboard request for level ${level}, limit ${limitNumber}, user: ${userId || 'anonymous'}`);
        return this.leaderboardService.getLeaderboard(level, limitNumber, userId);
    }
};
exports.LeaderboardController = LeaderboardController;
__decorate([
    (0, common_1.Get)(':level'),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, swagger_1.ApiOperation)({
        summary: 'Get leaderboard for a level',
        description: 'Public endpoint. If Bearer token is provided, response includes currentUserRank.'
    }),
    (0, swagger_1.ApiParam)({ name: 'level', description: 'Level number (1-3)', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'Number of entries to return', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leaderboard entries', type: leaderboard_response_dto_1.LeaderboardResponseDto }),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('level', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], LeaderboardController.prototype, "getLeaderboard", null);
exports.LeaderboardController = LeaderboardController = LeaderboardController_1 = __decorate([
    (0, swagger_1.ApiTags)('Leaderboard'),
    (0, common_1.Controller)('api/leaderboard'),
    __metadata("design:paramtypes", [leaderboard_service_1.LeaderboardService])
], LeaderboardController);
//# sourceMappingURL=leaderboard.controller.js.map