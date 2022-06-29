import { Time } from "@angular/common";

export class stock {
    id!: string;
    stockId!: number;
    companyCode!: string;
    stockPrice!: number;
    stockStartDate!: Date;
    stockEndDate!: Date;
    stockStartTime!: Time;
    stockEndTime!: Time;
}