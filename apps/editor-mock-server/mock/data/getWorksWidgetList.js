function getWorksWidgetList() {
	return [
		// Info
		{
			fe_id: 'c1', // 注意，由于统计页，左侧和中间需要数据完全一直，所以要写死 fe_id ，不能用 Random.id()
			widgetName: 'InfoWidget', // 组件类型，不能重复，前后端统一好
			title: '问卷信息',
			isHidden: false,
			isLocked: false,
			props: { title: '问卷标题', desc: '问卷描述样本' }
		},
		// Title
		{
			fe_id: 'c2',
			widgetName: 'TitleWidget', // 组件类型，不能重复，前后端统一好
			title: '标题',
			isHidden: false,
			isLocked: false,
			props: { text: '个人信息调研', level: 1, isCenter: false }
		},
		// Input
		{
			fe_id: 'c3',
			widgetName: 'InputWidget',
			title: '输入框1',
			isHidden: false,
			isLocked: false,
			props: { title: '你的姓名', placeholder: '九头奇美拉-奥斯汀-格里芬' }
		},
		// Input
		{
			fe_id: 'c4',
			widgetName: 'InputWidget',
			title: '输入框2',
			isHidden: false,
			isLocked: false,
			props: { title: '你的电话', placeholder: '13245778798' }
		},
		// Textarea
		{
			fe_id: 'c5',
			widgetName: 'TextareaWidget',
			title: '多行输入',
			isHidden: false,
			isLocked: false,
			props: { title: '你的爱好', placeholder: '写代码' }
		},
		// Paragraph
		{
			fe_id: 'c6',
			widgetName: 'ParagraphWidget',
			title: '段落',
			isHidden: false,
			isLocked: false,
			props: { text: '一行段落1\n一行段落2', isCenter: false }
		},
		// Radio
		{
			fe_id: 'c7',
			widgetName: 'RadioWidget',
			title: '单选',
			isHidden: false,
			isLocked: false,
			props: {
				title: '单选标题',
				isVertical: false,
				options: [
					{ value: 'item1', text: '选项1' },
					{ value: 'item2', text: '选项2' },
					{ value: 'item3', text: '选项3' }
				],
				value: ''
			}
		},
		// Checkbox
		{
			fe_id: 'c8',
			widgetName: 'CheckboxWidget',
			title: '多选',
			isHidden: false,
			isLocked: false,
			props: {
				title: '多选标题',
				isVertical: false,
				list: [
					{ value: 'item1', text: '选项1', checked: true },
					{ value: 'item2', text: '选项2', checked: false },
					{ value: 'item3', text: '选项3', checked: false }
				]
			}
		}
	];
}

module.exports = getWorksWidgetList;
