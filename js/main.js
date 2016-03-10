'use strict';

$(document).ready(function() {

	const mySlider = new Slider(),
		myProducts = new Products(),
		myScroll = new Scroll(),
		myForm = new Form()
	;

	mySlider.init(true);
	myProducts.init();
	myScroll.init();
	myForm.init();
});

function Slider() {

	this.autoplay;
	this.currentSlide = 0;
	this.timer = 3; // En secondes
	this.transition = 'none';

	this.init = (autoplay) => {
		this.autoplay = autoplay;

		this.initFirstSlide();
		this.autoplaySlides();
	};

	this.show = (element) => {
		(this.transition === 'fade') ? element.fadeIn() : element.show();
	};

	this.hide = (element) => {
		(this.transition === 'fade') ? element.fadeOut() : element.hide();
	};

	this.initFirstSlide = () => {
		this.show($('.slider li').eq(this.currentSlide));
	};

	this.nextSlide = () => {
		this.hide($('.slider li').eq(this.currentSlide));

		this.currentSlide = (this.currentSlide !== 2) ? this.currentSlide + 1 : 0;
		this.show($('.slider li').eq(this.currentSlide));

		$('.slider_navigation span')
			.removeClass('active')
			.eq(this.currentSlide)
			.addClass('active')
		;
	};
	
	this.autoplaySlides = () => {

		if(this.autoplay) {

			setInterval(() => {
				this.nextSlide();
			}, this.timer * 1000);
		}
	};
}

function Products() {

	this.init = () => {
		this.initFunctions();
	};

	this.initFunctions = () => {

		$('.products_menu li').on('click', function() {

			const this_eq = parseInt($(this).data('number'));

			if(!$('.products_description li').eq(this_eq).hasClass('active')) {

				$('.products_menu li').removeClass('active');
				$(this).addClass('active');

				$('.products_description li')
					.removeClass('active')
					.eq(this_eq)
					.addClass('active')
				;
			}
		});
	};
}

function Scroll() {

	this.animIsDone = false;

	this.init = () => {
		this.initFunctions();
	};

	this.animatePictures = () => {
		$('.presentation img').addClass('animate');
	};

	this.initFunctions = () => {

		$(window).on('scroll', () => {

			if($(document).scrollTop() > ($('.presentation').offset().top - 100) && !this.animIsDone) {
				this.animIsDone = true;

				// Plus de fluidité
				setTimeout(this.animatePictures, 100);
			}
		});
	};
}

function Form() {

	this.init = () => {
		this.initFunctions();
	};

	this.initFunctions = () => {

		$('form').on('submit', function(e) {
			e.preventDefault();

			$('form').empty();
			$('form').append('<p style="color:#fff;">Merci pour votre message !</p>');

			$('.plane').addClass('active');

			setTimeout(function() {
				$('.plane').addClass('animate');
				$('html, body').css('overflow-x', 'hidden');

				setTimeout(function() {
					$('html, body').css('overflow-x', 'auto');
					$('.plane').removeClass('active');
				}, 10000);
			}, 100);
		});
	};
}
