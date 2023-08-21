export type TitleWidgetProps = {
	text?: string;
	level?: 1 | 2 | 3 | 4 | 5;
	isCenter?: boolean;

	onChange?: (newProps: TitleWidgetProps) => void;
	disabled?: boolean;
};
