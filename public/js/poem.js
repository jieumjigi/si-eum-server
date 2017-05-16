_.each(
  $('#poemManager'), __(
  $,
  _('find', '#poemList > *'),
  _.all(
    $,
    __(
      _($.get, '/poem/getPoem'),
      _.v('items'),
      _.t('items', '\
          ul {{_.go(items, ', _.teach("item", "\
            li.card\
              .origin\
                .title \
                  label\
                    제목\
                  span {{item.title}}\
                .author\
                  label\
                    작가\
                  span {{item.poetName}}\
                .content\
                  label\
                    내용\
                  span {{item.contents}}\
                .date\
                  label\
                    등록일\
                  span {{moment(item.published_date).format('YY/MM/DD')}} ({{moment(item.published_date, 'YYYYMMDD').fromNow()}})\
                .date\
                  label\
                    게시 예정일\
                  span {{moment(item.pushDueDate).format('YY/MM/DD')}} ({{moment(item.pushDueDate, 'YYYYMMDD').fromNow()}})\
                .options\
                  button.edit 수정\
              .editor[hidden]\
                .title \
                  label\
                    제목\
                  input[value='{{item.title}}' name=title]\
                  input[value={{item.poemId}} name=poemId hidden]\
                .author\
                  label\
                    작가\
                  input[value='{{item.poetName}}' name=poetName]\
                .content\
                  label\
                    내용\
                  textarea[row=10 cols=40 name=contents] {{item.contents}}\
                .date\
                  label\
                    게시 예정일\
                  input[type=date value={{item.pushDueDate}} name=pushDueDate]\
                .options\
                  button.done 완료\
                  button.cancel 취소\
          ") ,')}}\
        ')
    )
  ),
  function($elem, html) { $elem.replaceWith(html) },

  _.c('li.card'), $,
  _('on', 'click', 'button.edit', __(
    _.v('delegateTarget'), $,
    function($dTarget) {
      $dTarget.find('.editor').show();
      $dTarget.find('.origin').hide();
    }
  )),
  _('on', 'click', 'button.cancel', __(
    _.v('delegateTarget'), $,
    function($dTarget) {
      $dTarget.find('.editor').hide();
      $dTarget.find('.origin').show();
    }
  )),
  _('on', 'click', 'button.done', __(
    _.v('delegateTarget'), $,
    _.all(
      __(
        _('find', 'input, textarea'),
        _.reduce(function(obj, $inputs) {
          if (!$inputs.value) return obj;
          return obj[$inputs.name] = $inputs.value, obj;
        }, {}),
        $.put("/poem/modifyPoem/")
      ),
      function($dTarget) {
        $dTarget.find('.editor').hide();
        $dTarget.find('.origin').show();
      }
    )
  )),

  _.c('.form.card'), $,
  _('on', 'click', 'button.submit', __(
    _.v('delegateTarget'), $,
    _.tap(
      _('find', 'input:file'),
      function($input) {
        if ($input[0].files.length > 0) {
          var form_data = new FormData();

          _.each($input[0].files, function(file, i) {
            form_data.append('file_' + i, file);
          });

          $.ajax({
            method: 'POST',
            url: '/uploadImage',
            data: form_data,
            processData: false,
            contentType: false
          })
        }
      }
    ),
    _('find', 'input, textarea'),
    _.reduce(function(obj, input) {
      if (!input.value || input.type == 'file') return obj;
      return obj[input.name] = input.value, obj;
    }, {}),
    _($.post, '/poem/addPoem/')
  ))

));