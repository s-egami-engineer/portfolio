// スクロールしたときのヘッダーの処理
let header = $('header');
let mainContentHeight = $('.main-content').outerHeight();
let headerHeight = header.outerHeight();

$(window).on('load scroll', function() {
  if($(this).scrollTop() < mainContentHeight - headerHeight) {
    header.removeClass('change-header');
  } else {
    header.addClass('change-header');
  }
});

// ハンバーガーボタンとメニューリスト
$('.menu-button').click(function() {
  $('.menu-list').slideToggle(400);
  $('.menu-trigger1').toggleClass('transform');
  $('.menu-trigger2').toggleClass('transform');
  $('.menu-trigger3').toggleClass('transform');
});

// ページ内スクロール
$('a[href^="#"]').click(function() {
  let href = $(this).attr("href");
  let target = $(href == "#" || href == "" ? 'html' : href);
  let position = target.offset().top - headerHeight;
  $('body,html').animate({scrollTop: position}, 400, 'swing');
  $('.menu-list').slideUp(400);
  $('.menu-trigger1').removeClass('transform');
  $('.menu-trigger2').removeClass('transform');
  $('.menu-trigger3').removeClass('transform');
});

// スクロールでふわっと表示させる
$(window).scroll(function () {
  $('.fadeIn').each(function(){
    let targetElement = $(this).offset().top;
    if ($(window).scrollTop() > targetElement - $(window).height() + 150){
        $(this).css('opacity','1');
        $(this).css('transform','translateY(0)');
    }
  });
});

// hoverしたときに拡大させる
$('.magnification').hover(
  function() {
    $(this).css('transition','0.5s');
    $(this).css('transform','scale(1.1)');
  },
  function() {
    $(this).css('transform','scale(1)');
  }
);

// お問い合わせフォームの入力チェック
// true => OK, false => miss
let nameCheck = 'false';
let mailCheck = 'false';
let commentCheck = 'false';

$('.send-btn').click(function() {
  // 入力内容の取得
  let nameArea = $("input[name='name']").val();
  let mailArea = $("input[name='mail']").val();
  let commentArea = $("textarea[name='comment']").val();
  // エラーメッセージをリセット
  $('.missNameBox').text('');
  $('.missMailBox').text('');
  $('.missCommentBox').text('');
  // 名前チェック
  if(nameArea == '') {
    $('.missNameBox').text('お名前が入力されていません');
  } else {
    nameCheck = 'true';
  }
  // メールアドレスチェック
  if(mailArea == '') {
    $('.missMailBox').text('メールアドレスが入力されていません');
  } else if(mailArea.match(/.+@.+\..+/) == null) {
    $(".missMailBox").text('メールアドレスの形式が間違っています');
  } else {
    mailCheck = 'true';
  }
  // コメントチェック
  if(commentArea == '') {
    $('.missCommentBox').text('お問い合わせ内容が入力されていません');
  } else {
    commentCheck = 'true';
  }

  if(nameCheck == 'true' && mailCheck == 'true' && commentCheck == 'true') {
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: 'mail.php',
      data: {
        nameArea: nameArea,
        mailArea: mailArea,
        commentArea: commentArea
      },
      success: function(data) {
        alert('送信しました');
        // location.href = './contact.php';
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        alert(XMLHttpRequest.status);
        alert(textStatus);
        alert(errorThrown.message);
      }
    });
  }
});