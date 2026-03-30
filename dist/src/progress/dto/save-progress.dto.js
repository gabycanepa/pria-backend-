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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveProgressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SaveProgressDto {
    level;
    score;
    completed;
    character;
}
exports.SaveProgressDto = SaveProgressDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Level number (1-3)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    __metadata("design:type", Number)
], SaveProgressDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8, description: 'Score (0-10)' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], SaveProgressDto.prototype, "score", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Whether the level was completed' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveProgressDto.prototype, "completed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'gaby', description: 'Character used', enum: ['gaby', 'cami'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['gaby', 'cami']),
    __metadata("design:type", String)
], SaveProgressDto.prototype, "character", void 0);
//# sourceMappingURL=save-progress.dto.js.map