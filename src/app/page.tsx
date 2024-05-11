import CustomChart from "@/components/CustomeChart";
import DoughnutChart from "@/components/DoughnutChart";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <DoughnutChart />

      <CustomChart />
    </>
  );
}
