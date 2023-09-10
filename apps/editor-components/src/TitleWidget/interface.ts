import type { CSSProperties } from 'react';
import type { CommonWidgetStyle } from '../common/commonStyleProps';
export type TitleWidgetProps = {
	text?: string;
	level?: 1 | 2 | 3 | 4 | 5;
	isCenter?: boolean;

	onChange?: (newProps: TitleWidgetProps) => void;
	disabled?: boolean;
};

type AllTitleWidgetProps = {
	text?: string;
	styles: TitleWidgetSpacialStyle & CommonWidgetStyle;
	actions: {
		onPropsFormValuesChange: (newProps: AllTitleWidgetProps) => void;
	};
};

export type TitleWidgetSpacialStyle = Pick<
	CSSProperties,
	| 'fontSize'
	| 'fontFamily'
	| 'fontWeight'
	| 'fontStyle'
	| 'textDecoration'
	| 'lineHeight'
	| 'textAlign'
	| 'color'
	| 'backgroundColor'
>;
