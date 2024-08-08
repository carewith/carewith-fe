import fs from "fs";
import path from "path";
import { Metadata } from "next";
import MedicineDetail from "@/components/detailpage/MedicineDetail";
import CurrentIndicator from "@/components/detailpage/CurrentIndicator";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Medicine Detail",
  description: "Detail information about the medicine",
};

export interface MedicineData {
  id: number;
  name: string;
  classification: string;
  division: string;
  imageUrl: string;
  dosage: number;
  dailyFrequency: number;
  totalDoses: number;
  remainingPills: number;
  times: string[];
  startDate: string;
  repeatAlarm: boolean;
  alarmSound: string;
  autoExtend: boolean;
  memo: string;
}

async function getMedicineData(id: number): Promise<MedicineData | null> {
  const filePath = path.join(process.cwd(), "data", "medicineDetail.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data: MedicineData[] = JSON.parse(jsonData);

  return data.find((medicine) => medicine.id === id) || null;
}

interface Props {
  params: {
    slug: string;
  };
}

export default async function MediblockDetailPage({ params }: Props) {
  const medicineData = await getMedicineData(parseInt(params.slug, 10));
  if (!medicineData) {
    return <div>Medicine not found</div>;
  }

  return (
    <PageContainer>
      <CurrentIndicator
        lastTakenTime="오후 7:00"
        nextScheduledTime="오후 10:00"
        status={false}
      />
      <MedicineDetail {...medicineData} />
    </PageContainer>
  );
}
