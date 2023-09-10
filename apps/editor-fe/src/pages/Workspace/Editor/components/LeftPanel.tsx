import React, { FC } from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import EditorWidgetsLib from './EditorWidgetsLib';
import WidgetLayers from './WidgetLayers';

const LeftPanel: FC = () => {
	const tabsItems = [
		{
			key: 'componentLib',
			label: (
				<span>
					<AppstoreOutlined />
					组件库
				</span>
			),
			children: <EditorWidgetsLib />
		},
		{
			key: 'layers',
			label: (
				<span>
					<BarsOutlined />
					图层
				</span>
			),
			children: <WidgetLayers />
		}
	];

	return <Tabs defaultActiveKey="componentLib" items={tabsItems} />;
};

export default LeftPanel;
