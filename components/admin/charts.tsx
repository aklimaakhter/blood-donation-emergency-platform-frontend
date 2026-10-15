"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { formatMoney } from "@/lib/format";
import type { ChartPoint } from "@/lib/admin-stats";

const PIE_COLORS: Record<string, string> = {
  Pending: "#d97706",
  Approved: "#059669",
  Rejected: "#dc2626",
};

interface ChartCardProps {
  title: string;
  description: string;
  data: ChartPoint[];
  children: React.ReactNode;
}

function ChartCard({ title, description, data, children }: ChartCardProps) {
  const empty = data.every((d) => d.value === 0);
  const summary = data.map((d) => `${d.name}: ${d.value}`).join(", ");

  return (
    <Card className="space-y-3 p-5 shadow-none">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {empty ? (
        <div className="flex h-64 items-center justify-center rounded-md border border-dashed text-sm text-gray-500">
          No data yet
        </div>
      ) : (
        <div className="h-64 w-full" role="img" aria-label={`${title}. ${summary}`}>
          {children}
        </div>
      )}
    </Card>
  );
}

interface BarCardProps {
  title: string;
  description: string;
  data: ChartPoint[];
  color: string;
  seriesName: string;
}

export function BarChartCard({ title, description, data, color, seriesName }: BarCardProps) {
  return (
    <ChartCard title={title} description={description} data={data}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
          <Bar dataKey="value" name={seriesName} fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

interface PieCardProps {
  title: string;
  description: string;
  data: ChartPoint[];
}

export function PieChartCard({ title, description, data }: PieCardProps) {
  return (
    <ChartCard title={title} description={description} data={data}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={2}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={PIE_COLORS[d.name] ?? "#6b7280"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

interface AreaCardProps {
  title: string;
  description: string;
  data: ChartPoint[];
  currency: string;
}

export function AreaChartCard({ title, description, data, currency }: AreaCardProps) {
  return (
    <ChartCard title={title} description={description} data={data}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={12} interval="preserveStartEnd" />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip formatter={(value) => formatMoney(Number(value) * 100, currency)} />
          <Area
            type="monotone"
            dataKey="value"
            name="Donations"
            stroke="#059669"
            fill="#d1fae5"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}