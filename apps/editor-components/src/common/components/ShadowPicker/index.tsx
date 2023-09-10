import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';

import ColorPicker from '../ColorPicker';
import './index.css';

type Props = {
	value: string;
	onChange: (value: string) => void;
};

function ShadowPicker(props: Props) {
	const { value, onChange } = props;
	const [shadowValues, setShadowValues] = useState(() => {
		// box shadow should like this
		// 10px 10px 0px red;
		// the first two should be sizes
		// the 3rd one should be blur
		// the last one should be colors
		return value.split(' ');
	});

	useEffect(() => {
		setShadowValues(value.split(' '));
	}, [value]);

	const handleUpdate = (
		newValue: number | string,
		index: number | number[]
	) => {
		if (onChange) {
			const newValues = shadowValues.map((item, i) => {
				if (typeof index === 'number' && i === index) {
					return typeof newValue === 'number' ? newValue + 'px' : newValue;
				} else if (Array.isArray(index) && index.includes(i)) {
					return typeof newValue === 'number' ? newValue + 'px' : newValue;
				} else {
					return item;
				}
			});
			onChange(newValues.join(' '));
		}
	};
	return (
		<div className="c-component-shadow-picker">
			<div className="c-shadow-item">
				<span>阴影颜色:</span>
				<div className="c-shadow-component">
					<ColorPicker
						value={shadowValues[3]}
						onChange={(v) => {
							handleUpdate(v, 3);
						}}
					/>
				</div>
			</div>
			<div className="c-shadow-item">
				<span>阴影大小:</span>
				<div className="c-shadow-component">
					<Slider
						value={parseInt(shadowValues[0])}
						min={0}
						max={20}
						onChange={(v) => {
							handleUpdate(v, [0, 1]);
						}}
					/>
				</div>
			</div>
			<div className="c-shadow-item">
				<span>阴影模糊:</span>
				<div className="c-shadow-component">
					<Slider
						value={parseInt(shadowValues[2])}
						min={0}
						max={20}
						onChange={(v) => {
							handleUpdate(v, 2);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default ShadowPicker;
