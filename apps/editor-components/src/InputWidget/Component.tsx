import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import type { InputWidgetProps } from './interface';

export const inputWidgetDefaultProps: InputWidgetProps = {
	title: '单行输入框标题',
	placeholder: '请输入...'
};

const { Paragraph } = Typography;

const QuestionInput: FC<InputWidgetProps> = (props: InputWidgetProps) => {
	const { title, placeholder } = { ...inputWidgetDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<Input placeholder={placeholder}></Input>
			</div>
		</div>
	);
};

export default QuestionInput;
