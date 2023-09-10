export type RadioWidgetOption = {
	value: string;
	text: string;
};

export type RadioWidgetProps = {
	title?: string;
	isVertical?: boolean;
	options?: RadioWidgetOption[];
	value?: string;

	// 用于 PropComponent
	onChange?: (newProps: RadioWidgetProps) => void;
	disabled?: boolean;
};

// 统计组件的属性类型
export type RadioWidgetStatProps = {
	stat: Array<{ name: string; count: number }>;
};
