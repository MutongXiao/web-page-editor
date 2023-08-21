export type CheckboxWidgetOption = {
	value: string;
	text: string;
	checked: boolean;
};

export type CheckboxWidgetProps = {
	title?: string;
	isVertical?: boolean;
	list?: CheckboxWidgetOption[];

	// 用于 PropComponent
	onChange?: (newProps: CheckboxWidgetProps) => void;
	disabled?: boolean;
};

// 统计组件的属性类型
export type CheckboxWidgetStatProps = {
	stat: Array<{ name: string; count: number }>;
};
