$(document).ready(function(){


    /*--------------------
    데스크탑 gnb
    --------------------*/
    //변수에 담기
    let header = $('#header')
    let gnbWrap = ('#header .gnbArea')
    let oneDepth = $('#header .gnb > li')
    let twoDepth = oneDepth.children('.twoD')
    let thrBt = twoDepth.find('.thrBt')
    let gnbBg = $('#header .gnbBg')
    let leftArea = $('#header .leftArea');

    // .gnb > li 갯수만큼 실행 each()
    oneDepth.each(function( i ){
        //$(this).mouseenter(function(){})
        //$(this).mouseleave(function(){})
        //$(this).hover( function(){}, function(){} )

        $(this).on('mouseenter', function(){
            oneDepth.eq(i).addClass('on')
        })
        $(this).on('mouseleave', function(){
            oneDepth.eq(i).removeClass('on')
        })
    }) // each 끝

    $( gnbWrap ).add(gnbBg).mouseenter(function(){
        console.log('마우스가 들어감')
        gnbBg.stop().slideDown(300);
        leftArea.stop().fadeIn(300);
        twoDepth.stop().fadeIn(500)
    })
    $( gnbWrap ).add(gnbBg).mouseleave(function(){
        console.log('마우스가 나감')
        gnbBg.stop().slideUp(100);
        leftArea.stop().fadeOut(100);
        twoDepth.stop().fadeOut(0)
    })

    //thrBt 갯수만큼 실행 each()
    thrBt.each( function( i ){
        console.log('thrBt 인덱스 번호', i)
        console.log(this)
        $(this).click(function(){
            if( $(this).hasClass('on') ){
                $(this).removeClass('on')
                $(this).next('.thrD').stop().slideUp();
            } else {
                $(this).addClass('on')
                $(this).next('.thrD').stop().slideDown();
            }
        })
    })    
    
    //oneDepth에 마우스 들어가면
    //oneDepth.on('mouseenter' , function(){})

    /* oneDepth.mouseenter(function(){
        $(this).addClass('on')
        twoDepth.show()
        gnbBg.show()
        leftArea.show()
    }) */

    //oneDepth에 마우스 떠나가면
    /* oneDepth.mouseleave(function(){
        $(this).removeClass('on')
        twoDepth.fadeOut(300)
        gnbBg.fadeOut(300)
        leftArea.fadeOut(300)
    }) */

    //thrBt 클릭하면
    /* thrBt.click(function(){
        // 클릭한것 자기자신 this 'on' 클래스를 가지고 있지 않다면
        // 부정 !
        // 'on' 클래스 추가
        // 그렇지 않으면 'on' 클래스 제거
        let condition = $(this).hasClass('on')

        if( !condition ){
            $(this).addClass('on')
            $(this).next('.thrD').show(); 
        } else { 
            $(this).removeClass('on')
            $(this).next('.thrD').hide();
        }
    }) */

    /*--------------------
    모바일 gnb
    --------------------*/
    //변수에 담기

    let openBt = $('.mHeader .openBt') ,
    mMArea =$('.mMenuArea'),
    closeBt = mMArea.find('.closeBt'),
    gnbArea = $('.gnbArea'),
    oneD = gnbArea.children('.oneD'),
    twoD = gnbArea.children('.twoD'),
    thrBtn = twoD.children('.thrBt'),
    thrD = twoD.children('.thrD');
    
    //openBt 클릭하면 mMArea 애니매니션 적용 {left: -100% => 0}
    openBt.click(function(){
        mMArea.animate({ left : 0 }, 600 )
    })

    //closeBt 클릭하면 mMArea 애니매니션 적용 {left: 0 => -100%}
    closeBt.click(function(){
        mMArea.animate({ left : '-100%' }, 600 )
    })

    //oneD 클릭하면  twoD 닫기, oneD 'on' 클래스 제거
    //만약 twoD 보인다면 is(:visible)
    //부정! 
    //안보인다면 twoD를 나타나게
    
    oneD.click(function(){
        twoD.slideUp();
        oneD.removeClass('on')

        if( !$(this).next().is(':visible') ){
            $(this).next().slideDown()
            $(this).addClass('on')
        }
    })

    // thrBtn 클릭하면 
    thrBtn.click(function(){
        $(this).next().slideToggle()
        $(this).toggleClass('on')
    })

    //윈도우가 스크롤 되면
    $(window).scroll(function(){
        //스크롤된 값 구하기
        let winScrollT = $(window).scrollTop()

        let winScrollT2 = $(window).scrollTop() + $('#footer').outerHeight(true) + 200
        let winScrollT3 = $(window).scrollTop() + $(window).height()

        let mCon1T = $('.mainCon1').offset().top
        let mCon2T = $('.mainCon2').offset().top
        let mCon3T = $('.mainCon3').offset().top
        let footT = $('#footer').offset().top

        console.log("mainCon1수직위치", mCon1T)
        console.log("mainCon2수직위치", mCon2T)
        console.log("mainCon3수직위치", mCon3T)
        console.log("footer수직위치", footT)
        
        console.log("윈도우 스크롤값", winScrollT)
        console.log('푸터 위치값', $('#footer').offset().top)
        console.log("푸터 높이" , $('#footer').outerHeight(true))


        // 윈도우가 스크롤된 값이 푸터 위치값보다 크거나 같을 경우
        // winScrollT3은 = 실제 스크롤 된 값에 + 윈도우 높이를 더한 값

        console.log( winScrollT  >= $("#footer").offset().top ) // false
        console.log( winScrollT2 >= $("#footer").offset().top ) // true
        console.log( winScrollT3 >= footT ) // true

        if( winScrollT3 >= footT ){
            $('.topBtn').fadeIn(500)
            $('.topBtn').css('bottom',  $('#footer').outerHeight() )
        } else {
            $('.topBtn').fadeOut(500)
            $('.topBtn').css('bottom', '0')
        }

        // 1000만큼 스크롤을 했다고 가정할게요 
        
        // mCon1T 901.625
        // 1000 >= 901.625
        // winScrollT >= mCon1T  

        // mCon2T 1792.625
        // 1000 <= 1792.625
        // winScrollT <= mCon2T  

        if( winScrollT >= mCon1T && winScrollT <= mCon2T ){
            $('.mainCon1 .mainTit').animate({top : 0, opacity : 1},600,'swing')
            $('.mainCon1 .mainTxt').delay(200).animate({top : 0, opacity : 1},600,'swing')
            $('.mainCon1 .mainCon1List').delay(400).animate({top : 0, opacity : 1},600,'swing')

        } else if( winScrollT >= mCon2T && winScrollT <= mCon3T ) {
            $('.mainCon2 .mainTit').animate({top : 0, opacity : 1},600,'swing')
            $('.mainCon2 .mainTxt').delay(200).animate({top : 0, opacity : 1},600,'swing')
            $('.mainCon2 .mainCon2List').delay(400).animate({top : 0, opacity : 1},600,'swing')
            
        } else if( winScrollT >= mCon3T && winScrollT <= footT ) {
            $('.mainCon3 .mainTit').animate({top : 0, opacity : 1},600,'swing')
            $('.mainCon3 .mainTxt').delay(200).animate({top : 0, opacity : 1},600,'swing')
            $('.mainCon3 .mainNews').delay(400).animate({top : 0, opacity : 1},600,'swing')
        } 
        
        //헤더 고정시키기
        if( winScrollT > 100 ){
            $("#header").addClass('on')
        } else { 
            $("#header").removeClass('on')
        }

       

    })// scroll 끝

    //전시영역 배경이미지 교체
    let mainConLI = $('.mainCon1List li')
    let mainCon1Bg = $('.mainCon1Bg > div')

    //each 요소의 개수만큼 실행
    mainConLI.each( function( idx , item ){
        console.log(idx)
        console.log(item)
        console.log(this)

        //$(this).mouseenter(function(){})
        //$(this).mouseleave(function(){})

        $(this).hover(function(){
            mainCon1Bg.eq(idx).stop().fadeIn(600)
        } , function(){
            mainCon1Bg.eq(idx).stop().fadeOut(300)
        })

    } )


    //topBtn 클릭하면 위로
    $('.topBtn').click(function(){
        $('html').animate({scrollTop : 0}, 600)
    })


})
