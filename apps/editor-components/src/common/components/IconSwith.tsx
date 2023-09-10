import React, { ReactElement, useState } from 'react';
import { Tooltip, Button } from 'antd';

type Props = {
	Icon: ReactElement;
	checked?: boolean;
	tip?: string;
	onChange?: (value: boolean) => void;
};

function IconSwith(props: Props) {
	const { Icon, checked = false, tip, onChange } = props;
	const [iconChecked, setIconChecked] = useState(checked);

	const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();
		setIconChecked((preChecked) => {
			onChange && onChange(!preChecked);
			return !preChecked;
		});
	};

	return (
		<div onClick={handleClick}>
			<Tooltip title={tip}>
				<Button
					type={iconChecked ? 'primary' : 'default'}
					shape="circle"
					icon={Icon}
				/>
			</Tooltip>
		</div>
	);
}

export default IconSwith;
