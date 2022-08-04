jQuery(window).on('load', function () {
    
    // аккордион внутри статьи блога
    $('.accordion-list').wrap('<div class="accordion-wrapper">').wrap('<div class="accordion-content">');
    $('.accordion-wrapper').each(function () {
        let accordion = $(this),
            content = accordion.find('.accordion-content');

        accordion.prepend('<button type="button" class="accordion-btn active"><p class="ac-1 d-none">Show table of contents</p><p class="ac-2">Hide table of contents</p></button>');

        let btn = accordion.find('.accordion-btn');

        $(btn).on('click', function (e) {
            $(this).toggleClass('active');
            $(this).find('p').toggleClass('d-none');
            content.slideToggle();
        });

    });

    //передаресация с формы GET THE PRINT VERSION
    document.addEventListener('wpcf7mailsent', function (event) {
        console.log(event.detail.contactFormId);
        if (event.detail.contactFormId == 2965) {
            window.location.href = "https://goodcrypto.app/thanks/";
        }
        if (event.detail.contactFormId == 2966) {
            window.location.href = "https://goodcrypto.app/ru/thanks-ru/";
        }
    }, false);

    $('.wpcf7 input[type="file"]').each(function () {
        $(this).addClass('opacity0');
        $(this).on('change', function () {
            if ($(this).val() == '') {
                $(this).addClass('opacity0');
                $(this).parents('.attachblock').find('.attach-text').removeClass('d-none');
            } else {
                $(this).removeClass('opacity0');
                $(this).parents('.attachblock').find('.attach-text').addClass('d-none');
            }
        });
    });

    if ($(window).width() < 576 && window.Swiper) {

        $('.about-team .at-block').each(function () {
            $(this).wrap('<div class="swiper-slide"></div>');
        });

        $('.about-team .swiper-slide').appendTo('.about-team .swiper-wrapper');

        var swiper = new Swiper('.swiper-team', {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: true,
            autoHeight: true,

            navigation: {
                nextEl: '.team-next',
                prevEl: '.team-prev',
            },
        });
    }

    $(document).on('click', '.searching form button', function (e) {

        if (!$('.searching form').hasClass('active')) {
            e.preventDefault();
            $('.searching form').addClass('active');
        }
    });

    $('.searching form .closing').click(function () {
        $('.searching form').removeClass('active');
    });

    if ($(window).width() < 1200) {
        $('.header .menu-wrapper').prependTo('.left-menu .links');
    }

    if (!$('.digest-row').length) {
        $('.blog-entries .row > div:first-of-type').removeClass('col-sm-6');
        $('.blog-entries .row').addClass('change-row');
    } else {
        $('.digest-row .row > div:first-of-type').removeClass('col-sm-6');
        $('.blog-entries .row').removeClass('change-row');
        $('.digest-row .row').addClass('change-row');
    }

    if (window.Swiper) {
        var swiper = new Swiper('.swiper-reviews', {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
            breakpoints: {
                // when window width is <= 320px
                0: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is <= 480px
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is <= 640px
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 70
                }
            },

            navigation: {
                nextEl: '.reviews-next',
                prevEl: '.reviews-prev',
            },
        });
    }

    if ($(window).width() < 768 && window.Swiper) {
        var swiper = new Swiper('.swiper-categories', {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,

            navigation: {
                nextEl: '.categories-next',
                prevEl: '.categories-prev',
            },
        });
    }
    // подгрузка постов (disabled for static)
    // $('.misha_loadmore').click(function (e) {
    //     e.preventDefault();

    //     var text = $(this).data('text'),
    //         loads = $(this).data('load');

    //     var button = $(this),
    //         data = {
    //             'action': 'loadmore',
    //             'query': misha_loadmore_params.posts, // that's how we get params from wp_localize_script() function
    //             'page': misha_loadmore_params.current_page
    //         };

    //     $.ajax({ // you can also use $.post here
    //         url: misha_loadmore_params.ajaxurl, // AJAX handler
    //         data: data,
    //         type: 'POST',
    //         beforeSend: function (xhr) {
    //             button.text(loads); // change the button text, you can also add a preloader image
    //         },
    //         success: function (data) {
    //             if (data) {
    //                 button.text(text);
    //                 $('#more-posts').append(data);
    //                 // insert new posts
    //                 misha_loadmore_params.current_page++;

    //                 if (misha_loadmore_params.current_page == misha_loadmore_params.max_page)
    //                     button.remove(); // if last page, remove the button

    //                 // you can also fire the "post-load" event here if you use a plugin that requires it
    //                 // $( document.body ).trigger( 'post-load' );
    //             } else {
    //                 button.remove(); // if no data, remove the button as well
    //             }

    //         }
    //     });
    // });


    //моб.меню
    $('.manage .humb').click(function () {
        $('.left-menu').addClass('active');
    });
    $('.close-menu').click(function () {
        $('.left-menu').removeClass('active');
    });

    // SEND FORMS
    $('.send-ajax').click(function () {
        $(this).prop('disabled', true);
        $(this).addClass('disabled');

        var form = $(this).closest('form');
        var redirect = form.find('input[name="redirect"]').val();
        var thanks = form.find('input[name="thanks_modal"]').val();

        if (form.valid()) {
            var actUrl = form.attr('action');

            $.ajax({
                url: actUrl,
                type: 'post',
                dataType: 'html',
                data: form.serialize(),
                success: function (data) {
                    $('.modal').modal('hide');
                    setTimeout(function () {
                        $('.for-success').show(500);
                        setTimeout(function () {
                            $('.for-success').hide(500);
                        }, 3000);
                    });
                },
                error: function () {}
            });
            $(form)[0].reset();
        } else {
            $(this).prop('disabled', false);
            $(this).removeClass('disabled');
        }
    });

    jQuery('.send').click(function () {
        var form = jQuery(this).closest('form');

        if (form.valid()) {
            form.submit();
        }
    });

    $('.top-line .for-close').click(function () {

        //$(this).parent().removeClass('active');
        // 
        // $('.header, .manage').css({
        //     //top: 0 + 'px'
        // });

        $(this).parent().slideUp(100);
        setTimeout(() => {

            var header1 = $('.header').outerHeight();
            var header2 = $('.manage').outerHeight();

            if ($(window).width() > 1199) {
                $('body').css({
                    paddingTop: header1 + 'px',
                    transition: '0.5s'
                });
            } else {
                $('body').css({
                    paddingTop: header2 + 'px'
                });
            }
        }, 200);

    });

});

$(window).on('load', function () {
    window.HEADER_SLIDE_TIMEOUT = 3000;

    //     if ($(window).width() < 768) {
    //         $('.logos-wrapper').each(function () {
    //             var it = $(this),
    //                 logos = it.html();
    //             it.append(logos);
    //             it.append(logos);
    //             it.append(logos);
    //             it.append(logos);

    //             it.addClass('active');
    //         });
    //     }

    setTimeout(function () {

        //$('.top-line').addClass('active');

        // var lineHeight = $('.top-line').outerHeight();

        // if ($(window).width() > 1199) {
        //     $('.header, .manage').css({
        //         //top: lineHeight + 'px'
        //     });
        // }



    }, HEADER_SLIDE_TIMEOUT);

//     setHeader();
    // setTimeout(function () {
    //     var blockHeader = $(window).width() < 1200 ? header2 : header1;

    //     if ($(window).width() > 1199) {
    //         $('body').css({
    //             paddingTop: (blockHeader + lineHeight) + 'px',
    //             //transition: '1s'
    //         });
    //     } else {
    //         // $('body').css({
    //         //     paddingTop: header2 + 'px',
    //         //     transition: '1s'
    //         // });
    //     }

    // }, HEADER_SLIDE_TIMEOUT);


//     $(".go-to-block").click(function (e) {
//         e.preventDefault();
//         var target = $(this).data('target'),
//             offset = $(target).offset().top;

//         $('html, body').animate({
//             scrollTop: offset - blockHeader
//         }, 400);
//     });

    if (!$('body').hasClass('single') && !$('.category-menu .current-menu-item')[0]) {
        $('.category-menu .for-all').addClass('current-menu-item');
    }

    if (!$('.faq-category .active')[0]) {
        $('.cat-block.for-all').addClass('active');
    }

    var url = document.location.toString();
    if (url.match('#') && $('.accordion').length) {
        var link = $('.accordion .card #' + url.split('#')[1]);
        console.log(url.split('#')[1]);
        /*var text = $(link).text();
        	$('.st-1').text(text);*/
        $(link).collapse('show');

    }

    $('.accordion').on('shown.bs.collapse', function () {
		var header1 = $('.header').outerHeight();
        var block = $(this),
            btnHeight = block.find('.collapse.show').siblings('.btn').outerHeight(),
            offsetTop = block.find('.collapse.show').offset().top;

        $('html, body').animate({
            scrollTop: (offsetTop - btnHeight) - header1
        }, 400);
    });

});

$(window).on('load resize', function () {
    setHeight('.faq-category', '.cat-block');

    if ($(window).width() > 767) {
        setHeight('.reviews', '.review');
        setHeight('.faq-category', '.name');
    }
    if ($(window).width() > 575) {
        setHeight('.row', '.csp-block');
    }
});

    $(document).ready(function () {
		setHeader();
		
        var rangeSlider = $('input[type="range"]');

        rangeSlider.each(function () {

            var it = $(this),
                inputParent = it.parents('.for-range'),
                inputVal = inputParent.find('input.vals');


            if (it.length) {

                it.rangeslider({
                    polyfill: false,
                    onInit: function () {
                        inputParent.find('.rangeslider__handle').append('<div class="qua"> 1</div>');

                    },
                    onSlide: function (position, value) {
                        inputVal.val(value);
                        inputParent.find('.qua').text(value);
                    },
                })
            }

        });
    });

function setHeader() {
	var header1 = $('.header').outerHeight();
    var header2 = $('.manage').outerHeight();
    var lineHeight = $('.top-line').length ? $('.top-line').outerHeight() : 0;

    // if ($(window).width() < 1200) {
    //     return;
    //     $('body').css({
    //         paddingTop: header2 + 'px',
    //         //transition: '1s'
    //     });
    // }

    var blockHeader = $(window).width() < 1200 ? header2 : header1;

    $('body').css({
        paddingTop: blockHeader + 'px',
    });

	$('.header').css({
		position: 'fixed',
	});
	
	$(".go-to-block").click(function (e) {
        e.preventDefault();
        var target = $(this).data('target'),
            offset = $(target).offset().top;

        $('html, body').animate({
            scrollTop: offset - blockHeader
        }, 400);
    });
}

function setHeight(parent, block) {

    $(parent).each(function () {

        var height = 0,
            blockk = $(this).find(block);

        blockk.each(function () {

            var blockHeight = $(this).outerHeight();

            if (height < blockHeight) {
                height = blockHeight;
            }

        });

        blockk.css({
            height: height
        });


    });
}