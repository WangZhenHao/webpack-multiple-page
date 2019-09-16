var page = {
	init() {
		this.test();
		this.promis().then(res => {
			alert(res)
		})
	},
	test(persion: string = 'name') {
	  return `hello ${persion}`
	},
	promis() {
		return new Promise((res, rej) => {
			res('wzh')
		})
	}
}

page.init();

export default page;
