
/**
 * Created by manju on 10/5/15.
 */
$(document).ready(function () {
    var widget_top = $(".reading-list-widget").offset().top;

    $(window).scroll(function () {
        var widget_height = $(".reading-list-widget").height();

        // Affix the progress bar widget
        var top = $(this).scrollTop();
        if (top > widget_top - 10) {
            $(".reading-list-widget").addClass("affix");
        } else {
            $(".reading-list-widget").removeClass("affix");
        }

        // https://gist.github.com/toshimaru/6102647
        var scrollHeight = $(document).height();
        var scrollPosition = $(window).height() + $(window).scrollTop();

        $('.reading-list-articles article').each(function (i) {
            var this_top = $(this).offset().top;
            var height = $(this).height();
            var this_bottom = this_top + height;
            var percent = 0;

            // Scrolled within current section
            if (top >= this_top && top <= this_bottom) {
                percent = ((top - this_top) / (height - widget_height)) * 100;
                if (percent >= 100) {
                    percent = 100;
                    $(".reading-list-widget .reading-list-progress-bar-bg:eq(" + i + ") i").css("color", "#ffffff");
                }
                else {
                    $(".reading-list-widget .reading-list-progress-bar-bg:eq(" + i + ") i").css("color", "#36a7f3");
                }
            } else if (top > this_bottom) {
                percent = 100;
                $(".reading-list-widget .reading-list-progress-bar-bg:eq(" + i + ") i").css("color", "#fff");
            }

            // fix to complete the last reading box (If not, last box would have still 10% not filled up)
            if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
                percent = 100;
                $(".reading-list-widget .reading-list-progress-bar-bg:eq(" + i + ") i").css("color", "#fff");
            }

            $(".reading-list-widget .reading-list-progress-bar-bg:eq(" + i + ") span").css("width", percent + "%");
        });
    });
});