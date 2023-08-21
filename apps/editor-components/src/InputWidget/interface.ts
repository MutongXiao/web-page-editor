export type InputWidgetProps = {
	title?: string;
	placeholder?: string;

	onChange?: (newProps: InputWidgetProps) => void;
	disabled?: boolean;
};
