import React from 'react';
import './index.css';

type Props = {
	value?: string;
	colors?: string[];
	onChange?: (color: string) => void;
};

function ColorPicker(props: Props) {
	const defaultColors = [
		'#ffffff',
		'#f5222d',
		'#fa541c',
		'#fadb14',
		'#52c41a',
		'#1890ff',
		'#722ed1',
		'#8c8c8c',
		'#000000',
		''
	];
	const { colors = defaultColors, onChange, value } = props;

	const handleChange = (color: string) => {
		onChange && onChange(color);
	};

	return (
		<div className="c-color-picker">
			<div className="c-native-color-container">
				<input
					type="color"
					value={value}
					onChange={(e) => handleChange(e.target.value)}
				/>
			</div>
			<ul className="c-picked-color-list">
				{colors.map((c, index) => (
					<li key={index} onClick={() => handleChange(c)}>
						{c.startsWith('#') ? (
							<div className="c-color-item" style={{ backgroundClip: c }}></div>
						) : (
							<div className="c-color-item c-transparent-back"></div>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}

export default ColorPicker;
