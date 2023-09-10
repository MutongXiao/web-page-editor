import React, { FC, useState } from 'react';
import { Typography, Spin, Table, Pagination } from 'antd';
import { useRequest } from 'ahooks';
import { useParams } from 'react-router-dom';

import { getQuestionStatListService } from '@/services/stat';
import useGetLocalWorksWidgets from '@/hooks/useGetLocalWorksWidgets';
import { STAT_PAGE_SIZE } from '@/constant';

const { Title } = Typography;

type PropsType = {
	selectedWidgetId: string;
	setSelectedWidgetId: (id: string) => void;
	setSelectedWidgetName: (type: string) => void;
};

const WorksStatTable: FC<PropsType> = (props: PropsType) => {
	const { selectedWidgetId, setSelectedWidgetId, setSelectedWidgetName } =
		props;

	const { id = '' } = useParams();

	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE);
	const [total, setTotal] = useState(0);
	const [list, setList] = useState<
		{
			[key: string]: any;
			_id: string;
		}[]
	>([]);
	const { loading } = useRequest(
		async () => {
			const res = await getQuestionStatListService(id, { page, pageSize });
			return res;
		},
		{
			refreshDeps: [id, page, pageSize],
			onSuccess(res) {
				const { total, list = [] } = res.data!;
				setTotal(total);
				setList(list);
			}
		}
	);

	const { widgetsList } = useGetLocalWorksWidgets();
	const columns = widgetsList.map((c) => {
		const { fe_id, title, props = {}, widgetName } = c;

		const colTitle = props!.title || title;

		return {
			// title: colTitle,
			title: (
				<div
					style={{ cursor: 'pointer' }}
					onClick={() => {
						setSelectedWidgetId(fe_id);
						setSelectedWidgetName(widgetName);
					}}
				>
					<span
						style={{
							color: fe_id === selectedWidgetId ? '#1890ff' : 'inherit'
						}}
					>
						{colTitle}
					</span>
				</div>
			),
			dataIndex: fe_id
		};
	});

	const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
	const TableElem = (
		<>
			<Table
				columns={columns}
				dataSource={dataSource}
				pagination={false}
			></Table>
			<div style={{ textAlign: 'center', marginTop: '18px' }}>
				<Pagination
					total={total}
					pageSize={pageSize}
					current={page}
					onChange={(page) => setPage(page)}
					onShowSizeChange={(page, pageSize) => {
						setPage(page);
						setPageSize(pageSize);
					}}
				/>
			</div>
		</>
	);

	return (
		<div>
			<Title level={3}>答卷数量: {!loading && total}</Title>
			{loading && (
				<div style={{ textAlign: 'center' }}>
					<Spin />
				</div>
			)}
			{!loading && TableElem}
		</div>
	);
};

export default WorksStatTable;
