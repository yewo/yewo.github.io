(function($) {
    // 获取video元素
    var video = $("#myVideo");

    var timeFormat = function(seconds) {
        var minite = Math.floor(seconds / 60);
        if(minite < 10) {
            minite = "0" + minite;
        }
        var second = Math.floor(seconds % 60);
        if(second < 10) {
            second = "0" + second;
        }
        return minite + ":" + second;
    };

    // 鼠标移入移除，显示/隐藏 标题和控制区域
    var showTitleAndControl = function(shouldShow) {
        if(shouldShow) {
            $(".control").stop().animate({'bottom':0}, 500);
            $(".caption").stop().animate({'top':0}, 500);
        } else {
            $(".control").stop().animate({'bottom':-50}, 1000);
            $(".caption").stop().animate({'top':-50}, 1000);
        }
    };

    // 播放和暂停切换
    var playAndPause = function() {
        if(video[0].paused || video[0].ended) {
            video[0].play();
            $("#playBtn").removeClass("play").addClass("pause");
        } else {
            video[0].pause();
            $("#playBtn").removeClass("pause").addClass("play");
        }
    };

    // 声音和静音切换
    var soundAndMute = function() {
        if(video[0].muted) {
            video[0].muted = false;
            $("#soundBtn").removeClass("mute").addClass("sound");
            $(".volumeBar").css("width", video[0].volume * 100 + "%");
        } else {
            video[0].muted = true;
            $("#soundBtn").removeClass("sound").addClass("mute");
            $(".volumeBar").css("width", 0);
        }
    };

    // 进度条拖拽效果
    var enableProgressDrag = function() {
        var progressDrag = false;
        $(".progress").on("mousedown", function(e) {
            progressDrag = true;
            updateProgress(e.pageX);
        });
        $(document).on("mouseup", function(e) {
            if(progressDrag) {
                progressDrag = false;
                updateProgress(e.pageX);
            }
        });
        $(document).on("mousemove", function(e) {
            if(progressDrag) {
                updateProgress(e.pageX);
            }
        });
    };

    // 更新进度
    var updateProgress = function(x) {
        var progress = $(".progress");

        var percent = 100 * (x - progress.offset().left) / progress.width();
        if(percent > 100) {
            percent = 100;
        }
        if(percent < 0) {
            percent = 0;
        }
        $(".timeBar").css("width", percent + "%");
        video[0].currentTime = video[0].duration * percent / 100;
    };

    // 声音拖拽处理
    var enableSoundDrag = function() {
        var soundDrag = false;
        $(".volume").on("mousedown", function(e) {
            soundDrag = true;
            updateSound(e.pageX);
            video[0].muted = false;
            $("#soundBtn").removeClass("mute").addClass("sound");
        });
        $(document).on("mouseup", function(e) {
            if(soundDrag) {
                soundDrag = false;
                updateSound(e.pageX);
            }
        });
        $(document).on("mousemove", function(e) {
            if(soundDrag) {
                updateSound(e.pageX);
            }
        });
    };

    // 更新声音
    var updateSound = function(x, vol) {
        var volume = $(".volume");
        // 如果设置了vol参数，则直接使用vol
        var percent;
        if(vol) {
            percent = vol * 100;
        } else {
            var percent = 100 * (x - volume.offset().left) / volume.width();
            if(percent > 100) {
                percent = 100;
            }
            if(percent < 0) {
                percent = 0;
            }
        }
        $(".volumeBar").css("width", percent + "%");
        video[0].volume = percent / 100;
    };


    // 获取元数据，初始化视频数据
    video.on("loadedmetadata", function(shouldShow) {

        // 视频100%显示在宽高区域内
        video.width($(".container").width());
        video.height($(".container").height());

        showTitleAndControl(false);
        $("#currentTime").html(timeFormat(0));
        $("#duration").html(timeFormat(video[0].duration));

        // 鼠标进入视频区域时，显示标题和控制区域
        // 鼠标离开视频区域时，隐藏标题和控制区域
        $(".container").hover(function() {
            showTitleAndControl(true);
        }, function() {
            showTitleAndControl(false);
        });

        // 播放按钮绑定事件
        $("#playBtn").on("click", playAndPause);
        // 声音按钮绑定事件
        $("#soundBtn").on("click", soundAndMute);

        // 调用进度条拖拽
        enableProgressDrag();

        // 调用声音拖拽
        enableSoundDrag();

        // 初始化声音
        updateSound(null, 0.7);

    });

    var loadingTimer = null;
    // 每一次播放位置发生改变
    video.on("timeupdate", function() {
        var currentTime = video[0].currentTime;
        var duration = video[0].duration;
        var percent =100 * currentTime / duration;
        $(".timebar").css("width", percent + "%");
        $("#currentTime").html(timeFormat(currentTime));

        $(".loading").fadeOut(100);
        clearTimeout(loadingTimer);
        loadingTimer = setTimeout(function() {
            if(!video[0].paused && !video[0].ended) {
                $(".loading").fadeIn(100);
            }
        }, 500);
    });


    // 视频结束的时候
    video.on("ended", function() {
        updateProgress($(".progress").offset().left);
        $("#playBtn").removeClass("pause").addClass("play");
    });

    // 可以播放视频的时候
    video.on("canplay", function() {
        $(".loading").fadeOut(100);
    })

})(jQuery);