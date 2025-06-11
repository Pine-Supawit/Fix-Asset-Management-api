import {
    IsBoolean,
    IsDateString,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// export class CreatePurchaseOrderDto {
//     @ApiProperty()
//     @IsNumber()
//     POID: number;

//     @ApiProperty()
//     @IsNumber()
//     RevisionID: number;

//     @ApiProperty()
//     @IsString()
//     SupplierID: string;

//     @ApiProperty()
//     @IsDateString()
//     DateOrder: Date;

//     @ApiProperty()
//     @IsString()
//     LotShipment: string;

//     @ApiPropertyOptional()
//     @IsString()
//     @IsOptional()
//     LotShipment237?: string;

//     @ApiProperty()
//     @IsString()
//     PaymentBy: string;

//     @ApiProperty()
//     @IsString()
//     PaymentReference: string;

//     @ApiPropertyOptional({ default: '' })
//     @IsString()
//     @IsOptional()
//     LetterOfCreditNo?: string;

//     @ApiPropertyOptional({ default: '1' })
//     @IsString()
//     @IsOptional()
//     LetterOfCreditShip?: string;

//     @ApiPropertyOptional({ default: null })
//     @IsOptional()
//     @IsDateString()
//     LetterOfCreditDate?: Date;

//     @ApiProperty()
//     @IsDateString()
//     EstimateArr1: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     EstimateArr2?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     EstimateArr3?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     EstimateArr4?: Date;

//     @ApiProperty()
//     @IsDateString()
//     DateArrive: Date;

//     @ApiProperty()
//     @IsNumber()
//     TotalPrice: number;

//     @ApiProperty()
//     @IsBoolean()
//     UpdateStock: boolean;

//     @ApiProperty()
//     @IsString()
//     Note: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     VesselName1?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     VesselName2?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     VesselName3?: string;

//     @ApiProperty()
//     @IsBoolean()
//     CancelPO: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     GetPrice: boolean;

//     @ApiProperty()
//     @IsDateString()
//     EstimateDep1: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     EstimateDep2?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     EstimateDep3?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     EstimateDep4?: Date;

//     @ApiProperty()
//     @IsString()
//     ShippingAgent: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     AgentTel?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     PIC?: string;

//     @ApiProperty()
//     @IsString()
//     ATTN: string;

//     @ApiProperty()
//     @IsString()
//     Delivery_Shipment: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     PaymentTerm?: string;

//     @ApiProperty()
//     @IsBoolean()
//     Condition1: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     Condition2: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     Condition3: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     Condition4: boolean;

//     @ApiProperty()
//     @IsNumber()
//     VATRate: number;

//     @ApiProperty()
//     @IsNumber()
//     VAT: number;

//     @ApiProperty()
//     @IsNumber()
//     GrandTotal: number;

//     @ApiProperty()
//     @IsString()
//     PurchaseOfficer: string;

//     @ApiProperty()
//     @IsBoolean()
//     PrintNote: boolean;

//     @ApiProperty()
//     @IsNumber()
//     Account: number;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     InfoDate1?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     InfoDate2?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     InfoDate3?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     InfoDate4?: Date;

//     @ApiProperty()
//     @IsString()
//     NoteForShipmentReport: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     PiDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     InvDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     BLDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     TRDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     TRDueDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     SPEC?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     InvNo?: string;

//     @ApiProperty()
//     @IsBoolean()
//     UpdateCosting: boolean;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     Harbor?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     TypePurchase?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     NoteForCosting?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     HMisExp2?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     HMisExp3?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     HMisExp4?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     HMisExp5?: string;

//     @ApiProperty()
//     @IsBoolean()
//     CostingComplete: boolean;

//     @ApiProperty()
//     @IsNumber()
//     BalanceOfForwarding: number;

//     @ApiProperty()
//     @IsNumber()
//     BalanceOfPaid: number;

//     @ApiProperty()
//     @IsNumber()
//     Freight: number;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     FWNote?: string;

//     @ApiProperty()
//     @IsNumber()
//     GrandTotalBaht: number;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     chk?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     SendDate?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     ACKDate?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     BLNo?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     SendShippingDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     Feeder?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     TRNO?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     ContainerName?: string;

//     @ApiProperty()
//     @IsNumber()
//     PurchaseType: number;

//     @ApiProperty()
//     @IsBoolean()
//     OnPort: boolean;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     TargetShipment?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     PINO?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     AdvanceDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     FromPort?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     ToPort?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     InsuranceCompany?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     InsuranceNo?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     InsuranceDate?: Date;

//     @ApiProperty()
//     @IsString()
//     PAID: string;

//     @ApiProperty()
//     @IsString()
//     PRNo: string;

//     @ApiProperty()
//     @IsDateString()
//     PRDate: Date;

//     @ApiProperty()
//     @IsString()
//     CP: string;

//     @ApiProperty()
//     @IsNumber()
//     PCGroup: number;

//     @ApiProperty()
//     @IsString()
//     PCSubGroup: string;

//     @ApiProperty()
//     @IsString()
//     PRDivision: string;

//     @ApiProperty()
//     @IsString()
//     ForDivision: string;

//     @ApiProperty()
//     @IsString()
//     JRID: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsNumber()
//     BalanceOfPayment?: number;

//     @ApiProperty()
//     @IsBoolean()
//     isQuotation: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     isInvoice: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     isBilling: boolean;

//     @ApiProperty()
//     @IsBoolean()
//     isReceipt: boolean;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     SendDocDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     ReceiveDocDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     IncompleteNote?: string;

//     @ApiProperty()
//     @IsBoolean()
//     DocComplete: boolean;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     ReceiveLocation?: string;

//     @ApiProperty()
//     @IsNumber()
//     TotalDiscount: number;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     NoteForApprove?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     UploadCompare?: string;

//     @ApiProperty()
//     @IsString()
//     Company: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsString()
//     ApprovedBy?: string;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsDateString()
//     ApprovedDate?: Date;

//     @ApiPropertyOptional()
//     @IsOptional()
//     @IsNumber()
//     ApprovedStaus?: number;
// }
