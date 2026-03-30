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
var ProgressController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const progress_service_1 = require("./progress.service");
const save_progress_dto_1 = require("./dto/save-progress.dto");
const progress_response_dto_1 = require("./dto/progress-response.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const current_user_decorator_1 = require("../auth/current-user.decorator");
let ProgressController = ProgressController_1 = class ProgressController {
    progressService;
    logger = new common_1.Logger(ProgressController_1.name);
    constructor(progressService) {
        this.progressService = progressService;
    }
    async saveProgress(user, dto) {
        this.logger.log(`Save progress request from user ${user.id} for level ${dto.level}`);
        return this.progressService.saveProgress(user.id, dto);
    }
    async getUserProgress(user) {
        this.logger.log(`Get progress request from user ${user.id}`);
        return this.progressService.getUserProgress(user.id);
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Save level progress' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Progress saved', type: progress_response_dto_1.ProgressItemDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_progress_dto_1.SaveProgressDto]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "saveProgress", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user progress for all levels' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User progress', type: progress_response_dto_1.UserProgressDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgressController.prototype, "getUserProgress", null);
exports.ProgressController = ProgressController = ProgressController_1 = __decorate([
    (0, swagger_1.ApiTags)('Game Progress'),
    (0, common_1.Controller)('api/progress'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map