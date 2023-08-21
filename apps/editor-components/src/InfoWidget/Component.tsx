import React, { FC } from 'react';
import { Typography } from 'antd';
import type { InfoWidgetProps } from './interface';

export const infoWidgetDefaultProps: InfoWidgetProps = {
	title: '页面标题',
	desc: '页面描述'
};

const { Title, Paragraph } = Typography;

const Component: FC<InfoWidgetProps> = (props: InfoWidgetProps) => {
	const { title, desc = '' } = { ...infoWidgetDefaultProps, ...props };

	const descTextList = desc.split('\n');

	return (
		<div style={{ textAlign: 'center' }}>
			<Title style={{ fontSize: '24px' }}>{title}</Title>
			<Paragraph>
				{descTextList.map((t, index) => (
					<span key={index}>
						{index > 0 && <br />}
						{t}
					</span>
				))}
			</Paragraph>
		</div>
	);
};

export default Component;
