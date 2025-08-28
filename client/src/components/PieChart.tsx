import {TrendingUp} from "lucide-react"
import {Legend, Pie, PieChart} from "recharts"
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {useCompetitionsContext} from "@/hooks/context.ts";

export const description = "A pie chart with a label"

export function ChartPieLabel() {
  const statsData = useCompetitionsContext()

  // Get the latest month's data (or fallback to empty object)
  const latestStats = statsData.find(stat => stat.month === new Date().toLocaleString('en-US', {month: 'long'}))

  // Prepare chart data for each competition
  const chartData = [
    {
      competition: "Build A Scalable Web Application using MERN Stack",
      registrations: latestStats?.["Build A Scalable Web Application using MERN Stack"] ?? 0,
      fill: "var(--chart-1)",
    },
    {
      competition: "UI/UX Design",
      registrations: latestStats?.["UI/UX Design"] ?? 0,
      fill: "var(--chart-2)",
    },
    {
      competition: "Software Development",
      registrations: latestStats?.["Software Development"] ?? 0,
      fill: "var(--chart-3)",
    },
    {
      competition: "Scientific Paper",
      registrations: latestStats?.["Scientific Paper"] ?? 0,
      fill: "var(--chart-4)",
    },
  ]

  const chartConfig = {
    registrations: {
      label: "Registrations",
    },
    "Build A Scalable Web Application using MERN Stack": {
      label: "Workshop",
      color: "var(--chart-1)",
    },
    "UI/UX Design": {
      label: "UI/UX Design",
      color: "var(--chart-2)",
    },
    "Software Development": {
      label: "Software Development",
      color: "var(--chart-3)",
    },
    "Scientific Paper": {
      label: "Scientific Paper",
      color: "var(--chart-4)",
    },
  } satisfies ChartConfig

  const hasData = chartData.some(d => d.registrations > 0);
  return (
    <Card className="flex flex-col bg-teal-800 border-teal-300 border-2">
      <CardHeader className="items-center pb-0">
        <CardTitle className={'text-gray-100'}>Pie Chart - Amount of Registrations</CardTitle>
        <CardDescription className={'text-gray-200'}>
          {latestStats?.month ? `${latestStats.month} ${new Date().getFullYear()}` : "No Data"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {hasData ? (
          <ChartContainer
            config={chartConfig}
            className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[500px] pb-0"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel className={'bg-gray-800 min-w-[12rem]'}/>}/>
              <Legend
                content={({payload}) => (
                  <ul className="flex flex-wrap gap-4 justify-center mt-4">
                    {payload?.map((entry, index) => (
                      <li key={`item-${index}`} className="flex items-center gap-2">
                        {/* Kotak warna */}
                        <span
                          className="w-3 h-3 rounded"
                          style={{backgroundColor: entry.color}}
                        />
                        {/* Label teks */}
                        <span className="text-white font-medium">{entry.value}</span>
                      </li>
                    ))}
                  </ul>
                )}
              />
              <Pie data={chartData} dataKey="registrations"
                   label={{fill: "#fff", fontSize: 12, fontWeight: "bold", style: {fill: "whitesmoke", opacity: 0.9}}}
                   nameKey="competition"/>
            </PieChart>
          </ChartContainer>
        ) : (
          <div className="text-center text-gray-200 py-10">No registration data available</div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-gray-100">
          Trending up by {latestStats?.average_percentage}% this month <TrendingUp className="h-4 w-4"/>
        </div>
        <div className="text-gray-300 leading-none">
          Showing total registrations for the latest month
        </div>
      </CardFooter>
    </Card>
  )
}
