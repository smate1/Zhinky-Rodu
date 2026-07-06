;(function () {
	const dropdowns = document.querySelectorAll('[data-language-dropdown]')

	dropdowns.forEach(dropdown => {
		const trigger = dropdown.querySelector('.header__language-trigger')
		const menu = dropdown.querySelector('.header__language-menu')
		const options = dropdown.querySelectorAll('.header__language-option')
		const valueEl = dropdown.querySelector('.header__language-value')
		const nativeSelect = dropdown.querySelector('.header__language-native')

		if (!trigger || !menu || !valueEl) return

		const open = () => {
			dropdown.classList.add('is-open')
			trigger.setAttribute('aria-expanded', 'true')
			menu.setAttribute('aria-hidden', 'false')
		}

		const close = () => {
			dropdown.classList.remove('is-open')
			trigger.setAttribute('aria-expanded', 'false')
			menu.setAttribute('aria-hidden', 'true')
		}

		const selectOption = option => {
			const value = option.dataset.value
			const text = option.textContent.trim()

			options.forEach(item => {
				item.classList.toggle('is-active', item === option)
				item.setAttribute('aria-selected', item === option ? 'true' : 'false')
			})

			valueEl.textContent = text
			if (nativeSelect) nativeSelect.value = value
			close()
		}

		trigger.addEventListener('click', event => {
			event.stopPropagation()
			dropdown.classList.contains('is-open') ? close() : open()
		})

		options.forEach(option => {
			option.addEventListener('click', () => selectOption(option))
		})

		document.addEventListener('click', event => {
			if (!dropdown.contains(event.target)) close()
		})

		document.addEventListener('keydown', event => {
			if (event.key === 'Escape') close()
		})
	})
})()

;(function () {
	const searchBlocks = document.querySelectorAll('[data-header-search]')

	searchBlocks.forEach(block => {
		const input = block.querySelector('.header__search-input')
		const toggle = block.querySelector('.header__search-toggle')
		const bottom = block.closest('[data-header-bottom]')
		const nav = bottom?.querySelector('.header__nav')

		if (!input || !toggle) return

		const open = () => {
			block.classList.add('is-open')
			bottom?.classList.add('is-search-open')
			toggle.setAttribute('aria-expanded', 'true')
			nav?.setAttribute('aria-hidden', 'true')
			input.focus()
		}

		const close = () => {
			block.classList.remove('is-open')
			bottom?.classList.remove('is-search-open')
			toggle.setAttribute('aria-expanded', 'false')
			nav?.setAttribute('aria-hidden', 'false')
		}

		toggle.addEventListener('click', event => {
			event.stopPropagation()
			block.classList.contains('is-open') ? close() : open()
		})

		document.addEventListener('click', event => {
			if (!block.contains(event.target)) close()
		})

		document.addEventListener('keydown', event => {
			if (event.key === 'Escape') close()
		})
	})
})()

;(function () {
	const slider = document.querySelector('[data-header-slider]')
	if (!slider) return

	const bgSlides = slider.querySelectorAll('.header__bg-slide')
	const personSlides = slider.querySelectorAll('.header__person-slide')
	const slides = slider.querySelectorAll('.header__slide')
	const dots = slider.querySelectorAll('.header__slider-dot')
	const prevBtn = slider.querySelector('.header__slider-arrow--prev')
	const nextBtn = slider.querySelector('.header__slider-arrow--next')

	if (!bgSlides.length) return

	let current = 0

	const goToSlide = index => {
		const total = bgSlides.length
		current = (index + total) % total

		bgSlides.forEach((bg, i) => {
			bg.classList.toggle('is-active', i === current)
		})

		personSlides.forEach((person, i) => {
			person.classList.toggle('is-active', i === current)
		})

		slides.forEach((slide, i) => {
			slide.classList.toggle('is-active', i === current)
		})

		dots.forEach((dot, i) => {
			const isActive = i === current
			dot.classList.toggle('is-active', isActive)
			dot.setAttribute('aria-selected', isActive ? 'true' : 'false')
		})
	}

	prevBtn?.addEventListener('click', () => goToSlide(current - 1))
	nextBtn?.addEventListener('click', () => goToSlide(current + 1))

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const index = Number(dot.dataset.slideTo)
			if (!Number.isNaN(index)) goToSlide(index)
		})
	})
})()
