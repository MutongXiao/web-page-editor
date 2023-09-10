import type { CSSProperties } from 'react';
export type CommonWidgetStyle = Pick<
	CSSProperties,
	| 'height'
	| 'width'
	| 'paddingLeft'
	| 'paddingRight'
	| 'paddingTop'
	| 'paddingBottom'
	| 'borderStyle'
	| 'borderColor'
	| 'borderWidth'
	| 'borderRadius'
	| 'boxShadow'
	| 'opacity'
	| 'position'
	| 'left'
	| 'right'
	| 'top'
	| 'bottom'
>;

export const defaultCommonWidgetStyle: CommonWidgetStyle = {
	// size
	height: '',
	width: '100%',
	paddingLeft: '0px',
	paddingRight: '0px',
	paddingTop: '0px',
	paddingBottom: '0px',
	// border type
	borderStyle: 'none',
	borderColor: '#000',
	borderWidth: '0',
	borderRadius: '0',
	// shadow and opacity
	boxShadow: '0 0 0 #000000',
	opacity: '1',
	// position and x,y
	position: 'absolute',
	left: '0',
	top: '0',
	right: '0',
	bottom: '0'
};

export type CommonStyleGroup = {
	label: string;
	styleProperties: Array<keyof CommonWidgetStyle>;
};

export const defaultCommonStyleGroups: CommonStyleGroup[] = [
	{
		label: '尺寸',
		styleProperties: [
			'height',
			'width',
			'paddingLeft',
			'paddingRight',
			'paddingTop',
			'paddingBottom'
		]
	},
	{
		label: '边框',
		styleProperties: [
			'borderStyle',
			'borderColor',
			'borderWidth',
			'borderRadius'
		]
	},
	{
		label: '阴影与透明度',
		styleProperties: ['opacity', 'boxShadow']
	},
	{
		label: '位置',
		styleProperties: ['left', 'top', 'right', 'bottom']
	}
];
