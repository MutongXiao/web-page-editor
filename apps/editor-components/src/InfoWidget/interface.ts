export type InfoWidgetProps = {
	title?: string;
	desc?: string;

	// 用于 PropComponent
	onChange?: (newProps: InfoWidgetProps) => void;
	disabled?: boolean;
};
