'use script';

$(function () {
  //メニューボタンをクリックしたら
  $(".menu").click(function () {
    //「.menu」に「.active」を追加・削除
    $(this).toggleClass("active");
    //「.drawer__nav」に「.active」を追加・削除
    $(".drawer__nav").toggleClass("active");
    // ナビゲーションメニュー内のリンク（.drawer__item a）がクリックされたときの処理を定義
    $(".drawer__item a").click(function () {
      //メニューボタンから「.active」クラスを削除
      $(".menu").removeClass("active")
      // ナビゲーションメニューから「.active」クラスを削除
      $(".drawer__nav").removeClass("active")
    })
  });
});



// 会社ロゴ無限ループのjQuery
const swiper = new Swiper('.swiper01', {
  speed: 4000,
  loop: true, // プルーさせる
  allowTouchMove: false,//スワイプ有効
  centeredSliders: true,//中心を起点にする
  autoplay: {
    delay: 0, //途切れなくループ
  },
  breakpoints: {
    0: {
      slidesPerView: 2, // 一度に表示するスライドの数
      spaceBetween: 63, // 要素間の余白
    },

    600: {
      slidesPerView: 3,
      spaceBetween: 63,
    },

    1200: {
      slidesPerView: 5,
      spaceBetween: 80,
    },
  }
});



// // // カードスライダーのjQuery
const CardSwiper = new Swiper('.slider__swiper', {
  speed: 1000,
  loop: true,
  allowTouchMove: true,
  grabCursor: true, // 手でスワイプする
  breakpoints: {
    0: {
      spaceBetween: 30, // 要素間の余白
      centeredSlides: true,//中央を起点に
      slidesPerView: 1, // 一度に表示するスライドの数
      slidesPerGroup: 1, // 一度にスワイプされるスライドの数
    },

    768: {
      spaceBetween: 50, // 要素間の余白
      centeredSliders: true,
      slidesPerView: 2, // 一度に表示するスライドの数
      slidesPerGroup: 2, // 一度にスワイプされるスライドの
    },
    1024: {
      spaceBetween: 70, // 要素間の余白
      centeredSliders: true,
      slidesPerView: 2, // 一度に表示するスライドの数
      slidesPerGroup: 2, // 一度にスワイプされるスライドの
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});


// Q&AアコーディオンのjQuery
$('.accordion__header').click(function () { // .accordion__headerをクリックで発火
  $(this).next().slideToggle();
  // $(this)...$('.accordion-header')の.next()...次の要素が.slideToggle()...表示と非表示を交互にする
  $(this).toggleClass('active');
  // $(this)...$('.accordion-header')に、activeというクラスが追加と削除を交互にする
});





// レスポンシブの375px未満のviewport画面幅を固定
!(function () {
  // viewport の内容を保留関数を定義
  const viewport = document.querySelector('meta[name="viewport"]');
  //画面幅が 375px より広い場合は大丈夫設定、それ以外は幅を 375px に固定
  function switchViewport() {
    // 新しいコンテンツを設定 } }
    const value =
      //画面幅が 375px より広い場合は大丈夫設定、それ以外は幅を 375px に固定
      window.outerWidth > 375
        // 375px未満の場合の設定// 現在のビューポートのコンテンツ属性が変更する値と異なる場合のみ設定を更新する
        ? 'width=device-width,initial-scale=1'
        : 'width=375';
    // 新しいコンテンツを設定 } 
    // ウィンドウのリサイズイベントに関数を登録（画面サイズ変更実行されるようにする
    if (viewport.getAttribute('content') !== value) {
      viewport.setAttribute('content', value);
    }
  }
  // ページ読み込み時に最初に一度 viewport の切り替えを実行 
  addEventListener('resize', switchViewport, false);
  switchViewport();
})




// heroのコンタクトform　ページの読み込みが完了した後に以下の処理を実行
$(document).ready(function () {
  $(".form").submit(function (event) { // クラス名「.form」を持つフォームが送信されたときに処理を実行
    event.preventDefault(); // フォームのデフォルト送信を防ぐ
    var $form = $(this);  // 送信されたフォームを jQuery オブジェクトとして取得
    var formData = $form.serialize(); // フォーム内のデータを URL エンコードされた文字列として取得
    $form.find("#js-submit").fadeOut(); // ボタンをフェードアウト
    setTimeout(function () {
      $(".end-message").slideDown();// 送信完了メッセージを表示
      $(".contact_form__item").fadeOut();// 入力フィールドを非表示にする
      $form[0].reset(); // フォームの内容をリセット
      //window.location.href = "thanks.html";
    }, 700);
  });
},
)



// footer上のform ページの読み込みが完了した後に以下の処理を実行
$(document).ready(function () {
  $(".form02").submit(function (event) { // クラス名「.form」を持つフォームが送信されたときに処理を実行
    event.preventDefault(); // フォームのデフォルト送信を防ぐ
    var $form02 = $(this);  // 送信されたフォームを jQuery オブジェクトとして取得
    var formData = $form02.serialize(); // フォーム内のデータを URL エンコードされた文字列として取得
    $form02.find("#js-submit02").fadeOut();// ボタンをフェードアウト
    setTimeout(function () { // 0.7秒（700ミリ秒）後にメッセージを表示
      $(".end-message02").slideDown();// 送信完了メッセージを表示
      $(".contact_form__item").fadeOut();// 入力フィールドを非表示にする
      $form02[0].reset(); // フォームの内容をリセット
      //window.location.href = "thanks.html";
    }, 700);
  });
},
)



//フォームの必須項目チェックでメール送信可能にする実装
// ページの読み込みが完了したら、以下の処理を実行する
$(document).ready(function () {
  // ID「js-submit」のボタン要素を取得し、変数 `$submitBtn` に代入します
  const $submitBtn = $('#js-submit')
  // フォーム内のすべての `input` 要素や `textarea` 要素に「change」イベントを監視
  // ユーザーが値を変更するたびに、以下の処理が実行
  $('.form input,.form textarea').on('change', function () {
    // 入力フィールドがすべて空でないか確認する
    if (
      $('.form input[type="text"]').val() !== "" && // テキスト入力フィールドが空でないか確認
      $('.form input[type="email"]').val() !== "" && // メールアドレス入力フィールドが空でないか確認
      $('.form input[type="tel"]').val() !== "" // 電話番号入力フィールドが空でないか確認
    ) {
      // 上記すべての条件が満たされていれば、送信ボタン（$submitBtn）を有効化（disabledを解除）
      $submitBtn.prop('disabled', false);
      // 条件が一つでも満たされない場合、送信ボタン（$submitBtn）を無効化（disabledを有効化）
    } else {
      $submitBtn.prop('disabled', true);
    }
  });
});


//2つ目footer上のフォーム　必須項目チェックでメール送信可能にする実装
// ページの読み込みが完了したら、以下の処理を実行する
$(document).ready(function () {
  // ID「js-submit02」のボタン要素を取得し、変数 `$submitBtn` に代入します
  const $submitBtn = $('#js-submit02')
  // フォーム内のすべての `input` 要素や `textarea` 要素に「change」イベントを監視
  // ユーザーが値を変更するたびに、以下の処理が実行
  $('.form02 input,.form02 textarea').on('change', function () {
    // 入力フィールドがすべて空でないか確認する
    if (
      $('.form02 input[type="text"]').val() !== "" && // テキスト入力フィールドが空でないか確認
      $('.form02 input[type="email"]').val() !== "" && // メールアドレス入力フィールドが空でないか確認
      $('.form02 input[type="tel"]').val() !== "" // 電話番号入力フィールドが空でないか確認
    ) {
      // 上記すべての条件が満たされていれば、送信ボタン（$submitBtn）を有効化（disabledを解除）
      $submitBtn.prop('disabled', false);
      // 条件が一つでも満たされない場合、送信ボタン（$submitBtn）を無効化（disabledを有効化）
    } else {
      $submitBtn.prop('disabled', true);
    }
  });
});
