import {
    IsBoolean,
    IsDate,
    IsNumber,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePurchaseOrderDto {
    // @ApiProperty({ required: true })
    // @IsNumber()
    // PurchaseID: number;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // @Transform(({ value }) => Number(value))
    // RevisionID: number;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 10)
    // SupplierID: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // DateOrder?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // LotShipment: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 10)
    // LotShipment237: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // PaymentBy: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // PaymentReference: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // LetterOfCreditNo: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 1)
    // LetterOfCreditShip: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // LetterOfCreditDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateArr1?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateArr2?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateArr3?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateArr4?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // DateArrive?: Date;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // TotalPrice: number;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // UpdateStock: boolean;

    // @ApiProperty({ required: true })
    // @IsString()
    // Note: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // VesselName1: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // VesselName2: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // VesselName3: string;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // CancelPO: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // GetPrice: boolean;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateDep1?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateDep2?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateDep3?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // EstimateDep4?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // ShippingAgent: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // AgentTel: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // PIC: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // ATTN: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // Delivery_Shipment: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // PaymentTerm: string;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // Condition1: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // Condition2: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // Condition3: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // Condition4: boolean;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // VATRate: number;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // VAT: number;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // GrandTotal: number;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // PurchaseOfficer: string;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // PrintNote: boolean;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // Account: number;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // InfoDate1?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // InfoDate2?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // InfoDate3?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // InfoDate4?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // NoteForShipmentReport: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // PiDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // InvDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // BLDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // TRDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // TRDueDate?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // SPEC: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // InvNo: string;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // UpdateCosting: boolean;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 40)
    // Harbor: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // TypePurchase: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // NoteForCosting: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 15)
    // HMisExp2: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 15)
    // HMisExp3: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 15)
    // HMisExp4: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 15)
    // HMisExp5: string;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // CostingComplete: boolean;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // BalanceOfForwarding: number;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // BalanceOfPaid: number;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // Freight: number;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 260)
    // FWNote: string;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // GrandTotalBaht: number;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(2, 2)
    // chk: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(2, 2)
    // SendDate: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // ACKDate: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // BLNo: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // SendShippingDate?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 30)
    // Feeder: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 20)
    // TRNO: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // ContainerName: string;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // PurchaseType: number;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // OnPort: boolean;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // TargetShipment?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // PINO: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // AdvanceDate?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // FromPort: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // ToPort: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // InsuranceCompany: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // InsuranceNo: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // InsuranceDate?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 50)
    // PAID: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 100)
    // PRNo: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // PRDate?: Date;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 5)
    // CP: string;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // PCGroup: number;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 5)
    // PCSubGroup: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(2, 2)
    // PRDivision: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(2, 2)
    // ForDivision: string;

    // @ApiProperty({ required: true })
    // @IsString()
    // @Length(1, 10)
    // JRID: string;

    // @ApiProperty({ required: true })
    // @IsNumber()
    // BalanceOfPayment: number;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // isQuotation: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // isInvoice: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // isBilling: boolean;

    // @ApiProperty({ required: true })
    // @IsBoolean()
    // isReceipt: boolean;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // SendDocDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // ReceiveDocDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsString()
    // @Length(1, 200)
    // IncompleteNote?: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsBoolean()
    // DocComplete?: boolean;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsString()
    // @Length(1, 15)
    // ReceiveLocation?: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsNumber()
    // TotalDiscount?: number;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsString()
    // NoteForApprove?: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsString()
    // UploadCompare?: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsString()
    // Company?: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsString()
    // ApprovedBy?: string;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsDate()
    // ApprovedDate?: Date;

    // @ApiProperty({ required: true })
    // @IsOptional()
    // @IsNumber()
    // ApprovedStaus?: number;
}
