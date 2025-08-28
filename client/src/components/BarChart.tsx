import {TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, XAxis} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer, ChartLegend, ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {useCompetitionsContext} from "@/hooks/context.ts";

export const description = "A multiple bar chart"

export function ChartBarMultiple() {
  const statsData = useCompetitionsContext()

  // Map backend data to chart format
  const chartData = statsData.map(item => ({
    month: item.month,
    mern: item["Build A Scalable Web Application using MERN Stack_percentage"] ?? 0,
    uiux: item["UI/UX Design_percentage"] ?? 0,
    software: item["Software Development_percentage"] ?? 0,
    paper: item["Scientific Paper_percentage"] ?? 0,
  })).reverse();

  const chartConfig = {
    mern: {
      label: "Workshops %",
      color: "var(--chart-1)",
    },
    uiux: {
      label: "UI/UX Design %",
      color: "var(--chart-2)",
    },
    software: {
      label: "Software Dev %",
      color: "var(--chart-3)",
    },
    paper: {
      label: "Scientific Paper %",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig;
  const totalAverage =
    statsData.length > 0
      ? (statsData.reduce((sum, item) => sum + (item.average_percentage ?? 0), 0) / statsData.length)
      : "0.0";
  return (
    <Card className={'bg-teal-800 border-teal-300 border-2 col-span-2'}>
      <CardHeader>
        <CardTitle className={'text-gray-100'}>Bar Chart - Registration Percentage</CardTitle>
        <CardDescription className={'text-gray-200'}>
          {statsData.length > 0
            ? `${statsData[statsData.length - 1].month} - ${statsData[0].month} ${new Date().getFullYear()}`
            : "No data"}
        </CardDescription>
      </CardHeader>
      <CardContent className={'text-gray-100'}>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="month"
              tickLine={true}
              tick={{fill: "#fff", fontSize: 12, fontWeight: "bold", style: {fill: "whitesmoke", opacity: 0.9}}}
              tickMargin={15}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              stroke="white"
            />
            <ChartLegend content={<ChartLegendContent className={'text-gray-300 mt-3'}/>}/>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" className={'min-w-[12rem] bg-gray-800'}/>}
            />
            <Bar dataKey="mern" fill="#DC6ACF" radius={4}/>
            <Bar dataKey="uiux" fill="#8D91C7" radius={4}/>
            <Bar dataKey="software" fill="#B0DAF1" radius={4}/>
            <Bar dataKey="paper" fill="#78bc61" radius={4}/>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-gray-100">
          Trending up by {totalAverage}% this month <TrendingUp className="h-4 w-4"/>
        </div>
        <div className="text-gray-300 leading-none">
          Showing total registrations for the last 5 months
        </div>
      </CardFooter>
    </Card>
  )
}
