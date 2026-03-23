
import { Schedule } from "../../domain/entities/schedule.entity.js";
import { DayOfWeek } from "../../domain/entities/schedule.entity.js";
import type { ScheduleRepository } from "../../domain/repositories/schedule.domain.repository.js";
import { ScheduleModel } from "../models/schedule.model.js";
import { CourtModel } from "../models/court.model.js";
import { SportModel } from "../models/sport.model.js";
import { OrganizationModel } from "../models/organization.model.js";
import { Court } from "../../domain/entities/court.entity.js";
import { Sport } from "../../domain/entities/sport.entity.js";
import { Organization } from "../../domain/entities/organization.entity.js";

export class ScheduleRepositoryImpl implements ScheduleRepository {

    async create(schedule: Schedule): Promise<Schedule> {
        await ScheduleModel.create({
            id: schedule.id,
            courtId: schedule.court.id,
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            isAvailable: true // Default when creating
        });
        return schedule;
    }

    async update(schedule: Schedule): Promise<Schedule> {
        const scheduleModel = await ScheduleModel.findByPk(schedule.id);
        if (!scheduleModel) throw new Error("Schedule not found");

        await scheduleModel.update({
            courtId: schedule.court.id,
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime
        });

        return schedule;
    }

    async delete(id: string): Promise<boolean> {
        const deletedRows = await ScheduleModel.destroy({
            where: { id }
        });
        return deletedRows > 0;
    }

    async getById(id: string): Promise<Schedule | null> {
        const scheduleModel = await ScheduleModel.findByPk(id, {
            include: [{
                model: CourtModel,
                include: [SportModel, OrganizationModel]
            }]
        });

        if (!scheduleModel) return null;
        return this.toEntity(scheduleModel);
    }

    async getByCourtId(courtId: string): Promise<Schedule[]> {
        const scheduleModels = await ScheduleModel.findAll({
            where: { courtId },
            include: [{
                model: CourtModel,
                include: [SportModel, OrganizationModel]
            }]
        });

        return scheduleModels.map(model => this.toEntity(model));
    }

    async getAll(): Promise<Schedule[]> {
        const scheduleModels = await ScheduleModel.findAll({
            include: [{
                model: CourtModel,
                include: [SportModel, OrganizationModel]
            }]
        });

        return scheduleModels.map(model => this.toEntity(model));
    }

    async getByDayOfWeek(dayOfWeek: DayOfWeek): Promise<Schedule[]> {
        const scheduleModels = await ScheduleModel.findAll({
            where: { dayOfWeek },
            include: [{
                model: CourtModel,
                include: [SportModel, OrganizationModel]
            }]
        });

        return scheduleModels.map(model => this.toEntity(model));
    }

    async getByDayOfWeekAndCourtId(dayOfWeek: DayOfWeek, courtId: string): Promise<Schedule[]> {
        const scheduleModels = await ScheduleModel.findAll({
            where: { dayOfWeek, courtId },
            include: [{
                model: CourtModel,
                include: [SportModel, OrganizationModel]
            }]
        });

        return scheduleModels.map(model => this.toEntity(model));
    }

    async getByCourtIdAndDate(courtId: string, date: Date): Promise<Schedule[]> {
        const dayOfWeek = this.mapDateToDayOfWeek(date);
        return this.getByDayOfWeekAndCourtId(dayOfWeek, courtId);
    }

    private mapDateToDayOfWeek(date: Date): DayOfWeek {
        const days = [
            DayOfWeek.SUNDAY,
            DayOfWeek.MONDAY,
            DayOfWeek.TUESDAY,
            DayOfWeek.WEDNESDAY,
            DayOfWeek.THURSDAY,
            DayOfWeek.FRIDAY,
            DayOfWeek.SATURDAY
        ];
        return days[date.getDay()]!;
    }

    private toEntity(model: ScheduleModel): Schedule {
        if (!model) throw new Error('Schedule model is null');
        const courtModel = model.court;
        if (!courtModel) throw new Error('Schedule court is null. Ensure "court" association is included.');
        if (!courtModel.sport) throw new Error('Schedule court sport is null. Ensure "sport" association is included for court.');
        if (!courtModel.organization) throw new Error('Schedule court owner is null. Ensure "organization" association is included for court.');

        const sport = new Sport(
            courtModel.sport.id,
            courtModel.sport.name,
            courtModel.sport.iconUrl,
            courtModel.sport.minPlayers,
            courtModel.sport.maxPlayers
        );

        const organization = new Organization(
            courtModel.organization.id,
            courtModel.organization.name,
            courtModel.organization.description,
            courtModel.organization.email,
            courtModel.organization.phone,
            courtModel.organization.address,
            courtModel.organization.city,
            courtModel.organization.zipCode,
            courtModel.organization.logo,
            courtModel.organization.bannerImage,
            courtModel.organization.isActive,
            [] // Mapping managers as empty for now
        );

        const court = new Court(
            courtModel.id,
            courtModel.name,
            courtModel.description,
            courtModel.image,
            courtModel.capacity,
            courtModel.pricePerHour,
            courtModel.location,
            courtModel.isAvailable,
            sport,
            organization
        );


        return new Schedule(
            model.id,
            court,
            model.dayOfWeek as DayOfWeek,
            model.startTime,
            model.endTime
        );
    }
}
