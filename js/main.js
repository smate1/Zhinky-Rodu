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
	const dropdowns = document.querySelectorAll('[data-projects-dropdown]')

	dropdowns.forEach(dropdown => {
		const trigger = dropdown.querySelector('.header__nav-dropdown-trigger')
		const menu = dropdown.querySelector('.header__nav-dropdown-menu')
		const arrow = dropdown.querySelector('.header__nav-dropdown-arrow')

		if (!trigger || !menu) return

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

		const toggle = event => {
			event.stopPropagation()
			dropdown.classList.contains('is-open') ? close() : open()
		}

		trigger.addEventListener('click', toggle)
		arrow?.addEventListener('click', toggle)

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
	const headerTop = document.querySelector('.header__top')
	const headerBottom = document.querySelector('[data-header-bottom]')

	if (!headerTop || !headerBottom) return

	const spacer = document.createElement('div')
	spacer.className = 'header__bottom-spacer'
	spacer.setAttribute('aria-hidden', 'true')
	headerBottom.after(spacer)

	const setSticky = isSticky => {
		const isCurrentlySticky = headerBottom.classList.contains('is-sticky')

		if (isSticky && !isCurrentlySticky) {
			spacer.style.height = `${headerBottom.offsetHeight}px`
			headerBottom.classList.add('is-sticky')
		} else if (!isSticky && isCurrentlySticky) {
			headerBottom.classList.remove('is-sticky')
			spacer.style.height = '0'
		}
	}

	const updateSticky = () => {
		setSticky(headerTop.getBoundingClientRect().bottom <= 0)
	}

	let ticking = false

	window.addEventListener(
		'scroll',
		() => {
			if (ticking) return
			ticking = true
			requestAnimationFrame(() => {
				updateSticky()
				ticking = false
			})
		},
		{ passive: true },
	)

	window.addEventListener('resize', () => {
		if (headerBottom.classList.contains('is-sticky')) {
			spacer.style.height = `${headerBottom.offsetHeight}px`
		}
	})

	updateSticky()
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
;(function () {
	const slider = document.querySelector('[data-projects-slider]')
	if (!slider) return

	const track = slider.querySelector('.projects__slider-track')
	const dots = slider.querySelectorAll('.projects__slider-dot')
	const prevBtn = slider.querySelector('.projects__slider-arrow--prev')
	const nextBtn = slider.querySelector('.projects__slider-arrow--next')

	if (!track) return

	const slidesPerView = 4
	let items = [...track.querySelectorAll('.projects__slider-item')]
	const originalCount = items.length

	if (!originalCount) return

	const totalPages = Math.ceil(originalCount / slidesPerView)

	const prependFragment = document.createDocumentFragment()
	for (let i = originalCount - slidesPerView; i < originalCount; i++) {
		prependFragment.appendChild(items[i].cloneNode(true))
	}
	track.insertBefore(prependFragment, track.firstChild)

	const appendFragment = document.createDocumentFragment()
	for (let i = 0; i < slidesPerView; i++) {
		appendFragment.appendChild(items[i].cloneNode(true))
	}
	track.appendChild(appendFragment)

	items = [...track.querySelectorAll('.projects__slider-item')]

	let position = slidesPerView

	const getItemStep = () => {
		const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
		return items[0].offsetWidth + gap
	}

	const getOffset = index => index * getItemStep()

	const getLogicalPage = index => {
		if (index >= slidesPerView + originalCount) return 0
		if (index < slidesPerView) return totalPages - 1
		return (index - slidesPerView) / slidesPerView
	}

	const updateDots = page => {
		dots.forEach((dot, i) => {
			const isActive = i === page
			dot.classList.toggle('is-active', isActive)
			dot.setAttribute('aria-selected', isActive ? 'true' : 'false')
		})
	}

	const setPosition = (index, animate = true) => {
		position = index
		track.style.transition = animate ? 'transform 0.5s ease' : 'none'
		track.style.transform = `translateX(-${getOffset(index)}px)`
		updateDots(getLogicalPage(index))
	}

	track.addEventListener('transitionend', event => {
		if (event.propertyName !== 'transform') return

		if (position >= slidesPerView + originalCount) {
			setPosition(slidesPerView, false)
		} else if (position < slidesPerView) {
			setPosition(slidesPerView + (totalPages - 1) * slidesPerView, false)
		}
	})

	const goNext = () => setPosition(position + slidesPerView, true)
	const goPrev = () => setPosition(position - slidesPerView, true)

	const goToPage = page => {
		setPosition(slidesPerView + page * slidesPerView, true)
	}

	prevBtn?.addEventListener('click', goPrev)
	nextBtn?.addEventListener('click', goNext)

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const index = Number(dot.dataset.slideTo)
			if (!Number.isNaN(index)) goToPage(index)
		})
	})

	setPosition(slidesPerView, false)

	window.addEventListener('resize', () => {
		setPosition(position, false)
	})
})()
;(function () {
	const slider = document.querySelector('[data-media-slider]')
	if (!slider) return

	const track = slider.querySelector('.media__slider-track')
	const dots = slider.querySelectorAll('.media__slider-dot')
	const prevBtn = slider.querySelector('.media__slider-arrow--prev')
	const nextBtn = slider.querySelector('.media__slider-arrow--next')

	if (!track) return

	const slidesPerView = 4
	let items = [...track.querySelectorAll('.media__slider-item')]
	const originalCount = items.length

	if (!originalCount) return

	const totalPages = Math.ceil(originalCount / slidesPerView)

	const prependFragment = document.createDocumentFragment()
	for (let i = originalCount - slidesPerView; i < originalCount; i++) {
		prependFragment.appendChild(items[i].cloneNode(true))
	}
	track.insertBefore(prependFragment, track.firstChild)

	const appendFragment = document.createDocumentFragment()
	for (let i = 0; i < slidesPerView; i++) {
		appendFragment.appendChild(items[i].cloneNode(true))
	}
	track.appendChild(appendFragment)

	items = [...track.querySelectorAll('.media__slider-item')]

	let position = slidesPerView

	const getItemStep = () => {
		const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
		return items[0].offsetWidth + gap
	}

	const getOffset = index => index * getItemStep()

	const getLogicalPage = index => {
		if (index >= slidesPerView + originalCount) return 0
		if (index < slidesPerView) return totalPages - 1
		return (index - slidesPerView) / slidesPerView
	}

	const updateDots = page => {
		dots.forEach((dot, i) => {
			const isActive = i === page
			dot.classList.toggle('is-active', isActive)
			dot.setAttribute('aria-selected', isActive ? 'true' : 'false')
		})
	}

	const setPosition = (index, animate = true) => {
		position = index
		track.style.transition = animate ? 'transform 0.5s ease' : 'none'
		track.style.transform = `translateX(-${getOffset(index)}px)`
		updateDots(getLogicalPage(index))
	}

	track.addEventListener('transitionend', event => {
		if (event.propertyName !== 'transform') return

		if (position >= slidesPerView + originalCount) {
			setPosition(slidesPerView, false)
		} else if (position < slidesPerView) {
			setPosition(slidesPerView + (totalPages - 1) * slidesPerView, false)
		}
	})

	const goNext = () => setPosition(position + slidesPerView, true)
	const goPrev = () => setPosition(position - slidesPerView, true)

	const goToPage = page => {
		setPosition(slidesPerView + page * slidesPerView, true)
	}

	prevBtn?.addEventListener('click', goPrev)
	nextBtn?.addEventListener('click', goNext)

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const index = Number(dot.dataset.slideTo)
			if (!Number.isNaN(index)) goToPage(index)
		})
	})

	setPosition(slidesPerView, false)

	window.addEventListener('resize', () => {
		setPosition(position, false)
	})
})()
;(function () {
	const slider = document.querySelector('[data-activities-slider]')
	if (!slider) return

	const track = slider.querySelector('.activities__slider-track')
	const dots = slider.querySelectorAll('.activities__slider-dot')
	const prevBtn = slider.querySelector('.activities__slider-arrow--prev')
	const nextBtn = slider.querySelector('.activities__slider-arrow--next')

	if (!track) return

	const slidesPerView = 4
	let items = [...track.querySelectorAll('.activities__slider-item')]
	const originalCount = items.length

	if (!originalCount) return

	const totalPages = Math.ceil(originalCount / slidesPerView)

	const prependFragment = document.createDocumentFragment()
	for (let i = originalCount - slidesPerView; i < originalCount; i++) {
		prependFragment.appendChild(items[i].cloneNode(true))
	}
	track.insertBefore(prependFragment, track.firstChild)

	const appendFragment = document.createDocumentFragment()
	for (let i = 0; i < slidesPerView; i++) {
		appendFragment.appendChild(items[i].cloneNode(true))
	}
	track.appendChild(appendFragment)

	items = [...track.querySelectorAll('.activities__slider-item')]

	let position = slidesPerView

	const getItemStep = () => {
		const gap = Number.parseFloat(getComputedStyle(track).gap) || 0
		return items[0].offsetWidth + gap
	}

	const getOffset = index => index * getItemStep()

	const getLogicalPage = index => {
		if (index >= slidesPerView + originalCount) return 0
		if (index < slidesPerView) return totalPages - 1
		return (index - slidesPerView) / slidesPerView
	}

	const updateDots = page => {
		dots.forEach((dot, i) => {
			const isActive = i === page
			dot.classList.toggle('is-active', isActive)
			dot.setAttribute('aria-selected', isActive ? 'true' : 'false')
		})
	}

	const setPosition = (index, animate = true) => {
		position = index
		track.style.transition = animate ? 'transform 0.5s ease' : 'none'
		track.style.transform = `translateX(-${getOffset(index)}px)`
		updateDots(getLogicalPage(index))
	}

	track.addEventListener('transitionend', event => {
		if (event.propertyName !== 'transform') return

		if (position >= slidesPerView + originalCount) {
			setPosition(slidesPerView, false)
		} else if (position < slidesPerView) {
			setPosition(slidesPerView + (totalPages - 1) * slidesPerView, false)
		}
	})

	const goNext = () => setPosition(position + slidesPerView, true)
	const goPrev = () => setPosition(position - slidesPerView, true)

	const goToPage = page => {
		setPosition(slidesPerView + page * slidesPerView, true)
	}

	prevBtn?.addEventListener('click', goPrev)
	nextBtn?.addEventListener('click', goNext)

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const index = Number(dot.dataset.slideTo)
			if (!Number.isNaN(index)) goToPage(index)
		})
	})

	setPosition(slidesPerView, false)

	window.addEventListener('resize', () => {
		setPosition(position, false)
	})
})()
;(function () {
	const downloadButtons = document.querySelectorAll('.reports__download[data-download]')

	downloadButtons.forEach(button => {
		button.addEventListener('click', async () => {
			const url = button.dataset.download
			if (!url || url === '#') return

			const fileName =
				button.dataset.downloadName || url.split('/').pop() || 'download'

			try {
				const response = await fetch(url)

				if (!response.ok) {
					throw new Error('File not found')
				}

				const blob = await response.blob()
				const objectUrl = URL.createObjectURL(blob)
				const link = document.createElement('a')

				link.href = objectUrl
				link.download = fileName
				link.rel = 'noopener'
				document.body.appendChild(link)
				link.click()
				link.remove()
				URL.revokeObjectURL(objectUrl)
			} catch {
				const link = document.createElement('a')
				link.href = url
				link.download = fileName
				link.rel = 'noopener'
				document.body.appendChild(link)
				link.click()
				link.remove()
			}
		})
	})
})()
