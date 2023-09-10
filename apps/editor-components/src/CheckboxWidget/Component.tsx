import React, { FC } from 'react';
import { Typography, Space, Checkbox } from 'antd';
import type { CheckboxWidgetProps } from './interface';

export const checkboxWidgetDefaultProps: CheckboxWidgetProps = {
	title: '多选标题',
	isVertical: false,
	list: [
		{ value: 'item1', text: '选项1', checked: false },
		{ value: 'item2', text: '选项2', checked: false },
		{ value: 'item3', text: '选项3', checked: false }
	]
};

const { Paragraph } = Typography;

const Component: FC<CheckboxWidgetProps> = (props: CheckboxWidgetProps) => {
	const {
		title,
		isVertical,
		list = []
	} = { ...checkboxWidgetDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
				{list.map((opt) => {
					const { value, text, checked } = opt;
					return (
						<Checkbox key={value} value={value} checked={checked}>
							{text}
						</Checkbox>
					);
				})}
			</Space>
		</div>
	);
};

export default Component;
