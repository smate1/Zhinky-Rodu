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
		const header = block.closest('.header')
		const nav = bottom?.querySelector('.header__nav')

		if (!input || !toggle) return

		const open = () => {
			block.classList.add('is-open')
			bottom?.classList.add('is-search-open')
			header?.classList.add('header--menu-search-open')
			toggle.setAttribute('aria-expanded', 'true')
			nav?.setAttribute('aria-hidden', 'true')
			input.focus()
		}

		const close = () => {
			block.classList.remove('is-open')
			bottom?.classList.remove('is-search-open')
			header?.classList.remove('header--menu-search-open')
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
	const header = document.querySelector('.header')
	const menu = document.querySelector('[data-header-menu]')
	const openBtn = document.querySelector('[data-menu-open]')
	const closeBtn = document.querySelector('[data-menu-close]')
	const headerRight = document.querySelector('[data-header-right]')
	const language = document.querySelector('[data-header-language]')
	const socials = document.querySelector('[data-header-socials]')
	const search = document.querySelector('[data-header-search]')
	const center = document.querySelector('[data-header-center]')
	const languageSlot = document.querySelector('[data-menu-language-slot]')
	const searchSlot = document.querySelector('[data-menu-search-slot]')
	const socialsSlot = document.querySelector('[data-menu-socials-slot]')

	if (!header || !menu || !openBtn || !closeBtn) return

	const mq = window.matchMedia('(max-width: 1350px)')

	const moveToMenu = () => {
		if (language && languageSlot) languageSlot.appendChild(language)
		if (search && searchSlot) searchSlot.appendChild(search)
		if (socials && socialsSlot) socialsSlot.appendChild(socials)
	}

	const moveToDesktop = () => {
		if (language && headerRight) headerRight.appendChild(language)
		if (socials && headerRight) headerRight.insertBefore(socials, language || null)
		if (search && center) center.appendChild(search)
	}

	const openMenu = () => {
		if (!mq.matches) return
		moveToMenu()
		header.classList.add('is-menu-open')
		menu.setAttribute('aria-hidden', 'false')
		openBtn.setAttribute('aria-expanded', 'true')
		document.body.classList.add('no-scroll')
	}

	const closeMenu = () => {
		header.classList.remove('is-menu-open')
		header.classList.remove('header--menu-search-open')
		menu.setAttribute('aria-hidden', 'true')
		openBtn.setAttribute('aria-expanded', 'false')
		document.body.classList.remove('no-scroll')

		const searchBlock = header.querySelector('[data-header-search]')
		searchBlock?.classList.remove('is-open')
		header.querySelector('[data-header-bottom]')?.classList.remove('is-search-open')

		moveToDesktop()
	}

	openBtn.addEventListener('click', openMenu)
	closeBtn.addEventListener('click', closeMenu)

	menu.querySelectorAll('.header__nav-link').forEach(link => {
		link.addEventListener('click', () => {
			if (mq.matches) closeMenu()
		})
	})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && header.classList.contains('is-menu-open')) {
			closeMenu()
		}
	})

	const onViewportChange = () => {
		if (!mq.matches && header.classList.contains('is-menu-open')) {
			closeMenu()
		} else if (!mq.matches) {
			moveToDesktop()
		} else if (!header.classList.contains('is-menu-open')) {
			moveToDesktop()
		}
	}

	mq.addEventListener('change', onViewportChange)
})()
;(function () {
	const headerTop = document.querySelector('.header__top')
	const headerBottom = document.querySelector('[data-header-bottom]')

	if (!headerTop || !headerBottom) return

	const spacer = document.createElement('div')
	spacer.className = 'header__bottom-spacer'
	spacer.setAttribute('aria-hidden', 'true')
	headerBottom.after(spacer)

	const syncMobileSpacer = () => {
		if (!window.matchMedia('(max-width: 1350px)').matches) {
			if (!headerBottom.classList.contains('is-sticky')) {
				spacer.style.height = '0'
			}
			return
		}
		// Keep full ( unscrolled ) height so content never jumps when logo-2 fades
		headerBottom.classList.remove('is-scrolled')
		spacer.style.height = `${headerBottom.offsetHeight}px`
		headerBottom.classList.toggle('is-scrolled', window.scrollY > 4)
	}

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
		const isMobile = window.matchMedia('(max-width: 1350px)').matches

		if (isMobile) {
			setSticky(false)
			headerBottom.classList.toggle('is-scrolled', window.scrollY > 4)
			return
		}

		headerBottom.classList.remove('is-scrolled')
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
		updateSticky()
		syncMobileSpacer()
		if (headerBottom.classList.contains('is-sticky')) {
			spacer.style.height = `${headerBottom.offsetHeight}px`
		}
	})

	syncMobileSpacer()
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
	let autoplayTimer = null
	const AUTOPLAY_MS = 5000

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

	const stopAutoplay = () => {
		if (autoplayTimer) {
			clearInterval(autoplayTimer)
			autoplayTimer = null
		}
	}

	const startAutoplay = () => {
		stopAutoplay()
		autoplayTimer = setInterval(() => goToSlide(current + 1), AUTOPLAY_MS)
	}

	const restartAutoplay = () => {
		stopAutoplay()
		startAutoplay()
	}

	prevBtn?.addEventListener('click', () => {
		goToSlide(current - 1)
		restartAutoplay()
	})
	nextBtn?.addEventListener('click', () => {
		goToSlide(current + 1)
		restartAutoplay()
	})

	dots.forEach(dot => {
		dot.addEventListener('click', () => {
			const index = Number(dot.dataset.slideTo)
			if (!Number.isNaN(index)) {
				goToSlide(index)
				restartAutoplay()
			}
		})
	})

	slider.addEventListener('mouseenter', stopAutoplay)
	slider.addEventListener('mouseleave', startAutoplay)
	slider.addEventListener('focusin', stopAutoplay)
	slider.addEventListener('focusout', event => {
		if (!slider.contains(event.relatedTarget)) startAutoplay()
	})

	startAutoplay()
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
	const slider = document.querySelector('[data-news-slider]')
	if (!slider) return

	const track = slider.querySelector('.news__slider-track')
	const dots = slider.querySelectorAll('.news__slider-dot')
	const prevBtn = slider.querySelector('.news__slider-arrow--prev')
	const nextBtn = slider.querySelector('.news__slider-arrow--next')

	if (!track) return

	const slidesPerView = 4
	let items = [...track.querySelectorAll('.news__slider-item')]
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

	items = [...track.querySelectorAll('.news__slider-item')]

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
	const slider = document.querySelector('[data-useful-slider]')
	if (!slider) return

	const track = slider.querySelector('.useful__slider-track')
	const dots = slider.querySelectorAll('.useful__slider-dot')

	if (!track) return

	const slidesPerView = 1
	let items = [...track.querySelectorAll('.useful__items')]
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

	items = [...track.querySelectorAll('.useful__items')]

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

	const goToPage = page => {
		setPosition(slidesPerView + page * slidesPerView, true)
	}

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
;(function () {
	const marquee = document.querySelector('.partners__marquee')
	const track = document.querySelector('.partners__track')
	const baseGroup = track?.querySelector('.partners__group')

	if (!marquee || !track || !baseGroup) return

	const speed = 50

	const buildMarquee = () => {
		track.replaceChildren(baseGroup)

		while (track.scrollWidth < marquee.offsetWidth * 2) {
			const clone = baseGroup.cloneNode(true)
			clone.setAttribute('aria-hidden', 'true')
			track.appendChild(clone)
		}

		const segmentHTML = track.innerHTML
		track.insertAdjacentHTML('beforeend', segmentHTML)

		track.querySelectorAll('.partners__group:not(:first-child)').forEach(group => {
			group.setAttribute('aria-hidden', 'true')
		})

		const duration = track.scrollWidth / 2 / speed
		track.style.setProperty('--partners-duration', `${duration}s`)
	}

	const initMarquee = () => {
		buildMarquee()

		const images = baseGroup.querySelectorAll('img')
		images.forEach(img => {
			if (!img.complete) {
				img.addEventListener('load', buildMarquee, { once: true })
			}
		})
	}

	initMarquee()

	window.addEventListener('load', buildMarquee)

	let resizeTimer
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimer)
		resizeTimer = setTimeout(buildMarquee, 150)
	})
})()
