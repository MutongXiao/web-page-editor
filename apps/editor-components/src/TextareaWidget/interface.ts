export type TextareaWidgetProps = {
	title?: string;
	placeholder?: string;

	onChange?: (newProps: TextareaWidgetProps) => void;
	disabled?: boolean;
};
