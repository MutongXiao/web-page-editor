import React, { type FC } from 'react';
import { Typography } from 'antd';
import type { TitleWidgetProps, TitleWidgetSpacialStyle } from './interface';
import { defaultCommonWidgetStyle } from '../common/commonStyleProps';

export const titleWidgetDefaultProps: TitleWidgetProps = {
	text: '一行标题',
	level: 1,
	isCenter: false
};

const { Title } = Typography;

export const textDefaultProps: TitleWidgetSpacialStyle = {
	// basic props - font styles
	fontSize: '14px',
	fontFamily: '',
	fontWeight: 'normal',
	fontStyle: 'normal',
	textDecoration: 'none',
	lineHeight: '1',
	textAlign: 'left',
	color: '#000000',
	backgroundColor: '',
	...defaultCommonWidgetStyle
};

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
