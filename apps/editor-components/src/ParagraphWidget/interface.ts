export type ParagraphWidgetProps = {
	text?: string;
	isCenter?: boolean;

	// 用于 PropComponent
	onChange?: (newProps: ParagraphWidgetProps) => void;
	disabled?: boolean;
};
