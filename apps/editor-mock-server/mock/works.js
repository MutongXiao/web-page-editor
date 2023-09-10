const Mock = require('mockjs');
const getWorksList = require('./data/getWorksList');
const getWorksWidgetList = require('./data/getWorksWidgetList');

const Random = Mock.Random;

module.exports = [
	{
		// 获取单个问卷信息
		url: '/api/works/:id',
		method: 'get',
		response() {
			return {
				errno: 0,
				data: {
					id: Random.id(),
					title: Random.ctitle(),
					desc: '问卷描述',
					js: '',
					css: '',
					isDeleted: false,
					isPublished: true,
					worksWidgetList: getWorksWidgetList()
				}

				// errno: 1002,
				// msg: '错误测试'
			};
		}
	},
	{
		// 创建问卷
		url: '/api/works',
		method: 'post',
		response() {
			return {
				errno: 0,
				data: {
					id: Random.id()
				}
			};
		}
	},
	{
		// 获取（查询）问卷列表
		url: '/api/works',
		method: 'get',
		response(ctx) {
			const { url = '', query = {} } = ctx;
			const isDeleted = url.indexOf('isDeleted=true') >= 0;
			const isStar = url.indexOf('isStar=true') >= 0;
			const pageSize = parseInt(query.pageSize) || 10;

			return {
				errno: 0,
				data: {
					list: getWorksList({ len: pageSize, isDeleted, isStar }), // 当前页
					total: 100 // 总数，用于分页
				}
			};
		}
	},
	{
		// 更新问卷
		url: '/api/works/:id',
		method: 'patch',
		response() {
			return {
				errno: 0,
				msg: '更新成功'
			};
		}
	},
	{
		// 复制问卷
		url: '/api/works/duplicate/:id',
		method: 'post',
		response() {
			return {
				errno: 0,
				data: {
					id: Random.id()
				}
			};
		}
	},
	{
		// 批量彻底删除
		url: '/api/works',
		method: 'delete',
		response() {
			return {
				errno: 0,
				msg: '删除成功'
			};
		}
	}
];
