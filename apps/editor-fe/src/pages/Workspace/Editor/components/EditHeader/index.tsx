import React, { FC, useState, ChangeEvent, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Typography, Space, Input, message } from 'antd';
import {
	LeftOutlined,
	EditOutlined,
	LoadingOutlined,
	CheckOutlined
} from '@ant-design/icons';
import { useRequest, useKeyPress } from 'ahooks';

import EditToolbar from '../EditToolbar';
import useGetLocalWorksPageInfo from '@/hooks/useGetLocalWorksPageInfo';
import useGetLocalWorksWidgets from '@/hooks/useGetLocalWorksWidgets';
import { changePageTitle } from '@/store/worksPageInfo';
import { updateWorksByIdService } from '@/services/works';
import styles from './EditHeader.module.less';

const { Title } = Typography;

// 显示和修改标题
const TitleElem: FC = () => {
	const { title } = useGetLocalWorksPageInfo();
	const dispatch = useDispatch();
	const editingTitle = useRef('');
	const [editing, setEditing] = useState(false);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		editingTitle.current = event.target.value;
	}

	function saveTitle() {
		setEditing(false);
		if (!editingTitle.current.trim()) return;
		dispatch(changePageTitle(editingTitle.current));
	}

	if (editing) {
		return (
			<Space>
				<Input
					autoFocus
					defaultValue={title}
					onChange={handleChange}
					onPressEnter={saveTitle}
					onBlur={saveTitle}
				/>
				<Button icon={<CheckOutlined />} type="primary" onClick={saveTitle} />
			</Space>
		);
	}

	return (
		<Space>
			<Title>{title}</Title>
			<Button
				icon={<EditOutlined />}
				type="text"
				onClick={() => setEditing(true)}
			/>
		</Space>
	);
};

// 保存按钮
const SaveButton: FC = () => {
	const { id } = useParams();
	const { widgetsList = [] } = useGetLocalWorksWidgets();
	const pageInfo = useGetLocalWorksPageInfo();

	const { loading, run: save } = useRequest(
		async () => {
			if (!id) return;
			await updateWorksByIdService(id, { ...pageInfo, widgetsList });
			message.success('保存成功');
		},
		{ manual: true }
	);

	// 快捷键
	useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
		event.preventDefault();
		if (!loading) save();
	});

	return (
		<Button
			onClick={save}
			disabled={loading}
			icon={loading ? <LoadingOutlined /> : null}
		>
			保存
		</Button>
	);
};

// 发布按钮
const PublishButton: FC = () => {
	const nav = useNavigate();
	const { id } = useParams();
	const { widgetsList = [] } = useGetLocalWorksWidgets();
	const pageInfo = useGetLocalWorksPageInfo();

	const { loading, run: pub } = useRequest(
		async () => {
			if (!id) return;
			await updateWorksByIdService(id, {
				...pageInfo,
				widgetsList,
				isPublished: true // 标志着问卷已经被发布
			});
		},
		{
			manual: true,
			onSuccess() {
				message.success('发布成功');
				nav('/workspace/stat/' + id); // 发布成功，跳转到统计页面
			}
		}
	);

	return (
		<Button type="primary" onClick={pub} disabled={loading}>
			发布
		</Button>
	);
};

// 编辑器头部
const EditHeader: FC = () => {
	const nav = useNavigate();

	return (
		<div className={styles['header-wrapper']}>
			<div className={styles.header}>
				<div className={styles.left}>
					<Space>
						<Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
							返回
						</Button>
						<TitleElem />
					</Space>
				</div>
				<div className={styles.main}>
					<EditToolbar />
				</div>
				<div className={styles.right}>
					<Space>
						<SaveButton />
						<PublishButton />
					</Space>
				</div>
			</div>
		</div>
	);
};

export default EditHeader;
