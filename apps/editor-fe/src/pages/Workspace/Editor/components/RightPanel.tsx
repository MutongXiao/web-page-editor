import React, { type FC, useState } from 'react';
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';

import WidgetProps from './WidgetProps';
import PageSetting from './PageSetting';

// TS 枚举
enum TAB_KEYS {
	PROP_KEY = 'prop',
	SETTING_KEY = 'setting'
}

const RightPanel: FC = () => {
	const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);

	const onTapChange = (key: string) => {
		setActiveKey(key as TAB_KEYS);
	};

	const tabsItems = [
		{
			key: TAB_KEYS.PROP_KEY,
			label: (
				<span>
					<FileTextOutlined />
					属性
				</span>
			),
			children: <WidgetProps />
		},
		{
			key: TAB_KEYS.SETTING_KEY,
			label: (
				<span>
					<SettingOutlined />
					页面设置
				</span>
			),
			children: <PageSetting />
		}
	];

	return (
		<Tabs activeKey={activeKey} items={tabsItems} onChange={onTapChange}></Tabs>
	);
};

export default RightPanel;
