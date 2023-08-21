import React, { FC } from 'react';
import { Typography, Input } from 'antd';
import type { TextareaWidgetProps } from './interface';

export const textareaWidgetDefaultProps: TextareaWidgetProps = {
	title: '多行输入框标题',
	placeholder: '请输入...'
};

const { Paragraph } = Typography;
const { TextArea } = Input;

const QuestionTextarea: FC<TextareaWidgetProps> = (
	props: TextareaWidgetProps
) => {
	const { title, placeholder } = { ...textareaWidgetDefaultProps, ...props };

	return (
		<div>
			<Paragraph strong>{title}</Paragraph>
			<div>
				<TextArea placeholder={placeholder}></TextArea>
			</div>
		</div>
	);
};

export default QuestionTextarea;
