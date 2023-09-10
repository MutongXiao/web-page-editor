import React, { type FunctionComponent, type ReactElement } from 'react';
import { Input, Radio, Select, Slider, InputNumber } from 'antd';
import {
	BoldOutlined,
	ItalicOutlined,
	UnderlineOutlined
} from '@ant-design/icons';

import IconSwith from './components/IconSwith';
import ColorPicker from './components/ColorPicker';
import ShadowPicker from './components/ShadowPicker';
import type { CommonWidgetStyle } from './commonStyleProps';
import type { TitleWidgetSpacialStyle } from '../TitleWidget';

export interface PropToForm {
	text?: string;
	Component: FunctionComponent<any>;
	SubComponent?: FunctionComponent<any>;
	// 上面 Component 的属性配置
	extraProps?: { [key: string]: any };
	options?: { text: string | ReactElement; value: any }[];
	// 对初始值进行格式转化
	initalTransform?: (v: any) => any;
	// 将值转化为初始化的格式
	afterTransform?: (v: any) => any;
	// 该属性值的名称
	valueName?: string;
	// 该属性变化的事件名称
	eventName?: string;
}

type AllStyleProps = TitleWidgetSpacialStyle & CommonWidgetStyle;
type PropsToForms = {
	[P in keyof AllStyleProps]?: PropToForm;
};

const fontFamilyArr = [
	{ text: '宋体', value: '"SimSun","STSong"' },
	{ text: '黑体', value: '"SimHei","STHeiti"' },
	{ text: '楷体', value: '"KaiTi","STKaiti"' },
	{ text: '仿宋', value: '"FangSong","STFangsong"' }
];

const fontFamilyOptions = fontFamilyArr.map((font) => {
	return {
		value: font.value,
		text: <span style={{ fontFamily: font.value }}>{font.text}</span>
	};
});

const defaultHandler: PropToForm = {
	Component: Input,
	eventName: 'onChange',
	valueName: 'value',
	initalTransform: (v: any) => v,
	afterTransform: (e: any) => e
};

const pxToNumberHandler: PropToForm = {
	Component: InputNumber,
	initalTransform: (v: string) => (v ? parseInt(v) : 0),
	afterTransform: (e: number) => (e ? `${e}px` : '')
};

export const mapPropsToForms: PropsToForms = {
	// textComponentProps
	// text: {
	// 	text: '文本',
	// 	Component: Input.TextArea,
	// 	extraProps: { rows: 3 },
	// 	afterTransform: (e: any) => e.target.value
	// },
	fontSize: {
		text: '字号',
		...pxToNumberHandler
	},
	lineHeight: {
		text: '行高',
		Component: Slider,
		extraProps: { min: 0, max: 3, step: 0.1 },
		initalTransform: (v: string) => parseFloat(v),
		afterTransform: (e: number) => e.toString()
	},
	textAlign: {
		Component: Radio.Group,
		SubComponent: Radio.Button,
		text: '对齐',
		options: [
			{ value: 'left', text: '左' },
			{ value: 'center', text: '中' },
			{ value: 'right', text: '右' }
		],
		afterTransform: (e: any) => e.target.value
	},
	fontFamily: {
		Component: Select,
		SubComponent: Select.Option,
		text: '字体',
		options: [{ value: '', text: '无' }, ...fontFamilyOptions]
	},
	fontWeight: {
		Component: IconSwith,
		initalTransform: (v: string) => v === 'bold',
		afterTransform: (e: boolean) => (e ? 'bold' : 'normal'),
		valueName: 'checked',
		extraProps: { Icon: <BoldOutlined />, tip: '加粗' }
	},
	fontStyle: {
		Component: IconSwith,
		initalTransform: (v: string) => v === 'italic',
		afterTransform: (e: boolean) => (e ? 'italic' : 'normal'),
		valueName: 'checked',
		extraProps: { Icon: <ItalicOutlined />, tip: '斜体' }
	},
	textDecoration: {
		Component: IconSwith,
		initalTransform: (v: string) => v === 'underline',
		afterTransform: (e: boolean) => (e ? 'underline' : 'none'),
		valueName: 'checked',
		extraProps: { iconName: <UnderlineOutlined />, tip: '下划线' }
	},
	color: {
		Component: ColorPicker,
		text: '字体颜色'
	},
	backgroundColor: {
		Component: ColorPicker,
		text: '背景颜色'
	},
	// imageComponentProps
	// src: {
	// 	component: 'image-processer'
	// },
	// commonComponentProps - sizes
	width: {
		text: '宽度',
		...pxToNumberHandler
	},
	height: {
		text: '高度',
		...pxToNumberHandler
	},
	paddingLeft: {
		...pxToNumberHandler,
		text: '左边距'
	},
	paddingRight: {
		...pxToNumberHandler,
		text: '右边距'
	},
	paddingTop: {
		...pxToNumberHandler,
		text: '上边距'
	},
	paddingBottom: {
		...pxToNumberHandler,
		text: '下边距'
	},
	// commonComponentProps - border type
	borderStyle: {
		...defaultHandler,
		Component: Select,
		SubComponent: Select.Option,
		text: '边框类型',
		options: [
			{ value: 'none', text: '无' },
			{ value: 'solid', text: '实线' },
			{ value: 'dashed', text: '破折线' },
			{ value: 'dotted', text: '点状线' }
		]
	},
	borderColor: {
		...defaultHandler,
		Component: ColorPicker,
		text: '边框颜色'
	},
	borderWidth: {
		...pxToNumberHandler,
		Component: Slider,
		text: '边框宽度',
		extraProps: { min: 0, max: 20 }
	},
	borderRadius: {
		...pxToNumberHandler,
		Component: Slider,
		text: '边框圆角',
		extraProps: { min: 0, max: 200 }
	},
	// commonComponentProps - opacity and boxShadow
	opacity: {
		Component: Slider,
		text: '透明度',
		initalTransform: (v: number) => (v ? v * 100 : 100),
		afterTransform: (e: number) => e / 100,
		extraProps: { min: 0, max: 100, reverse: true }
	},
	boxShadow: {
		Component: ShadowPicker
	},
	// commonComponentProps - positions
	left: {
		...pxToNumberHandler,
		text: 'X轴坐标'
	},
	top: {
		...pxToNumberHandler,
		text: 'Y轴坐标'
	}
	// commonComponentProps - actions and urls
	// actions
	// actionType: {
	// 	...defaultHandler,
	// 	Component: Select,
	// 	SubComponent: Select.Option,
	// 	text: '点击',
	// 	options: [
	// 		{ value: '', text: '无' },
	// 		{ value: 'to', text: '跳转到 URL' }
	// 	]
	// },
	// url: {
	// 	...defaultHandler,
	// 	afterTransform: (e: any) => e.target.value,
	// 	text: '链接'
	// },
	// backgroundImage: {
	// 	...defaultHandler,
	// 	Component: 'background-processer',
	// 	initalTransform: (v: string) => {
	// 		if (v) {
	// 			const reg = /\(["'](.+)["']\)/g;
	// 			const matches = reg.exec(v);
	// 			if (matches && matches.length > 1) {
	// 				console.log(matches);
	// 				return matches[1];
	// 			} else {
	// 				return '';
	// 			}
	// 		} else {
	// 			return '';
	// 		}
	// 	},
	// 	afterTransform: (e: string) => (e ? `url('${e}')` : '')
	// }
};
