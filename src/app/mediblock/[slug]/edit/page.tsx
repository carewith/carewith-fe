import fs from "fs";
import path from "path";
import { Metadata } from "next";
import PageContainer from "@/components/layout/PageContainer";
import { MedicineData } from "../page";
import MedicineEditDetail from "@/components/editpage/MedicineEditContainer";

export const metadata: Metadata = {
  title: "Medicine Edit",
  description: "Edit information about the medicine",
};

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

export default async function MediblockEditPage({ params }: Props) {
  const medicineData = await getMedicineData(parseInt(params.slug, 10));
  if (!medicineData) {
    return <div>Medicine not found</div>;
  }

  return (
    <PageContainer>
      <MedicineEditDetail {...medicineData} />
    </PageContainer>
  );
}
