$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-box" data-message-id=${message.id}>
          <ul class="massage-left-box">
            <li class="massage-left-box__name">
              ${message.user_name}
            </li>
            <li class="massage-left-box__message">
              ${message.created_at}
            </li>
          </ul>
          <div class="massage-right-box">
            <p class="massage-right-box__text">
              ${message.content}
            </p>
            <img class="massage-right-box__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="message-box" data-message-id=${message.id}>
          <ul class="massage-left-box">
            <li class="massage-left-box__name">
              ${message.user_name}
            </li>
            <li class="massage-left-box__message">
              ${message.created_at}
            </li>
          </ul>
          <div class="massage-right-box">
            <p class="massage-right-box__text">
              ${message.content}
            </p>
         </div>
        </div>`
      return html;
    };
  }

  $('.Form-box').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);      
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $(".Form-box__submit").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  });
});

