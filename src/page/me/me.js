import Vue from 'vue'
import App from './app'

new Vue({
	el: document.querySelector('.my'),
	template: '<app></app>',
	components: { App },
	replace: false
})

