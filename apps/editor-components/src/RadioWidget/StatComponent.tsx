import React, { FC, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { RadioWidgetStatProps } from './interface';

const STAT_COLORS = [
	'#FF2D2D',
	'#BE77FF',
	'#2894FF',
	'#00EC00',
	'#EAC100',
	'#FF9D6F'
];

function format(n: number) {
	return (n * 100).toFixed(2);
}

const StatComponent: FC<RadioWidgetStatProps> = ({ stat = [] }) => {
	// count 求和
	const sum = useMemo(() => {
		let s = 0;
		stat.forEach((i) => (s += i.count));
		return s;
	}, [stat]);

	return (
		<div style={{ width: '300px', height: '400px' }}>
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						dataKey="count"
						data={stat}
						cx="50%" // x 轴的偏移
						cy="50%" // y 轴的偏移
						outerRadius={50} // 饼图的直径
						fill="#8884d8"
						label={(i) => `${i.name}: ${format(i.count / sum)}%`}
					>
						{stat.map((i, index) => {
							return <Cell key={index} fill={STAT_COLORS[index]} />;
						})}
					</Pie>
					<Tooltip />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};

export default StatComponent;
