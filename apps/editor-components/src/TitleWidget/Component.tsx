import React, { type FC } from 'react';
import { Typography } from 'antd';
import type { TitleWidgetProps } from './interface';

export const titleWidgetDefaultProps: TitleWidgetProps = {
	text: '一行标题',
	level: 1,
	isCenter: false
};

const { Title } = Typography;

const TitleWidget: FC<TitleWidgetProps> = (props: TitleWidgetProps) => {
	const {
		text = '',
		level = 1,
		isCenter = false
	} = { ...titleWidgetDefaultProps, ...props };

	const genFontSize = (level: number) => {
		if (level === 1) return '24px';
		if (level === 2) return '20px';
		if (level === 3) return '16px';
		return '16px';
	};

	return (
		<Title
			level={level}
			style={{
				textAlign: isCenter ? 'center' : 'start',
				marginBottom: '0',
				fontSize: genFontSize(level)
			}}
		>
			{text}
		</Title>
	);
};

export default TitleWidget;
