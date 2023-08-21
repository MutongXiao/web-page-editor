import React, { FC } from 'react';
import { Typography } from 'antd';
import type { ParagraphWidgetProps } from './interface';

export const paragraphWidgetDefaultProps: ParagraphWidgetProps = {
	text: '一行段落',
	isCenter: false
};

const { Paragraph } = Typography;

const Component: FC<ParagraphWidgetProps> = (props: ParagraphWidgetProps) => {
	const { text = '', isCenter = false } = {
		...paragraphWidgetDefaultProps,
		...props
	};

	// 尽量不要使用 dangerouslySetInnerHTML ，不安全

	const textList = text.split('\n'); // 例如 ['hello', '123', '456']

	return (
		<Paragraph
			style={{ textAlign: isCenter ? 'center' : 'start', marginBottom: '0' }}
		>
			{textList.map((t, index) => (
				<span key={index}>
					{index > 0 && <br />}
					{t}
				</span>
			))}
		</Paragraph>
	);
};

export default Component;
