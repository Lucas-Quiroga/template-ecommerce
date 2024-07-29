"use client";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  Line,
  LineChart,
} from "recharts";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { analytics } from "@/firebase/client";
import { logEvent, getAnalytics, isSupported } from "firebase/analytics";

const chartConfig = {
  sales: {
    label: "Ventas",
    color: "#2563eb",
  },
  sessions: {
    label: "Sesiones",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState({
    totalSales: 0,
    sessions: 0,
    returningCustomers: 0,
    visitors: 0,
    pageViews: 0,
  });

  const [chartData, setChartData] = useState<
    { month: string; sales: number; sessions: number }[]
  >([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (await isSupported()) {
        const analytics = getAnalytics();

        logEvent(analytics, "page_view", {
          page_title: "Analytics Dashboard",
          page_location: window.location.href,
        });

        // Aquí simularemos la obtención de datos de Firebase
        // En una implementación real, deberías hacer una llamada a tu backend
        // que interactúe con Firebase Analytics
        const mockData = {
          totalSales: 2389,
          sessions: 345,
          returningCustomers: 33.5,
          visitors: 3456,
          pageViews: 12345,
          monthlyData: [
            { month: "Enero", sales: 186, sessions: 80 },
            { month: "Febrero", sales: 305, sessions: 200 },
            { month: "Marzo", sales: 237, sessions: 120 },
            { month: "Abril", sales: 273, sessions: 190 },
            { month: "Mayo", sales: 209, sessions: 130 },
            { month: "Junio", sales: 214, sessions: 140 },
          ],
        };

        setAnalyticsData(mockData);
        setChartData(mockData.monthlyData);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <FaArrowLeft className="w-4 h-4" />
          <span className="sr-only">Atrás</span>
        </Button>
        <h1 className="font-semibold text-lg md:text-xl">Analytics</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">
            Hoy
          </Button>
          <Button variant="outline" className="hidden md:flex">
            Este mes
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className="w-[280px] justify-start text-left font-normal"
              >
                1 de junio de 2023 - 30 de junio de 2023
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar initialFocus mode="range" numberOfMonths={2} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Ventas totales</CardDescription>
              <CardTitle>${analyticsData.totalSales.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart width={300} height={200} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sales" fill={chartConfig.sales.color} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Sesiones</CardDescription>
              <CardTitle>{analyticsData.sessions}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart width={300} height={200} data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="sessions"
                    stroke={chartConfig.sessions.color}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Clientes recurrentes</CardDescription>
              <CardTitle>{analyticsData.returningCustomers}%</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Aquí podrías agregar una visualización para clientes recurrentes */}
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Visitantes</CardDescription>
              <CardTitle>{analyticsData.visitors.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Aquí podrías agregar una visualización para visitantes */}
            </CardContent>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <CardDescription>Vistas de página</CardDescription>
              <CardTitle>{analyticsData.pageViews.toLocaleString()}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Aquí podrías agregar una visualización para vistas de página */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Visitantes</CardDescription>
              <CardTitle>Principales referentes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center">
                <div>google.com</div>
                <div className="font-semibold ml-auto">3K</div>
              </div>
              <div className="flex items-center">
                <div>twitter.com</div>
                <div className="font-semibold ml-auto">1.2K</div>
              </div>
              <div className="flex items-center">
                <div>youtube.com</div>
                <div className="font-semibold ml-auto">1.1K</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
