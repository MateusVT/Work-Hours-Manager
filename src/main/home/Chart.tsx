import { ChartColor, ChartOptions } from "chart.js"
import React, { useMemo } from "react"
import { Bar, ChartComponentProps, Doughnut, HorizontalBar, Line, Pie } from "react-chartjs-2"

type Pair<E> = {
	key: E
	value: number
}

type ChartProps<E> = {
	orderBy?: string
	min: number,
	max: number,
	fetchColor: (item: E, index: number) => ChartColor
	fetchLegend: (item: E, index: number) => string
	fetchValue: (item: E, index: number) => number
	items: E[]
	onItemSelection?: (item: E) => void
	showZeros?: boolean
	legendPosition?: string
	title: string
	type: "verticalBar" | "doughnut" | "horizontalBar" | "pizza" | "line"
}

function Chart<E>(props: ChartProps<E>) {
	const {
		fetchColor,
		fetchLegend,
		fetchValue,
		items,
		min,
		max,
		onItemSelection,
		showZeros,
		title,
		legendPosition,
		type
	} = props
	const pairs = useMemo<Pair<E>[]>(
		() =>
			items
				.map((item, index) => ({ key: item, value: fetchValue(item, index) }))
				.filter(pair => showZeros || pair.value > 0),
		[fetchValue, items, showZeros]
	)
	const colors = useMemo(() => pairs.map((pair, index) => fetchColor(pair.key, index)), [fetchColor, pairs])
	const keys = useMemo(() => pairs.map((pair, index) => fetchLegend(pair.key, index)), [fetchLegend, pairs])

	const values = useMemo(
		() =>
			pairs
				.map(pair => pair.value)
				.sort((a, b) => {
					if (props.orderBy) {
						switch (props.orderBy) {
							case "desc":
								if (a < b) {
									return 1
								}
								if (a > b) {
									return -1
								}
								return 0
								break
							case "asc":
								if (a < b) {
									return -1
								}
								if (a > b) {
									return 1
								}
								return 0
								break
							default:
								return 0
						}
					} else {
						return 0
					}
				}),
		[pairs, props.orderBy]
	)
	const chartProps: ChartComponentProps = {
		data: {
			datasets: [
				{
					backgroundColor: colors,
					data: values
				}
			],
			labels: keys
		},

		options: chartOptionsFor(
			title,
			legendPosition || "bottom",
			type,
			min,
			max,
			onItemSelection && (index => onItemSelection(pairs[index].key))
		)
	}

	return (
		<>
			{type == "verticalBar" && React.createElement(Bar, chartProps)}
			{type == "horizontalBar" && React.createElement(HorizontalBar, chartProps)}
			{type == "doughnut" && React.createElement(Doughnut, chartProps)}
			{type == "pizza" && React.createElement(Pie, chartProps)}
			{type == "line" && React.createElement(Line, chartProps)}
		</>
	)
}

function chartOptionsFor(
	title: string,
	legendPosition: string,
	type: string,
	min: number,
	max: number,
	onItemSelection?: (index: number) => void
) {
	const chartOptions: ChartOptions = {
		responsive: true,
		maintainAspectRatio: true,
		onResize: () => { },

		aspectRatio: 0.5,

		layout: {
			padding: 12
		},
		scales: {
			yAxes: [{
				ticks: {
					max: min,
					min: max
				}
			}]
		},
		legend: {
			display: type == "pizza" || type == "doughnut",
			labels: {
				fontSize: 16
			},
			onClick: (_: any, item: any) => onItemSelection && onItemSelection((item as any).index),
			onHover: (event: any) => {
				const target = event.target as HTMLElement | null

				if (target) {
					target.style.cursor = "pointer"
				}
			},
			position: legendPosition as any
		},
		onClick: (_: any, chartElements: any) => {
			if (chartElements && chartElements.length == 1 && onItemSelection) {
				const element = chartElements[0] as any
				const index = element._index

				onItemSelection(index)
			}
		},
		onHover: (event: any, chartElements: any) => {
			const target = event.target as HTMLElement | null

			if (target) {
				target.style.cursor = chartElements[0] ? "pointer" : "default"
			}
		},
		title: {
			display: true,
			fontSize: 20,
			position: "top",
			text: title
		},
		tooltips: {
			bodyFontSize: 14
		}
	}

	return chartOptions
}

export default Chart
