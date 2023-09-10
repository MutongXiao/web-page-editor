import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from 'antd';
import { useRequest } from 'ahooks';

import { getComponentStatService } from '@/services/stat';
import { getEditorWidgetByName } from '@/utils/getEditorWidgets';

const { Title } = Typography;

type PropsType = {
	selectedWidgetId: string;
	selectedWidgetName: string;
};

const ChartStat: FC<PropsType> = (props: PropsType) => {
	const { selectedWidgetId, selectedWidgetName } = props;
	const { id = '' } = useParams();

	const [stat, setStat] = useState<
		{
			name: string;
			count: number;
		}[]
	>([]);
	const { run } = useRequest(
		async (questionId, componentId) =>
			await getComponentStatService(questionId, componentId),
		{
			manual: true,
			onSuccess(res) {
				const result = res.data!;
				setStat(result.stat);
			}
		}
	);

	useEffect(() => {
		if (selectedWidgetId) run(id, selectedWidgetId);
	}, [id, selectedWidgetId]);

	// 生成统计图表
	function genStatElem() {
		if (!selectedWidgetId) return <div>未选中组件</div>;

		const Widget = getEditorWidgetByName(selectedWidgetName);

		if (!Widget?.StatComponent) return <div>该组件无统计图表</div>;

		return <Widget.StatComponent stat={stat} />;
	}

	return (
		<>
			<Title level={3}>图表统计</Title>
			<div>{genStatElem()}</div>
		</>
	);
};

export default ChartStat;
