module.exports = {
	base: '/blog/',
	locales: {
		// 键名是该语言所属的子路径
		// 作为特例，默认语言可以使用 '/' 作为其路径。
		'/': {
			lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
			title: 'VuePress',
			description: 'Vue-powered Static Site Generator'
		},
		'/zh/': {
			lang: 'zh-CN',
			title: 'yu 的个人博客',
			description: '学习小结'
		}
	},
	themeConfig: {
		displayAllHeaders: true,
		sidebarDepth: 2,
		locales: {
			'/': {
				label: 'English',
				sidebar: [
					'/'
				]
			},
			'/zh/': {
				label: '简体中文',
				editLinkText: '在 GitHub 上编辑此页',
				sidebar: [
					['/zh/interview/湖北航信', '湖北航信'],
					['/zh/vue/vue-reactivity', 'vue3 响应式(reactive, ref)'],
					['/zh/vue/VDOM', '手写VDOM'],
					['/zh/js/promise', '手写promise A+']
				],
				nav: [
					{ text: 'Interview', link: '/zh/interview/湖北航信' },
					{ text: 'JS', link: '/zh/js/promise' },
                    { text: 'Vue', link: '/zh/vue/vue-reactivity' }
				  ]
			}
		},
		docsDir: 'docs',
		editLinks: true,
		sidebar: 'auto'
	},
}