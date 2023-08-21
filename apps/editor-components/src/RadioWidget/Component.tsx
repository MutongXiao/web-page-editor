import React, { FC } from 'react';
import { Typography, Radio, Space } from 'antd';
import type { RadioWidgetProps } from './interface';

export const radioWidgetDefaultProps: RadioWidgetProps = {
	title: '单选标题',
	isVertical: false,
	options: [
		{ value: 'item1', text: '选项1' },
		{ value: 'item2', text: '选项2' },
		{ value: 'item3', text: '选项3' }
	],
	value: ''
};

const { Paragraph } = Typography;

const Component: FC<RadioWidgetProps> = (props: RadioWidgetProps) => {
	const {
		title,
		options = [],
		value,
		isVertical
	} = { ...radioWidgetDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Radio.Group value={value}>
				<Space direction={isVertical ? 'vertical' : 'horizontal'}>
					{options.map((opt) => {
						const { value, text } = opt;
						return (
							<Radio key={value} value={value}>
								{text}
							</Radio>
						);
					})}
				</Space>
			</Radio.Group>
		</div>
	);
};

export default Component;
