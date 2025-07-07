"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

interface BatteryChartProps {
  title: string
  data: Array<{ hour: number; value: number }>
  valueFormatter: (value: number) => string
}

export function BatteryChart({ title, data, valueFormatter }: BatteryChartProps) {
  return (
    <div>
      <h4 className="font-medium mb-4 text-[#0B4E65] p-3">{title}</h4>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              stroke="#888888"
              tick={{ fill: '#000000', fontSize: 16 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              tick={{ fill: '#000000', fontSize: 16 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={valueFormatter}
            />
            <Tooltip
              formatter={(value: number) => [valueFormatter(value), title]}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0B4E65"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

