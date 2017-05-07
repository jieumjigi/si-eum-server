_.each($('#poemManager'), __(
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
                  게시 날짜\
                span {{moment(item.published_date).format('YY/MM/DD')}} ({{moment(item.published_date, 'YYYYMMDD').fromNow()}})\
          ") ,')}}\
        ')
    )
  ),
  function($elem, html) { return $elem.replaceWith(html) },

  // _('on', 'click', 'button.getPoemList', __(
  //   _.v('currentTarget'), $, _('closest', '.body'),
  //   _.all(
  //     $,
  //     __(
  //       _($.get, '/poem/getPoem'), _.v('items'),
  //       _.t('items', '\
  //           ul {{_.go(items, ', _.teach("item", "\
  //             li\
  //               span {{item.title}}\
  //               span {{item.contents}}\
  //           ") ,')}}\
  //         ')
  //     )
  //   ),
  //   function($body, html) {
  //     return $body.append(html)
  //   }
  // )),

  _.c('.form.card'), $,
  _('on', 'click', 'button.submit', __(
    _.v('delegateTarget'), $,
    _('find', 'input, textarea'),
    _.reduce(function(obj, $inputs) {
      return obj[$inputs.name] = $inputs.value, obj;
    }, {}),
    _($.post, '/poem/addPoem/')
  ))

));